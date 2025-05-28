const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/restaurants', require('./routes/restaurantsRoutes'));
app.use('/api/reservations', require('./routes/reservationsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));

app.get('/', (req, res) => res.send('Server running'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
