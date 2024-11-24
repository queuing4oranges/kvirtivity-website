import React, { useContext } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';

import { API_BASE_URL } from '../../api';
import { GlobalContext } from '../../utils/GlobalContextProvider';
import { getDay, getMonthName } from '../../utils/dateConverter';

import './eventscontainer.scss';

//TODO make alternative image if image is broken or missing

export default function EventsContainer() {
	const { events,
		showSingleEvent, setShowSingleEvent,
		setSingleEventId 
	} = useContext(GlobalContext);

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
