//const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';
const BASE_URL = 'http://localhost:5000/api/v1/';

export const fetchAsks = async (page: number, limit: number) => {
	const token = localStorage.getItem('@authToken') || '';
	try {
		const response = await fetch(
			`${BASE_URL}asks?page=${page}&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					'Access-Control-Allow-Origin': 'no-cors',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			}
		);
		const result = await response.json();
		console.log(result);
		return result.asks;
	} catch (error) {
		console.log(error);
	}
};

export const updateAskStatus = async (
	askId: string,
	status: 'visible' | 'invisible'
) => {
	try {
		const response = await fetch(`${BASE_URL}asks/${askId}`, {
			body: JSON.stringify({ status }),
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return (await response.json()).updated;
	} catch (error) {
		console.log(error);
		return new Error('Error occured while updating updating ask');
	}
};

export const fetchAsksByUserId = async (userId: string) => {
	try {
		const response = await fetch(`${BASE_URL}users/${userId}/asks`);
		return await response.json();
	} catch (error) {
		console.log(error);
		return new Error('Error occured while loading asks');
	}
};

export const fetchAskById = async (id: string) => {
	try {
		const response = await fetch(`${BASE_URL}asks/${id}`);
		return (await response.json()).ask;
	} catch (error) {
		console.log(error);
	}
};
