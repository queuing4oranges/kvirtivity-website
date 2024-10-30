import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	
	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
	};
	
	return (
	<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
		<DropdownToggle caret>Language</DropdownToggle>
		<DropdownMenu>
			<DropdownItem onClick={() => changeLanguage('cz')}>česky</DropdownItem>
			<DropdownItem onClick={() => changeLanguage('en')}>english</DropdownItem>
		</DropdownMenu>
	</Dropdown>
	)
}
