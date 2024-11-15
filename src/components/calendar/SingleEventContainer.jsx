import React, { useContext } from 'react';

import { Card, Col } from 'reactstrap';

import { GlobalContext } from '../../utils/GlobalContextProvider';

export default function SingleEventContainer() {
	const { showSingleEvent, setShowSingleEvent } = useContext(GlobalContext);

	return (
		<Card
			onClick={() => setShowSingleEvent(!showSingleEvent)}
			className='w-100 h-100'
		>
			<Col md={6} className='h-100 border'>
			
			</Col>
			
			<Col md={6} className='h-100 border'>
			
			</Col>
		</Card>
	);
}
