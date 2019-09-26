"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (() => {

	function init() {
		
		window.addEventListener('scroll', (e) => {

			ui.scrollFunctionality(e);

			e.stopPropagation();
		});

	}

	return {
		init
	}
})();