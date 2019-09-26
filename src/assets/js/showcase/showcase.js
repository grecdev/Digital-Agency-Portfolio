"use strict";
// Showcase section functionality

import { ui } from '../ui.js';

export const showcaseFunctionality = (() => {

	function init() {

		// Event Listeners
		// After the intro animation ends enable the event listener
		setTimeout(() => {

			// Move shapes on cursor move listener
			ui.showcase.addEventListener('mousemove', (e) => {

				// Move shapes on cursor move
				ui.movingCursorAnimate(e);

				e.stopPropagation();
			});

		}, 2000);

	}

	return {
		init
	}
})();