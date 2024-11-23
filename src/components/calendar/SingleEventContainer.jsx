import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import { Card, Row, Col, Button } from 'reactstrap';

import { GlobalContext } from '../../utils/GlobalContextProvider';
import { API_BASE_URL } from '../../api';

import './singleeventcontainer.scss';

export default function SingleEventContainer() {
	const { t } = useTranslation();
	const { events, showSingleEvent, singleEventId, setShowSingleEvent } = useContext(GlobalContext);

	// Find selected event in events array
	const selectedEvent = events.find((event) => event.id === singleEventId);

	// Destructure information from events
	const {
		name, description, //TODO consider RTE for description to get formatted text
		date, time,
		price, capacity, latitude, longitude, signup,
		event_type: typeOfEvent,
		loc_name: locationName,
		loc_website: website,
		loc_address: address,
		image_path: image
	} = selectedEvent;
	
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
	
	// Handle the case when no event is found
	if (!selectedEvent) {
		return (
			// TODO show some kind of 404
			// TODO translate text and button
			// TODO styling of card
			<Col md='4'>
				<Card className='p-5 d-flex flex-column justify-content-center align-items-center'>
					<span><p>No event found :(</p></span>
					<span><p>Please go back and select an event</p></span>
					<span className='mt-4'>
						<Button
							color='info'
							onClick={() => setShowSingleEvent(!showSingleEvent)}
						>
							Back to events
						</Button>
					</span>
				</Card>
			</Col>
		)
	}
	
	return (
		<div
			key={date}
			className='h-100 d-flex flex-column m-0 p-0'
		>
			{/* TODO sign up button for speed dating etc. */}
			<Row className='w-100 g-0 d-flex justify-content-between position-relative'>
				<Col md={5} className='h-100'>
					{name && <Row className='mb-4 w-100'>
						<Col><h2>{name}</h2></Col>
					</Row>
					}
					{/* TODO make date readable */}
					{date && <Row className='w-100'>
						<Col md={1}><i className='bi bi-calendar2-heart'/></Col>
						<Col><p>{date}</p></Col>
					</Row>
					}
					{time && <Row className='w-100'>
						<Col md={1}><i className='bi bi-clock'/></Col>
						<Col><p>{time}</p></Col>
					</Row>
					}
					{locationName && <Row className='w-100'>
						<Col md={1}><i className='bi bi-geo-alt'/></Col>
						<Col><p>{locationName}</p></Col>
					</Row>
					}
					{website && <Row className='w-100'>
						<Col md={1}><i className='bi bi-globe'/></Col>
						<Col><p>{website}</p></Col>
					</Row>
					}
					{address && <Row className='w-100'>
						<Col md={1}><i className='bi bi-map'/></Col>
						<Col><p>{address}</p></Col>
					</Row>
					}
					{price && <Row className='w-100'>
						{/* TODO exclude 0 values coming from DB */}
						<Col md={1}><i className='bi bi-cash-coin'/></Col>
						<Col><p>{price}</p></Col>
					</Row>
					}
					{capacity && <Row className='w-100'>
						<Col md={1}><i className='bi bi-people'/></Col>
						<Col><p>{capacity}</p></Col>
					</Row>
					}
					{description && <Row className='w-100'>
						<Col md={1}><i className='bi bi-info-square'/></Col>
						<Col><p>{description}</p></Col>
					</Row>
					}
					{signup && (signup === 1) && <Row className='mt-5'>
						{/* TODO make a reusable button here */}
						<Col md={6} className=''>
							<Button>
								<i className='bi bi-person-plus me-3'/>
								{t('Events.Přihlášeni')}
							</Button>
						</Col>
					</Row>
					}
				</Col>
				<Col md={2} className='add-to-calendar-button d-flex flex-column align-items-center'>
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
		</div>
	);
}
