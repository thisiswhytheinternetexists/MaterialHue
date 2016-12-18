# Simple readme, copy pasted from Angular Material-Start.

# Angular Material-Start (ES6)
##### Getting Started

This project uses [jspm.io](http://jspm.io), a package manager for SystemJS which is built on top
of the dynamic ES6 module loader. This allows developers to load any module format (ES6, CommonJS,
AMD, and globals).

###### Prerequisites

This project assumes that you have NodeJS and any relevant development tools (like XCode) already
installed.
 
###### Getting Started

Clone this repository and execute the following commands in a terminal:

* `git checkout master`
* `npm install`
* `npm run serve`

> **Note:** Open the dev console to see any warnings and browse the elements.

###### Layout

You will notice a few files/directories within this project:

 1. `app/src` - This is where all of your application files are stored.
 2. `app/assets` - This folder contains some tutorial-provided images and icons which are used by
    the application.
 3. `index.html` - The entry point to your application. This uses System.js to load the
    `app/src/boot/boot.js` bootstrap file which in turn loads the `app/src/app.js` file that imports
     all of your dependencies and declares them as Angular modules, and configures the icons and
     theming for the application.

##### Libraries/projects (ab)used to hack this together:
https://github.com/peter-murray/node-hue-api
https://github.com/angular/material-start