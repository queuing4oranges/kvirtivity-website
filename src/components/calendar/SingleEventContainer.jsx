import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import { Row, Col, Button } from 'reactstrap';

import { GlobalContext } from '../../utils/GlobalContextProvider';
import { API_BASE_URL } from '../../api';
import { formatDateWithTranslation } from '../../utils/dateConverter';
import NoEventCard from './NoEventCard.jsx';
import CustomButton from '../../includes/CustomButton.jsx';

import './singleeventcontainer.scss';
import SignupForm from './SignupForm.jsx';

export default function SingleEventContainer() {
	const { t } = useTranslation();
	const { events, singleEventId } = useContext(GlobalContext);
	const [modal, setModal] = useState(false);

	// Find selected event in events array
	const selectedEvent = events.find((event) => event.id === singleEventId);

	// Destructure information from events
	const {
		name, description,
		date, time,
		price, capacity, latitude, longitude, signup,
		loc_name: locationName,
		loc_website: website,
		loc_address: address,
		image_path: image
	} = selectedEvent;

	//TODO Move to utils
	// Create a calender event for Google user
	const handleGoogleCalendar = () => {		
		const startTime = moment.tz(`${date}T${time}`, 'Europe/Paris');
		const endTime = startTime.clone().add(3, 'hours')
		
		// Format the dates to YYYYMMDDTHHmmssZ
		const formattedStartTime = startTime.format('YYYYMMDDTHHmmss');
		const formattedEndTime = endTime.format('YYYYMMDDTHHmmss');

		const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(name)}&dates=${formattedStartTime}/${formattedEndTime}&location=${encodeURIComponent(address)}&sprop=&sprop=name:`;
		
		window.open(googleCalendarUrl, '_blank');
	}
	
	//TODO Move to utils
	// Create a calender event for Apple user
	const handleAppleCalendar = () => {
		const startTime = moment.tz(`${date}T${time}`, 'Europe/Paris');
		const endTime = startTime.clone().add(3, 'hours')

		// Format the dates to YYYYMMDDTHHmmssZ
		const formattedStartTime = startTime.format('YYYYMMDDTHHmmss');
		const formattedEndTime = endTime.format('YYYYMMDDTHHmmss');

		// Strip leading whitespace
		const stripIndent = (str) => str.replace(/^\s+/gm, ''); // Preventing problems with whitespace in isContent
		
		// Create the .ics file content
		const icsContent = stripIndent(`
			BEGIN:VCALENDAR
			VERSION:2.0
			BEGIN:VEVENT
			SUMMARY:${name}
			DTSTART:${formattedStartTime}
			DTEND:${formattedEndTime}
			LOCATION:${address}
			END:VEVENT
			END:VCALENDAR
		`);
		
		// Create a Blob with the .ics content
		const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'event.ics');
		document.body.appendChild(link);

		// Trigger a click on the link to start the download
		link.click();

		// Remove the link from the document
		document.body.removeChild(link);
	};

	return (
		<div key={date} className='h-100 d-flex flex-column m-0 p-0'>
			{!selectedEvent ? (
				<NoEventCard />
			) : (
				<>
					<Row>
						{name && (
							<Row className='mb-4 w-100'>
								<Col><h2>{name}</h2></Col>
							</Row>
						)}
					</Row>
					{/* TODO sign up button for speed dating etc. */}
					<Row className='g-0 d-flex justify-content-between position-relative'>
						<Col md={5}>
							{date && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-calendar2-heart' />
									</Col>
									<Col xs={11} md={11}>
										<p>{formatDateWithTranslation(date)}</p>
									</Col>
								</Row>
							)}
							{time && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-clock' />
									</Col>
									<Col xs={11} md={11}>
										<p>{time}</p>
								</Col>
								</Row>
							)}
							{locationName && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-geo-alt' />
									</Col>
									<Col xs={11} md={11}>
										<p>{locationName}</p>
									</Col>
								</Row>
							)}
							{website && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-globe' />
									</Col>
									<Col xs={11} md={11}>
										<a
											href={website}
											target='_blank'
											rel='noopener noreferer'
											className='text-decoration-none'
										>
											<p>{website}</p>
										</a>
								</Col>
								</Row>
							)}
							{address && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-map' />
									</Col>
									<Col xs={11} md={11}>
										<p>{address}</p>
									</Col>
								</Row>
							)}
							{price != null && price !== 0 && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-cash-coin' />
									</Col>
									<Col xs={11} md={11}>
										<p>{price}</p>
									</Col>
								</Row>
							)}
							{capacity != null && capacity !== 0 && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-people' />
									</Col>
									<Col xs={11} md={11}>
										<p>{capacity}</p>
									</Col>
								</Row>
							)}
							{(description != null && description !== '') && (
								<Row className='w-100'>
									<Col xs={1} md={1}>
										<i className='bi bi-info-square' />
									</Col>
									<Col xs={11} md={11}>
										<p>{description}</p>
									</Col>
								</Row>
							)}
							{(signup != null && signup === 1) && (
								<Row>
									<Col md={6} className='sign-up-button'>
										<CustomButton
											buttonTitle={t('Events.Přihlášeni')}
											name={t('Events.Přihlášeni')}
											iconName='bi bi-person-plus'
											onClick={() => setModal(!modal)}
										/>
									</Col>
								</Row>
							)}
						</Col>
						<Col
							xs={12} md={2}
								className='mt-1 add-to-calendar-button d-flex flex-sm-row flex-md-column align-items-center justify-content-center justify-content-md-start'
						>
							<Button
								color='info'
								title={t('Events.Přidat do Kalendáře Google')}
								onClick={() => handleGoogleCalendar()}
							>
								<i className='bi bi-google' />
							</Button>
							<Button
								color='info'
								title={t('Events.Přidat do Kalendáře Apple')}
								onClick={() => handleAppleCalendar()}
							>
								<i className='bi bi-apple' />
							</Button>
						</Col>
						<Col md={5} className='h-100 d-flex justify-content-end'>
							<Row>
								<img
									/* TODO make a fallback picture */
									src={`${API_BASE_URL}/events/images/${image}`}
									alt={name}
									loading='eager'
									className='single-event-image'
								/>
							</Row>
						</Col>
					</Row>

					{/* TODO make below separate component */}
					<Row md='12' className='w-100 g-0 d-flex justify-content-center mt-4'>
						<div
							className='w-100 h-100 d-flex position-relative'
							onClick={() => {
								// Open Google Maps in a new tab with the specified location
								const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
								window.open(url, '_blank');
							}}
						>
							<iframe
								id='iframeId'
								height='300rem'
								width='100%'
								src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`}
							/>
							{/* Transparent overlay to capture clicks */}
							<span
								className='position-absolute top-0 left-0 w-100 h-100 zindex-1'
								style={{ background: 'transparent' }}
							/>
						</div>
					</Row>
					{modal &&
						<SignupForm
							modal={modal}
							setModal={setModal}
							name={name}
							date={date}
							time={time}
						/>
					}
				</>
			)}
		</div>
  );
}
