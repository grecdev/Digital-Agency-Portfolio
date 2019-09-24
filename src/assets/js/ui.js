"use strict";
// Ui functionality

class Ui {
	constructor() {
		// Ui Elements
		this.shapeAnimations = document.querySelectorAll('.shape-animation');
		this.header = document.querySelector('header');
		this.left_shape = document.querySelector('.shape-left');
		this.mid_shape = document.querySelector('.shape-mid');
		this.right_shape = document.querySelector('.shape-right');
		// Menus / Sections
		this.showcase_container = document.querySelector('.showcase-container');
		// Buttons
	}

	// Move shapes on cursor move
	// Animation only for desktop devices ( look ugly on mobile devices )
	movingCursorAnimate(e) {
		if(window.matchMedia('(min-width: 1025px)').matches && e.type === 'mousemove') {

			// The numbers are the values from css property e.g: translate(-270px, 60px)
				
			// Left triangle
			// Get the mouse position animation

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosLeftX = (e.clientX * -0.0270) - 270;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosLeftY = (e.clientY * -0.0600) + 100;
			
			// Apply the styles to the element
			// We need to have the rotate aswell so it won't reset the value from scss file
			if(this.left_shape.classList.contains('left-static')) {

				this.left_shape.style.transform = `translate(${mousePosLeftX}px, ${mousePosLeftY}px) rotate(-70deg)`;

			}
			
			// Mid triangle
			// Get the mouse position animation

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosMidX = (e.clientX * -0.0250) - 150;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosMidY = (e.clientY * -0.0565) + 165;
	
			// Apply the styles to the element
			// We need to have the rotate aswell so it won't reset the value from scss file
			if(this.mid_shape.classList.contains('mid-static')) {

				this.mid_shape.style.transform = `translate(${mousePosMidX}px, ${mousePosMidY}px) rotate(10deg)`;

			}
	
			// Right triangle
			// Get the mouse position animation

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosRightX = (e.clientX * -0.0140) + 140;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosRightY = (e.clientY * -0.0700) - 120;

			// Apply the styles to the element
			// We need to have the rotate aswell so it won't reset the value from scss file
			if(this.right_shape.classList.contains('right-static')) {

				this.right_shape.style.transform = `translate(${mousePosRightX}px, ${mousePosRightY}px) rotate(25deg)`;

			}

		}

		// After the moving animation ends remove the intro transition
		// Only for desktop devices
		if(window.matchMedia('(min-width: 1025px)').matches && e.type === 'DOMContentLoaded') {

			setTimeout(() => {

				// Remove the intro animation from each shape
				this.shapeAnimations.forEach(shape => {

					shape.classList.remove('left-intro', 'mid-intro', 'right-intro');
				
				});

				// Add the static animation for individual shape
				this.left_shape.classList.add('left-static');
				this.mid_shape.classList.add('mid-static');
				this.right_shape.classList.add('right-static');

			}, 1750);

		}

		// On mobile devices disable the intro animation
		// Basically we 'reset' the logo / image or whatever you want to call it
		if(window.matchMedia('(max-width: 1024px)').matches && e.type === 'DOMContentLoaded') {

			this.shapeAnimations.forEach(shape => {

				shape.classList.remove('left-intro', 'mid-intro', 'right-intro', 'left-static', 'mid-static', 'right-static');

			});

		}
	}

}

export const ui = new Ui();