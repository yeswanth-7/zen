const express = require('express');
const cors = require('cors'); 
const {connectDB} = require('./config')
 require('dotenv').config();


 const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
 const goalRoutes = require('./routes/goalRoutes');
const activityRoutes = require('./routes/activityRoutes');
 const recommendationRoutes = require('./routes/recommendationRoutes');
 const carbonRoutes = require('./routes/carbonRoutes');
const educationalRoutes = require('./routes/educationalRoutes')


  const app = express();
  const port = process.env.PORT || 3000;
  app.use(cors())
  app.use(express.json());


connectDB();

  app.use('/auth', authRoutes);
 app.use('/users', userRoutes);
 app.use('/goals', goalRoutes);
 app.use('/activities', activityRoutes)
app.use('/recommendations', recommendationRoutes);
 app.use('/carbonData', carbonRoutes);
app.use('/educationalResources', educationalRoutes);

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(err.statusCode || 500).send({ message: err.message });
});

 app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
 })