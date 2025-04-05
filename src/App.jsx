import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import NavbarContainer from './components/navbar/NavbarContainer';
import GlobalContextProvider from './utils/GlobalContextProvider';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import './App.scss';
// TODO Create some tag with my name and github link
function App() {
	return (
		<div className='h-100 w-100'>
			<GlobalContextProvider>
				<BrowserRouter basename='/'>
					<NavbarContainer/>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/kalendar' element={<Calendar />} />
						<Route path='/galerie' element={<Gallery />} />
						<Route path='/o-nas' element={<About />} />
						<Route path='/kontakt' element={<Contact />} />
					</Routes>
				</BrowserRouter>
			</GlobalContextProvider>
		</div>
	);
}

export default App
