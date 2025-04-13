#!/bin/sh
cd ../

mkdir -p output

cp -R ./FitLink-FE/.[!.]* ./output 2>/dev/null
cp -R ./FitLink-FE/* ./output
cp -R ./output ./FitLink-FE/