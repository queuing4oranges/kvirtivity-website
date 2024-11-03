import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import NavbarContainer from './components/navbar/NavbarContainer';

function App() {


	return (
		<div className='App'>
			<BrowserRouter basename='/'>
				<NavbarContainer/>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/calendar' element={<Calendar />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
