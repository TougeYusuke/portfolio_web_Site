document.addEventListener('DOMContentLoaded', () => {
	// Scroll Animation using Intersection Observer
	const sections = document.querySelectorAll('.section');

	const observerOptions = {
		root: document.querySelector('.main-container'),
		threshold: 0.3
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
			}
		});
	}, observerOptions);

	sections.forEach(section => {
		observer.observe(section);
	});

	// Smooth Scroll for Nav Links (supporting scroll-snap container)
	const navLinks = document.querySelectorAll('.header__nav a');
	const container = document.querySelector('.main-container');

	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href');
			if (targetId.startsWith('#')) {
				const targetSection = document.querySelector(targetId);
				if (targetSection) {
					targetSection.scrollIntoView({
						behavior: 'smooth'
					});
				}
			} else {
				// For external links (like column pages)
				window.location.href = targetId;
			}
		});
	});

	// Mobile Menu Toggle
	const toggle = document.querySelector('.header__toggle');
	const header = document.querySelector('.header');

	if (toggle) {
		toggle.addEventListener('click', () => {
			header.classList.toggle('nav-open');
		});
	}

	// Close menu when a link is clicked
	const links = document.querySelectorAll('.header__nav a');
	links.forEach(link => {
		link.addEventListener('click', () => {
			header.classList.remove('nav-open');
		});
	});

	console.log('App initialized');
});
