const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"

router.post('/', ( req, resp ) => {
    MongoClient.connect(uri, function(err, client) {
      if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      }
      client.db("JustNotes").collection("AdminCollection").findOne({login:req.body.login, password:req.body.password}, function(err, result) {
        if (err) throw err;
          if (result === null){
              resp.send(false)
          } else {
            client.db("JustNotes").collection("ContentCollection").find({}).toArray(function(err, result){
              if (err) throw err;
              resp.send(result[0])
            })
          }
        client.close();
      });
    });
})

module.exports = router;