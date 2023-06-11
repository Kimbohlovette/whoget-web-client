import { fetchAsks, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { textShortener } from '@/shared/textShortener';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { ImSpinner8 } from 'react-icons/im';
import { toast } from 'react-toastify';
import useSWR, { SWRResponse } from 'swr';

const Asks = () => {
	const { data, error, isLoading }: SWRResponse<any, Error, boolean> =
		useSWR(fetchAsks);
	useEffect(() => {
		if (error) {
			toast.error('No internet connection');
		}
	}, []);
	return (
		<div>
			{data && (
				<div>
					<div className="mt-2">
						<table className="table-auto my-5 [&>*]:divide-y w-full">
							<thead className="border-b border-primary-100">
								<tr className="text-sm sm:text-base [&>*]:py-1 text-slate-800 text-left">
									<th>Message</th>

									<th className="hidden lg:table-cell">
										Due date
									</th>

									<th className="hidden sm:table-cell">
										Owner
									</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody className="text-sm">
								{data?.map((ask: any, key: any) => {
									return <AskItem key={key} ask={ask} />;
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{isLoading && (
				<div className="flex justify-center">
					<ImSpinner8 className="text-secondary-400 text-xl animate-spin text-center" />
				</div>
			)}
		</div>
	);
};

export default Asks;

const AskItem = (props: { ask: any }) => {
	console.log(props.ask);
	const router = useRouter();
	const [askStatus, setAskStatus] = useState<'visible' | 'invisible'>(
		props.ask.status
	);
	const [askStatusUpdateState, setAskStatusUpdateState] = useState<
		'idle' | 'inProgress' | 'success' | 'failed'
	>('idle');
	const handleAskStatusUpdates = () => {
		setAskStatusUpdateState('inProgress');
		if (askStatus === 'visible') {
			updateAskStatus(props.ask.id, 'invisible')
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
			updateAskStatus(props.ask.id, 'visible')
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
	return (
		<tr
			onClick={() => {
				router.push(`/asks/${props.ask.id}`);
			}}
			className="relative z- text-slate-600 py-5 hover:bg-slate-200 cursor-pointer"
		>
			<td>
				<div className="max-w-xs py-5 px-2">
					{textShortener(props.ask.message, 14)}
				</div>
			</td>
			<td className="hidden lg:table-cell">
				<div className="py-5">{props.ask.expirationDate}</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">{props.ask.userName || 'N/A'} </div>
			</td>
			<td className="pr-2">
				<button
					disabled={askStatusUpdateState === 'inProgress'}
					onClick={handleAskStatusUpdates}
					className={`flex flex-row gap-x-2 py-2 px-4 rounded-md border border-primary-500 text-xs font-medium
						${props.ask.status === 'visible' ? '' : 'bg-primary-500 text-white'}`}
				>
					{askStatusUpdateState !== 'inProgress' ? (
						<span className="inline-block">
							{props.ask.status === 'visible' ? 'Hide' : 'Unhide'}
						</span>
					) : (
						<span>Updating...</span>
					)}
				</button>
			</td>
		</tr>
	);
};
