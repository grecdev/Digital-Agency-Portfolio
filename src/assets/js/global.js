"use strict";
// Global functionality

import { ui } from './ui.js';

window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	ui.sliderNavigation(e);

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