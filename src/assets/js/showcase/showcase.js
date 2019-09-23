"use strict";
// Showcase section functionality

import { ui } from '../ui.js';

export const showcaseFunctionality = (() => {

	function init() {

		// After removing the transition intro animation enable the event listener
		setTimeout(() => {
			// Move shapes on cursor move
			ui.showcase_container.addEventListener('mousemove', (e) => {

				// Move shapes on cursor move
				ui.moveThings(e);

				e.stopPropagation();
			});
		}, 2000);

		// After the moving animation ends remove the transition
		setTimeout(() => {
			document.querySelectorAll('.shape-animation').forEach(shape => {

				shape.classList.remove('intro-transition');
				shape.classList.add('moving-animation');

			});
		}, 2000);
		
	}

	return {
		init
	}
})();