var express = require('express');
var cors = require('cors');
require('dotenv').config()
//edited till...
/*var bodyParser=require('body-parser');
var bodyParserMiddleware=bodyParser.urlencoded({extended:true});*/
var multer=require('multer');
var mUpload=multer();//no path ==> only memory storage.

//...till HERE.
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
//edited till...
//app.use(bodyParserMiddleware);
app.use(express.urlencoded({extended:true}));
//...till HERE.
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
//edited till...
app.post('/api/fileanalyse',mUpload.single('upfile'),
(req,res)=>{
  //console.log('req body:'+JSON.stringify(req.body));
  let rcvfile=req.file;
  //console.log('req file:'+JSON.stringify(req.file));
  res.send({
    'name':rcvfile['originalname'],
    'type':rcvfile['mimetype'],
    'size':new Number(rcvfile['size'])
  });
});
//...till HERE.



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
