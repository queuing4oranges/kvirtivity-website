import React, { useState } from 'react';

import './footerflag.scss';
import { Collapse } from 'reactstrap';

//TODO setup mobile version with flag in the bottom/middle
export default function FooterFlag() {
	const [isOpen, setIsOpen] = useState(false);
	const currentYear = new Date().getFullYear();
	return (
		<div
			className='footer-flag'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
		>
			<span id='toggler'>
				<p className='mb-1'>&copy; {currentYear}&nbsp;Kvírtivity 🚀 by Katja </p>
			</span>
			<Collapse isOpen={isOpen}>
				<span className='d-flex justify-content-center'>
					<p>Contact me</p>
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
