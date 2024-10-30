import { useState, useEffect } from 'react';
import apiClient from '../../api';

function Calendar() {
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
			console.error('Could not retrieve events')
		}
	};
	
	return (
		<div>Calendar</div>
	)
}

export default Calendar