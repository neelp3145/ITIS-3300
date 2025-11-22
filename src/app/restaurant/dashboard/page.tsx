"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
  items: OrderItem[];
  total: number;
  orderType: "delivery" | "pickup" | "dine-in";
  estimatedPrepTime: number;
  createdAt: string;
  kitchenNotes: string;
  tableNumber?: number;
  address?: string;
}

interface KitchenStats {
  statusCounts: Array<{ _id: string; count: number }>;
  todayOrders: Array<{ count: number; revenue: number }>;
  popularItems: Array<{
    _id: string;
    totalQuantity: number;
    totalRevenue: number;
  }>;
}

// Mock data for development
const mockDrivers = [
  { id: "driver-1", name: "John Driver", available: true },
  { id: "driver-2", name: "Sarah Courier", available: true },
  { id: "driver-3", name: "Mike Delivery", available: false },
];

const mockOrders: Order[] = [
  {
    _id: "1",
    orderNumber: "001",
    customerName: "John Doe",
    status: "preparing",
    items: [
      {
        name: "Classic Burger",
        quantity: 2,
        price: 12.99,
        specialInstructions: "No onions",
      },
      { name: "French Fries", quantity: 1, price: 4.99 },
    ],
    total: 30.97,
    orderType: "delivery",
    estimatedPrepTime: 15,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    kitchenNotes: "",
    address: "123 Main St",
  },
  {
    _id: "2",
    orderNumber: "002",
    customerName: "Jane Smith",
    status: "pending",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 10.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
    ],
    total: 16.98,
    orderType: "dine-in",
    estimatedPrepTime: 10,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    kitchenNotes: "",
    tableNumber: 5,
  },
  {
    _id: "3",
    orderNumber: "003",
    customerName: "Bob Wilson",
    status: "ready",
    items: [{ name: "Pepperoni Pizza", quantity: 1, price: 18.99 }],
    total: 18.99,
    orderType: "pickup",
    estimatedPrepTime: 20,
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    kitchenNotes: "Extra crispy",
  },
];

const mockStats: KitchenStats = {
  statusCounts: [
    { _id: "pending", count: 3 },
    { _id: "confirmed", count: 2 },
    { _id: "preparing", count: 5 },
    { _id: "ready", count: 2 },
  ],
  todayOrders: [{ count: 12, revenue: 285.5 }],
  popularItems: [
    { _id: "classic-burger", totalQuantity: 15, totalRevenue: 194.85 },
    { _id: "pepperoni-pizza", totalQuantity: 8, totalRevenue: 151.92 },
    { _id: "caesar-salad", totalQuantity: 6, totalRevenue: 65.94 },
  ],
};

// Custom Alert component
const CustomAlert = ({
  status,
  children,
}: {
  status: "error" | "warning" | "info";
  children: React.ReactNode;
}) => {
  const colors = {
    error: { bg: "red.50", border: "red.200", text: "red.800", emoji: "❌" },
    warning: {
      bg: "yellow.50",
      border: "yellow.200",
      text: "yellow.800",
      emoji: "⚠️",
    },
    info: { bg: "blue.50", border: "blue.200", text: "blue.800", emoji: "ℹ️" },
  };

  const colorSet = colors[status];

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: colorSet.bg,
        border: `1px solid ${colorSet.border}`,
        borderRadius: "0.375rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.125rem" }}>{colorSet.emoji}</span>
        <span style={{ color: colorSet.text, fontWeight: "500" }}>
          {children}
        </span>
      </div>
    </div>
  );
};

// Custom Stat Card component
const StatCard = ({
  label,
  value,
  helpText,
  color = "gray.600",
}: {
  label: string;
  value: string | number;
  helpText?: string;
  color?: string;
}) => (
  <div
    style={{
      backgroundColor: "white",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      borderRadius: "0.5rem",
      height: "100%",
      padding: "1.5rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.25rem",
      }}
    >
      <span
        style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}
      >
        {label}
      </span>
      <span style={{ fontSize: "1.875rem", fontWeight: "bold", color: color }}>
        {value}
      </span>
      {helpText && (
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          {helpText}
        </span>
      )}
    </div>
  </div>
);

// Custom Tab component
const CustomTab = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    style={{
      fontWeight: "600",
      borderRadius: "0.375rem",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: "0.5rem 1rem",
      backgroundColor: isActive ? "#ea580c" : "transparent",
      color: isActive ? "white" : "#4b5563",
      border: "none",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

// Live Timer Component
const LiveTimer = ({
  createdAt,
  estimatedPrepTime,
  status,
}: {
  createdAt: string;
  estimatedPrepTime: number;
  status: string;
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(estimatedPrepTime);

  useEffect(() => {
    if (status === "delivered" || status === "cancelled") {
      setRemainingTime(0);
      return;
    }

    const orderTime = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const elapsedMinutes = Math.floor((now - orderTime) / 60000);
    const remaining = Math.max(0, estimatedPrepTime - elapsedMinutes);

    setRemainingTime(remaining);

    const timer = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [createdAt, estimatedPrepTime, status]);

  const getTimerColor = () => {
    if (remainingTime <= 3) return "#ef4444"; // red - urgent
    if (remainingTime <= 7) return "#eab308"; // yellow - warning
    return "#22c55e"; // green - good
  };

  const getTimerEmoji = () => {
    if (remainingTime <= 3) return "🔴";
    if (remainingTime <= 7) return "🟡";
    return "🟢";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.375rem 0.75rem",
        backgroundColor: "#f8fafc",
        borderRadius: "0.5rem",
        border: `2px solid ${getTimerColor()}`,
        fontWeight: "bold",
      }}
    >
      <span style={{ fontSize: "0.875rem" }}>{getTimerEmoji()}</span>
      <span style={{ fontSize: "0.875rem", color: getTimerColor() }}>
        {remainingTime}m remaining
      </span>
    </div>
  );
};

// Order Card Component
const OrderCard = ({
  order,
  showKitchenNotes = true,
  showDriverAssignment = false,
  onDeleteOrder,
}: {
  order: Order;
  showKitchenNotes?: boolean;
  showDriverAssignment?: boolean;
  onDeleteOrder: (orderId: string) => void;
}) => {
  const [kitchenNotes, setKitchenNotes] = useState<{ [key: string]: string }>(
    {}
  );
  const [assignedDrivers, setAssignedDrivers] = useState<{
    [key: string]: string;
  }>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "#eab308",
      confirmed: "#3b82f6",
      preparing: "#ea580c",
      ready: "#22c55e",
      "out-for-delivery": "#a855f7",
      delivered: "#22c55e",
      cancelled: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  const getOrderTypeColor = (orderType: string) => {
    const colors: { [key: string]: string } = {
      delivery: "#3b82f6",
      pickup: "#22c55e",
      "dine-in": "#a855f7",
    };
    return colors[orderType] || "#6b7280";
  };

  const getTimeSinceOrder = (createdAt: string) => {
    const now = new Date();
    const orderTime = new Date(createdAt);
    const diffMinutes = Math.floor(
      (now.getTime() - orderTime.getTime()) / 60000
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const hours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    return `${hours}h ${remainingMinutes}m ago`;
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          kitchenNotes: kitchenNotes[orderId] || "",
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDeleteOrder(order._id);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const markOrderCompleted = async () => {
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "completed",
        }),
      });

      if (response.ok) {
        onDeleteOrder(order._id);
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div
      style={{
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      {/* Order Header with Timer */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          {/* First Row: Order Number, Type, and Timer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  color: "#1f2937",
                }}
              >
                #{order.orderNumber}
              </span>
              <span
                style={{
                  backgroundColor: getOrderTypeColor(order.orderType),
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {order.orderType}
              </span>
              <LiveTimer
                createdAt={order.createdAt}
                estimatedPrepTime={order.estimatedPrepTime}
                status={order.status}
              />
            </div>

            <span
              style={{
                backgroundColor: getStatusColor(order.status),
                color: "white",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {order.status.replace(/-/g, " ")}
            </span>
          </div>

          {/* Second Row: Customer Info and Time */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                fontWeight: "500",
              }}
            >
              👤 {order.customerName}
              {order.tableNumber && ` • Table ${order.tableNumber}`}
              {order.address && ` • ${order.address}`}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {getTimeSinceOrder(order.createdAt)} • ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Order Items */}
          <div>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "0.875rem",
                marginBottom: "0.75rem",
                display: "block",
                color: "#374151",
              }}
            >
              📋 Order Items:
            </span>
            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                  padding: "0.25rem 0",
                }}
              >
                <div>
                  <span style={{ fontWeight: "500" }}>
                    {item.quantity}x {item.name}
                  </span>
                  {item.specialInstructions && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#d97706",
                        marginLeft: "0.5rem",
                      }}
                    >
                      ({item.specialInstructions})
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: "bold", color: "#059669" }}>
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Kitchen Notes */}
          {showKitchenNotes && (
            <div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  display: "block",
                  color: "#374151",
                }}
              >
                📝 Kitchen Notes:
              </span>
              <textarea
                style={{
                  width: "100%",
                  fontSize: "0.875rem",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  backgroundColor: "#f9fafb",
                  resize: "vertical",
                  minHeight: "80px",
                }}
                placeholder="Add preparation notes or updates..."
                value={kitchenNotes[order._id] || ""}
                onChange={(e) =>
                  setKitchenNotes((prev) => ({
                    ...prev,
                    [order._id]: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {order.status === "pending" && (
              <button
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => updateOrderStatus(order._id, "confirmed")}
              >
                ✅ Confirm Order
              </button>
            )}
            {order.status === "confirmed" && (
              <button
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ea580c",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => updateOrderStatus(order._id, "preparing")}
              >
                👨‍🍳 Start Cooking
              </button>
            )}
            {order.status === "preparing" && (
              <button
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => updateOrderStatus(order._id, "ready")}
              >
                🎯 Mark Ready
              </button>
            )}

            {/* I'm Finished / Complete Order Button */}
            {(order.status === "ready" || order.status === "delivered") && (
              <button
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={markOrderCompleted}
              >
                ✅ I'm Finished
              </button>
            )}

            {/* Delete Button */}
            <button
              style={{
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                backgroundColor: "transparent",
                color: "#dc2626",
                border: "1px solid #dc2626",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() => setShowDeleteConfirm(true)}
            >
              🗑️ Delete
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  color: "#dc2626",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                Are you sure you want to delete this order?
              </span>
              <button
                style={{
                  fontSize: "0.75rem",
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={handleDeleteOrder}
              >
                Yes, Delete
              </button>
              <button
                style={{
                  fontSize: "0.75rem",
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [kitchenOrders, setKitchenOrders] = useState<Order[]>([]);
  const [deliveryOrders, setDeliveryOrders] = useState<Order[]>([]);
  const [dineInOrders, setDineInOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<KitchenStats | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const router = useRouter();

  // Simulate authentication
  const isAuthenticated = true;
  const user = { role: "admin" };

  // Fetch data on component mount
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      fetchAllData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use mock data for now
      setOrders(mockOrders);
      setKitchenOrders(
        mockOrders.filter((order) =>
          ["pending", "confirmed", "preparing"].includes(order.status)
        )
      );
      setDeliveryOrders(
        mockOrders.filter(
          (order) => order.orderType === "delivery" && order.status === "ready"
        )
      );
      setDineInOrders(
        mockOrders.filter(
          (order) =>
            order.orderType === "dine-in" &&
            ["ready", "preparing"].includes(order.status)
        )
      );
      setStats(mockStats);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
    setKitchenOrders((prev) => prev.filter((order) => order._id !== orderId));
    setDeliveryOrders((prev) => prev.filter((order) => order._id !== orderId));
    setDineInOrders((prev) => prev.filter((order) => order._id !== orderId));
  };

  const handleClearAllOrders = async () => {
    try {
      const response = await fetch("/api/orders/clear-all", {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders([]);
        setKitchenOrders([]);
        setDeliveryOrders([]);
        setDineInOrders([]);
        setShowClearAllConfirm(false);
      }
    } catch (error) {
      console.error("Error clearing all orders:", error);
    }
  };

  // Tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showKitchenNotes={true}
                onDeleteOrder={handleDeleteOrder}
              />
            ))}
            {orders.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  No orders found
                </span>
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {kitchenOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showKitchenNotes={true}
                onDeleteOrder={handleDeleteOrder}
              />
            ))}
            {kitchenOrders.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  No orders in kitchen queue
                </span>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {deliveryOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showKitchenNotes={false}
                showDriverAssignment={true}
                onDeleteOrder={handleDeleteOrder}
              />
            ))}
            {deliveryOrders.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  No orders ready for delivery
                </span>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {dineInOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                showKitchenNotes={true}
                showDriverAssignment={false}
                onDeleteOrder={handleDeleteOrder}
              />
            ))}
            {dineInOrders.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <span style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  No active dine-in orders
                </span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                border: "4px solid #ea580c",
                borderTop: "4px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <span>Loading restaurant dashboard...</span>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Authentication check
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div style={{ padding: "1.5rem" }}>
        <CustomAlert status="warning">
          You need to be logged in as admin to access this page.
        </CustomAlert>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Header with Clear All Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
            }}
          >
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#ea580c",
              }}
            >
              FastBite Restaurant Dashboard
            </h1>
            <span style={{ color: "#6b7280" }}>
              Manage orders, kitchen queue, and deliveries
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {showClearAllConfirm ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  backgroundColor: "#fef2f2",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #fecaca",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#dc2626",
                    fontWeight: "bold",
                  }}
                >
                  Clear ALL orders?
                </span>
                <button
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                  onClick={handleClearAllOrders}
                >
                  Yes, Clear All
                </button>
                <button
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowClearAllConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                }}
                onClick={() => setShowClearAllConfirm(true)}
              >
                🗑️ Clear All Orders
              </button>
            )}

            <button
              onClick={fetchAllData}
              style={{
                backgroundColor: "#ea580c",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              disabled={isLoading}
            >
              <span>🔄</span>
              Refresh
            </button>
          </div>
        </div>

        {error && <CustomAlert status="error">{error}</CustomAlert>}

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <StatCard
            label="Today's Orders"
            value={stats?.todayOrders[0]?.count || 0}
            helpText={`$${stats?.todayOrders[0]?.revenue?.toFixed(2) || "0.00"}`}
            color="#ea580c"
          />
          <StatCard
            label="Pending"
            value={
              stats?.statusCounts.find((s) => s._id === "pending")?.count || 0
            }
            helpText="Awaiting preparation"
            color="#eab308"
          />
          <StatCard
            label="In Progress"
            value={
              stats?.statusCounts.find((s) => s._id === "preparing")?.count || 0
            }
            helpText="Being prepared"
            color="#3b82f6"
          />
          <StatCard
            label="Ready"
            value={
              stats?.statusCounts.find((s) => s._id === "ready")?.count || 0
            }
            helpText="Ready for pickup/delivery"
            color="#22c55e"
          />
        </div>
      </div>

      {/* Orders Tabs */}
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "1rem",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <CustomTab
              isActive={activeTab === 0}
              onClick={() => setActiveTab(0)}
            >
              All Orders ({orders.length})
            </CustomTab>
            <CustomTab
              isActive={activeTab === 1}
              onClick={() => setActiveTab(1)}
            >
              Kitchen Queue ({kitchenOrders.length})
            </CustomTab>
            <CustomTab
              isActive={activeTab === 2}
              onClick={() => setActiveTab(2)}
            >
              Delivery ({deliveryOrders.length})
            </CustomTab>
            <CustomTab
              isActive={activeTab === 3}
              onClick={() => setActiveTab(3)}
            >
              Dine-In ({dineInOrders.length})
            </CustomTab>
          </div>
        </div>

        <div style={{ padding: "1.5rem" }}>{renderTabContent()}</div>
      </div>
    </div>
  );
}
