const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');
const authController = require('./controllers/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('app.js');

app.use((req, res, next) => {
  User.findById('6422eca891a2a58f1e74c237')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);

app.use('/auth', authRoutes);

app.use(errorController.get404);

try{
  mongoose
  .connect(
    'mongodb+srv://lakshay05:gJkZppWhPeBc8kqw@cluster0.urut4n5.mongodb.net/shop?retryWrites=true', {useNewUrlParser: true, useUnifiedTopology: true}
  );

  app.listen(3000);
}
catch(err){
  console.log(err);
}