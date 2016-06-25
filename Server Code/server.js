var express=require('express'); 
var app=express(); 
var mongoose = require('mongoose');


///
//
/*
mongoose.connect("mongodb://ravi_gandhi-chatapp-3374706:27017");
var ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

// create a model from the chat schema
var Chat = mongoose.model('Chat', ChatSchema);

// allow CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//
///
*/
var geohash = require("geohash").GeoHash;


var server =require('http').createServer(app); 

var io =require('socket.io')().listen(server); 

io.on("connection",function(socket){
  
  console.log("New client is connected");
  socket.on("disconnect",function(){
    console.log("Client has been disconnected");
    });
    
    socket.on("Message",function(data){
      console.log(data.message);
      io.emit("Message",data); 
    });
      
     
     
     
     socket.on("map", function(data){
       var messags=[]; 
       console.log(data);
       //  var mygh= geohash.encodeGeoHash(data.lat, data.lng );
        //console.log(mygh)
        var lat1=data.lat;
        var lon1=data.lon;
        //Looping through other points for checking the distance
          var numberOfpts = 0;
          for(var i=0;i<messags.length;i++)
          {
              if(messags[i].sender != null)
              {
                var lat2 = messags[i].lat;
                var lon2 = messags[i].lon;
                //Distance between two points 
                var R = 3958.7558657440545; // Radius of earth in Miles 
                var dLat = (lat2-lat1)* Math.PI / 180;
                var dLon = (lon2-lon1)* Math.PI / 180; 
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos((lat1)*Math.PI / 180) * Math.cos((lat2)*Math.PI / 180) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2); 
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                var d = R * c * 1.609;
                console.log(d);
                if(d>50)
                {
                //add these to chatroom for verification..
                }
                numberOfpts++;
              }
          }
          console.log(numberOfpts);
           messags.push(data); 
           console.log(messags.sender+" its pushed");
        
     
        
       
    });
      
  
}) 
      
      server.listen(process.env.PORT,function(){
        console.log("listening on PORT "+process.env.PORT); 
      })