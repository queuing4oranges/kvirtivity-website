import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'reactstrap';
import { FramePink } from '../../assets/frames';

import './gallery.scss';

export default function Gallery() {
	const { t } = useTranslation();
	return (
	<Container fluid className='min-vh-100 p-5 gallery-container d-flex'>
		<Row style={{ marginTop: '3rem' }}>
			<h1>{t('Galerie')}</h1>
			<FramePink />
		</Row>
	</Container>
	);
}
