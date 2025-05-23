import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Calendar from './components/calendar/Calendar';
import NavbarContainer from './components/navbar/NavbarContainer';
import GlobalContextProvider from './utils/GlobalContextProvider';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Contact from './components/contact/Contact';

import './App.scss';
import FooterFlag from './includes/FooterFlag';

function App() {
	return (
		<div className='position-relative h-100'>
			<GlobalContextProvider>
				<BrowserRouter basename='/'>
					<NavbarContainer/>
					<Routes>
						<Route exact path='/' element={<Calendar />} />
						<Route path='/galerie' element={<Gallery />} />
						<Route path='/o-nas' element={<About />} />
						<Route path='/kontakt' element={<Contact />} />
					</Routes>
				</BrowserRouter>
				<FooterFlag />
			</GlobalContextProvider>
		</div>
	);
}

export default App
