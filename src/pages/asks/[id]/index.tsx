/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchAskById, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { textShortener } from '@/shared/textShortener';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import useSWR from 'swr';
const AskDetails = () => {
	const router = useRouter();
	const askResData = useSWR(router.query.id, fetchAskById);
	console.log(askResData);
	const [isUpdating, setIsUpdating] = useState(false); // State of updating ask status
	const handleAskStatusUpdates = () => {
		setIsUpdating(true);
		if (askResData.data.status === 'visible') {
			updateAskStatus(askResData.data.id, 'invisible')
				.then(() => {
					askResData.data.status = 'invisible';
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		} else {
			updateAskStatus(askResData.data.id, 'visible')
				.then(() => {
					askResData.data.status = 'visible';
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		}
	};

	return (
		askResData.data && (
			<div className="relative">
				<div className="px-8 py-8 lg:p-16 rounded-sm bg-white mx-auto">
					<div className="flex flex-row gap-4">
						<div className="shrink-0 border overflow-hidden rounded-full h-fit">
							<img
								src={askResData.data.imageUrl}
								alt="eyong_vanisiah"
								className="object-cover object-center aspect-square w-10"
							/>
						</div>
						<div>
							<div>
								<h1 className="font-light text-slate-400s">
									{askResData.data.userName &&
									askResData.data.userName === ''
										? askResData.data.userName
										: askResData.data.contactNumber}
								</h1>
								<p className="text-slate-600 text-sm pt-2">
									{textShortener(askResData.data.message, 14)}
								</p>
							</div>

							<div className="relative py-4 mt-5 w-fit flex flex-row gap-2">
								{askResData.data.imageUrl !== '' && (
									<img
										src={askResData.data.imageUrl}
										alt="Car needed"
										className="aspect-video object-center object-cover border rounded-sm w-full max-h-56 sm:max-w-2xl"
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
										askResData.data.location
											? askResData.data.location.toUpperCase()
											: 'Buea'
									}, due ${askResData.data.expirationDate}`}
								</p>
								<p className="block text-xs mt-2">
									0 Reports, 0 Responses
								</p>
							</div>
							<div className="py-4">
								<button
									disabled={isUpdating}
									onClick={handleAskStatusUpdates}
									className="flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 bg-primary-500 text-white  text-xs font-medium"
								>
									<span className="inline-block">
										{askResData.data.status === 'visible'
											? 'Hide'
											: 'Unhide'}
									</span>

									{askResData.data.status ===
										'inProgress' && (
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
