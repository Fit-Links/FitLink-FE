#!/bin/bash
cd ../
rm -rf output
mkdir output

shopt -s dotglob

cp -R ./FitLink-FE/* ./output
cp -R ./output ./FitLink-FE/