"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (() => {

	function init() {
		
		// Event Listeners
		document.addEventListener('DOMContentLoaded', load);

		// Function Helpers
		function load(e) {

			// Disable showcase animations on mobile devices
			ui.movingCursorAnimate(e);

			e.stopPropagation();
		}
		
	}

	return {
		init
	}
})();