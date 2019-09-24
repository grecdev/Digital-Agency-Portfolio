"use strict";
// Ui functionality

class Ui {
	constructor() {
		// Ui Elements
		this.shapeAnimations = document.querySelectorAll('.shape-animation');
		// Menus / Sections
		this.showcase_container = document.querySelector('.showcase-container');
		// Buttons
	}

	// Move shapes on cursor move
	// Animation only for desktop devices ( look ugly on mobile devices )
	movingCursorAnimate(e) {
		if(window.matchMedia('(min-width: 1025px)').matches && e.type === 'mousemove') {

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
			
		}

		// After the moving animation ends remove the intro transition
		// Only for desktop devices
		if(window.matchMedia('(min-width: 1025px)').matches && e.type === 'DOMContentLoaded') {

			setTimeout(() => {
				ui.shapeAnimations.forEach(shape => {

					shape.classList.remove('intro-transition');
					shape.classList.add('moving-animation');

				});
			}, 2000);

		}

		// On mobile devices disable the intro animation
		// Basically we 'reset' the logo / image or whatever you want to call it
		if(window.matchMedia('(max-width: 1024px)').matches && e.type === 'DOMContentLoaded') {

			this.shapeAnimations.forEach(shape => {

				shape.classList.remove('intro-transition', 'moving-animation', 'left-triangle-static', 'mid-triangle-static', 'right-triangle-static');

			});

		}
	}

}

export const ui = new Ui();