const express = require('express');
const sequelize = require('./src/config/db.config');
const { Bike, Brand } = require('./src/models');
const path = require('path');
const app = express();
app.use(express.json());
// Cấu hình static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '')));

// Route mặc định dẫn đến file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/html/index.html'));
}); 
// file html login
//cấu hình CORS
const cors = require('cors');
// Cấu hình CORS để cho phép truy cập từ mọi nguồn
app.use(cors());
//route cho bikes
const bikeRoutes = require('./src/routes/bike');
app.use('/api/bikes', bikeRoutes);
//route cho register và login
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);



const PORT = 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced!');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
