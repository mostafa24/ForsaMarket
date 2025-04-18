import app from './app.js';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🔗 DB connected');
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Startup error', err);
  }
})();
