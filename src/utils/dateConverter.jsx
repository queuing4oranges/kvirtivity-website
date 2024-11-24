import { useTranslation } from 'react-i18next';

// Function to return only the day out of a datestring
export const getDay = (datestring) => {
	// Check if the datestring is a valid string
	if (typeof datestring !== 'string' || !datestring.trim()) {
		return '';
	}

	const date = new Date(datestring);
	return date.getDay()
};
	
// Get the abbreviated name of the month and localize it
export const getMonthName = (datestring) => {
	const { t } = useTranslation();
	
	// Check if the datestring is a valid string
	if (typeof datestring !== 'string' || !datestring.trim()) {
		return '';
	}
	
	// Check if the datestring is in a valid date format ('YYYY-MM-DD')
	const date = new Date(datestring);
	if (isNaN(date.getTime())) {
		return ''; // Return empty string for invalid date format
	}
	
	const months = [
		t('Months.Led'), t('Months.Úno'), t('Months.Bře'), t('Months.Dub'), t('Months.Kvě'), t('Months.Čvn'),
		t('Months.Čvc'), t('Months.Srp'), t('Months.Zář'), t('Months.Říj'), t('Months.Lis'), t('Months.Pro')
	]
	
	// Extract the month part from the date string
	const monthNumber = parseInt(datestring.split('-')[1], 10); // Convert 02 to 2
	
	return months[monthNumber - 1] // Adjust for zero-based index
};
