import React from 'react';
import { Button } from 'reactstrap';

import './custombutton.scss';

export default function CustomButton({
	buttonTitle = '', // Hover title for button
	name = '', // Title of the button
	color = '', // Bootstrap button color (for example 'success', 'danger')
	onClick = null,
	iconName = '', // Name of the bootstrap icon (for example 'bi bi-clock')
	iconClass = '' // Possiblity to add custom styling
}) {
	return (
		<span>
			<Button
				title={buttonTitle}
				color={color}
				onClick={onClick}
				className={`custom-button ${iconClass}`}
			>
				<i className={`me-3 ${iconName}`}/>
				{name}
			</Button>
		</span>
	)
}
