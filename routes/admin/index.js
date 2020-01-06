const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"

router.post('/', ( req, res ) => {
    const login = req.body.login;
    MongoClient.connect(uri, function(err, client) {
      if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
      }
      client.db("JustNotes").collection("AdminCollection").findOne({login:req.body.login, password:req.body.password}, function(err, result) {
        if (err) throw err;
          if (result === null){
              res.sendStatus(403)
          } else {
            client.db("JustNotes").collection("ContentCollection").find({}).toArray(function(err, result){
              if (err) throw err;
              const resultWithToken = result;
              jwt.sign({ login: login }, 'secretkey', (err, token)=> {
                if(err) {
                  console.log('Error occurred while generating token...\n', err);
                }
                resultWithToken.push(token);
                res.send(resultWithToken)
              })
            })
          }
        client.close();
      });
    });
})



module.exports = router;