import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import {
	Navbar, Nav, NavItem, NavLink,
	Container, Col,
} from 'reactstrap';

import { navLinks } from './navLinks';
import MobileNavbar from './MobileNavbar.jsx';
import LanguageSwitcher from '../../LanguageSwitcher';
import KvirtivityLogo from '../../Kvirtivity-Logo.jsx';

import './navbarcontainer.scss';

export default function NavbarContainer() {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const { t } = useTranslation();
	const location = useLocation();
	
	useEffect(()=>{
		const handleResize = () => {
			setShowMobileMenu(window.innerWidth <= 768);
		};
		
		handleResize();
		
		window.addEventListener('resize', handleResize);
		
		// Cleanup on unmount
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	
	return (
		<>
			{showMobileMenu ? (
				<MobileNavbar />
			) : (
				<Container fluid className='navbar-container'>
					<Navbar>
						<Col md='2'>
							<NavLink href={'/'}><KvirtivityLogo height={50} width={150}/></NavLink>
						</Col>
						{/* TODO move this actually underneath the title of each screen */}
						<Col md='4'>
							<div className='fs-2 social-media'>
								<a
									className='mx-3 a-icon'
									href='https://www.facebook.com/kvirtivity'
									target='_blank'
									rel='noopener noreferrer'
									title={t('Navbar.Kvírtivity na Facebooku')}
								>
									<i className='bi bi-facebook' />
								</a>
								<a
									className='mx-3 a-icon'
									href='https://www.instagram.com/kvirtivity'
									title={t('Navbar.Kvírtivity na Instagramu')}
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='bi bi-instagram' />
								</a>
								<a
									className='mx-3 a-icon'
									href='mailto:info@kvirtivity.cz'
									title={t('Navbar.Spojte se s Kvírtivity')}
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='bi bi-envelope' />
								</a>
							</div>
						</Col>
						<Col md='5' className='d-flex justify-content-end'>
							<Nav>
								{navLinks && navLinks.map((link, idx) => (
									<NavItem key={idx}>
										<NavLink
											href={link.to}
											className={location.pathname === link.to ? 'active' : ''}
										>
											{t(link.name)}
										</NavLink>
									</NavItem>
								))}
							</Nav>
						</Col>
						<Col md='1' className='d-flex justify-content-end'>
							<LanguageSwitcher />
						</Col>
					</Navbar>
				</Container>
			)}
		</>
	);
}
