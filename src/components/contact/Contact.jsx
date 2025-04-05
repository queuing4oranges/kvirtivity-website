import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
	Container, Row, Col, Card,
	Form, FormGroup, Label, FormFeedback,
	Button
} from 'reactstrap';

import SocialMedia from '../../assets/SocialMedia.jsx';

import './contact.scss';
//TODO implement RHF
//TODO add links to icons
//TODO add animation to send button or a toast
// TODO the send button needs fixed width to not change when changing language
export default function Contact() {
	const { t } = useTranslation();
	const { register, handleSubmit, formState: { errors } } = useForm();

	const userName = register('userName', { required: t('ContactUs.Povinné údaje') });
	const email = register('email', { required: t('ContactUs.Povinné údaje') });
	const message = register('message', { required: t('ContactUs.Povinné údaje') });

	useEffect(() => {
		const icons = document.getElementsByClassName('bi');
		const handleMouseEnter = (event) => {
			event.target.classList.add('bounce-top');

			setTimeout(() => {
				event.target.classList.remove('bounce-top');
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

	const sendContactForm = async (data) => {
		console.log(data);
		try {
			// TODO implement sending data to the server
		} catch {
			// TODO handle error
		}
	}

	return (
		<Container fluid className='h-100 p-5 contact-container d-flex'>
			<Row style={{ marginTop: '3rem' }}><h1>{t('Kontakt')}</h1></Row>
			<Row className='contact-container w-75 m-auto' style={{ marginTop: '3rem' }}>
				<Card className='contact-card-container d-flex flex-row p-5 h-75'>
					<Col md='6' className='socials-column'>
						<div><SocialMedia /></div>
						<div className='contact-socials-icons-container d-flex justify-content-center'>
							<i className='bi bi-facebook mx-3' title='Facebook' />
							<i className='bi bi-instagram mx-3' title='Instagram' />
							<i className='bi bi-envelope mx-3' title='Email'/>
						</div>
					</Col>
					<Col md='6'>
						<Form onSubmit={handleSubmit(sendContactForm)} className='p-5'>
							<FormGroup>
								<Label>{t('ContactUs.Jméno')}</Label>
								<input
									className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
									type='text'
									invalid={errors.userName && 'true'}
									id='userName'
									name='userName'
									autoComplete='off'
									{...userName}
								/>
								{errors?.userName &&
									<FormFeedback>
										{errors.userName.message}
									</FormFeedback>
								}
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<input
									className={`form-control ${errors.email ? 'is-invalid' : ''}`}
									type='email'
									invalid={errors.email && 'true'}
									id='email'
									name='email'
									autoComplete='off'
									{...email}
								/>
								{errors.email &&
									<FormFeedback>
										{errors.email.message}
									</FormFeedback>
								}
							</FormGroup>
							<FormGroup>
								<Label>{t('ContactUs.Zpráva')}</Label>
								<textarea
									className={`form-control ${errors.message ? 'is-invalid' : ''}`}
									type='textarea'
									invalid={errors.message && 'true'}
									id='message'
									name='message'
									autoComplete='off'
									{...message}
									rows='5'
								/>
								{errors.message &&
									<FormFeedback>
										{errors.message.message}</FormFeedback>}
							</FormGroup>
							<Button type='submit' color='info' className='custom-button'>{t('ContactUs.Odeslat')}</Button>
						</Form>
					</Col>
					
				</Card>
			</Row>
		</Container>
	)
}
