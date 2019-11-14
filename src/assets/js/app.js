"use strict";
// Main script file

/* 
	For development:
	1. SASS > CSS
	2. CSS > JS
	3. JS > DOM

	For production:
	1. SASS > CSS
	2. CSS > JS
	3. CSS > CSS.min and link in html file
*/ 
import "../css/style.scss";

// Fetch for Safari 6.1+ / Internet Explorer 10+ => https://github.com/github/fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import './global.js';
import './header/header.js';
import './portfolio_page/slider.js';
import './contact_page/contact.js';