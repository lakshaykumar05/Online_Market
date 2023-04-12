const userModel = require('../models/user');
const bcrypt = require('bcrypt');

exports.getSignup = (req, res, next) => {

    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
      });
};

exports.postSignup = async (req, res, next) => {

    console.log('post Signup');
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try{
        const user = await userModel.find({email: email});

        if(user.length > 0){
            console.log('login par jao');
            return res.redirect('/auth/login');
        }

        if(password === confirmPassword){
            await userModel.create({name: name, email: email, password: password});
            return res.redirect('/auth/login');
        }
        else{
            return res.redirect('/auth/signup');
        }
    }
    catch(e){
        console.log(e);
    }
};

exports.getLogin = (req, res, next) => {

    console.log('getLogin');
    res.render('auth/login', {
      path: '/auth/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };


exports.postLogin = async (req, res, next) => {

    console.log('Post login');

    const email = req.body.email;
    const password = req.body.password;

    console.log(email);

    try{
        var user = await userModel.find({email: email, password: password});

        console.log(user);

        if(user.length > 0){
            return res.redirect('/admin/products');    
        }

        console.log('User not found');

        return res.redirect('/auth/signup');
        
    }
    catch(err){
        console.log(err);
        return err;
    }

};