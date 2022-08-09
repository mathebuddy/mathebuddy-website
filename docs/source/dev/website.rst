************
Website
************

The code of this website is located at `GitHub <https://github.com>`_ in the repository `mathebuddy-website <https://github.com/mathebuddy/mathebuddy-website>`_.

Requirements
============

The following dependencies must be installed:

- Apache2 Webserver:

    ``apt install apache2``

    Other webservers should also work, but we did not test it.

- NodeJS:

    ``apt install nodejs npm``

    Check if your Linux distribution installs an old version of NodeJS by running the following command. In this case, consider alternative installation methods.
    
    ``node --version``

- Python3:

    ``apt install python3 pip``

    This dependency is needed for the generation of the documentation.

- Sphinx:

    ``pip3 install sphinx sphinx_rtd_theme``

    The documentation is written in the `reStructuredText` (rst) file format and translated with `Sphinx <https://www.sphinx-doc.org>`_.



Run `npm install` to install the node packages:

- ``@fortawesome/fontawesome-free`` provides icons
- ``axios`` allows comfortable HTTP requests
- ``bootstrap`` is used for the layout
- ``showdown`` translates the blog from Markdown files to HTML at runtime


Coding
======

You'll find settings and preferences for VS Code in the repository, but also other IDEs are feasible.


Testing
=======

The website can be tested locally by running ``npm run webserver`` in a terminal. The link to localhost with port number is listed. Open it in your favorite browser.


Write new Blog Entries
======================

Read file ``blog/README.txt``.


Update the Documentation
========================

The documentation is written in the `reStructuredText` (rst) file format and translated with `Sphinx <https://www.sphinx-doc.org>`_.

All sources, including images, can be found in ``docs/source`` of the website-repository.

Run ``./makedocs.sh`` to update the documentation. Note that ``.gitignore`` excludes the generated HTML files in the repository. After testing on a local machine, run ``./makedocs.sh`` also in the hosting environment.


Hosting
=======

Currently, the website is hosted at `<https://app.f07-its.fh-koeln.de>`_ (TH Köln) in a Oracle Xen VM with 64 GiB virtual disk space, 4 CPU cores and 16 GiB RAM.
