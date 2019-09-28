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

		if(e.currentTarget === ui.left_arrow) {

			this.testimonial_box.forEach(box => {

				// Get initial position
				const startingPos = Math.round(box.getBoundingClientRect().x);

				// The position that will be changed
				const nextPosition = startingPos - 959;
				
				box.style.transform = `translateX(${nextPosition}px)`;
	
				// Get the translateX value
				const translateX = box.style.transform;

				// Get what is between transform style parantheses
				const parantheses = translateX.replace(/[^\d]/g, '');

				if(parantheses > 740) {
					// Move the box to the outer left side of the slider
					box.style.transform = `translateX(740px)`;

					// Hide the box when is moving to the outside position
					box.classList.add('hidden');

					// Make the box visible after the moving transition ends
					setTimeout(() => box.classList.remove('hidden'), 500);
				}
			});
		}
		else if(e.currentTarget === ui.right_arrow) {

			this.testimonial_box.forEach(box => {

				// Get initial position
				const startingPos = Math.round(box.getBoundingClientRect().x);

				// The position that will be changed
				const nextPosition = startingPos - 219;

				box.style.transform = `translateX(${nextPosition}px)`;
	
				// Get the translateX value
				const translateX = box.style.transform;

				// Get what is between transform style parantheses
				const parantheses = translateX.replace(/[^\d]/g, '');

				if(parantheses > 740) {
					// Move the box to the outer left side of the slider
					box.style.transform = `translateX(-740px)`;

					// Hide the box when is moving to the outside position
					box.classList.add('hidden');

					// Make the box visible after the moving transition ends
					setTimeout(() => box.classList.remove('hidden'), 500);
				}
			});
		}
	}

}

export const ui = new Ui();