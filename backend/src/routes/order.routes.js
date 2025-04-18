import { Router } from 'express';
import * as orderCtrl from '../controllers/order.controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const r = Router();

r.get('/', orderCtrl.listOrders);
r.get('/:id', orderCtrl.getOrder);
r.post('/', orderCtrl.createOrder);
r.put('/:id', orderCtrl.updateOrder);
r.delete('/:id', orderCtrl.deleteOrder);

// import CSV
r.post('/import', upload.single('file'), orderCtrl.importCSV);
r.get('/pending', orderCtrl.listPendingOrders); // 🆕

export default r;
