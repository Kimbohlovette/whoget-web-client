const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';
export const fetchAsks = async (page: number, limit: number) => {
	const response = await fetch(
		`${BASE_URL}asks?page=${page}&limit=${limit}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	return (await response.json()).asks;
};

export const updateAskStatus = async (
	askId: string,
	status: 'visible' | 'invisible'
) => {
	const response = await fetch(`${BASE_URL}asks/${askId}`, {
		body: JSON.stringify({ status }),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()).updated;
};
