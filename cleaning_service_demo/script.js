document.addEventListener('DOMContentLoaded', () => {
	// Mobile Menu Toggle
	const menuToggle = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.nav');

	menuToggle.addEventListener('click', () => {
		nav.classList.toggle('active');

		// Animate hamburger icon
		const spans = menuToggle.querySelectorAll('span');
		if (nav.classList.contains('active')) {
			spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
			spans[1].style.opacity = '0';
			spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
		} else {
			spans[0].style.transform = 'none';
			spans[1].style.opacity = '1';
			spans[2].style.transform = 'none';
		}
	});

	// Close menu when clicking a link
	const navLinks = document.querySelectorAll('.nav-list a');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (nav.classList.contains('active')) {
				menuToggle.click(); // Trigger close logic
			}
		});
	});

	// Smooth Scrolling for anchor links (Standard behavior handled by CSS, but good for older browsers or complex needs)
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const headerOffset = 70;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	// Intersection Observer for Fade-in animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px"
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Add fade-in class to sections
	document.querySelectorAll('.section').forEach(section => {
		section.classList.add('fade-in-section');
		observer.observe(section);
	});
});

/* CSS required for the fade-in animation logic above */
/*
.fade-in-section {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.visible {
	opacity: 1;
	transform: none;
}
*/
