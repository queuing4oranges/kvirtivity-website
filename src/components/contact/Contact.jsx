import React from 'react';
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
	return (
		<Container fluid className='h-100 p-5 contact-container d-flex justify-content-center align-items-center'>
			<Row className='w-75 p-5' style={{ border: '2px solid blue'}}>
				<Card className='contact-card-container border-0 d-flex flex-row'>
					<Col md='6' style={{ border: '2px solid red' }}>
						<div><SocialMedia /></div>
						<div className='fs-1'>
							<i className='bi bi-facebook' />
							<i className='bi bi-instagram'/>
							<i className='bi bi-envelope' />
						</div>
						{/* illustration and socials */}
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
