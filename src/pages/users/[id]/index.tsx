/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { CgSpinner, CgSpinnerTwoAlt } from 'react-icons/cg';

import ShortAsk from '@/components/ShortAsk';
import { useRouter } from 'next/router';
import { fetchUserById, updateUserStatus } from '@/dataServices/fetchUsersAPI';
import { fetchAsksByUserId } from '@/dataServices/fetchAsksAPI';
import { routeGuard } from '@/utils/routeGuard';
import { ImSpinner8 } from 'react-icons/im';
import { useAppSelector } from '@/store/hooks';
const UserDetails = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	const [user, setUser] = useState<any>(null);
	const [userAsksData, setUserAsksData] = useState<any>(null);
	const [fetchAsksState, setFetchAsksState] = useState<
		'idle' | 'inProgress' | 'failed' | 'success'
	>('idle');
	const [userUpdateState, setUserUpdateState] = useState<
		'idle' | 'inProgress' | 'failed' | 'success'
	>('idle');
	const [userStatus, setUserStatus] = useState<'active' | 'inactive'>(
		'active'
	);

	useEffect(() => {
		routeGuard(router, isAuthenticated);
	}, [isAuthenticated, router]);

	useEffect(() => {
		if (user) {
			setUserStatus(user.status);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdateStatus = () => {
		if (userStatus === 'active') {
			setUserUpdateState('inProgress');
			updateUserStatus(user.id, 'inactive')
				.then(() => {
					setUserStatus('inactive');
					setUserUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setUserUpdateState('failed');
				})
				.finally(() => {
					setUserUpdateState('idle');
				});
		} else {
			setUserUpdateState('inProgress');
			updateUserStatus(user.id, 'active')
				.then(() => {
					setUserStatus('active');
					setUserUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setUserUpdateState('failed');
				})
				.finally(() => {
					setUserUpdateState('idle');
				});
		}
	};

	useEffect(() => {
		if (router.isReady) {
			console.log(router.query.id);
			const id = router.query.id as string;
			fetchUserById(id)
				.then((user) => {
					console.log(user);
					setUser(user);
				})
				.catch((error) => {
					console.log(error);
				});
			fetchAsksByUserId(id)
				.then((data) => {
					setUserAsksData(data);
					console.log('data', data);
					setFetchAsksState('success');
				})
				.catch((error) => {
					console.log(error);
					setFetchAsksState('failed');
				})
				.finally(() => {
					setFetchAsksState('idle');
				});
		}
	}, [router.isReady, router.query]);
	return user ? (
		<div>
			<div className="flex flex-col gap-8 max-h-min sm:flex-row">
				<div className="flex-1 flex justify-center items-center sm:justify-start">
					<div className="h-fit rounded-md overflow-hidden aspect-square">
						<img
							height={400}
							width={300}
							src={user.profileImage}
							alt="Michael Morgan"
							className="h-full object-center object-cover z-0 p-0 m-0"
						/>
					</div>
				</div>
				<div className="flex-1">
					<h1 className="text-center sm:text-left text-lg font-bold mb-5 text-slate-600 sm:text-2xl">
						{user.name}
					</h1>
					<div className="flex flex-col items-center sm:items-baseline gap-y-5">
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<FaWhatsappSquare className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineMail className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.email}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4  min-w-[50px] text-xl">
								<BsTelephone className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{'+237 ' + user.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineLocationMarker className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.location || 'Buea, Cameroon'}
							</div>
						</div>
					</div>
					<div className="mt-5 flex items-center justify-center sm:justify-start">
						<button
							disabled={userUpdateState === 'inProgress'}
							onClick={handleUpdateStatus}
							className={
								'w-full max-w-[120px] z-50 py-1 px-4 rounded-md border-primary-500 bg-primary-500 text-xs text-white font-semibold'
							}
						>
							{userStatus === 'active' ? 'Ban' : 'Unband'}

							{userUpdateState === 'inProgress' && (
								<CgSpinnerTwoAlt className="text-secondary-400 ml-2 inline animate-spin" />
							)}
						</button>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h1 className="w-fit relative mx-auto sm:mx-0 sm:text-left text-slate-600 font-bold text-lg">
					<div className="absolute -top-1 -right-2 bg-secondary-500 text-white text-xs h-4 aspect-square rounded-full text-center">
						{userAsksData ? userAsksData.numOfAsks : 0}
					</div>
					All Asks
				</h1>
				<div className="flex flex-col divide-y [&>*]:py-4 mt-8">
					{userAsksData ? (
						userAsksData.asks.map((ask: any, key: any) => {
							return (
								<div key={key}>
									<ShortAsk ask={ask} />
								</div>
							);
						})
					) : (
						<div>Your recent asks show here.</div>
					)}
				</div>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex justify-center items-center">
			<div>
				<ImSpinner8 className="text-secondary-400 text-3xl animate-spin" />
			</div>
		</div>
	);
};

export default UserDetails;
