import { fetchAsks, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { textShortener } from '@/shared/textShortener';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const Asks = () => {
	const { data, error, isLoading } = useSWR('/api/v1/asks', () =>
		fetchAsks(1, 100)
	);
	useEffect(() => {
		if (error) {
			toast.error('No internet connection');
		}
	}, []);
	return !data && !isLoading ? (
		<div className="flex flex-col items-center justify-center py-16">
			<p className="text-gray-500">Nothing to show</p>
		</div>
	) : (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Asks</h1>
				<p className="text-gray-600">Manage user requests and inquiries</p>
			</div>

			{data && (
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr className="text-sm font-semibold text-gray-700">
									<th className="text-left py-4 px-6">Message</th>
									<th className="text-left py-4 px-6 hidden lg:table-cell">Due Date</th>
									<th className="text-left py-4 px-6 hidden sm:table-cell">Owner</th>
									<th className="text-left py-4 px-6">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{data.map((ask: any, key: any) => {
									return <AskItem key={key} ask={ask} />;
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{isLoading && (
				<div className="flex justify-center py-16">
					<ImSpinner8 className="text-blue-600 text-3xl animate-spin" />
				</div>
			)}
		</div>
	);
};

export default Asks;

const AskItem = (props: { ask: any }) => {
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
			onClick={() => router.push(`/asks/${props.ask.id}`)}
			className="hover:bg-gray-50 transition-colors cursor-pointer"
		>
			<td className="py-4 px-6">
				<div className="max-w-md text-gray-800">
					{textShortener(props.ask.message, 14)}
				</div>
			</td>
			<td className="py-4 px-6 text-gray-600 hidden lg:table-cell">
				{props.ask.expirationDate}
			</td>
			<td className="py-4 px-6 text-gray-600 hidden sm:table-cell">
				{props.ask.userName || 'N/A'}
			</td>
			<td className="py-4 px-6">
				<button
					disabled={askStatusUpdateState === 'inProgress'}
					onClick={(e) => {
						e.stopPropagation();
						handleAskStatusUpdates();
					}}
					className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
						props.ask.status === 'visible'
							? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200'
							: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
					} disabled:opacity-50 disabled:cursor-not-allowed`}
				>
					{askStatusUpdateState === 'inProgress' 
						? 'Updating...' 
						: props.ask.status === 'visible' ? 'Hide' : 'Unhide'}
				</button>
			</td>
		</tr>
	);
};
