const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');


const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
}));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'host.docker.internal',
  dialect: 'mssql',
  port: 1433, // Default port for SQL Server
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});

const { User, UserUpdate } = require('./models')(sequelize);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
  User.findAll({
    include: [{
      model: UserUpdate,
    }],
  })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

const PORT = 5000;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
