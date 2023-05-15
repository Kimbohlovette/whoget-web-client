/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchAskById, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { textShortener } from '@/shared/textShortener';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
const AskDetails = () => {
	const router = useRouter();
	const [ask, setAsk] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [askStatus, setAskStatus] = useState<'visible' | 'invisible'>(
		'visible'
	);
	const [askStatusUpdateState, setAskStatusUpdateState] = useState<
		'idle' | 'inProgress' | 'success' | 'failed'
	>('idle');
	const handleAskStatusUpdates = () => {
		setAskStatusUpdateState('inProgress');
		if (askStatus === 'visible') {
			updateAskStatus(ask.id, 'invisible')
				.then(() => {
					setAskStatus('invisible');
					setAskStatusUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setAskStatusUpdateState('failed');
				})
				.finally(() => {
					setAskStatusUpdateState('idle');
				});
		} else {
			updateAskStatus(ask.id, 'visible')
				.then(() => {
					setAskStatus('visible');
					setAskStatusUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setAskStatusUpdateState('failed');
				})
				.finally(() => {
					setAskStatusUpdateState('idle');
				});
		}
	};

	useEffect(() => {
		if (router.isReady) {
			setIsLoading(true);
			const id = router.query.id as string;
			fetchAskById(id).then((ask) => {
				setAsk(ask);
				setAskStatus(ask.status);
				setIsLoading(false);
			});
		}
	}, [router.isReady, router.query.id]);

	return (
		ask && (
			<div className="relative">
				<div className="px-8 py-8 lg:p-16 rounded-sm bg-white mx-auto">
					<div className="flex flex-row gap-4">
						<div className="shrink-0 border overflow-hidden rounded-full h-fit">
							<img
								src={ask.imageUrl}
								alt="eyong_vanisiah"
								className="object-cover object-center aspect-square w-10"
							/>
						</div>
						<div>
							<div>
								<h1 className="font-light text-slate-400s">
									Kimboh Lovette
								</h1>
								<p className="text-slate-600 text-sm pt-2">
									{textShortener(ask.message, 14)}
								</p>
							</div>

							<div className="relative py-4 mt-5 w-fit flex flex-row gap-2">
								{ask.imageUrl !== '' && (
									<img
										src={ask.imageUrl}
										alt="Car needed"
										className="aspect-video border rounded-sm w-full max-h-56 sm:max-w-2xl"
									/>
								)}
								<button className="absolute -left-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
									<HiChevronLeft className="text-2xl text-slate-500" />
								</button>
								<button className="absolute -right-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
									<HiChevronRight className="text-2xl text-slate-500" />
								</button>
							</div>
							<div className="text-sm text-slate-500">
								<p>
									{`${
										ask.location
											? ask.location.toUpperCase()
											: 'Buea'
									}, due ${ask.expirationDate}`}
								</p>
								<p className="block text-xs mt-2">
									0 Reports, 0 Responses
								</p>
							</div>
							<div className="py-4">
								<button
									disabled={
										askStatusUpdateState === 'inProgress'
									}
									onClick={handleAskStatusUpdates}
									className={
										askStatus === 'visible'
											? 'flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 text-xs font-medium'
											: 'flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 bg-primary-500 text-white  text-xs font-medium'
									}
								>
									<span className="inline-block">
										{askStatus === 'visible'
											? 'Hide'
											: 'Unhide'}
									</span>

									{askStatusUpdateState === 'inProgress' && (
										<CgSpinnerTwoAlt className="ml-2 inline animate-spin" />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AskDetails;
