import { Order } from '../models/order.model.js';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

export async function listOrders(req, res) {
  const orders = await Order.findAll({ order: [['orderDate', 'DESC']] });
  res.json(orders);
}

export async function getOrder(req, res) {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}




export async function createOrder(req, res) {
  const o = await Order.create(req.body);
  res.status(201).json(o);
}

export async function updateOrder(req, res) {
  const [nb] = await Order.update(req.body, { where: { id: req.params.id } });
  if (!nb) return res.status(404).json({ message: 'Order not found' });
  res.json({ success: true });
}

export async function deleteOrder(req, res) {
  const nb = await Order.destroy({ where: { id: req.params.id } });
  if (!nb) return res.status(404).json({ message: 'Order not found' });
  res.json({ success: true });
}

// Import CSV : POST /orders/import
export async function importCSV(req, res) {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      // Assurez-vous que vos colonnes CSV correspondent aux champs
      results.push({
        orderNumber: data.orderNumber,
        orderDate: new Date(data.orderDate),
        customerName: data.customerName,
        phone: data.phone,
        city: data.city,
        address: data.address,
        productName: data.productName,
        quantity: parseInt(data.quantity, 10),
        price: parseFloat(data.price),
        confirmationStatus: data.confirmationStatus || 'Pending',
        deliveryStatus: data.deliveryStatus || 'Pending',
        notes: data.notes || ''
      });
    })
    .on('end', async () => {
      await Order.bulkCreate(results);
      // Supprimer le fichier temporaire
      fs.unlinkSync(req.file.path);
      res.json({ imported: results.length });
    });
}

export async function listPendingOrders(req, res) {
  try {
    const pendingOrders = await Order.findAll({
      where: { confirmationStatus: 'Pending' },
      order: [['orderDate', 'DESC']],
    });
    res.json(pendingOrders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes en attente.' });
  }
}

