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
		this.showcase = document.querySelector('#showcase');
		this.header_modal = document.getElementById('desktop-modal-menu');
		this.testimonial_container = document.querySelector('.testimonials-container');
		this.skills_container = document.querySelector('#skills .skills-container');
		this.form = document.getElementById('contact-form');
		this.home_page = document.getElementById('home-page');
		// Buttons
		this.header_icon = document.getElementById('modal-menu-icon');
		this.left_arrow = document.getElementById('left-arrow');
		this.right_arrow = document.getElementById('right-arrow');
		this.resetScroll_btn = document.getElementById('reset-scroll');
		this.slider_buttons = document.querySelector('.slider-buttons');
		// Regex erros
		this.fullName_error = document.querySelector('.fullName-error');
		this.phoneNumber_error = document.querySelector('.phoneNumber-error');
		this.email_error = document.querySelector('.email-error');
		this.budget_error = document.querySelector('.budget-error');
		// Inputs
		this.fullName_input = document.getElementById('full-name');
		this.phoneNumber_input = document.getElementById('phone-number');
		this.email_input = document.getElementById('email');
		this.budget_input = document.getElementById('budget');
		this.disableLetter_input = document.querySelectorAll('.letter-disabled');
		this.text_field = document.querySelectorAll('.text-field');
	}

	// Header Modal Menu
	headerModal(e) {

		// Show modal
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
			if(window.matchMedia('(min-width: 1025px)').matches) ui.shapeAnimations.forEach(shape => shape.classList.remove('left-intro', 'mid-intro', 'right-intro'))
			
			// Hide modal
		} else if(e.currentTarget.dataset.toggle === 'hide' || e.target === ui.header_modal) {

			// Change button state
			ui.header_icon.setAttribute('data-toggle', 'show');
	
			// Change the header icon
			document.querySelector('.modal-bar').classList.remove('close-icon');

			// Hide modal
			document.querySelectorAll('.modal-link').forEach(link => link.classList.remove('intro-link'));

			// Remove links animation
			document.getElementById('desktop-modal-menu').classList.remove('visible-flex');

			// On desktop enable the intro animation
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

		// Enable header animation on desktop devices and home page
		if(document.body.contains(ui.home_page) && window.matchMedia('(min-width: 1025px)').matches) {
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

		// Reset scroll button
		if(document.body.contains(ui.resetScroll_btn)) {

			if(pos >= 950) ui.resetScroll_btn.classList.add('reset-active')
			else ui.resetScroll_btn.classList.remove('reset-active')

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
	
					// So the boxes are moved instantly
					box.style.transition = 'none';
					setTimeout(() => box.style.transition = '', 100);

					// Set the initial position
					box.style.transform = `translateX(${startingPosition}px)`;
	
				});
			}
	
			if(e.type === 'click') {
				// Left arrow
				if(e.currentTarget === ui.left_arrow && e.currentTarget.dataset.eventToggle === 'true') {
		
					this.testimonial_box.forEach(box => {
		
						// Get the translate value ( positive and negative number )
						const currentPosition = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
						
						// Position that will be changed
						let nextPosition = currentPosition - boxWidth;
		
						// Apply the translate value
						box.style.transform = `translateX(${nextPosition}px)`;
		
						// Check the current outer left position
						const outerPosition = Math.round(box.getBoundingClientRect().left);
	
						// number 4 = how manny boxes are visible + one that is outside of the container
						let resetPosition = currentPosition + (boxWidth * 4);
						
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
					// I use Array.from method because .children return an Html Collection and forEach works only on array or array like objects
					Array.from(this.slider_buttons.children).forEach(buttons => {

						buttons.setAttribute('data-event-toggle', 'false');

						setTimeout(() => buttons.setAttribute('data-event-toggle', 'true'), 700);
					});
		
				}
				// Right Arrow
				else if(e.currentTarget === ui.right_arrow && e.currentTarget.dataset.eventToggle === 'true') {
		
					this.testimonial_box.forEach(box => {
		
						// Get the translate value ( positive and negative number )
						const currentPosition = parseInt(box.style.transform.replace(/[^-\d]/g, ''));
						
						// Position that will be changed
						let nextPosition = currentPosition + boxWidth;
		
						// Apply the translate value
						box.style.transform = `translateX(${nextPosition}px)`;
		
						// Check the current outer left position
						const outerPosition = Math.round(box.getBoundingClientRect().left);
	
						// Because the box position is set to absolute, -boxWidth puts the translate position at (0 - boxWidth) => translateX(-388px); '0' being the container starting width
						// See with inspect element the outer left box
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
					// I use Array.from method because .children return an Html Collection and forEach works only on array or array like objects
					Array.from(this.slider_buttons.children).forEach(buttons => {

						buttons.setAttribute('data-event-toggle', 'false');

						setTimeout(() => buttons.setAttribute('data-event-toggle', 'true'), 700);
					});
				}
			}
		}
	}

	// Label animation
	labelAnimation(e) {

		if(e.type === 'focus') e.target.nextElementSibling.classList.add('label-focus');

		if(e.type === 'blur') {
			// Remove the label only if the input is empty
			if(e.target.value.length > 0) return false;
			else e.target.nextElementSibling.classList.remove('label-focus');
		}
	}

	regexValidation(e) {

		const globalRegex = {
			emailRegex: /^[\w\W]+\@{1}(gmail|yahoo|hotmail|aol)\.(com|ro|co|co\.uk|fr)+$/g,
			letterRegex: /^[aA-zZ\s-,]{3,}$/,
			/* 
			Phone format
			+44 123 456 789
			+40 123 456 789
			+40123456789
			+40-123-456-789
			(1234) 567 890
			(555) 555-1234
		*/
			phoneRegex: /^\+?(\(\+\d{2,3}\)?)?[\s-\.]?(\(?\d+\)?)[\s-\.]?(\d+)[\s-\.]?(\d+)$/g
		};

		// Regex for individual inputs
		if(e.type === 'blur') {

			if(e.target === this.fullName_input) {

				if(!globalRegex.letterRegex.test(this.fullName_input.value)) this.alert('Invalid Name, please type again', 'error', false, e.target);
				else {
					this.alert(null, 'success', false, e.target);

					// If the input has been filled corectly
					e.target.classList.add('input-filled');
				}

				if(this.fullName_input.value === '') {
					this.alert('Name is required, please fill the input', 'error', false, e.target);

					e.target.classList.remove('input-filled');
				}
			}

			if(e.target === this.phoneNumber_input) {

				if(!globalRegex.phoneRegex.test(this.phoneNumber_input.value)) this.alert('Invalid Phone number, please type again', 'error', false, e.target);
				else {
					this.alert(null, 'success', false, e.target);

					// If the input has been filled corectly
					e.target.classList.add('input-filled');
				}

				if(this.phoneNumber_input.value === '') {
					this.alert('Phone number is required, please fill the input', 'error', false, e.target);

					e.target.classList.remove('input-filled');
				}

			}

			if(e.target === this.email_input) {

				if(!globalRegex.emailRegex.test(this.email_input.value)) this.alert('Invalid Email, please type again', 'error', false, e.target);
				else {
					this.alert(null, 'success', false, e.target);

					// If the input has been filled corectly
					e.target.classList.add('input-filled');
				}

				if(this.email_input.value === '') {
					this.alert('Email is required, please fill the input', 'error', false, e.target);

					e.target.classList.remove('input-filled');
				}

			}

			if(e.target === this.budget_input) {

				if(this.budget_input.value.length < 3) this.alert('Minimum budget 100 $, please type again', 'error', false, e.target);
				else {
					this.alert(null, 'success', false, e.target);

					// If the input has been filled corectly
					e.target.classList.add('input-filled');
				}

				if(this.budget_input.value === '') {
					this.alert('Budget is required, please fill the input', 'error', false, e.target);

					e.target.classList.remove('input-filled');
				}

			}
		}

		// Regex for form submission
		if(e.type === 'submit') {
			// Variable state
			let submit;

			document.querySelectorAll('input[type="text"]').forEach(input => {
				
				// If input is empty
				if(input.value === '' || !input.classList.contains('input-filled')) {
					// Display error
					input.classList.add('input-error');
					this.alert('All fields are required, please fill the inputs', 'error', true, null);

					// Remove the error
					setTimeout(() => input.classList.remove('input-error'), 2500);

					// Don't submit the form
					submit = false;
				}
			
			});

			// If inputs are correct filled
			if(globalRegex.letterRegex.test(this.fullName_input.value) && globalRegex.phoneRegex.test(this.phoneNumber_input.value) && globalRegex.emailRegex.test(this.email_input.value) && this.budget_input.value.length >= 3) {
				// Reset the inputs
				this.text_field.forEach(input => {
					input.value = '';
					input.classList.remove('input-filled', 'input-success');
					input.nextElementSibling.classList.remove('label-focus');
				});

				this.alert('Form has been sent to our team !', 'success', true, null);

				submit = true;
			}

			console.log('Form has been submited ?', submit);
			return submit;
		}

	}

	alert(message, alertType, multiple, target) {
		// message = obviously
		// alertType = success / error
		// multiple = true (when submiting the form and check all inputs) / false (single input)
		// target = when we need to use the event object

		// Create element
		const p = document.createElement('p');

		// Add custom text
		p.appendChild(document.createTextNode(message));

		if(alertType === 'error') {
			// Remove error, so we have only one
			document.querySelectorAll('.regex-alert').forEach(error => error.remove());

			// Add the error styling
			p.classList.add('regex-alert', 'text-center', 'regex-error');

			if(!multiple) {

				target.classList.add('input-error');
				p.classList.add('mb-xs');

				// Add the error to specific input box
				if(target === this.fullName_input) this.fullName_error.insertAdjacentElement('beforeend', p);
				if(target === this.phoneNumber_input) this.phoneNumber_error.insertAdjacentElement('beforeend', p);
				if(target === this.email_input) this.email_error.insertAdjacentElement('beforeend', p);
				if(target === this.budget_input) this.budget_error.insertAdjacentElement('beforeend', p);
			}

			if(multiple) {
				this.form.insertAdjacentElement('beforeend', p);

				setTimeout(() => document.querySelectorAll('.regex-alert').forEach(error => error.remove()), 2500);
			}
		}

		if(alertType === 'success') {
			
			if(!multiple) {
				// Remove error styling
				target.classList.remove('input-error');

				target.classList.add('input-success');

				setTimeout(() => target.classList.remove('input-success'), 1250);

				// Remove error, so we have only one
				document.querySelectorAll('.regex-alert').forEach(error => error.remove());
			}

			if(multiple) {
				// Add the error styling
				p.classList.add('regex-alert', 'text-center', 'regex-success');

				// Add error to DOM
				this.form.insertAdjacentElement('beforeend', p);

				setTimeout(() => p.remove(), 2500);
			}
		}
	}

	disableLetters(e) {
		// Disable shift
		if(e.shiftKey) e.preventDefault();

		/*
			Numpad + normal keyboard numbers
			+ && - and parentheses
			Space && Ctrl + a && Backspace
			dot
			arrow keys
			Tab
		*/
		if(e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which === 189 || e.which === 187 || e.which === 8 || e.which === 32 || e.which === 17 || e.which === 107 || e.which === 109 || e.ctrlKey || e.which === 190 || e.which === 110 || e.which >= 37 && e.which <= 40 || e.which === 9 || e.which === 123 || e.which === 116 || e.which === 191) return true
		else e.preventDefault()
	}

	resetScroll(e) {

		if(e.type === 'click' && e.currentTarget === this.resetScroll_btn && e.currentTarget.dataset.eventToggle === 'true') {

			// Disable the click on element
			e.currentTarget.setAttribute('data-event-toggle', 'false');

			jump('body', { duration: 1000 });

			// Enable the click on element
			setTimeout(() => this.resetScroll_btn.setAttribute('data-event-toggle', 'true'), 1000);
		}
		
	}
}

export const ui = new Ui();