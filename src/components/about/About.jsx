import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'reactstrap';

export default function About() {
	const { t } = useTranslation();
	
	const handleSliceClick = (slice) => {
		alert(`You clicked on ${slice}`);
	};

	return (
		<Container fluid className='min-vh-100 p-5 calendar-container d-flex'>
			<Row style={{ marginTop: '3rem' }}><h1>{t('O Nás')}</h1></Row>
			<Row>
				<svg width="977" height="977" viewBox="0 0 977 977" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						onClick={() => console.log('blue clicked')}
						className='path-blue'
						d="M836.85 502.024C842.371 441.38 831.974 380.345 806.687 324.949C781.399 269.553 742.096 221.713 692.66 186.155C643.225 150.598 585.368 128.554 524.805 122.201C464.242 115.848 403.07 125.407 347.332 149.931L488.291 470.291L836.85 502.024Z"
						fill="#00FFFF"
					/>
					<path
						onClick={() => console.log('pink clicked')}
						d="M284.266 772.72C334.174 808.569 392.64 830.646 453.786 836.733C514.932 842.819 576.602 832.701 632.597 807.394C688.592 782.087 736.938 742.485 772.774 692.568C808.609 642.651 830.671 584.179 836.742 523.032L488.454 488.454L284.266 772.72Z"
						fill="#FF1493"
					/>
					<path
					onClick={() => console.log('yellow clicked')}
					d="M329.556 161.167C274.304 186.773 226.689 226.351 191.415 275.993C156.142 325.634 134.431 383.619 128.428 444.22C122.425 504.821 132.337 565.939 157.185 621.536C182.033 677.133 220.958 725.285 270.112 761.233L476.723 478.723L329.556 161.167Z"
					fill="#FFFF33"
					/>
				</svg>
			</Row>
		</Container>
	);
}