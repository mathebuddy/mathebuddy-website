#!/bin/bash

# pip3 install sphinx sphinx_rtd_theme

rm -rf docs/build/
sphinx-build -b html docs/source docs/build/
