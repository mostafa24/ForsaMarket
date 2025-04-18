import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  customerName: DataTypes.STRING,
  phone: DataTypes.STRING,
  city: DataTypes.STRING,
  address: DataTypes.STRING,
  productName: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  confirmationStatus: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
    defaultValue: 'Pending'
  },
  deliveryStatus: {
    type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered'),
    defaultValue: 'Pending'
  },
  notes: DataTypes.TEXT
}, {
  tableName: 'orders'
});
