import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardImg, CardBody } from 'reactstrap';

import { API_BASE_URL } from '../../api';
import { GlobalContext } from '../../utils/GlobalContextProvider';
import { getDay, getMonthName } from '../../utils/dateConverter';

import './eventscontainer.scss';

//TODO make alternative image if image is broken or missing
//TODO Make empty page when no data is loading
//TODO fix height of the card

export default function EventsContainer() {
	const { t } = useTranslation();
	const { events,
		showSingleEvent, setShowSingleEvent,
		setSingleEventId 
	} = useContext(GlobalContext);

	return (
		<>
			{events && events.map((event, idx) => (
				<Card
					key={idx}
					className='p-0 event-card rounded-0 overflow-hidden'
					onClick={() => (
						setSingleEventId(event.id),
						setShowSingleEvent(!showSingleEvent)
					)}
				>
					<div className='event-image'>
						<CardImg
							src={`${API_BASE_URL}/events/images/${event.image_path}`}
							className='w-100 h-100 object-cover rounded-0'
						/>
						<div className='date-square position-absolute top-0 start-0 p-2 bg-opacity-75 text-center'>
							<span className='date-square-month d-block fw-bold text-uppercase'>{getMonthName(event.date, t)}</span>
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
