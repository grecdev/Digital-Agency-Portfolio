"use strict";
// Main script file

import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import { globalFunctionality } from './global.js';
import { headerFunctionality } from './header/header.js';
import { portfolioFunctionality } from './portfolio_page/slider.js';

globalFunctionality.init();
headerFunctionality.init();
portfolioFunctionality.init();