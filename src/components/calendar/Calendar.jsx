import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Container, Row,
} from 'reactstrap';

import { apiClient } from '../../api';
import EventsContainer from './EventsContainer';

import './calendar.scss';
import { GlobalContext } from '../../utils/GlobalContextProvider';
import SingleEventContainer from './SingleEventContainer';
// TODO Make spinner component for loading
// TODO Make alert if it isnt possible to get events

function Calendar() {
	const { t } = useTranslation();
	const { events, setEvents, showSingleEvent } = useContext(GlobalContext);
	
	useEffect(() => {
		getEvents();
	},[]);
	
	const getEvents = async () => {
		try {
			const response = await apiClient.get('/events/read.php');
			if(response.status !== 200) {
				throw new Error(`Something went wrong. Response status: ${response.status}`);
			}
			setEvents(response.data);
		} catch {
			console.error('Could not retrieve events');
		}
	};
	
	return (
		<Container fluid className='h-100 p-5 calendar-container'>
			<Row><h2>{t('Kalendář')}</h2></Row>
			<div className='w-100 h-100 d-flex events-wrapper flex-column align-items-center'>
				<Row>{/* TODO there should be some filtering for the events */}</Row>
				{(showSingleEvent === false)
					? <Row className='events-container mt-5'><EventsContainer /> </Row>
					: <Row className='w-75 h-100 mt-5'><SingleEventContainer/></Row>
				}
			</div>
		</Container>
	)
}

export default Calendar