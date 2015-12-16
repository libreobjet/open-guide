#!/bin/bash

# Run this from the root of the project

EXPORT_FOLDER="exports"
FILENAME="open-guide"

echo "Creating EPUB from Markdown files"
gitbook epub ./ ./$EXPORT_FOLDER/$FILENAME.epub

echo "Creating MOBI from Markdown files"
gitbook epub ./ ./$EXPORT_FOLDER/$FILENAME.mobi

echo "Creating PDF from Markdown files"
gitbook pdf ./ ./$EXPORT_FOLDER/$FILENAME.pdf
echo "Converting PDF"
gs -o ./$EXPORT_FOLDER/$FILENAME-outlines.pdf -dNoOutputFonts -sDEVICE=pdfwrite ./$EXPORT_FOLDER/$FILENAME.pdf
podofoimpose ./$EXPORT_FOLDER/$FILENAME-outlines.pdf ./$EXPORT_FOLDER/$FILENAME-DIY.pdf impositions/Booklet-LO.plan
echo "Done"
