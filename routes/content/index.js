const express = require('express');
const router = express.Router();

router.put('/', ( req, resp ) => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"
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
                        resp.send('Succes')
                    client.close();
                });
            })
    });
})

module.exports = router;