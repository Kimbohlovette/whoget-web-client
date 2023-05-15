export const textShortener = (text: string, cutoffSize: number) => {
	const exploded = text.split(' ');
	if (exploded.length <= cutoffSize) {
		return text;
	} else {
		return `${exploded.slice(0, cutoffSize).join(' ')} ...`;
	}
};
