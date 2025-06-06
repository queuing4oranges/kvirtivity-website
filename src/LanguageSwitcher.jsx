import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './languageswitcher.scss';

// Component to toggle between languages
export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language || 'cz');
	
	// Set initial language to Czech if not already set
	useEffect(() => {
		if (i18n.language !== language) {
			i18n.changeLanguage(language);
		}
	},[language, i18n]);

	const changeLanguage = () => {
		const newLanguage = language === 'cz' ? 'en' : 'cz';
		setLanguage(newLanguage);
		i18n.changeLanguage(newLanguage);
	};
	
	return (
		<div className='switch position-relative d-inline-block my-0 mx-2'>
			<input
				id='language-toggle'
				className='check-toggle check-toggle-round-flat'
				type='checkbox'
				checked={language === 'en'}
				onChange={changeLanguage}
			/>
			<label htmlFor='language-toggle'/>
			<span className='on'>CZ</span>
			<span className='off'>EN</span>
		</div>
	)
}
