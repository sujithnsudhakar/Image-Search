const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')
const app = express();


//Configure middleware using bodyParser
app.use(bodyParser.urlencoded({extended:true}))

const mongoose = require('./database/mongoose')



const List = require('./database/models/list');
const User = require('./database/models/user');

//substitute to body-parser
var busboy = require('connect-busboy');
app.use(busboy()); 

/*Enable json parsing, substitution of body parser*/
app.use(express.json());

//Store in local storage after filtering the file types to image --Start
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }
  
   }
  
 var upload = multer({ 
     storage:storage,
     limits:{
         fileSize: 1024 * 1024 * 5
     },
     fileFilter:fileFilter
  });
//Store in local storage after filtering the file types to image --End

/*CORS Cross origin resource sharing
localhost:3000 - backend api
localhost:4200 - frontend
*/ 
app.use(cors());
app.get('/',(req,res)=>{
    res.sendFile(__dirname,'../frontend/index.html');
});
app.post("/fileupload",upload.single('image'),function(req,res,next){
    const filename=req.file.filename;
    res.json({
        message:"Image Uploaded Successfully",
        filename:filename
    });
})
/*app.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});*/

//Configuring the upload file route
/*app.post('/fileupload',upload.single('file'),(req,res,next) => {
    console.log("Inside upload file method")
    const file = req.file;
    if(!file){
        const error = new Error("Please upload a file");
        errorhttpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});*/

/*
Endpoint requirements for image retrieval-can be updated later
List: fetch list of images,post one image to find matches
User: create user record with click counts
*/

app.get('/lists',(req,res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
});
app.post('/postimage',(req,res) => {
    //Send the control to run python script, now simply add metadata into db to fetch
    new List({'title': req.body.title,'path': req.body.path,'imgtype': req.body.imgtype})
    //new List({'title': req.body.title})
    .save()
    .then((list) => res.send(list))
    .catch((error)=>console.log(error));
});
//Test method, we will pass one image id from UI to fetch matches
app.get('/lists/:listId',(req,res) => {
    List.find({ _id: req.params.listId})
        .then((list) => res.send(list))
        .catch((error) => console.log(error))
})
//Tag the image searched to the userId
app.post('/lists/:listId/users',(req,res)=>{
    (new User({'name':req.body.name,
    'clicks':req.body.clicks,
    '_listId': req.params.listId
    }))
    .save()
    .then((user) => res.send(user))
    .catch((error)=>console.log(error))    
})

app.listen(3000,() =>{console.log("Server sonnected to port 3000")});