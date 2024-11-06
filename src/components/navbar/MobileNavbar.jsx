import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Collapse,
	NavbarToggler, Nav, NavItem, NavLink,
	Navbar
} from 'reactstrap';

import { navLinks } from './navLinks';
import LanguageSwitcher from '../../LanguageSwitcher';

import './mobilenavbar.scss';

export default function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<Navbar className='mobile-navbar'>
			<span className='d-flex justify-content-between w-100'>
				<NavbarToggler onClick={() => setIsOpen(!isOpen)} />
				<LanguageSwitcher />
			</span>
			<Collapse isOpen={isOpen} navbar>
				<Nav className="me-auto" navbar>
					{navLinks && navLinks.map((link, idx) => (
						<NavItem key={idx}>
							<NavLink href={link.to}>{t(link.name)}</NavLink>
						</NavItem>
					))}
				</Nav>
			</Collapse>
		</Navbar>
	)
}
