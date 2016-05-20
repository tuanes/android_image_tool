var fs = require('fs');
var path = require('path');
var imagemagick = require('imagemagick');
var readline = require('readline');
var EasyZip = require('easy-zip').EasyZip;

var sizeNames = ['xxxhdpi', 'xxhdpi', 'xhdpi', 'hdpi', 'mdpi', 'ldpi'];
var multipliers = [4.0, 3.0, 2.0, 1.5, 1, 0.75];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var imageFiles = [];

var currentImageSize = "xxxhdpi";
var smallestImageSize = "ldpi";
var heightSize = 128;
function askUserForCurrentSize() {
  rl.question("Enter image height size : ",
  function(inputString) {
    heightSize = parseInt(inputString);
    makeDirectories();
  });
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
function makeDirectories() {
  console.log("Making directories...");
  var startIndex = sizeNames.indexOf(currentImageSize);
  var endIndex = sizeNames.indexOf(smallestImageSize);
  deleteFolderRecursive("res");
  fs.mkdirSync("res");
  for (var i = startIndex; i <= endIndex; i++) {
    fs.mkdirSync("res/drawable-"+sizeNames[i]);
  }
  populateImageFiles();
}

function populateImageFiles() {
  console.log("Finding image files...");
  var currentDirectory = process.cwd();
  var allFiles = fs.readdirSync(currentDirectory);  
  for (var i = 0; i < allFiles.length; i++) {
    var extname = path.extname(allFiles[i]);
    if (extname == '.jpg' || extname == '.jpeg' || extname == '.png') {
      imageFiles.push(allFiles[i]);
    }
    if (i == allFiles.length - 1) {
      console.log("Resizing all images...");
      resizeToLargeSize(0,0);
    }
  }
}
function resizeToLargeSize(fileIndex) {
  imgHeight = 0;
  console.log(imageFiles[fileIndex]);
  imagemagick.identify(imageFiles[fileIndex], function(err, features){
    if (err) throw err
    imgHeight = features.height;
    imagemagick.convert(
        [imageFiles[fileIndex], '-resize', heightSize*100/imgHeight + "%",
        imageFiles[fileIndex]],
        function() {
          if (fileIndex < imageFiles.length-1) {
            resizeToLargeSize(fileIndex + 1);
          } else {
            console.log("Normalize done.");
            resize(0, 0);
          }
        });
  });
}

function resize(fileIndex, sizeIndex) {
  imagemagick.convert(
      [imageFiles[fileIndex], '-resize', getPercentString(sizeNames[sizeIndex]),
      getPath(fileIndex, sizeIndex)],
      function() {
        if (sizeIndex < sizeNames.length) {
          resize(fileIndex, sizeIndex + 1);
        } else if (fileIndex < imageFiles.length) {
          resize(fileIndex + 1, 0);
        } else {
          zipFolders();
          console.log("zipped images to file res.zip");
          process.exit(0);
        }
      });
}
function zipFolders(){
  var zip2 = new EasyZip();
  var arr = [];
  zip2.zipFolder('res',function(){
    zip2.writeToFile('res.zip');
  });
}
function getPath(fileIndex, sizeIndex) {
  return "res/drawable-"+sizeNames[sizeIndex] + '/' + imageFiles[fileIndex];
}

function getPercentString(sizeName) {
  return getPercent(sizeName) * 100 + '%';
}

function getPercent(sizeName) {
  return multipliers[sizeNames.indexOf(sizeName)] / multipliers[sizeNames.indexOf(currentImageSize)];
}

askUserForCurrentSize();

