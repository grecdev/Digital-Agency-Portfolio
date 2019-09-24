"use strict";
// Header functionality

import { ui } from '../ui.js';

export const headerFunctionality = (() => {

	function init() {

		// Event Listeners
		ui.header.addEventListener('mousemove', (e) => {

			// Move shapes on cursor move
			ui.movingCursorAnimate(e);

			e.stopPropagation();
		});
	}

	return {
		init
	}
})();

// // Close modal icon
// document.querySelector('[data-toggle-menu="show"').addEventListener('click', (e) => {

// 	e.currentTarget.childNodes[1].classList.toggle('close-test');

// 	e.stopPropagation();
// });