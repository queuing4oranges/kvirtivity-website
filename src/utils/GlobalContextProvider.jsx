import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [showSingleEvent, setShowSingleEvent] = useState(false);
	const [singleEventId, setSingleEventId] = useState(null);
	
	return (
		<GlobalContext.Provider
			value={{
				events,
				setEvents,
				showSingleEvent,
				setShowSingleEvent,
				singleEventId,
				setSingleEventId
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalContextProvider;
