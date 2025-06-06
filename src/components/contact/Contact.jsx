import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'
import {
	Container, Row, Col, Card,
	Form, FormGroup, Label, FormFeedback,
	Button
} from 'reactstrap';

import SocialMedia from '../../assets/SocialMedia.jsx';

import './contact.scss';
import FooterFlag from '../../includes/FooterFlag.jsx';

//TODO add animation to send button or a toast

export default function Contact() {
	const { t } = useTranslation();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const contactForm = useRef();

	// Set up emailjs
	// const serviceId = import.meta.env.VITE_SERVICE_ID;
	// const templateId = import.meta.env.VITE_TEMPLATE_ID;
	// const publicKey = import.meta.env.VITE_PUBLIC_KEY;

	// Register the input fields
	const userName = register('userName', { required: t('ContactUs.Povinné údaje') });
	const email = register('email', { required: t('ContactUs.Povinné údaje') });
	const message = register('message', { required: t('ContactUs.Povinné údaje') });

	useEffect(() => {
		const icons = document.getElementsByClassName('a-icon');
		const handleMouseEnter = (event) => {
			event.target.classList.add('bounce-top');

			setTimeout(() => {
				event.target.classList.remove('bounce-top');
			}, 500);
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

	const sendContactForm = (values) => {
console.log(values); //TODO remove this line
		try {
			const response = emailjs.sendForm(
				serviceId,
				templateId,
				contactForm.current,
				publicKey
			);
			if (response) {
				console.log(response); //TODO use message from response ?
				console.log('Email sent successfully');
			}
		} catch (error) {
			console.error('Error sending email:', error);
		} finally {
			// TODO Add some kind of animation or toast
		}
	}

	return (
		<Container fluid className='p-2 p-md-5 contact-container'>
			<Row className='w-100 mx-auto'>
				<Col md={2} className='title-row'><h1>{t('Kontakt')}</h1></Col>
				<Col xs={12} md={10} className='contact-form-column'>
					<Row className='title-row w-100 w-md-75 contact-card-container p-2 p-md-5'>
						<Col md={6} className='socials-column'>
							<div><SocialMedia /></div>
							<div className='contact-socials-icons-container d-flex justify-content-center'>
								<a
									className='mx-3 a-icon'
									title='Facebook'
									href='https://www.facebook.com/kvirtivity'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='bi bi-facebook' />
								</a>
								<a
									className='mx-3 a-icon'
									href='https://www.instagram.com/kvirtivity'
									title='Instagram'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='bi bi-instagram' />
								</a>
								<a
									className='mx-3 a-icon'
									href='mailto:info@kvirtivity.cz'
									title='Email'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='bi bi-envelope'/>
								</a>
							</div>
						</Col>
						<Col md={6}>
							<Form ref={contactForm} onSubmit={handleSubmit(sendContactForm)} className='p-2 p-md-5'>
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
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
