Android Image Tool 
===================

A Node.js + ImageMagick script for resizing images for Android apps.

## How to Use
On your Mac OS:

Install [ImageMagick for Node.js](https://github.com/rsms/node-imagemagick).

```
npm install imagemagick
```

[ImageMagick for Node.js](https://github.com/rsms/node-imagemagick) requires ImageMagick CLI tools to be installed. There are numerous ways to install them. For instance, if you're on OS X you can use Homebrew:

```
brew install imagemagick
```

go to this project root folder

```
npm install 
```

The command will download project dependencies.
Run this script in a directory with some images.

```
node app.js
```

Enter starting image height when prompted. (Remember use expected xxxhdpi image height)

```
Enter image height size: 144 
```

An res.zip would be an output from the command above. this one contains your drawable folders. You can copy these folders to your android res folder.

## References

Android Image Resizer by mattlogan

https://github.com/mattlogan/AndroidImageResizer

## What's next

A website for upload your images and download the res folder once resized 

## License

The MIT License (MIT)

Copyright (c) 2016 Tuan Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
