import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Container, Row, Col
} from 'reactstrap';

import { apiClient } from '../../api';
import EventsContainer from './EventsContainer';

import './calendar.scss';
import { GlobalContext } from '../../utils/GlobalContextProvider';
import Xicon from '../../assets/icons';
import SingleEventContainer from './SingleEventContainer';
// TODO Make spinner component for loading
// TODO Make alert if it isnt possible to get events
//TODO Make empty page when no data is loading

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
		<Container fluid className='min-vh-100 p-2 p-md-5 calendar-container'>
			<Row className='w-100'>
				<Col md={2} className='title-row'><h1>{t('Kalendář')}</h1></Col>
				<Col xs={12} md={10} className='events-wrapper d-flex flex-column align-items-start'>
					{(showSingleEvent === false)
						? <>
						<Row style={{ height: '3rem' }}></Row>
							<Row className='events-container'>
								<EventsContainer />
							</Row>
						</>
						: <>
							<Row className='x-icon-row' style={{height: '3rem' }}>
								<span
									title={t('Zavřít')}
									className='event-close-btn d-flex justify-content-end pe-0'
									onClick={() => setShowSingleEvent(!showSingleEvent)}
								>
									<Xicon width={30} height={30} color={'#fe00ec'}/>
								</span>
							</Row>
							<Row className='single-event-container mx-auto h-100 g-0 p-2 p-md-5 position-relative'>
								<SingleEventContainer/>
							</Row>
						</>
					}
				</Col>
			</Row>
		</Container>
	);
}

export default Calendar