import Login from '@/components/Login';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAuthStatus } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Authenticate = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);
	return (
		<>
			<Login />
		</>
	);
};

export default Authenticate;
