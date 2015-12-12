#!/bin/bash

OUTPUT_PDF="open-guide.pdf"
OUTPUT_PDF_DIY="open-guide_DIY.pdf"

echo "Creating PDF from Markdown files"
gitbook pdf ./ ./$OUTPUT_PDF
echo "Converting PDF"
gs -o book-outlines.pdf -dNoOutputFonts -sDEVICE=pdfwrite $OUTPUT_PDF
podofoimpose book-outlines.pdf $OUTPUT_PDF_DIY Booklet-LO.plan
echo "Done"
