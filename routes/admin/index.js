const express = require('express');
const router = express.Router();

router.post('/', ( req, resp ) => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://serhii_hubchakevych:Lenovo1997@justnotescluster-7lzef.gcp.mongodb.net/JustNotes?retryWrites=true&w=majority"
    MongoClient.connect(uri, function(err, client) {
      if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      }
      const collection = client.db("JustNotes").collection("AdminCollection");  
      collection.findOne({login:req.body.login, password:req.body.password}, function(err, result) {
            if (err) throw err;
              if (result === null){
                  resp.send(false)
              } else {
                const contentCollection = client.db("JustNotes").collection("ContentCollection");
                contentCollection.find({}).toArray(function(err, result){
                  if (err) throw err;
                  resp.send(result[0])
                })
              }
            client.close();
          });
        });
})

module.exports = router;