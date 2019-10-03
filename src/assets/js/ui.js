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
		this.project_box = document.querySelectorAll('.project-box');
		this.skills_header = document.querySelector('#skills .section-header');
		// Menus / Sections
		this.showcase = document.querySelector('#showcase');
		this.header_modal = document.getElementById('desktop-modal-menu');
		this.testimonial_container = document.querySelector('.testimonials-container');
		this.skills_container = document.querySelector('#skills .skills-container');
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
		if(location.pathname.includes('index') && window.matchMedia('(min-width: 1025px)').matches) {
			// Disable it when header modal menu is visible
			if(pos > 50 && !ui.header_modal.classList.contains('visible-flex')) ui.header.classList.add('header-fixed')
			else ui.header.classList.remove('header-fixed')

			if(pos >= 1400) {
				ui.skills_header.classList.add('skills-intro');
				ui.skills_container.classList.add('skills-intro');
			} else {
				ui.skills_header.classList.remove('skills-intro');
				ui.skills_container.classList.remove('skills-intro');
			}
		}

		// If we don't check for porfolio page, it gives error and bugs the whole script
		if(location.pathname.includes('portfolio') && window.matchMedia('(min-width: 1025px)').matches) {
			if(pos >= 400) ui.project_box[1].classList.add('box-visible')
			else ui.project_box[1].classList.remove('box-visible')
	
			if(pos >= 800) ui.project_box[2].classList.add('box-visible')
			else ui.project_box[2].classList.remove('box-visible')
	
			if(pos >= 1100) ui.project_box[3].classList.add('box-visible')
			else ui.project_box[3].classList.remove('box-visible')
		}
		
		window.requestAnimationFrame(ui.scrollFunctionality);
	}

	// Slider functionality
	sliderNavigation(e) {

		if(location.pathname.includes('portfolio') && window.matchMedia('(min-width: 1025px)').matches) {
			// getPropertyValue doesn't return both margins even if i set getPropertyValue('margin')
			const boxMargin = window.getComputedStyle(this.testimonial_box[0]).getPropertyValue('margin-left').replace(/[^\d]/g, '') * 2;
	
			// Total width with both margins
			const boxWidth = Math.floor(this.testimonial_box[0].getBoundingClientRect().width) + boxMargin;
	
			// Container width ( for outer boxes )
			const containerWidth = this.testimonial_container.getBoundingClientRect().width;
			
			if(e.type === 'DOMContentLoaded') {
				this.testimonial_box.forEach((box, index) => {
	
					// Decrement with boxWidth so we can show only 3 clients ( can be changed of course )
					const startingPosition = (boxWidth * index) - boxWidth * 1;
					// the operation: boxWidth * 1 => how manny boxes should be on the outer sides.
					// If we want to show only 3 boxes the total number of boxes inside testimonial container should be even. 5, 7, 9...
					// Can always be changed if the client wants that. From css / html / js file
	
					// Set the initial position
					box.style.transform = `translateX(${startingPosition}px)`;
	
				});
			}
	
			if(e.type === 'click') {
				// Left arrow
				if(e.currentTarget === ui.left_arrow && e.currentTarget.dataset.enable === 'true') {
		
					this.testimonial_box.forEach(box => {
		
						// Get the translate value ( positive and negative number )
						const currentPosition = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
						
						// Position that will be changed
						let nextPosition = currentPosition - boxWidth;
		
						// Apply the translate value
						box.style.transform = `translateX(${nextPosition}px)`;
		
						// Check the current outer left position
						const outerPosition = Math.round(box.getBoundingClientRect().left);
	
						// number 4 = how manny boxes are in visible + one that is outside of the container
						// For mobile devices aswell if we have on box showing we add 2 box widths + current position
						let resetPosition;

						if(window.matchMedia('(min-width: 320px) and (max-width: 480px)').matches) resetPosition = currentPosition + (boxWidth * 2);
						else resetPosition = currentPosition + (boxWidth * 4);
				
						// If the outer left box position is out of the container
						if(outerPosition < 0) {
		
							// Reset the translate value
							box.style.transform = `translateX(${resetPosition}px)`;
		
							// Hide the box when we reset it	
							box.classList.add('outer-box');
		
							// Show the class so we can see it when the testimonial moves
							setTimeout(() => box.classList.remove('outer-box'), 550);
						}
		
					});
		
					// Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
					this.left_arrow.setAttribute('data-enable', 'false');
					setTimeout(() => this.left_arrow.setAttribute('data-enable', 'true'), 700);
		
				}
				// Right Arrow
				else if(e.currentTarget === ui.right_arrow && e.currentTarget.dataset.enable === 'true') {
		
					this.testimonial_box.forEach(box => {
		
						// Get the translate value ( positive and negative number )
						const currentPosition = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
						
						// Position that will be changed
						let nextPosition = currentPosition + boxWidth;
		
						// Apply the translate value
						box.style.transform = `translateX(${nextPosition}px)`;
		
						// Check the current outer left position
						const outerPosition = Math.round(box.getBoundingClientRect().left);
	
						// Because the box position is set to absolute, -boxWidth puts the translate position at '0' - boxWidth, '0' being the container starting widt
						const resetPosition = -boxWidth;
				
						// If the outer left box position is out of the container
						if(outerPosition > containerWidth) {
		
							// Reset the translate value
							box.style.transform = `translateX(${resetPosition}px)`;
		
							// Hide the box when we reset it	
							box.classList.add('outer-box');
		
							// Show the class so we can see it when the testimonial moves
							setTimeout(() => box.classList.remove('outer-box'), 550);
						}
		
					});
		
					// Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
					this.right_arrow.setAttribute('data-enable', 'false');
					setTimeout(() => this.right_arrow.setAttribute('data-enable', 'true'), 700);
				}
			}
		}
	}

}

export const ui = new Ui();