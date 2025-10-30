import { MenuItem } from './schema/menuItem.schema.js';
import { connectDB } from '@/lib/database/connect.js';

export const menuItemController = {
  // Get all menu items
  getAllMenuItems: async (req, res) => {
    try {
      await connectDB();
      const { category, available } = req.query;

      // Build filter object
      const filter = {};
      if (category) filter.category = category;
      if (available !== undefined) filter.available = available === 'true';

      const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });

      return res.json({
        ok: true,
        data: menuItems,
        message: 'Menu items retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get menu item by ID
  getMenuItemById: async (req, res) => {
    try {
      await connectDB();
      const { id } = req.params;

      const menuItem = await MenuItem.findById(id);

      if (!menuItem) {
        return res.status(404).json({
          ok: false,
          message: 'Menu item not found'
        });
      }

      return res.json({
        ok: true,
        data: menuItem,
        message: 'Menu item retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching menu item:', error);
      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Create new menu item
  createMenuItem: async (req, res) => {
    try {
      await connectDB();
      const menuItemData = req.body;

      const newMenuItem = new MenuItem(menuItemData);
      const savedMenuItem = await newMenuItem.save();

      return res.status(201).json({
        ok: true,
        data: savedMenuItem,
        message: 'Menu item created successfully'
      });
    } catch (error) {
      console.error('Error creating menu item:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          ok: false,
          message: 'Validation error',
          error: error.message
        });
      }

      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Update menu item
  updateMenuItem: async (req, res) => {
    try {
      await connectDB();
      const { id } = req.params;
      const updateData = req.body;

      const updatedMenuItem = await MenuItem.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedMenuItem) {
        return res.status(404).json({
          ok: false,
          message: 'Menu item not found'
        });
      }

      return res.json({
        ok: true,
        data: updatedMenuItem,
        message: 'Menu item updated successfully'
      });
    } catch (error) {
      console.error('Error updating menu item:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          ok: false,
          message: 'Validation error',
          error: error.message
        });
      }

      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Delete menu item
  deleteMenuItem: async (req, res) => {
    try {
      await connectDB();
      const { id } = req.params;

      const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

      if (!deletedMenuItem) {
        return res.status(404).json({
          ok: false,
          message: 'Menu item not found'
        });
      }

      return res.json({
        ok: true,
        message: 'Menu item deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Search menu items
  searchMenuItems: async (req, res) => {
    try {
      await connectDB();
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          ok: false,
          message: 'Search query is required'
        });
      }

      const menuItems = await MenuItem.find({
        $text: { $search: q },
        available: true
      }).sort({ score: { $meta: 'textScore' } });

      return res.json({
        ok: true,
        data: menuItems,
        message: 'Search completed successfully'
      });
    } catch (error) {
      console.error('Error searching menu items:', error);
      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
};