"use strict";
// Porfolio page functionality

import { ui } from '../ui.js';

export const portfolioFunctionality = (() => {

	function init() {

		// We set here the starting index so the value is -1 only once
		// If we set it in the event listener the variable will be reseted after each click
		let nextIndex = -1;

		function index() {
			// Increment the testimonial box index
			if(nextIndex <= 3) nextIndex++
			else if(nextIndex >= 3) nextIndex = 0

			return nextIndex;
		}

		ui.left_arrow.addEventListener('click', (e) => {
			
			// Returns the result of the index function
			ui.sliderNavigation(e, index);

			e.stopPropagation();
		});

		ui.right_arrow.addEventListener('click', (e) => {
			
			// Returns the result of the index function
			ui.sliderNavigation(e, index);

			e.stopPropagation();
		});

	}

	return {
		init
	}
})();