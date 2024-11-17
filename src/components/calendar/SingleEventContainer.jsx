import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
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

		const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(name)}&dates=${formattedStartTime}/${formattedEndTime}&location=${encodeURIComponent(loc_address)}&sprop=&sprop=name:`;
		
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
			LOCATION:${loc_address}
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
			className='w-100 h-100 d-flex flex-column m-0 p-0'
		>
			{/* TODO make a back button somewhere - this can have the same fct as my portfolio eye btn */}
			{/* TODO add to calendar button */}
			{/* TODO sign up button for speed dating etc. */}
			<Row className='w-100 g-0 d-flex justify-content-between'>
				<Col md={6} className='h-100'>
					{name && <Row>
						<Col><h3>{name}</h3></Col>
					</Row>
					}
					{date && <Row>
						<Col md={1}><i className='bi bi-calendar2-heart'/></Col>
						<Col>{date}</Col>
					</Row>
					}
					{time && <Row>
						<Col md={1}><i className='bi bi-clock'/></Col>
						<Col>{time}</Col>
					</Row>
					}
					{locationName && <Row>
						<Col md={1}><i className='bi bi-geo-alt'/></Col>
						<Col>{locationName}</Col>
					</Row>
					}
					{website && <Row>
						<Col md={1}><i className='bi bi-globe'/></Col>
						<Col>{website}</Col>
					</Row>
					}
					{address && <Row>
						<Col md={1}><i className='bi bi-map'/></Col>
						<Col>{address}</Col>
					</Row>
					}
					{price && <Row>
						{/* TODO exclude 0 values coming from DB */}
						<Col md={1}><i className='bi bi-cash-coin'/></Col>
						<Col>{price}</Col>
					</Row>
					}
					{capacity && <Row>
						<Col md={1}><i className='bi bi-people'/></Col>
						<Col>{capacity}</Col>
					</Row>
					}
					{description && <Row>
						<Col md={1}><i className='bi bi-info-square'/></Col>
						<Col>{description}</Col>
					</Row>
					}
					{signup && (signup === 1) && <Row>
						{/* TODO make a reusable button here */}
						<Col md={6} className='ps-0'>
							<Button>
								<i className='bi bi-person-plus me-3'/>
								{t('Events.Přihlášeni')}
							</Button>
						</Col>
					</Row>
					}
				</Col>

				<Col md={6} className='h-100 position-relative'>
					<Button
						outline
						color='secondary'
						title={t('Zavřít')}
						className='event-close-btn position-absolute top-0 end-0 p-0 zindex-3'
						onClick={() => setShowSingleEvent(!showSingleEvent)}
					>
						<i className='bi bi-x-lg fs-2 fw-5' />
					</Button>
					<Row>
						<img
							/* TODO make a fallback picture */
							src={`${API_BASE_URL}/events/images/${image}`}
							alt={name}
							loading='eager'
							style={{ width: '100%', height: '100%', objectFit: 'contain' }}
						/>
					</Row>

					<Row>
						{/* google maps */}
					</Row>

				</Col>
			</Row>
			<Row md='12' className='w-100 g-0 d-flex justify-content-center'>
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
						className='overlay-thingy position-absolute top-0 left-0 w-100 h-100 zindex-1'
						style={{ background: 'transparent' }}
					/>
				</div>
			</Row>
		</div>
	);
}
