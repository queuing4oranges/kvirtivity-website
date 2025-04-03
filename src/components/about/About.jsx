import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Row, Col } from 'reactstrap';

import marta from '../../assets/images/marta.png';
import person1 from '../../assets/images/person1.png';
import person2 from '../../assets/images/person2.png';
import { aboutData } from './aboutData';

import './about.scss';

export default function About() {
	const { t } = useTranslation();
	const [activeText, setActiveText] = useState('');

	// Function to handle mouse enter
	const handleMouseEnter = (intro) => {
		setActiveText(intro);
	}

	// Function to handle mouse leave
	const handleMouseLeave = () => {
		setActiveText('');
	}

	return (
		<Container fluid className='min-vh-100 p-5 d-flex'>
			<Row style={{ marginTop: '3rem' }}><h1>{t('O Nás')}</h1></Row>
			<Row style={{ marginTop: '3rem' }} className='about-us-container w-75 mx-auto'>
				<Col md='4' className='d-flex flex-column justify-content-start p-5'>
					{!activeText ?
						<>
							<strong>We are Kvŕtivity</strong>
							<p>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Aenean placerat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Phasellus et lorem id felis nonummy placerat. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Etiam commodo dui eget wisi. Aenean vel massa quis mauris vehicula lacinia.
							</p>
						</>
						:
						<>
							<p>
								<strong>Hi, I'm{activeText.name}</strong>
							</p>
							<p>{activeText.intro}</p>
						</>
					}
					</Col>
				<Col md='7' className='d-flex justify-content-center'>
					<div className='d-flex align-items-start justify-content-end'>
						<svg width='750' height='750' viewBox='120 120 720 720' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<defs>
								{/* Define a circular clip path */}
								<clipPath id='clip-blue'>
									<circle cx='600' cy='310' r='100' />
								</clipPath>
								<clipPath id='clip-pink'>
									<circle cx='550' cy='670' r='100' />
								</clipPath>
								<clipPath id='clip-yellow'>
									<circle cx='300' cy='450' r='100' />
								</clipPath>
							</defs>
							{/* Blue Path */}
							<path
								onMouseEnter={() => handleMouseEnter(aboutData[0])}
								onMouseLeave={handleMouseLeave}
								className='path-blue'
								d='M836.85 502.024C842.371 441.38 831.974 380.345 806.687 324.949C781.399 269.553 742.096 221.713 692.66 186.155C643.225 150.598 585.368 128.554 524.805 122.201C464.242 115.848 403.07 125.407 347.332 149.931L488.291 470.291L836.85 502.024Z'
								fill='#00FFFF'
							/>
							<image
								onMouseEnter={() => handleMouseEnter(aboutData[0])}
								onMouseLeave={handleMouseLeave}
								href={marta}
								x='500' y='210' width='200' height='200'
								clipPath='url(#clip-blue)'
							/>
							{/* Pink Path */}
							<path
								onMouseEnter={() => handleMouseEnter(aboutData[1])}
								onMouseLeave={handleMouseLeave}
								className='path-pink'
								d='M284.266 772.72C334.174 808.569 392.64 830.646 453.786 836.733C514.932 842.819 576.602 832.701 632.597 807.394C688.592 782.087 736.938 742.485 772.774 692.568C808.609 642.651 830.671 584.179 836.742 523.032L488.454 488.454L284.266 772.72Z'
								fill='#FF1493'
							/>
							<image
								onMouseEnter={() => handleMouseEnter(aboutData[1])}
								onMouseLeave={handleMouseLeave}
								href={person1}
								x='450' y='570' width='200' height='200'
								clipPath='url(#clip-pink)'
							/>
							{/* Yellow Path */}
							<path
								onMouseEnter={() => handleMouseEnter(aboutData[2])}
								onMouseLeave={handleMouseLeave}
								className='path-yellow'
								d='M329.556 161.167C274.304 186.773 226.689 226.351 191.415 275.993C156.142 325.634 134.431 383.619 128.428 444.22C122.425 504.821 132.337 565.939 157.185 621.536C182.033 677.133 220.958 725.285 270.112 761.233L476.723 478.723L329.556 161.167Z'
								fill='#FFFF33'
							/>
							<image
								onMouseEnter={() => handleMouseEnter(aboutData[2])}
								onMouseLeave={handleMouseLeave}
								href={person2}
								x='200' y='350' width='200' height='200'
								clipPath='url(#clip-yellow)'
							/>
						</svg>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
