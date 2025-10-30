import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Pizza', 'Burger', 'Wings', 'Drink', 'Dessert', 'Sides', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  available: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  ingredients: {
    type: [String],
    default: []
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  spicyLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
    default: 'Mild'
  },
  calories: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create index for better query performance
menuItemSchema.index({ category: 1, available: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);