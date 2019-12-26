const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"

router.put('/', ( req, res ) => {
    MongoClient.connect(uri, function(err, client) {
      if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      }
      let myobj = { $set: req.body };
      const contentCollection = client.db("JustNotes").collection("ContentCollection");
                contentCollection.find({}).toArray(function(err, result){
                  if (err) throw err;      
                  contentCollection.updateOne(result[0], myobj, function(err, res) {
                    if (err) throw err;
                        res.send('Succes')
                    client.close();
                });
            })
    });
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
module.exports = router;