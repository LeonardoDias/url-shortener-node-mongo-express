const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const baseConverter = require('./baseConverter');

// grab the url model
const Url = require('./models/url');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/shorten', function(req, res){
  let longUrl = req.body.url;
  let shortUrl = '';

  const re = new RegExp("^https?://", "i");
  const match = re.test(longUrl);

  if (!match) {
    longUrl = "http://"+longUrl;
  }

  // check if url already exists in database
  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.webhost + doc.hashString;

      // the document exists, so we return it without creating a new entry
      res.send({'shortUrl': shortUrl});
      return;
    }
  });

  // since it doesn't exist, let's go ahead and create it:
  let hashAlreadyExists;
  let hashString = baseConverter.generateHashString(6, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  do{
    Url.findOne({hashString}, function (err, doc){
      if(err) {
        console.log(err)
        res.send(500)
        return
      } else if (doc) {
        hashAlreadyExists = true
      } else {
        hashAlreadyExists = false
      }
    })
  } while(hashAlreadyExists);
  
  const newUrl = Url({
    long_url: longUrl,
    hashString: hashString
  });
  
  // save the new link
  newUrl.save(function(err) {
    if (err){
      console.log(err);
      res.send(500)
    } else {
      shortUrl = config.webhost + hashString;
      res.send({'shortUrl': shortUrl});
    }
  });

});

app.get('/:hashString', function(req, res){

  const hashString = req.params.hashString;

  if (hashString) {
    Url.findOne({hashString}, function (err, doc){
      if (err) {
        console.log(err)
        res.send(500)
      } else if(doc) {
        res.redirect(doc.long_url)
      } else {
        res.send(404)
      }
    })
  }
});

app.get('/decode/:hashString', (req, res) => {

  const hashString = req.params.hashString;

  console.log(`request received ${JSON.stringify(req.params)}`)

  if (hashString) {
    Url.findOne({hashString}, function (err, doc){
      if (err) {
        console.log(err)
        res.status(500)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      } else {
        res.send(404)
      }
    })
  }

});

var server = app.listen(4000, function(){
  console.log('Server listening on port 3000');
});
