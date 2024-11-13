import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
	const [showSingleEvent, setShowSingleEvent] = useState(false);
	
	return (
		<GlobalContext.Provider value={{showSingleEvent, setShowSingleEvent}}>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalContextProvider;
