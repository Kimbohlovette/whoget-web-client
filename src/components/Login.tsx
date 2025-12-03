import Image from 'next/image';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateAuthStatus } from '@/store/slices/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/fbConfig';
import { toast } from 'react-toastify';

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
		<div className="fixed left-0 top-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full h-full">
			<div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12">
				<div className="w-full sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
					<div className="mb-8">
						<Image
							src={logoImage}
							className="mx-auto max-h-16 w-auto"
							alt="Whoget logo"
						/>
						<h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
							Welcome back
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Sign in to access your dashboard
						</p>
					</div>

					<div className="space-y-5">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email address
							</label>
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
								className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<div className="flex items-center justify-between mb-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<a
									href="#"
									className="text-sm font-medium text-blue-600 hover:text-blue-500"
								>
									Forgot password?
								</a>
							</div>
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
								className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all"
								placeholder="••••••••"
							/>
						</div>
						<button
							disabled={authenticating}
							onClick={handleSignin}
							className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{authenticating ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
