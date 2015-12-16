#!/bin/bash

# Run this from the root of the project

EXPORT_FOLDER="exports"
OUTPUT_PDF="open-guide.pdf"
OUTPUT_PDF_DIY="open-guide_DIY.pdf"

echo "Creating EPUB from Markdown files"
gitbook epub ./ ./$EXPORT_FOLDER/open-guide.epub

echo "Creating MOBI from Markdown files"
gitbook epub ./ ./$EXPORT_FOLDER/open-guide.mobi

echo "Creating PDF from Markdown files"
gitbook pdf ./ ./$EXPORT_FOLDER/$OUTPUT_PDF
echo "Converting PDF"
gs -o ./$EXPORT_FOLDER/book-outlines.pdf -dNoOutputFonts -sDEVICE=pdfwrite ./$EXPORT_FOLDER/$OUTPUT_PDF
podofoimpose ./$EXPORT_FOLDER/book-outlines.pdf ./$EXPORT_FOLDER/$OUTPUT_PDF_DIY impositions/Booklet-LO.plan
echo "Done"
