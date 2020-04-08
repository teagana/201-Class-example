var User = require('../../models/users');
var Helper = require('../../helper');
var Promise = require('bluebird')
var _ = require('lodash')
const express = require('express')
const router = express.Router()


/*
  "/v2/signin"
  POST: Api call to sign in from the app
*/
router.post('/signin', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: {
      $regex: "^" + email + "$", $options: 'i'
    }
  })
  .then(function(user) {
    if (user) {
      if(user.disabled) {
        res.json({
          success: false,
          message: "Your profile is not active. Please contact to system administrator."
        });
      }

      if(user.passwordHash === "" && user.passwordSalt === "") {
        user.passwordSalt = user.makeSalt();
        user.passwordHash = user.encryptPassword(password);
        user.lastLoginDate = new Date();
        user.loginsessions.push(new Date());
        user.save().then(function(u) {
          if(user.authenticate(password)) {
            user = user.toJSON();
            delete user.passwordHash;
            delete user.passwordSalt;
            var token = Helper.createJwt({
              id: user._id,
              createdAt: new Date()
            });

            res.json({
              success: true,
              message: "Login successfull.",
              user: {
                providerID: "",
                uid: user._id,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                phoneNumber: user.phoneNumber,
                tags: user.tags,
                color: user.color,
                community: user.community,
                token: token
              }
            });
          } else {
            res.json({
              success: false,
              message: "Invalid Email or Password."
            });
          }
        })
      } else if(user.authenticate(password)) {
        user.lastLoginDate = new Date();
        user.loginsessions.push(new Date())
        user.save();
        user = user.toJSON();
        delete user.passwordHash;
        delete user.passwordSalt;
        var token = Helper.createJwt({
          id: user._id,
          createdAt: new Date()
        });
        res.json({
          success: true,
          message: "Login successfull.",
          user: {
            providerID: "",
            uid: user._id,
            displayName: user.color,
            email: user.email,
            tags: user.tags,
            color: user.color,
            community: user.community,
            token: token
          }
        });
      } else {
        res.json({
          success: false,
          message: "Invalid Email or Password."
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Email or Password."
      });
    }
  });
})

