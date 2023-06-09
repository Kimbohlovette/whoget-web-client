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
			{!data && !isLoading ? (
				<button>Refresh Page</button>
			) : (
				!isLoading && (
					<div className="my-16">
						<table className="table-auto my-5 [&>*]:divide-y w-full">
							<thead>
								<tr className="text-sm sm:text-base [&>*]:py-1 text-slate-800 text-left">
									<th>Name</th>
									<th className="hidden sm:table-cell">
										Phone number
									</th>
									<th className="hidden md:table-cell">
										Location
									</th>
									<th className="hidden lg:table-cell">
										No. of Asks
									</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody className="text-sm">
								{data?.map(
									(
										user: any,
										key: React.Key | null | undefined
									) => (
										<User key={key} user={user} />
									)
								)}
							</tbody>
						</table>
					</div>
				)
			)}
			{isLoading && (
				<div className="flex justify-center">
					<ImSpinner8 className="text-secondary-400 text-xl animate-spin text-center" />
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
			className="text-slate-600 py-5 hover:bg-slate-200 cursor-pointer"
			onClick={() => {
				navigation.push(`/users/${props.user.id}`);
			}}
		>
			<td>
				<div className="max-w-xs py-5 pl-2">
					<div className="flex flex-row gap-x-2 items-center">
						<div className="h-10 aspect-square rounded-full bg-slate-50 border overflow-hidden">
							<Image
								width={200}
								height={100}
								src={props.user.profileImage}
								className="h-full aspect-square object-center object-cover"
								alt=""
							/>
						</div>
						<div>{props.user.name}</div>
					</div>
				</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">{props.user.phoneNumber}</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">{props.user.location || 'Buea'}</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">2</div>
			</td>

			<td className="relative z-50">
				<button
					disabled={isUpdating}
					onClick={handleUpdateStatus}
					className={
						userStatus === 'active'
							? 'z-50 py-1 px-4 rounded-md border border-primary-500 text-primary-600 text-sm font-medium'
							: 'py-1 px-4 rounded-md border-primary-500 bg-primary-500 text-sm text-white font-medium'
					}
				>
					{!isUpdating
						? props.user.status === 'active'
							? 'Ban'
							: 'Unband'
						: 'Updating'}
				</button>
			</td>
		</tr>
	);
};

export default Users;
