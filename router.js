var formidable = require ('formidable');
var fs = require('fs'); 
var bodyParser= require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var zlib =require('zlib');
var os =require('os');

module.exports = function(app){

	app.get('/',function(req,res){

		res.render('index')
	});
	app.get('/success',function(req,res){

		res.render('success');
	});
	app.get('/upload',function(req,res){

		res.render('index');
	});
	

	app.post('/upload',urlencodedParser,function(req,res){
	var form = new formidable.IncomingForm(); 
	form.parse(req, function(err, fields, files) {
		if(err){
			console.error(err)
		}
	     

	var oldpath=files.upload.path;
	var newpath = os.homedir() + '/' + files.upload.name;

	console.log(newpath);
	fs.rename(oldpath, newpath, function(err) { 
		if (err) throw err;
	     
	   console.log('path changed');
	    }) 
	//console.log(files);

	var readStream =fs.createReadStream(newpath);
	var zippedFileName=files.upload.name + '.gz';
	var writeStream =fs.createWriteStream(zippedFileName);
	var zip = readStream.pipe(zlib.createGzip());
	zip.pipe(writeStream);

	console.log('file compressed');

	fs.unlink(newpath);
	//var oldpath=files.upload.name + '.gz';

	var newpath=os.homedir() + '/' + 'Desktop' +'/' + files.upload.name + '.gz' ;

	fs.rename(__dirname + '/' + zippedFileName, newpath, function(err) { 
		if (err) throw err;
	      
	   }) 

		res.redirect(303, 'success');
		//res.render('success');

			})
			
		}); 

	}
