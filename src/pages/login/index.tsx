import Login from '@/components/Login';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Authenticate = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	
	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated, router]);
	
	return <Login />;
};

export default Authenticate;
