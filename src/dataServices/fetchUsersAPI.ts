const BASE_URL = 'https://whoget-app-server.onrender.com/api/v1/';
// const BASE_URL = 'http://localhost:5000/api/v1/';
export const fetchUsers = async (page: number, limit: number) => {
	const token = localStorage.getItem('@authToken');
	const response = await fetch(`${BASE_URL}users/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	});
	return (await response.json()).users;
};

export const updateUserStatus = async (
	userId: string,
	status: 'active' | 'inactive'
) => {
	const token = localStorage.getItem('@authToken');
	const response = await fetch(`${BASE_URL}users/${userId}/status`, {
		body: JSON.stringify({ status }),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	});
	return (await response.json()).updated;
};

export const fetchUserById = async (id: string) => {
	const response = await fetch(`${BASE_URL}users/${id}`);
	return (await response.json()).user;
};
