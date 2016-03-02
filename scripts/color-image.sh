#!/bin/bash

# Colorize images

COLOR="#247940"
INPUT="$1"
OUTPUT="$2"

# Allocate disk space for images
# env MAGICK_TMPDIR="/tmp/imagemagecktmp"
convert "$INPUT"  \
        -resize 1920x1920 \
        -blur 1x1 -unsharp 0x2.5 \
        -set colorspace sRGB -separate -seed 1000 -attenuate .8 +noise Multiplicative -combine \
        -colorspace HSL -channel B -separate \
        -level 5% \
        \( \
           -clone 0 \
           -fill $COLOR -colorize 100 \
        \) \
        \( \
           -clone 0 \
           -fill "#FFFFFF" -colorize 100 \
        \) \
        \( \
           -clone 1,2,0 -composite \
        \) \
         -delete 0,1,2 \
      "$OUTPUT"

exit
