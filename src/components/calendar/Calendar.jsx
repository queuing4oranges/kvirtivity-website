import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Container, Row
} from 'reactstrap';

import { apiClient } from '../../api';
import EventsContainer from './EventsContainer';

import './calendar.scss';
import { GlobalContext } from '../../utils/GlobalContextProvider';
import Xicon from '../../assets/icons';
import SingleEventContainer from './SingleEventContainer';
// TODO Make spinner component for loading
// TODO Make alert if it isnt possible to get events

function Calendar() {
	const { t } = useTranslation();
	const { setEvents, setShowSingleEvent, showSingleEvent } = useContext(GlobalContext);
	
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
		<Container fluid className='min-vh-100 p-5 calendar-container'>
			<Row><h1>{t('Kalendář')}</h1></Row>
			<div className='w-100 d-flex events-wrapper flex-column align-items-center'>
				<Row>{/* TODO there should be some filtering for the events */}</Row>
				{(showSingleEvent === false)
					? <> <Row className='w-75' style={{ height: '3rem' }}></Row>
						<Row className='events-container'>
							<EventsContainer />
						</Row>
					</>
					: <>
						<Row className='w-75' style={{height: '3rem' }}>
							<span
								title={t('Zavřít')}
								className='event-close-btn d-flex justify-content-end'
								onClick={() => setShowSingleEvent(!showSingleEvent)}
							>
								<Xicon width={30} height={30} color={'#fe00ec'}/>
							</span>
						</Row>
						<Row className='single-event-container w-75 h-100 g-0 p-5 position-relative'>
							<SingleEventContainer/>
						</Row>
					</>
				}
			</div>
		</Container>
	);
}

export default Calendar