import React, { useState, useEffect } from 'react';
import apiClient from '../../api';

function Calendar() {
	const [events, setEvents] = useState([]);
	
	useEffect(() => {
		getEvents();
	},[]);
	
	const getEvents = async () => {
		try {
			const response = await apiClient.get('/events/read.php');
			console.log(response.data, 'response from request')
		} catch {
			//
		}
	}
	
	return (
		<div>Calendar</div>
	)
}

export default Calendar