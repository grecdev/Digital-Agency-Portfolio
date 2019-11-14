"use strict";
// Global functionality

import { ui } from './ui.js';

window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	ui.sliderNavigation(e);

	// Because we check for pages in the ui script file
	if(document.body.contains(document.getElementById('home-page'))) window.history.pushState({}, 'home', 'index.html') 

	e.stopPropagation();

});

ui.disableLetter_input.forEach(input => {

	input.addEventListener('keydown', (e) => {

		ui.disableLetters(e);

		e.stopPropagation();
	});

});