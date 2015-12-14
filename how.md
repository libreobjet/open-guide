About this book
===========

This book was initiated by Libre Objet and brought to life by a collective of creators and authors during Interactivos?'15 at Medialab Prado, Madrid.

The co-authors present at Medialab Prado were:

- Gaizka Altuna, architect − http://
- Julien Deswaef, media artist − http://xuv.be
- Mathieu Gabiot, product designer − http://mathieu-g.be/
- Øyvind Kolås, digital media toolsmith − http://pippin.gimp.org/
- Martin Lévêque, product designer − https://www.behance.net/martinleveque


This book is also open source. It is published under the Free Art License 1.3. Which means that if you want to copy it, distribute it or modifiy it, you're more than welcome to do so.

The source files are available at {{ book.meta.source_url }}

You're reading a version that has been compiled on the {{ book.meta.compilation_date }} with Gitbook version {{ gitbook.version }}.

Tools
-------

We used this toolchain of free/libre and open source softwares to bring the book to life:

### Etherpad
Etherpad is a browser based text editor that allows many people to write together in real-time on the same page. http://etherpad.org/

### Markdown
We used the markdown syntax as it is very easy-to-write and easy-to-read plaintext format that can be converted in HTML while keeping this structured. http://daringfireball.net/projects/markdown/

### Bash
Bash is a shell scripting language available on *nix systems. A small bash script was used to download and regularly backup all the texts that were written in etherpads. https://www.gnu.org/software/bash/

### Git
Git, todays's most famous version control system, was used to keep tracks of the text changes and to sync those with an online repository held at Github. http://www.git-scm.com/

### Sparkleshare
Sparkleshare behaves a little like the infamous Dropbox, but uses a git repository as a backend. Created by Hylke Bons, this tool made it easier to sync files and folders between computers, while keeping track of changes and without having anyone to learn how Git works. http://sparkleshare.org/  

### Gitbook-cli
Gitbook-cli is an open source software based on Nodejs that transforms a set of markdown files and folders into different electronic book formats (pdf, epub, mobi, html). https://www.gitbook.com/

### Podofo
Podofo is a PDF manipulation toolbox creatid by Pierre Marchand, member of the open source graphic design studio [OSP](http://osp.kitchen) in Brussels. Podofoimpose was used to produce a different imposition of the pdf for the home printers.

### Fonts
We use these excellent libre fonts in the book:
 - TGL by Peter Wiegel − SIL Open Font License 1.1
 - Open Sans by Steve Matteson − Apache License  2.0

Object
---------

[Steps to build the book at home.]

Pictures
------------
{% for picture in book.pictures %}
  1. {{ picture.list_caption }} − [p{{picture.page_level}}]({{ picture.backlink }})
{% endfor %}

