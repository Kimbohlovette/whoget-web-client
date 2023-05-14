const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';
export const fetchUsers = async (page: number, limit: number) => {
	const response = await fetch(
		`${BASE_URL}users?page=${page}&limit=${limit}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	return (await response.json()).users;
};

export const updateUserStatus = async (
	userId: string,
	status: 'active' | 'inactive'
) => {
	const response = await fetch(`${BASE_URL}users/${userId}`, {
		body: JSON.stringify({ status }),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()).updated;
};