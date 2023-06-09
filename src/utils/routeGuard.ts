import { NextRouter } from 'next/router';

export const routeGuard = (router: NextRouter, isAuthenticated: boolean) => {
	if (!isAuthenticated) {
		router.push('/login');
	}
};
