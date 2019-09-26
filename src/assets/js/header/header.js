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

		// Show / Hide modal menu
		ui.header_icon.addEventListener('click', (e) => {

			ui.headerModal(e);

			e.stopPropagation();
		});

		// Show / Hide modal menu
		ui.header_modal.addEventListener('click', (e) => {

			ui.headerModal(e);

			e.stopPropagation();
		});

	}

	return {
		init
	}
})();