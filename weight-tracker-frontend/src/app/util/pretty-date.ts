export const prettifyDate = (date: string): string => {

	const dateObj = new Date(date);

	return `${dateObj.getDay()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

};