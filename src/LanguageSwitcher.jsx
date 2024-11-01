import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './languageswitcher.scss';

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [language, setLanguage] = useState('cz');
	
	const changeLanguage = (lang) => {
		setLanguage(lang);
		i18n.changeLanguage(lang);
	};
	
	return (
		<div className='switch position-relative d-inline-block my-0 mx-2'>
			<input
				id='language-toggle'
				className='check-toggle check-toggle-round-flat'
				type='checkbox'
				checked={language === 'en'}
				onChange={() => changeLanguage(language === 'cz' ? 'en' : 'cz')}
			/>
			<label htmlFor='language-toggle'/>
			<span className='on'>CZ</span>
			<span className='off'>EN</span>
		</div>
	)
}
