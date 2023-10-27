const express = require('express')
var app = express()
const bodyparser=require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var GameModel = require('./Gamemodel');
// const mongoose = require('mongoose')

var Validator = require('validator');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Skybox:19oH5t2sIzC8SrFi@cluster0.n4ds3aw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { 
  serverApi: { 
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// mongoose.connect("mongodb://127.0.0.1:27017/Register2", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });


// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// }); 


app.get('/',(req,res)=>{
    res.end("Hello!!!")
})

app.post('/api/otp',(req,res)=>{
    var otp=req.body.otp
    if(otp==='1234')
    res.send("correct")
    else
    res.send("incorrect");
})

app.post('/api/pass',(req,res)=>{
   
    var username=req.body.username
    var password=req.body.password
    var cpassword=req.body.cpassword
    if(password!=cpassword){
        res.send("Please enter same password in both field")
    }
    else if(!Validator.isStrongPassword(password))
    {
        res.send("password must have min one lowercase,one uppercase,one special,8 characters long")
    }
    else{
        GameModel.findOneAndUpdate({username:username},{password:password}).then(()=>{
            res.send("Password updated")

    })
}



    //  if(password===cpassword ){
    //     GameModel.findOneAndUpdate({username:username},{password:password}).then(()=>{
    //         res.send("Password updated")
    //     })

    // }
    // else{
    //     res.send("Please enter correct password")
    // }

})


app.post('/api/forget',(req,res)=>{

    var username=req.body.username
    GameModel.find({username:username}).then((data) => {
        if(data.length>0)
        {res.send(data[0].gmail)}
        else
        res.send("no")
       
       });

  

       
    
})

app.listen(5000,()=>{
    console.log("server staretd at port 5000")
})

const fs = require('fs');

app.post('/api/register',(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    var fullname=req.body.fullname;
    var gmail=req.body.gmail;
    fs.mkdir('uploads/'+username,(err)=>{

    });



    var newregister = new GameModel({username:username, password:password,fullname:fullname,gmail:gmail})
    newregister.save().then(()=>{
        res.send("registered")
    }).catch((err)=>{
        res.send(err)
    });
    
})
app.post('/api/login',(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;

    if(username.length==0)
    {
        res.send("Please enter username")

    }
    else if(password.length==0)
    {
        res.send("please enter password")
    }

    else{


    GameModel.find({username:username,password:password}).then((data) => {
        if(data.length>0)
        {res.send("success")}
        else
        res.send("Login failed!!!")
       
       });
    }
    
})

app.post('/api/site',(req,res)=>{
    username=req.body.username
    GameModel.find({username:username}).then((data) => {
        res.send(data[0].fullname)
       
       });


})


const multer = require('multer');

const fileSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
  });
  var usern='abc';
  const File = mongoose.model('File', fileSchema);  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+usern+'/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

app.post('/api/upload/user',(req,res)=>{
    usern=req.body.username
})

app.post('/api/upload',upload.array('file',100),(req,res)=>{
    

    
//     const { filename, path } = req.file;

//   const newFile = new File({
//     fileName: filename,
//     filePath: path,
//   });


//   newFile.save().then(()=>{
//     res.send('File uploaded successfully') 
// }).catch((err)=>{
//     res.send(err)
// });
res.send("done")


})

app.post('/api/down',(req,res)=>{
  var down3=req.body.download
  var usern3=req.body.username

    var filePath = 'uploads/'+usern3+'/'+down3;
  res.download(filePath, down3);
  down3=null;
  usern3=null;
 

})
app.post('/api/files',(req,res)=>{
  var usern3=req.body.username

    var filePath = 'uploads/'+usern3;
    fs.readdir(filePath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return res.status(500).send('Error reading directory');
        }
    
        // Filter out directories from the list of files
        const filteredFiles = files.filter((file) => {
          return fs.statSync(filePath + '/' + file).isFile();
        });
    
        res.json(filteredFiles);
      });

})

app.post('/api/delete',(req,res)=>{
  var down3=req.body.download
  var usern3=req.body.username

    var filePath = 'uploads/'+usern3+'/'+down3;
    
    fs.unlink(filePath,(error)=>{
        if (error) {
            res.send('Error: ' + error.message);
          } else 
            res.send('Deleted');

    });
    // fs.access(filePath, (err) => {
    //   if (err) {
    //     res.status(404).send('File not found');
    //   } else {
    //     fs.unlink(filePath, (err) => {
    //       if (err) {
    //         res.status(500).send('Error: ');
    //       } else {
    //         res.send('Deleted'); 
    //       }
    //     }); 
    //   }
    // });
    down3=null;
  usern3=null;
 
}) 



