import { NextRouter } from 'next/router';

export const routeGuard = (router: NextRouter, isAuthenticated: boolean) => {
	if (!isAuthenticated) {
		const token = localStorage.getItem('@authToken');
		if (!token) {
			router.push('/login');
		}
	}
};
