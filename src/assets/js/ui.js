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
		this.showcase = document.querySelector('#showcase');
		this.header_modal = document.getElementById('desktop-modal-menu');
		// Buttons
		this.header_icon = document.getElementById('modal-menu-icon');
	}

	// Move shapes on cursor move
	// Animation only for desktop devices ( look ugly on mobile devices )
	movingCursorAnimate(e) {
		if(window.matchMedia('(min-width: 1025px)').matches && e.type === 'mousemove' )  {

			// We need to have the rotate aswell so it won't reset the value from scss file
			// If contains static class so it won't trigger when the animation is running
				
			// Left triangle

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosLeftX = (e.clientX * -0.0270) - 270;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosLeftY = (e.clientY * -0.0600) + 100;
			
			
			if(this.left_shape.classList.contains('left-static')) {

				this.left_shape.style.transform = `translate(${mousePosLeftX}px, ${mousePosLeftY}px) rotate(-70deg)`;

			}
			
			// Mid triangle

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosMidX = (e.clientX * -0.0250) - 150;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosMidY = (e.clientY * -0.0565) + 165;

			if(this.mid_shape.classList.contains('mid-static')) {

				this.mid_shape.style.transform = `translate(${mousePosMidX}px, ${mousePosMidY}px) rotate(10deg)`;

			}
	
			// Right triangle

			// INSIDE PARENTHESES => cursor goes to RIGHT
			// OUTSIDE PARENTHESES => cursor goes to LEFT
			const mousePosRightX = (e.clientX * -0.0140) + 140;
			// INSIDE PARENTHESES => cursor goes to DOWN
			// OUTSIDE PARENTHESES => cursor goes to UP
			const mousePosRightY = (e.clientY * -0.0700) - 120;

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

					shape.classList.add('transition-enabled');
				
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

	// Header Modal Menu
	headerModal(e) {

		if(e.currentTarget.dataset.toggle === 'show') {

			// Change button state
			this.header_icon.setAttribute('data-toggle', 'hide');

			document.querySelector('.modal-bar').classList.add('close-icon');
	
			document.getElementById('desktop-modal-menu').classList.add('visible-flex');

			document.querySelectorAll('.modal-link').forEach(link => link.classList.remove('outro-link'));
			document.querySelectorAll('.modal-link').forEach(link => link.classList.add('intro-link'));

			// On mobile devices disable the intro animation
			// Basically we 'reset' the logo / image or whatever you want to call it
			if(window.matchMedia('(min-width: 1025px)').matches) {

				this.shapeAnimations.forEach(shape => {
		
					shape.classList.remove('left-intro', 'mid-intro', 'right-intro', 'left-static', 'mid-static', 'right-static');
					shape.style = '';
		
				});

			}
		}
		else if(e.currentTarget.dataset.toggle === 'hide' || e.target === this.header_modal) {

			// Change button state
			this.header_icon.setAttribute('data-toggle', 'show');
			
			// I added an animation delay for the closing modal so the showcase svg animation don't reset after each click
			setTimeout(() => {

				document.querySelector('.modal-bar').classList.remove('close-icon');

				document.querySelectorAll('.modal-link').forEach(link => link.classList.remove('intro-link'));
				document.querySelectorAll('.modal-link').forEach(link => link.classList.add('outro-link'));

			}, 500);

			setTimeout(() => {

				document.getElementById('desktop-modal-menu').classList.remove('visible-flex');
				document.querySelectorAll('.modal-link').forEach(link => link.classList.remove('outro-link'));

				// On mobile devices disable the intro animation
				// Basically we 'reset' the logo / image or whatever you want to call it
				if(window.matchMedia('(min-width: 1025px)').matches) {

					this.left_shape.classList.add('left-intro');
					this.mid_shape.classList.add('mid-intro');
					this.right_shape.classList.add('right-intro');

					setTimeout(() => {

						// Remove the intro animation from each shape
						ui.shapeAnimations.forEach(shape => {
							shape.classList.remove('left-intro', 'mid-intro', 'right-intro');
						});

						ui.left_shape.classList.add('left-static');
						ui.mid_shape.classList.add('mid-static');
						ui.right_shape.classList.add('right-static');
			
					}, 1750);
				}
			}, 2000);
		}
	}

}

export const ui = new Ui();