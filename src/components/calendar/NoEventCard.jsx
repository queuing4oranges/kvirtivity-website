import React, { useContext } from 'react'; 
import { useTranslation } from 'react-i18next';
import { Row, Col, Card, Button, Container } from 'reactstrap';
import { GlobalContext } from '../../utils/GlobalContextProvider';

export default function NoEventCard() {
	const { t } = useTranslation();
	const { showSingleEvent, setShowSingleEvent } = useContext(GlobalContext);
	
	return (
		<Row className='w-100 d-flex justify-content-center'>
			<Col md='4'>
				<Card className='p-5 d-flex flex-column justify-content-center align-items-center'>
					<span><p>{t('SingleEvent.Nebyl nalezen žádný událost.')}</p></span>
					<span><p>{t('SingleEvent.Prosím, vraťte se zpět a vyberte událost.')}123</p></span>
					<span className='mt-4'>
						<Button
							color='info'
							onClick={() => setShowSingleEvent(!showSingleEvent)}
						>
							{t('SingleEvent.Zpět na události.')}
						</Button>
					</span>
				</Card>
			</Col>
		</Row>

	);
}
