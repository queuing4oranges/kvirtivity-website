import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Navbar, NavbarBrand, Nav, NavItem, NavLink,
	Container,
} from 'reactstrap';

import { navLinks } from './navLinks';
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
			<Navbar>
				<NavbarBrand><KvirtivityLogo height={50} width={150}/></NavbarBrand>
				<span className='d-flex'>
					<LanguageSwitcher />
					<Nav>
						{navLinks && navLinks.map((link, idx) => (
							<NavItem key={idx}>
								<NavLink href={link.to}>{t(link.name)}</NavLink>
							</NavItem>

						))}

						
					</Nav>
				</span>
			</Navbar>
		</Container>
		// <nav className='navbar navbar-expand bg-light navbar-wrapper'>
		// 		<div className='container-fluid'>
		// 			<div className='logo-container d-flex ms-5'>
		// 				<NavLink
		// 					className='navbar-brand'
		// 					to={'/'}
		// 					style={({ isActive }) => ({
		// 					color: isActive ? '#eb5a49' : '#7ab6cb',
		// 					textDecoration: 'none',
		// 					})}
		// 				>
		// 					<p>Lesbotoč</p>
		// 				</NavLink>
		// 			</div>
		// 			<div className='d-flex justify-content-end' style={{width: '60%'}}>
		// 				<a
		// 					href='https://www.facebook.com/seznamsenatoci'
		// 					target='_blank'
		// 					rel='noreferrer'
		// 					aria-label='Facebook'
		// 				>
		// 					<i className='bi bi-facebook me-2 fs-2' style={{color: '#003243'}} />
		// 				</a>
		// 				<a
		// 					href='https://www.instagram.com/lesbotoc/'
		// 					target='_blank'
		// 					rel='noreferrer'
		// 					aria-label='Instagram'
		// 				>
		// 					<i className='bi bi-instagram me-4 fs-2' style={{fontSize: '2rem', color: '#003243'}} />
		// 				</a>
		// 			</div>
				
		// 			<ul className='navbar-nav navbar-list me-3'>
		// 				{navbarlinks.map((link) => (
		// 					<li key={link.id} className='me-4 fs-4'>
		// 						<NavLink
		// 							to={link.to}
		// 							style={({ isActive }) => ({
		// 								color: isActive ? '#ed7f71' : '#003243',
		// 								textDecoration: 'none',
		// 								whiteSpace: 'nowrap'
		// 							})}
		// 						>
		// 						{link.name}
		// 						</NavLink>
		// 					</li>
		// 				))}
		// 			</ul>
		// 		</div>
		// 	</nav>
			)}
		</>
	);
}
