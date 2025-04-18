import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Collapse,
	NavbarToggler, Nav, NavItem, NavLink,
	Navbar
} from 'reactstrap';

import { navLinks } from './navLinks';
import Xicon from '../../assets/icons';
import LanguageSwitcher from '../../LanguageSwitcher';

import './mobilenavbar.scss';

export default function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<Navbar className='mobile-navbar'>
			<>
				<span className='d-flex justify-content-between align-items-center w-100'>
					<button
						className='mobile-navbar-toggle-btn'
						size='lg'
						onClick={() => setIsOpen(!isOpen)}
						style={{ backgroundColor: isOpen ? 'white' : 'transparent' }}
					>
						<AnimatePresence mode='wait'>
							{isOpen ? (
								<motion.div
									key='close'
									initial={{ rotate: 0, opacity: 0 }}
									animate={{ rotate: 180, opacity: 1 }}
									exit={{ rotate: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Xicon width={25} height={30} color={'currentColor'} />
								</motion.div>
							) : (
								<motion.i
									key='dots'
									className='fs-1 bi bi-three-dots'
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									transition={{ duration: 0.2 }}
									style={{ color: '#164443' }}
								/>
							)}
						</AnimatePresence>
					</button>
					<LanguageSwitcher />
				</span>
			</>
			<Collapse isOpen={isOpen} navbar>
				<Nav className='me-auto ps-3' navbar>
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
