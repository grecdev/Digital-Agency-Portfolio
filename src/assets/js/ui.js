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

	sliderNavigation(e, index) {

		// The index position
		const nextIndex = index();

		// Remove the classes after, because we have set it initially in the html file
		this.testimonial_box.forEach(box => box.classList.remove('outer-left', 'left', 'mid', 'right', 'outer-right'));

		if(e.currentTarget === ui.left_arrow) {

			// Position order for each testimonial
			const positions = {
				outer_left: ['outer-right', 'right', 'mid', 'left', 'outer-left'],
				left: ['outer-left', 'outer-right', 'right', 'mid', 'left'],
				mid: ['left', 'outer-left', 'outer-right', 'right', 'mid'],
				right: ['mid', 'left', 'outer-left', 'outer-right', 'right'],
				outer_right: ['right', 'mid', 'left', 'outer-left', 'outer-right']
			}

			// Add the class acording to the incremented index
			this.testimonial_box[0].classList.add(positions.outer_left[nextIndex]);
			this.testimonial_box[1].classList.add(positions.left[nextIndex]);
			this.testimonial_box[2].classList.add(positions.mid[nextIndex]);
			this.testimonial_box[3].classList.add(positions.right[nextIndex]);
			this.testimonial_box[4].classList.add(positions.outer_right[nextIndex]);

			// this.testimonial_box.forEach(box => {
			// 	// When the box is in the outer left position
			// 	if(box.classList.contains('outer-left')) {

			// 		box.classList.replace('outer-left', 'outer-right')
					
			// 		setTimeout(() => {
			// 			// Replace the position
			// 			// Hide the box when it moves
			// 			// box.classList.add('hidden');

			// 			// setTimeout(() => box.classList.replace('outer-left', 'outer-right'), 100);

			// 			// When the box is in the outer position show it, so it can be visible when is in the testimonial container
			// 			// setTimeout(() => box.classList.remove('hidden'), 500);
			// 		}, 500);

			// 	}
			// });
		}
		else if(e.currentTarget === ui.right_arrow) {

			// Position order for each testimonial
			const positions = {
				outer_right: ['outer-left', 'left', 'mid', 'right', 'outer-right'],
				right: ['outer-right', 'outer-left', 'left', 'mid', 'right'],
				mid: ['right', 'outer-right', 'outer-left', 'left', 'mid'],
				left: ['mid', 'right', 'outer-right', 'outer-left', 'left'],
				outer_left: ['left', 'mid', 'right', 'outer-right', 'outer-left'],
			}

			// Add the class acording to the incremented index
			this.testimonial_box[4].classList.add(positions.outer_right[nextIndex]);
			this.testimonial_box[3].classList.add(positions.right[nextIndex]);
			this.testimonial_box[2].classList.add(positions.mid[nextIndex]);
			this.testimonial_box[1].classList.add(positions.left[nextIndex]);
			this.testimonial_box[0].classList.add(positions.outer_left[nextIndex]);

			// this.testimonial_box.forEach(box => {
			// 	// When the box is in the outer left position
			// 	if(box.classList.contains('outer-right')) {
			// 		setTimeout(() => {
			// 			// Replace the position
			// 			// Hide the box when it moves
			// 			box.classList.add('hidden');
			// 			setTimeout(() => box.classList.replace('outer-right', 'outer-left'), 100);

			// 			// When the box is in the outer position show it, so it can be visible when is in the testimonial container
			// 			setTimeout(() => box.classList.remove('hidden'), 500);
			// 		}, 500);
			// 	}
			// });
		}
	}

}

export const ui = new Ui();