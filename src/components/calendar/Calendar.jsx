import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Container, Row, Col,
	Card, CardHeader, CardBody
} from 'reactstrap';

import apiClient from '../../api';
import NavbarContainer from '../navbar/NavbarContainer';
// TODO Make spinner component for loading
// Make alert if it isnt possible to get events

function Calendar() {
	const { t } = useTranslation();
	const [events, setEvents] = useState([]);
	
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
		<>
			<Container className='w-100 m-0'>
				{/* <Row><h2>{t('Kalendář')}</h2></Row> */}
			</Container>
		</>
	)
}

export default Calendar