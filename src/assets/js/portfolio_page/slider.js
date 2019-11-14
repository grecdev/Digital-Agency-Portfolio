"use strict";
// Porfolio page functionality

import { ui } from '../ui.js';

// For portfolio page only ( remove if statement and you will see the error )
if(location.pathname.includes('portfolio')) {
	ui.left_arrow.addEventListener('click', (e) => {
		// Returns the result of the index function
		ui.sliderNavigation(e);

		e.stopPropagation();
	});

	ui.right_arrow.addEventListener('click', (e) => {
		// Returns the result of the index function
		ui.sliderNavigation(e);

		e.stopPropagation();
	});
}