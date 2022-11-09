#!/bin/bash
git pull
npm install

wget -O docs-mbl.html https://raw.githubusercontent.com/mathebuddy/mathebuddy-compiler/main/README.html
wget -O docs-smpl.html https://raw.githubusercontent.com/mathebuddy/mathebuddy-smpl/main/README.html
wget -O docs-sim.html https://raw.githubusercontent.com/mathebuddy/mathebuddy-simulator/main/README.html

#old: ./makedoc.sh
