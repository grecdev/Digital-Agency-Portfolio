"use strict";

import { ui } from '../ui.js';

// Contact page functionality
ui.form.addEventListener('submit', (e) => {

	console.log(e.target);
	
	e.preventDefault();
	e.stopPropagation();

	return false;
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