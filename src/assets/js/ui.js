"use strict";
// Ui functionality

import jump from "jump.js";

class Ui {
  constructor() {
    // Ui Elements
    this.shapeAnimations = document.querySelectorAll(".shape-animation");
    this.header = document.querySelector("header");
    this.left_shape = document.querySelector(".shape-left");
    this.mid_shape = document.querySelector(".shape-mid");
    this.right_shape = document.querySelector(".shape-right");
    this.testimonial_box = document.querySelectorAll(".testimonial-box");
    this.project_box = document.querySelectorAll(".project-box");
    this.skills_header = document.querySelector("#skills .section-header");
    this.showcase = document.querySelector("#showcase");
    this.header_modal = document.getElementById("desktop-modal-menu");
    this.testimonial_container = document.querySelector(
      ".testimonials-container"
    );
    this.skills_container = document.querySelector("#skills .skills-container");
    this.form = document.getElementById("contact-form");
    this.home_page = document.getElementById("home-page");
    // Buttons
    this.header_icon = document.getElementById("modal-menu-icon");
    this.left_arrow = document.getElementById("left-arrow");
    this.right_arrow = document.getElementById("right-arrow");
    this.resetScroll_btn = document.getElementById("reset-scroll");
    this.slider_buttons = document.querySelector(".slider-buttons");
    this.form_btn = document.getElementById("contactForm-btn");
    // Inputs
    this.fullName_input = document.getElementById("full-name");
    this.phoneNumber_input = document.getElementById("phone-number");
    this.email_input = document.getElementById("email");
    this.budget_input = document.getElementById("budget");
    this.disableLetter_input = document.querySelectorAll(".letter-disabled");
    this.text_field = document.querySelectorAll(".text-field");
    // Regex
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  }

  // Header Modal Menu
  headerModal(e) {
    // Show modal
    if (e.currentTarget.dataset.toggle === "show") {
      // Change button state
      ui.header_icon.setAttribute("data-toggle", "hide");

      // Change the header icon
      document.querySelector(".modal-bar").classList.add("close-icon");

      // Show modal
      document
        .getElementById("desktop-modal-menu")
        .classList.add("visible-flex");

      // Add links animation
      document
        .querySelectorAll(".modal-link")
        .forEach((link) => link.classList.add("intro-link"));

      // On mobile devices disable the intro animation
      if (!ui.isMobile.test(navigator.userAgent))
        ui.shapeAnimations.forEach((shape) =>
          shape.classList.remove("left-intro", "mid-intro", "right-intro")
        );

      // Hide modal
    } else if (
      e.currentTarget.dataset.toggle === "hide" ||
      e.target === ui.header_modal
    ) {
      // Change button state
      ui.header_icon.setAttribute("data-toggle", "show");

      // Change the header icon
      document.querySelector(".modal-bar").classList.remove("close-icon");

      // Hide modal
      document
        .querySelectorAll(".modal-link")
        .forEach((link) => link.classList.remove("intro-link"));

      // Remove links animation
      document
        .getElementById("desktop-modal-menu")
        .classList.remove("visible-flex");

      // On desktop enable the intro animation
      if (
        !ui.isMobile.test(navigator.userAgent) &&
        document.body.contains(ui.showcase)
      ) {
        ui.left_shape.classList.add("left-intro");
        ui.mid_shape.classList.add("mid-intro");
        ui.right_shape.classList.add("right-intro");
      }
    }

    e.stopPropagation();
  }

  // Header scroll animation
  scrollFunctionality() {
    // Get the page position
    const pos = window.pageYOffset;

    // Enable header animation on desktop devices and home page
    if (
      document.body.contains(ui.home_page) &&
      !ui.isMobile.test(navigator.userAgent)
    ) {
      // Disable it when header modal menu is visible
      if (pos > 50 && !ui.header_modal.classList.contains("visible-flex"))
        ui.header.classList.add("header-fixed");
      else ui.header.classList.remove("header-fixed");

      if (pos >= 1400) {
        ui.skills_header.classList.add("skills-intro");
        ui.skills_container.classList.add("skills-intro");
      } else {
        ui.skills_header.classList.remove("skills-intro");
        ui.skills_container.classList.remove("skills-intro");
      }
    }

    // Reset scroll button
    if (document.body.contains(ui.resetScroll_btn)) {
      if (pos >= 950) ui.resetScroll_btn.classList.add("reset-active");
      else ui.resetScroll_btn.classList.remove("reset-active");
    }

    // If we don't check for porfolio page, it gives error and bugs the whole script
    if (
      location.pathname.includes("portfolio") &&
      !ui.isMobile.test(navigator.userAgent)
    ) {
      if (pos >= 400) ui.project_box[1].classList.add("box-visible");
      else ui.project_box[1].classList.remove("box-visible");

      if (pos >= 800) ui.project_box[2].classList.add("box-visible");
      else ui.project_box[2].classList.remove("box-visible");

      if (pos >= 1100) ui.project_box[3].classList.add("box-visible");
      else ui.project_box[3].classList.remove("box-visible");
    }

    window.requestAnimationFrame(ui.scrollFunctionality);
  }

  // Slider functionality
  sliderNavigation(e) {
    if (
      location.pathname.includes("portfolio") &&
      !ui.isMobile.test(navigator.userAgent)
    ) {
      // getPropertyValue doesn't return both margins even if i set getPropertyValue('margin')
      const boxMargin =
        window
          .getComputedStyle(this.testimonial_box[0])
          .getPropertyValue("margin-left")
          .replace(/[^\d]/g, "") * 2;

      // Total width with both margins
      const boxWidth =
        Math.floor(this.testimonial_box[0].getBoundingClientRect().width) +
        boxMargin;

      // Container width ( for outer boxes )
      const containerWidth = this.testimonial_container.getBoundingClientRect()
        .width;

      if (e.type === "DOMContentLoaded") {
        this.testimonial_box.forEach((box, index) => {
          // Decrement with boxWidth so we can show only 3 clients ( can be changed of course )
          const startingPosition = boxWidth * index - boxWidth * 1;
          // the operation: boxWidth * 1 => how manny boxes should be on the outer sides.
          // If we want to show only 3 boxes the total number of boxes inside testimonial container should be even. 5, 7, 9...

          // So the boxes are moved instantly
          box.style.transition = "none";
          setTimeout(() => (box.style.transition = ""), 100);

          // Set the initial position
          box.style.transform = `translateX(${startingPosition}px)`;
        });
      }

      if (e.type === "click") {
        // Left arrow
        if (
          e.currentTarget === ui.left_arrow &&
          e.currentTarget.dataset.eventToggle === "true"
        ) {
          this.testimonial_box.forEach((box) => {
            // Get the translate value ( positive and negative number )
            const currentPosition = parseInt(
              box.style.transform.replace(/[^-\d]/g, "")
            );

            // Position that will be changed
            let nextPosition = currentPosition - boxWidth;

            // Apply the translate value
            box.style.transform = `translateX(${nextPosition}px)`;

            // Check the current outer left position
            const outerPosition = Math.round(box.getBoundingClientRect().left);

            // number 4 = how manny boxes are visible + one that is outside of the container
            let resetPosition = currentPosition + boxWidth * 4;

            // If the outer left box position is out of the container
            if (outerPosition < 0) {
              // Reset the translate value
              box.style.transform = `translateX(${resetPosition}px)`;

              // Hide the box when we reset it
              box.classList.add("outer-box");

              // Show the class so we can see it when the testimonial moves
              setTimeout(() => box.classList.remove("outer-box"), 550);
            }
          });

          // Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
          // I use Array.from method because .children return an Html Collection and forEach works only on array or array like objects
          Array.from(this.slider_buttons.children).forEach((buttons) => {
            buttons.setAttribute("data-event-toggle", "false");

            setTimeout(
              () => buttons.setAttribute("data-event-toggle", "true"),
              700
            );
          });
        }
        // Right Arrow
        else if (
          e.currentTarget === ui.right_arrow &&
          e.currentTarget.dataset.eventToggle === "true"
        ) {
          this.testimonial_box.forEach((box) => {
            // Get the translate value ( positive and negative number )
            const currentPosition = parseInt(
              box.style.transform.replace(/[^-\d]/g, "")
            );

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
            if (outerPosition > containerWidth) {
              // Reset the translate value
              box.style.transform = `translateX(${resetPosition}px)`;

              // Hide the box when we reset it
              box.classList.add("outer-box");

              // Show the class so we can see it when the testimonial moves
              setTimeout(() => box.classList.remove("outer-box"), 550);
            }
          });

          // Button state so the animation won't trigger on multiple clicks ( comment out so you can see better )
          // I use Array.from method because .children return an Html Collection and forEach works only on array or array like objects
          Array.from(this.slider_buttons.children).forEach((buttons) => {
            buttons.setAttribute("data-event-toggle", "false");

            setTimeout(
              () => buttons.setAttribute("data-event-toggle", "true"),
              700
            );
          });
        }
      }
    }
  }

  // Label animation
  labelAnimation(e) {
    if (e.type === "focus")
      e.target.nextElementSibling.classList.add("label-focus");

    if (e.type === "blur") {
      // Remove the label only if the input is empty
      if (e.target.value.length > 0) return false;
      else e.target.nextElementSibling.classList.remove("label-focus");
    }
  }

  regexValidation(e) {
    const globalRegex = {
      /*
			email@gmail.com / ro / co / co.uk / fr
			email@yahoo.com / ro / co / co.uk / fr
			email@hotmail.com / ro / co / co.uk / fr
			email@aol.com / ro / co / co.uk / fr
			*/
      emailRegex: /^[\w\W]+\@{1}(gmail|yahoo|hotmail|aol)\.(com|ro|co|co\.uk|fr)+$/g,
      letterRegex: /^[aA-zZ\s-,]{3,}$/,
      /* 
			Phone format
			0777123456
			0777 123 456
			0777-123-456
			+44 123 456 789
			+40 123 456 789
			+40123456789
			+40-123-456-789
			(1234) 567 890
			(555) 555-1234
			*/
      phoneRegex: /^\+?(\(\+\d{2,3}\)?)?[\s-\.]?(\(?\d+\)?)[\s-\.]?(\d+)[\s-\.]?(\d+)$/g,
    };

    // Regex for individual inputs
    if (e.type === "blur") {
      if (e.target === this.fullName_input) {
        if (globalRegex.letterRegex.test(this.fullName_input.value))
          this.alert(null, "success", false, e.target);
        else
          this.alert(
            "Invalid Name, please type again",
            "error",
            false,
            e.target
          );
      }

      if (e.target === this.phoneNumber_input) {
        if (globalRegex.phoneRegex.test(this.phoneNumber_input.value))
          this.alert(null, "success", false, e.target);
        else
          this.alert(
            "Invalid Phone number, please type again",
            "error",
            false,
            e.target
          );
      }

      if (e.target === this.email_input) {
        if (globalRegex.emailRegex.test(this.email_input.value))
          this.alert(null, "success", false, e.target);
        else
          this.alert(
            "Invalid Email, please type again",
            "error",
            false,
            e.target
          );
      }

      if (e.target === this.budget_input) {
        if (this.budget_input.value.length >= 3)
          this.alert(null, "success", false, e.target);
        else
          this.alert(
            "Minimum budget 100 $, please type again",
            "error",
            false,
            e.target
          );
      }

      if (e.target.tagName === "TEXTAREA" && e.target.value.length > 0)
        this.alert(null, "success", false, e.target);

      if (e.target.value === "")
        this.alert(
          `${e.target.nextElementSibling.textContent} is empty, please fill the input.`,
          "error",
          false,
          e.target
        );
    }

    // Regex for form submission
    if (e.type === "submit") {
      // Variable state
      let submit;

      // This array is compared to the number of all inputs
      const filledInputs = [];

      this.text_field.forEach((input) => {
        // If inputs are not corectly filled / blank
        if (!input.classList.contains("input-filled")) {
          // Display the alert
          this.alert("All inputs are required !", "error", true, e.target);
          // Highlight the inputs
          input.classList.add("input-error");
          // Reset the wrong / blank inputs
          setTimeout(() => input.classList.remove("input-error"), 2000);
          // Don't submit the form
          submit = false;
        }
        // Get all the inputs that are correct
        else filledInputs.push(input);
      });

      // If the number of correct inputs is the same as all inputs that means all the inputs are correct filled :)
      if (filledInputs.length === this.text_field.length) {
        this.alert(
          "Form has been successfully submited !",
          "success",
          true,
          e.target
        );

        // Submit the form
        submit = true;
      }

      console.log("Form has been submited ?", submit);
      return submit;
    }
  }

  alert(message, alertType, multiple, target) {
    // message = obviously
    // alertType = success / error
    // multiple = true (when submiting the form and check all inputs) / false (single input)
    // target = when we need to use the event object

    // Create element
    const p = document.createElement("p");

    // Add custom text
    p.appendChild(document.createTextNode(message));

    if (alertType === "error") {
      // Remove alert, so we have only one
      document
        .querySelectorAll(".regex-alert")
        .forEach((alert) => alert.remove());

      // Add the alert styling
      p.classList.add("regex-alert", "text-center", "regex-error");

      if (!multiple) {
        // If input is not valid remove the input correct validation class (input-filled);
        target.classList.remove("input-filled");
        target.classList.add("input-error");

        // For individual input add the regex alert
        target.parentElement.insertAdjacentElement("beforeend", p);

        if (target.value === "") target.classList.remove("input-filled");
      } else {
        // Add the regex alert to the DOM && other alert styling to elements
        this.form.insertAdjacentElement("beforeend", p);
        this.form_btn.style.backgroundColor = "rgb(219, 40, 40)"; // $red-primary

        this.text_field.forEach((input) =>
          input.classList.remove("input-success")
        );

        // Reset the regex alert
        setTimeout(() => {
          this.form_btn.style = "";
          p.remove();
        }, 2500);
      }
    }

    if (alertType === "success") {
      if (!multiple) {
        // Remove alert styling
        target.classList.remove("input-error");
        // input-filled - If the input has been filled corectly (we check for class in regex validation for multiple inputs)
        target.classList.add("input-success", "input-filled");

        setTimeout(() => target.classList.remove("input-success"), 1250);

        // Remove alert, so we have only one
        document
          .querySelectorAll(".regex-alert")
          .forEach((alert) => alert.remove());
      } else {
        // Add the alert styling
        p.classList.add("regex-alert", "text-center", "regex-success");

        // Add alert to DOM
        target.insertAdjacentElement("beforeend", p);
        this.form_btn.style.backgroundColor = "#01ad54"; // $green-primary

        // Reset the regex alert
        this.text_field.forEach((input) => {
          input.classList.remove(
            "input-error",
            "input-filled",
            "input-success"
          );

          input.value = "";
        });

        setTimeout(() => {
          this.form_btn.style = "";
          p.remove();
        }, 2500);
      }
    }
  }

  disableLetters(e) {
    // Disable shift
    if (e.shiftKey) e.preventDefault();

    /*
			Numpad + normal keyboard numbers
			+ && - and parentheses
			Space && Ctrl + a && Backspace
			dot
			arrow keys
			Tab
		*/
    if (
      (e.which >= 48 && e.which <= 57) ||
      (e.which >= 96 && e.which <= 105) ||
      e.which === 189 ||
      e.which === 187 ||
      e.which === 8 ||
      e.which === 32 ||
      e.which === 17 ||
      e.which === 107 ||
      e.which === 109 ||
      e.ctrlKey ||
      e.which === 190 ||
      e.which === 110 ||
      (e.which >= 37 && e.which <= 40) ||
      e.which === 9 ||
      e.which === 123 ||
      e.which === 116 ||
      e.which === 191
    )
      return true;
    else e.preventDefault();
  }

  resetScroll(e) {
    if (
      e.type === "click" &&
      e.currentTarget === this.resetScroll_btn &&
      e.currentTarget.dataset.eventToggle === "true"
    ) {
      // Disable the click on element
      e.currentTarget.setAttribute("data-event-toggle", "false");

      jump("body", { duration: 1000 });

      // Enable the click on element
      setTimeout(
        () => this.resetScroll_btn.setAttribute("data-event-toggle", "true"),
        1000
      );
    }
  }
}

export const ui = new Ui();
