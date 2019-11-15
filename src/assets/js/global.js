"use strict";
// Global functionality

import { ui } from './ui.js';

window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	ui.sliderNavigation(e);

	// For mobile devices disable header animation
	if(window.matchMedia('(max-width: 1025px').matches) ui.header.classList.add('header-fixed')

	e.stopPropagation();

});

ui.disableLetter_input.forEach(input => {

	input.addEventListener('keydown', (e) => {

		ui.disableLetters(e);

		e.stopPropagation();
	});

});

if(document.body.contains(ui.resetScroll_btn)) {

	ui.resetScroll_btn.addEventListener('click', (e) => {

		ui.resetScroll(e);

		e.stopPropagation();
	});

}