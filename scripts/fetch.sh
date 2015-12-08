#!/bin/sh

echo "Fetching Definitions"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/30/latest?format=txt -O definitions.md
echo "Fetching Licenses"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/31/latest?format=txt -O licences.md
echo "Fetching Motivations"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/32/latest?format=txt -O motivation.md
echo "Fetching Distributions"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/33/latest?format=txt -O distribution.md
echo "Fetching Economics"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/34/latest?format=txt -O economics.md
echo "Fetching Designing"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/35/latest?format=txt -O designing.md
echo "Fetching Meta/Links"
wget -q https://mathieugabiot.titanpad.com/ep/pad/export/39/latest?format=txt -O README.md
echo "Fetching Glossary"
wget -q https://xuv.titanpad.com/ep/pad/export/1/latest?format=txt -O GLOSSARY.md
echo "Fetching Introduction"
wget -q https://xuv.titanpad.com/ep/pad/export/2/latest?format=txt -O introduction.md

echo "Done."
