import Order from './schemas/order.schema.js'; // Remove curly braces - it's default export
import { connectDB } from '@/lib/database/connect.js';

export const orderController = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      await connectDB();
      const order = new Order(orderData);
      const savedOrder = await order.save();

      return {
        ok: true,
        data: savedOrder,
        message: 'Order created successfully'
      };
    } catch (error) {
      console.error("Error creating order:", error);
      return {
        ok: false,
        message: "Failed to create order",
        error: error.message
      };
    }
  },

  // Get all orders with filtering and pagination
  getAllOrders: async (filters = {}, page = 1, limit = 50) => {
    try {
      await connectDB();
      const skip = (page - 1) * limit;

      const orders = await Order.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Order.countDocuments(filters);

      return {
        ok: true,
        data: orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        ok: false,
        message: 'Failed to fetch orders',
        error: error.message
      };
    }
  },

  // Get orders by status
  getOrdersByStatus: async (status, page = 1, limit = 50) => {
    return orderController.getAllOrders({ status }, page, limit);
  },

  // Get orders for kitchen (pending, confirmed, preparing)
  getKitchenOrders: async () => {
    try {
      await connectDB();
      const orders = await Order.find({
        status: { $in: ['pending', 'confirmed', 'preparing'] }
      }).sort({ createdAt: 1 }); // Oldest first for kitchen queue

      return {
        ok: true,
        data: orders
      };
    } catch (error) {
      console.error('Error fetching kitchen orders:', error);
      return {
        ok: false,
        message: 'Failed to fetch kitchen orders',
        error: error.message
      };
    }
  },

  // Get orders ready for delivery
  getDeliveryOrders: async () => {
    try {
      await connectDB();
      const orders = await Order.find({
        status: { $in: ['ready', 'out-for-delivery'] },
        orderType: 'delivery'
      }).sort({ createdAt: 1 });

      return {
        ok: true,
        data: orders
      };
    } catch (error) {
      console.error('Error fetching delivery orders:', error);
      return {
        ok: false,
        message: 'Failed to fetch delivery orders',
        error: error.message
      };
    }
  },

  // Get single order by ID
  getOrderById: async (orderId) => {
    try {
      await connectDB();
      const order = await Order.findById(orderId);

      if (!order) {
        return {
          ok: false,
          message: 'Order not found'
        };
      }

      return {
        ok: true,
        data: order
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return {
        ok: false,
        message: 'Failed to fetch order',
        error: error.message
      };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus, notes = '') => {
    try {
      await connectDB();
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          status: newStatus,
          ...(notes && { kitchenNotes: notes })
        },
        { new: true, runValidators: true }
      );

      if (!order) {
        return {
          ok: false,
          message: 'Order not found'
        };
      }

      return {
        ok: true,
        data: order,
        message: `Order status updated to ${newStatus}`
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        ok: false,
        message: 'Failed to update order status',
        error: error.message
      };
    }
  },

  // Assign driver to order
  assignDriver: async (orderId, driverId, driverName) => {
    try {
      await connectDB();
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          assignedDriver: driverId,
          driverName: driverName,
          status: 'out-for-delivery'
        },
        { new: true }
      );

      if (!order) {
        return {
          ok: false,
          message: 'Order not found'
        };
      }

      return {
        ok: true,
        data: order,
        message: 'Driver assigned successfully'
      };
    } catch (error) {
      console.error('Error assigning driver:', error);
      return {
        ok: false,
        message: 'Failed to assign driver',
        error: error.message
      };
    }
  },

  // Get kitchen statistics
  getKitchenStats: async () => {
    try {
      await connectDB();
      const stats = await Order.aggregate([
        {
          $facet: {
            statusCounts: [
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 }
                }
              }
            ],
            todayOrders: [
              {
                $match: {
                  createdAt: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0))
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                  revenue: { $sum: '$total' }
                }
              }
            ],
            popularItems: [
              { $unwind: '$items' },
              {
                $group: {
                  _id: '$items.name',
                  totalQuantity: { $sum: '$items.quantity' },
                  totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
              },
              { $sort: { totalQuantity: -1 } },
              { $limit: 5 }
            ]
          }
        }
      ]);

      return {
        ok: true,
        data: stats[0]
      };
    } catch (error) {
      console.error('Error fetching kitchen stats:', error);
      return {
        ok: false,
        message: 'Failed to fetch kitchen statistics',
        error: error.message
      };
    }
  }
};