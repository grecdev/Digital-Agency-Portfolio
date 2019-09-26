"use strict";
// Header functionality

import { ui } from '../ui.js';

export const headerFunctionality = (() => {

	function init() {

		// Event Listeners
		// Show / Hide modal menu
		ui.header_icon.addEventListener('click', ui.headerModal);

		// Show / Hide modal menu
		ui.header_modal.addEventListener('click', ui.headerModal);

	}

	return {
		init
	}
})();