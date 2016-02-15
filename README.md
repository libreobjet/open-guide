Diverted Derived Design
=======================

These are the source files of a collectively written book today called _Diverted Derived Design_ (formerly _Guía abierta a objetos abiertos_).
This was a project part of [Interactivos?'15 at Medialab Prado, Madrid](http://comunidad.medialab-prado.es/en/groups/open-guide-open-objects).

> We hope that this book can be a base for teaching and learning about open source product design; a collective understanding of what one should know today to get started and join the movement; a reference students, amateurs and educators can have in their back pocket when they go out to explain what they are passionate about.

This book is [on display in an exhibition](http://medialab-prado.es/article/exposicion-objetos-comunes) called _Objetos Comunes_ until March 31, 2015 at Medialab Prado.

License
-----------
[Free Art License 1.3](http://artlibre.org/licence/lal/en/)

Further collaboration
---------------------
### Legal
We would appreciate if any lawyer specialized in IP rights could have a look at these questions: https://xuv.titanpad.com/5

### Illustration / Graphic design
Any graphic designer or illustrator willing to give a hand making this book beautiful. We would appreciate.

### Translations
If you find this book worth reading and sharing, there might be people in your community that could benefit from a native language translation.
If you'd like to join a team of translators, please contact us at hello@libreobjet.org

Looking for more translators in these languages:
- Euskadi
- Español (See [Walter's fork](https://github.com/walterreiner/open-guide/) )
- Català
- Français

Build
-----

If you wish to build this book yourself, you will need Grunt, Gitbook, Calibre and ImageMagick.

Grunt handles the building of the different files.  
A [special version of Gitbook](https://github.com/xuv/gitbook) is used, mainly to better handle fonts in the pdfs.  
Calibre is required by Gitbook to make pdfs, epub and mobi.  
Imagemagick is used to compress the images for the web version of the book.  

All the following instructions are for Linux (Debian family) but could easily be adapted for any system.

### Install software
First, you need to have Git, NodeJs and Imagemagick installed.  
```
sudo apt-get update
sudo apt-get install git nodejs npm imagemagick
```

If you want to make PDF, Ebook and MOBI versions of the book, you will also need Calibre. Please follow the [official instructions to install Calibre](http://calibre-ebook.com/download) on your system. This is not necessary if you just wish to see the book in a browser.

### Install components
Next, we'll install some Nodejs components to make the book.
Create a directory for the project and go into that directory.  
```
mkdir libre-objet-book
cd libre-objet-book
```

Install Gitbook software:
```
npm install gitbook-cli -g
```

Copy our modified version of the Gitbook files (we hope to use the official ones in the future, but until some options have been added, you need to use this one):
```
git clone https://github.com/xuv/gitbook.git
```
Tell Gitbook software to use our version:
```
gitbook versions:link ./gitbook
```
Then finally, download the book source files:
```
git clone https://github.com/libreobjet/open-guide
```

### Building the book
To view the book in a browser, go into the `open-guide` folder and lauch gitbook.
```
gitbook serve
```
The book should now be accessible at the address: http://localhost:4000  
Press `CTRL+c` to stop the Gitbook server.

If you have Calibre installed, you can type this to generate a PDF :
```
gitbook pdf
```
It will be available in the `open-guide` folder with a name like `book_en.pdf` for english, etc.
