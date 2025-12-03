import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner8 } from 'react-icons/im';
import { fetchUsers, updateUserStatus } from '@/dataServices/fetchUsersAPI';
import { useAppSelector } from '@/store/hooks';
import { routeGuard } from '@/utils/routeGuard';
import useSWR from 'swr';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { data } from 'autoprefixer';
// import Image from 'next/image';

const Users = () => {
	const router = useRouter();
	const { data, error, isLoading } = useSWR('/api/v1/users', () =>
		fetchUsers(1, 100)
	);
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	useEffect(() => {
		if (error) {
			return () => {
				toast.error('An error occured while fetching users');
			};
		}
	}, [error]);

	useEffect(() => {
		routeGuard(router, isAuthenticated);
	}, [isAuthenticated, router]);

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Users</h1>
				<p className="text-gray-600">Manage and monitor platform users</p>
			</div>

			{!data && !isLoading ? (
				<div className="flex flex-col items-center justify-center py-16">
					<p className="text-gray-500 mb-4">Failed to load users</p>
					<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
						Refresh Page
					</button>
				</div>
			) : (
				!isLoading && (
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
									<tr className="text-sm font-semibold text-gray-700">
										<th className="text-left py-4 px-6">User</th>
										<th className="text-left py-4 px-6 hidden sm:table-cell">Phone</th>
										<th className="text-left py-4 px-6 hidden md:table-cell">Location</th>
										<th className="text-left py-4 px-6 hidden lg:table-cell">Asks</th>
										<th className="text-left py-4 px-6">Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{data?.map((user: any, key: React.Key | null | undefined) => (
										<User key={key} user={user} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				)
			)}
			{isLoading && (
				<div className="flex justify-center py-16">
					<ImSpinner8 className="text-blue-600 text-3xl animate-spin" />
				</div>
			)}
		</div>
	);
};

const User = (props: { user: any }) => {
	const navigation = useRouter();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [userStatus, setUserStatus] = useState<'active' | 'inactive'>(
		'active'
	);

	useEffect(() => {
		setUserStatus(props.user.status);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdateStatus = () => {
		if (userStatus === 'active') {
			setIsUpdating(true);
			updateUserStatus(props.user.id, 'inactive')
				.then(() => {
					setUserStatus('inactive');
				})
				.catch((error) => {
					console.log('Failed', error);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		} else {
			setIsUpdating(true);
			updateUserStatus(props.user.id, 'active')
				.then(() => {
					setUserStatus('active');
				})
				.catch((error) => {
					console.log('Failed', error);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		}
	};
	return (
		<tr
			className="hover:bg-gray-50 transition-colors cursor-pointer"
			onClick={() => {
				navigation.push(`/users/${props.user.id}`);
			}}
		>
			<td className="py-4 px-6">
				<div className="flex items-center gap-3">
					<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden ring-2 ring-gray-100">
						<Image
							width={48}
							height={48}
							src={props.user.profileImage}
							className="h-full w-full object-cover"
							alt={props.user.name}
						/>
					</div>
					<div className="font-medium text-gray-800">{props.user.name}</div>
				</div>
			</td>
			<td className="py-4 px-6 text-gray-600 hidden sm:table-cell">
				{props.user.phoneNumber}
			</td>
			<td className="py-4 px-6 text-gray-600 hidden md:table-cell">
				{props.user.location || 'Buea'}
			</td>
			<td className="py-4 px-6 text-gray-600 hidden lg:table-cell">
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
					2
				</span>
			</td>
			<td className="py-4 px-6">
				<button
					disabled={isUpdating}
					onClick={(e) => {
						e.stopPropagation();
						handleUpdateStatus();
					}}
					className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
						userStatus === 'active'
							? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
							: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
					} disabled:opacity-50 disabled:cursor-not-allowed`}
				>
					{isUpdating ? 'Updating...' : userStatus === 'active' ? 'Ban' : 'Unban'}
				</button>
			</td>
		</tr>
	);
};

export default Users;
