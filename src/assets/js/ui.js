"use strict";
// Ui functionality

import jump from 'jump.js'

class Ui {
	constructor() {
		// Ui Elements
		this.shapeAnimations = document.querySelectorAll('.shape-animation');
		this.header = document.querySelector('header');
		this.left_shape = document.querySelector('.shape-left');
		this.mid_shape = document.querySelector('.shape-mid');
		this.right_shape = document.querySelector('.shape-right');
		this.testimonial_box = document.querySelectorAll('.testimonial-box');
		// Menus / Sections
		this.showcase = document.querySelector('#showcase');
		this.header_modal = document.getElementById('desktop-modal-menu');
		this.testimonial_container = document.querySelectorAll('.testimonial-container');
		// Buttons
		this.header_icon = document.getElementById('modal-menu-icon');
		this.left_arrow = document.getElementById('left-arrow');
		this.right_arrow = document.getElementById('right-arrow');
	}

	// Header Modal Menu
	headerModal(e) {

		if(e.currentTarget.dataset.toggle === 'show') {

			// Change button state
			ui.header_icon.setAttribute('data-toggle', 'hide');

			// Change the header icon
			document.querySelector('.modal-bar').classList.add('close-icon');
	
			// Show modal
			document.getElementById('desktop-modal-menu').classList.add('visible-flex');

			// Add links animation
			document.querySelectorAll('.modal-link').forEach(link => link.classList.add('intro-link'));

			// On mobile devices disable the intro animation
			if(window.matchMedia('(min-width: 1025px)').matches) {
				ui.shapeAnimations.forEach(shape => shape.classList.remove('left-intro', 'mid-intro', 'right-intro'));
			}
			
		} else if(e.currentTarget.dataset.toggle === 'hide' || e.target === ui.header_modal) {

			// Change button state
			ui.header_icon.setAttribute('data-toggle', 'show');
	
			// Change the header icon
			document.querySelector('.modal-bar').classList.remove('close-icon');

			// Hide modal
			document.querySelectorAll('.modal-link').forEach(link => link.classList.remove('intro-link'));

			// Remove links animation
			document.getElementById('desktop-modal-menu').classList.remove('visible-flex');

			// On mobile devices enable the intro animation
			if(window.matchMedia('(min-width: 1025px)').matches && document.body.contains(ui.showcase)) {

				ui.left_shape.classList.add('left-intro');
				ui.mid_shape.classList.add('mid-intro');
				ui.right_shape.classList.add('right-intro');
				
			}
		}

		e.stopPropagation();
	}

	// Header scroll animation
	scrollFunctionality() {
		// Get the page position
		const pos = window.pageYOffset;

		// Enable header fixed on desktop devices and home page
		if(window.matchMedia('(min-width: 1025px)').matches && location.pathname.includes('index') && location.pathname.includes('/')) {
			// Disable it when header modal menu is visible
			if(pos > 50 && !ui.header_modal.classList.contains('visible-flex')) ui.header.classList.add('header-fixed')
			else ui.header.classList.remove('header-fixed')
		}
		
		window.requestAnimationFrame(ui.scrollFunctionality);
	}

	sliderNavigation(e) {

		// getPropertyValue doesn't return both margins even if i set getPropertyValue('margin')
		const boxMargin = window.getComputedStyle(this.testimonial_box[0]).getPropertyValue('margin-left').replace(/[^\d]/g, '') * 2;

		// Total width with both margins
		const boxWidh = Math.floor(this.testimonial_box[0].getBoundingClientRect().width) + boxMargin;

		// Always get the first / last element in the container ( if the user wants to add more boxes or whatever )
		const outerLeft = Math.floor(this.testimonial_box[0].getBoundingClientRect().left);
		const outerRight = Math.floor(this.testimonial_box[this.testimonial_box.length - 2].getBoundingClientRect().left);

		// Reset position ( move the box left / right outer acording to how manny boxes are available)
		const resetPosition = (this.testimonial_box.length - 1) * boxWidh;

		if(e.type === 'DOMContentLoaded') {

			this.testimonial_box.forEach(box => {

				box.style.transform = `translateX(0px)`;

			});

		}

		// Left arrow
		if(e.currentTarget === ui.left_arrow && e.currentTarget.dataset.enable === 'true') {

			this.testimonial_box.forEach(box => {

				// Get the translate value ( positive and negative number )
				const currentPosition = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
				
				// Position that will be changed
				let nextPosition = currentPosition + boxWidh;

				// Apply the translate value
				box.style.transform = `translateX(${nextPosition}px)`;

				// Check the current outer left position
				const currentOuterRight = Math.floor(box.getBoundingClientRect().left);

				// If the current box position is higher than the last item
				if(currentOuterRight > outerRight) {

					// Reset the translate value
					box.style.transform = `translateX(-${resetPosition}px)`;

					box.style.backgroundColor = 'red';

					console.log(box);

				}

				
				
			});

			// Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
			this.left_arrow.setAttribute('data-enable', 'false');
			setTimeout(() => this.left_arrow.setAttribute('data-enable', 'true'), 800);

		}
		// Right Arrow
		else if(e.currentTarget === ui.right_arrow && e.currentTarget.dataset.enable === 'true') {

			this.testimonial_box.forEach(box => {

				// Get the translate value ( positive and negative number )
				const currentPos = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
				
				// Position that will be changed
				let total = currentPos - boxWidh;

				// Apply the translate value
				box.style.transform = `translateX(${total}px)`;
				
			});

			// Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
			this.right_arrow.setAttribute('data-enable', 'false');
			setTimeout(() => this.right_arrow.setAttribute('data-enable', 'true'), 800);
		}
	}

}

export const ui = new Ui();