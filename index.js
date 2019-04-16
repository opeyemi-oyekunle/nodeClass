var http = require('http');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var teachers = require('./teachers.js')
var students = require('./students.js')


var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(uploadMessage)
        res.write('<form action="file" method="post" enctype="multipart/form-data">');
        res.write('<label><input type="file" name="file"></label><br>');
        res.write('<button type="submit">Upload File</button>');
        res.write('</form>');
        return res.end();
    }
    else if (req.url == "/students") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(students);
        res.end();
    }
    else if (req.url == "/teachers") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(teachers);
        res.end();
    }
    else{
      if (req.url == '/file') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          console.log(fields);
          var oldpath = files.file.path;
          var newpath = __dirname+'/images/' + files.file.name;
          fs.rename(oldpath, newpath, function (err) {
            if (err) {
              res.write('File failed to upload')
              throw err;
            }
            res.write('File uploaded successfully')
            res.end()
          });
       });
     }else{
       res.end('Invalid Request!');
     }
    }
});
server.listen(6000, ()=>{
  console.log('The server is on port 5000');
});
08139475880
