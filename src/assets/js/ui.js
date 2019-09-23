"use strict";
// Ui functionality

class Ui {
	constructor() {
		// Ui Elements
		// Menus / Sections
		this.showcase_container = document.querySelector('.showcase-container');
		// Buttons
	}

	// Move shapes on cursor move
	moveThings(e) {

		// INSIDE PARENTHESES => cursor goes to right
		// OUTSIDE PARENTHESES => cursor goes to left
		// The numbers: 270 / 60 / 150 / 160 / 140 / 120 are the values from css property e.g: translate(-270px, 60px)

		// Left triangle
		// Get the mouse position animation
		const mousePosLeftX = (e.clientX * -0.0270) - 270;
		const mousePosLeftY = (e.clientY * 0.060) + 60;

		// Get the element
		const left = document.querySelector('.left-triangle-static');

		// Apply the styles to the element
		// We need to have the rotate aswell so it won't reset the value from scss file
		left.style.transform = `translate(${mousePosLeftX}px, ${mousePosLeftY}px) rotate(-70deg)`;
		
		// Mid triangle
		// Get the mouse position animation
		const mousePosMidX = (e.clientX * -0.0150) - 150;
		const mousePosMidY = (e.clientY * 0.0160) + 160;

		// Get the element
		const mid = document.querySelector('.mid-triangle-static');

		// Apply the styles to the element
		// We need to have the rotate aswell so it won't reset the value from scss file
		mid.style.transform = `translate(${mousePosMidX}px, ${mousePosMidY}px) rotate(10deg)`;

		// Right triangle
		// Get the mouse position animation
		const mousePosRightX = (e.clientX * 0.0140) + 140;
		const mousePosRightY = (e.clientY * -0.0120) - 120;

		// Get the element
		const right = document.querySelector('.right-triangle-static');

		// Apply the styles to the element
		// We need to have the rotate aswell so it won't reset the value from scss file
		right.style.transform = `translate(${mousePosRightX}px, ${mousePosRightY}px) rotate(25deg)`;

		// Please appreciate this because it took 2 days to figure out the movement ( yes i am a noob )
	}
	
}

export const ui = new Ui();