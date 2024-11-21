import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardImg, CardBody } from 'reactstrap';

import { API_BASE_URL } from '../../api';
import { GlobalContext } from '../../utils/GlobalContextProvider';

import './eventscontainer.scss';

//TODO make alternative image if image is broken or missing

export default function EventsContainer() {
	const { t } = useTranslation();
	const { events,
		showSingleEvent, setShowSingleEvent,
		setSingleEventId 
	} = useContext(GlobalContext);

	// Get the abbreviated name of the month and localize it
	const getMonthName = (datestring) => {
		// Check if the datestring is a valid string
		if (typeof datestring !== 'string' || !datestring.trim()) {
			return '';
		}
		
		// Check if the datestring is in a valid date format ('YYYY-MM-DD')
		const date = new Date(datestring);
		if (isNaN(date.getTime())) {
			return ''; // Return empty string for invalid date format
  		}
		
		const months = [
			t('Months.Led'), t('Months.Úno'), t('Months.Bře'), t('Months.Dub'), t('Months.Kvě'), t('Months.Čvn'),
			t('Months.Čvc'), t('Months.Srp'), t('Months.Zář'), t('Months.Říj'), t('Months.Lis'), t('Months.Pro')
		]
		
		// Extract the month part from the date string
		const monthNumber = parseInt(datestring.split('-')[1], 10); // Convert 02 to 2
		
		return months[monthNumber - 1] // Adjust for zero-based index
	};
	
	// Get the day of the event date
	const getDay = (datestring) => {
		// Check if the datestring is a valid string
		if (typeof datestring !== 'string' || !datestring.trim()) {
			return '';
		}

		const date = new Date(datestring);
		return date.getDay()
	};

	return (
		<>
			{events && events.map((event, idx) => (
				<Card
					key={idx}
					className='p-0 event-card rounded-2 overflow-hidden'
					onClick={() => (
						setSingleEventId(event.id),
						setShowSingleEvent(!showSingleEvent)
					)}
				>
					<div className='event-image'>
						<CardImg
							src={`${API_BASE_URL}/events/images/${event.image_path}`}
							className='w-100 h-100 object-cover rounded-top'
						/>
						<div className='date-square position-absolute top-0 start-0 p-2  bg-opacity-75 text-center'>
							<span className='date-square-month d-block fw-bold text-uppercase'>{getMonthName(event.date)}</span>
							<span className='date-square-day d-block fw-bold'>{getDay(event.date)}</span>
						</div>
					</div>
					<CardBody className='event-content d-flex flex-column justify-content-center text-center p-3'>
						<h4 className='mb-2'>{event.name}</h4>
						<p className='mb-1 text-muted'>{event.time}</p>
						<p className='mb-0 text-muted'>{event.loc_name}</p>
					</CardBody>
				</Card>
			))}			
		</>
	);
}
