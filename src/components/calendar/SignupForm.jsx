import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
	Button,
	Modal, ModalHeader, ModalBody,
	Form, FormGroup, Label, FormFeedback
} from 'reactstrap';

import { formatDateWithTranslation } from '../../utils/dateConverter';
import './signupform.scss';


// TODO add toast after successfully sending the form
export default function SignupForm({ modal, setModal, name, date, time }) {
	const toggle = () => setModal(!modal);
	const { t } = useTranslation();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const transformedDate = formatDateWithTranslation(date)

	// Age groups for signup form
	const ageGroups = [
		{ id: 1, age: '20-25' },
		{ id: 2, age: '26-30' },
		{ id: 3, age: '31-35' },
		{ id: 4, age: '36-40' },
		{ id: 5, age: '41-45' },
		{ id: 6, age: '46-50' },
		{ id: 7, age: '50-60' },
		{ id: 8, age: '60-70' },
		{ id: 9, age: '70+' },
	];

	// Register the input fields
	const participantName = register('participantName', { required: t('Povinné údaje') });
	const signupEmail = register('signupEmail', { required: t('Povinné údaje') });
	const signupPhone = register('signupPhone');
	const signupAge = register('signupAge');

	const sendSignup = (values) => {
		// TODO implement the signup function
		console.log(values, 'Signup form submitted');
	}

	return (
		<Modal centered size='lg' className='signup-modal-container' isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>
				<p className='signup-name'>{name && name}</p>
				{transformedDate && <span className='signup-date'>&nbsp;({transformedDate})</span>}
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(sendSignup)} className='p-2 p-md-5'>
					<FormGroup>
						<Label>{t('Signup.Jméno')}</Label>
						<input
							className={`form-control ${errors.participantName ? 'is-invalid' : ''}`}
							type='text'
							invalid={errors.participantName && 'true'}
							id='participantName'
							name='participantName'
							autoComplete='off'
							{...participantName}
						/>
						{errors?.participantName &&
							<FormFeedback>
								{errors.participantName.message}
							</FormFeedback>
						}
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<input
							className={`form-control ${errors.signupEmail ? 'is-invalid' : ''}`}
							type='email'
							invalid={errors.signupEmail && 'true'}
							id='signupEmail'
							name='signupEmail'
							autoComplete='off'
							{...signupEmail}
						/>
						{errors.signupEmail &&
							<FormFeedback>
								{errors.signupEmail.message}
							</FormFeedback>
						}
					</FormGroup>
					<FormGroup>
						<Label>{t('Signup.Telefon')}</Label>
						<input
							className={`form-control ${errors.signupPhone ? 'is-invalid' : ''}`}
							type='tel'
							invalid={errors.signupPhone && 'true'}
							id='signupPhone'
							name='signupPhone'
							autoComplete='off'
							pattern='^(\+\d{1,3} ?)?\d{3} ?\d{3} ?\d{3,6}$'
							placeholder='+420 123 456 789'
							{...signupPhone}
						/>
						{errors.signupPhone &&
							<FormFeedback>
								{errors.signupPhone.message}</FormFeedback>}
					</FormGroup>
					<FormGroup>
						<Label>{t('Signup.Věk')}</Label>
						<input
							className='form-control'
							placeholder={t('Signup.Sdílej, pokud chceš.')}
							list='participantAges'
							id='signupAge'
							name='signupAge'
							{...signupAge}
						/>
						<datalist id='participantAges'>
							{ageGroups.map((age) => (
								<option key={age.id} value={age.age}></option>
							))}
						</datalist>
					</FormGroup>
					<FormGroup>
							<input
							className='me-2'
								type='checkbox'
								{...register('newsletter')}
								id='speedNewsletter'
							/>
							<Label check>{t('Signup.Chci dostávat informace o dalších akcích.')}</Label>
					</FormGroup>
				<Button
					type='submit'
					color='info'
					className='custom-button'
					style={{ width: '12rem'}}
				>
					<i className='bi bi-rocket-takeoff me-2' />
					{t('Signup.Zaregistrujte se!')}
				</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
}
