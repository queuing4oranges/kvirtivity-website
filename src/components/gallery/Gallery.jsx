import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Col, Row } from 'reactstrap';
import { FramePink } from '../../assets/frame-pink';
import { FrameBlue } from '../../assets/frame-blue';
import { FrameYellow } from '../../assets/frame-yellow';
import { apiClient, API_BASE_URL } from '../../api';

import './gallery.scss';

export default function Gallery() {
	const { t } = useTranslation();
	const [images, setImages] = useState();

	// Create array of frames
	const frames = [FrameBlue, FramePink, FrameYellow];

	useEffect(() => {
		getImages();
	},[]);

	// Get images
	const getImages = async () => {
		try {
			const response = await apiClient.get('/images/read.php');
			if(response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setImages(response.data);
		} catch {
			console.error('Could not retrieve images');
		}
	};

	return (
		<Container fluid className='min-vh-100 p-2 p-md-5 gallery-container'>
			<Row>
				<Col md={2} className='title-row'><h1>{t('Galerie')}</h1></Col>
				<Col xs={12} md={10} className='title-row gallery-images-container'>
					{images && images.map((img, idx) =>  {
						const RandomFrame = frames[Math.floor(Math.random() * frames.length)]
						return (
						<div key={idx} className='position-relative p-0'>
							<img src={`${API_BASE_URL}/images/images/${img?.filename}`} style={{ width: "300px", height: "200px", objectFit: "cover" }} />
							<span className='position-absolute top-0 start-0 w-100 h-100'><RandomFrame /></span>
						</div>
					)})}
				</Col>
			</Row>
	</Container>
	);
}
