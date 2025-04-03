import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Container, Row, Col, Card,
	Form, FormGroup, Label,
	Button
} from 'reactstrap';

import SocialMedia from '../../assets/SocialMedia.jsx';

import './contact.scss';

export default function Contact() {
	const { t } = useTranslation();

	useEffect(() => {
		const icons = document.getElementsByClassName('bi');
		const handleMouseEnter = (event) => {
			event.target.classList.add('bounce-top');

			setTimeout(() => {
				event.target.classList.remove("bounce-top");
			}, 500); // Adjust timing based on animation duration
		};

		for (let icon of icons) {
			icon.addEventListener('mouseenter', handleMouseEnter);
		}

		return () => {
			for (let icon of icons) {
				icon.removeEventListener('mouseenter', handleMouseEnter);
			}
		}
	}, []);

	return (
		<Container fluid className='h-100 p-5 contact-container d-flex justify-content-center align-items-center'>
			<Row className='w-75'>
				<Card className='contact-card-container d-flex flex-row m-5 p-5'>
					<Col md='6' className='socials-column'>
						<div><SocialMedia /></div>
						<div className='contact-socials-icons-container d-flex justify-content-center'>
							<i className='bi bi-facebook mx-3' title='Facebook' />
							<i className='bi bi-instagram mx-3' title='Instagram' />
							<i className='bi bi-envelope mx-3' title='Email'/>
						</div>
					</Col>
					<Col md='6'>
						<Form className='p-5'>
							<FormGroup>
								<Label>{t('ContactUs.Jméno')}</Label>
								<input className='form-control'/>
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<input className='form-control'/>
							</FormGroup>
							<FormGroup>
								<Label>{t('ContactUs.Zpráva')}</Label>
								<textarea className='form-control' />
							</FormGroup>
							<Button color='info' className='custom-button'>{t('ContactUs.Odeslat')}</Button>
						</Form>
					</Col>
					
				</Card>
			</Row>
		</Container>
	)
}
