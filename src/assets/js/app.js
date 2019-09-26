"use strict";
// Main script file

import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import { showcaseFunctionality } from './showcase/showcase.js';
import { globalFunctionality } from './global.js';
import { headerFunctionality } from './header/header.js';

showcaseFunctionality.init();
globalFunctionality.init();
headerFunctionality.init();