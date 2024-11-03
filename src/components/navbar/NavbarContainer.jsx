import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Navbar, NavbarBrand, Nav, NavItem, NavLink,
	Container, Col,
} from 'reactstrap';

import { navLinks } from './navLinks';
import MobileNavbar from './MobileNavbar.jsx';
import LanguageSwitcher from '../../LanguageSwitcher';
import KvirtivityLogo from '../../Kvirtivity-Logo.jsx';

export default function NavbarContainer() {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const { t } = useTranslation();
	
	useEffect(()=>{
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setShowMobileMenu(true)
			} else {
				setShowMobileMenu(false)
			}
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
				<Container fluid>
					{/* TODO style navbar in brand colors */}
					<Navbar>
						<Col md='3'>
							<NavbarBrand><KvirtivityLogo height={50} width={150}/></NavbarBrand>
						</Col>
						<Col md='8' className='d-flex justify-content-end'>
							<Nav>
								{navLinks && navLinks.map((link, idx) => (
									<NavItem key={idx}>
										<NavLink href={link.to}>{t(link.name)}</NavLink>
									</NavItem>
								))}
							</Nav>
						</Col>
						<Col md='1' className='d-flex justify-content-end'>
						{/* TODO make switcher somewhat responsive */}
							<LanguageSwitcher />
						</Col>
					</Navbar>
				</Container>
			)}
		</>
	);
}
