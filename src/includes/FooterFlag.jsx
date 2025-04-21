import React, { useState, useEffect } from 'react';

import './footerflag.scss';
import { Collapse } from 'reactstrap';

export default function FooterFlag() {
	const [isOpen, setIsOpen] = useState(false);
	const currentYear = new Date().getFullYear();

	// Detect if the screen is mobile-sized
	useEffect(() => {
		const handleResize = () => {
			if (window.matchMedia('(max-width: 768px)').matches) {
				setIsOpen(true); // Always open on mobile
			}
		};

		// Set initial state based on screen size
		handleResize();

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Cleanup event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div
			className='footer-flag'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<span>
				<p className='mb-1'>&copy; {currentYear}&nbsp;Kvírtivity 🚀 by Katja </p>
			</span>
			<Collapse isOpen={isOpen}>
				<span className='d-flex'>
					<p className='contactme'>Contact me</p>
					<a
						className='mx-2'
						href='https://www.linkedin.com/in/katja-zenker/'
						target='_blank'
						rel='noopener noreferrer'
						title='Katja on LinkedIn'
					>
						<i className='bi bi-linkedin'/>
					</a>
					<a
						href='https://www.instagram.com/queuing4oranges/'
						target='_blank'
						rel='noopener noreferrer'
						title='Katja on Instagram'
					>
						<i className='bi bi-instagram'/>
					</a>
				</span>
			</Collapse>
		</div>
	);
};
