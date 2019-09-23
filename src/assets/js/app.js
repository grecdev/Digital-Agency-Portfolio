"use strict";
// Main script file

import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import { showcaseFunctionality } from './showcase/showcase.js';

showcaseFunctionality.init();