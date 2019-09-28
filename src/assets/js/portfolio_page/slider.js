"use strict";
// Porfolio page functionality

import { ui } from '../ui.js';

export const portfolioFunctionality = (() => {

	function init() {

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

	return {
		init
	}
})();