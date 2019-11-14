"use strict";

import { ui } from '../ui.js';

// Contact page functionality
if(location.pathname.includes('contact')) {
	
	ui.form.addEventListener('submit', (e) => {

		ui.regexValidation(e);
		
		e.preventDefault();
		e.stopPropagation();
	});

	ui.text_field.forEach(input => {

		input.addEventListener('focus', (e) => {

			ui.labelAnimation(e);
		
			e.stopPropagation();
		});

		input.addEventListener('blur', (e) => {

			ui.labelAnimation(e);

			ui.regexValidation(e);
			
			e.stopPropagation();
		});

	});

}