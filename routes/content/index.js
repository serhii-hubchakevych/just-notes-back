const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"

router.put('/', verifyToken, ( req, response ) => {
    const updateData = { $set: req.body };
    jwt.verify(req.token, 'secretkey', (err)=> {
      if(err){
        response.sendStatus(403);
      } else {
        MongoClient.connect(uri, function(err, client) {
          if(err) {
              console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
          }
          const contentCollection = client.db("JustNotes").collection("ContentCollection");
                    contentCollection.find({}).toArray(function(err, result){
                      if (err) throw err;      
                      contentCollection.updateOne(result[0], updateData, function(err, res) {
                        if (err) throw err;
                            response.sendStatus(200)
                        client.close();
                    });
                })
        });
      }
    }) 
 
})
router.get('/', ( req, res ) => {
    MongoClient.connect(uri, function(err, client) {
      if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      }
      client.db("JustNotes").collection("ContentCollection").find({}).toArray(function(err, result){
        if (err) throw err;
        res.send(result[0])
      })
    })
})

function verifyToken( req, res, next ){
  const bearerHeader = req.headers['authorization']

  if ( typeof bearerHeader !== 'undefined' ){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}

module.exports = router;