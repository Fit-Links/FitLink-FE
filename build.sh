#!/bin/sh
cd ../
# Ensure a clean slate
mkdir output

# Copy necessary content to the output directory
cp -R ./FitLink-FE/* ./output
cp -R ./output ./FitLink-FE/
