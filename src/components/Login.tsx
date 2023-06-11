import Image from 'next/image';
import { Metadata } from 'next';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateAuthStatus } from '@/store/slices/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/fbConfig';
import { toast } from 'react-toastify';

export const metadata: Metadata = {
	title: 'Login to your account',
	description: 'Login to monitor app statistics and user activities',
};

const Login = () => {
	const [authenticating, setAuthenticating] = useState(false);
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	// Sign handler function - async
	const handleSignin = async () => {
		if (!email || email === '' || !password || password === '') {
			// invalid credentials
			toast.warn('Email and password fields are required');
			return;
		} else {
			setAuthenticating(true);
			const resToken = signInWithEmailAndPassword(
				auth,
				email as string,
				password as string
			)
				.then((userCredential) => {
					setAuthenticating(false);
					return userCredential.user.getIdToken();
				})
				.catch((error) => {
					setAuthenticating(false);
					if (error.code === 'auth/network-request-failed') {
						toast.error('No internet connection');
					} else if (
						error.code === 'auth/user-not-found' ||
						error.code === 'auth/wrong-password' ||
						error.code === 'auth/invalid-email'
					) {
						toast.error('Invalid email or password');
					} else {
						toast.error('An unkown error occurred');
						console.log(error.code);
					}
				});

			const jwtToken = await resToken;
			if (jwtToken) {
				localStorage.setItem('@authToken', jwtToken);
				dispatch(updateAuthStatus(jwtToken));
				dispatch(updateAuthStatus(true));
				toast.success('Signing successful! 🥂');
			}
		}
	};

	const logoImage: string = require('../assets/whoget-primary.png');
	return (
		<div className="fixed left-0 top-0 bg-white w-full h-full">
			<div className="flex min-h-full flex-1 flex-col items-center px-6 mt-16 py-2 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						src={logoImage}
						className="mx-auto max-h-20 w-auto"
						alt="Whoget logo"
					/>
					<h2 className="text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									value={email || ''}
									onChange={(event) =>
										setEmail(event.target.value)
									}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:ring-red-500 invalid:shadow-red-200"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="#"
										className="font-semibold text-primary-600 hover:text-primary-500"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									value={password || ''}
									onChange={(event) =>
										setPassword(event.target.value)
									}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:ring-red-500 invalid:shadow-red-200"
								/>
							</div>
						</div>
						<div>
							<button
								disabled={authenticating}
								onClick={handleSignin}
								className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{authenticating ? 'Signing in ...' : 'Signin'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
