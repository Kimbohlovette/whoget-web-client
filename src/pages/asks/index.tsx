import { fetchAsks, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const Asks = () => {
	const [asks, setAsks] = useState<any>(null);
	const [fetchingAsksState, setFetchingAsksState] = useState<
		'idle' | 'inProgress' | 'failed' | 'success'
	>('idle');

	useEffect(() => {
		setFetchingAsksState('inProgress');
		fetchAsks(1, 3000)
			.then((asks) => {
				setAsks(asks);
				setFetchingAsksState('success');
			})
			.catch((error) => {
				console.log(error);
				setFetchingAsksState('failed');
			})
			.finally(() => {
				setFetchingAsksState('idle');
			});
	}, []);
	return (
		asks && (
			<div>
				<div className="cards grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 text-slate-600 text-center">
					<div>
						<div className="font-bold">856</div>
						<div className="font-extralight">Asks</div>
					</div>

					<div>
						<div className="font-bold">20</div>
						<div className="font-extralight">Categories</div>
					</div>
					<div>
						<div className="font-bold">500</div>
						<div>Users</div>
					</div>
					<div>
						<div className="font-bold">45692</div>
						<div className="font-extralight">Responses</div>
					</div>
					<div>
						<div className="font-bold">2</div>
						<div className="font-extralight">Hidden</div>
					</div>
				</div>
				<div className="my-16">
					<table className="table-auto my-5 [&>*]:divide-y w-full">
						<thead>
							<tr className="text-sm sm:text-base [&>*]:py-1 text-slate-800 text-left">
								<th>Message</th>
								<th className="hidden lg:table-cell">
									Location
								</th>
								<th className="hidden lg:table-cell">
									Due date
								</th>
								<th className="hidden md:table-cell">
									Category
								</th>
								<th className="hidden sm:table-cell">Owner</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{asks.map((ask: any, key: any) => {
								return <AskItem key={key} ask={ask} />;
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
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
			onClick={() => {
				router.push(`/asks/${props.ask.id}`);
			}}
			className="relative z- text-slate-600 py-5 hover:bg-slate-200 cursor-pointer"
		>
			<td>
				<div className="max-w-xs py-5 px-2">{props.ask.message}</div>
			</td>

			<td className="hidden md:table-cell">
				<div className="py-5">{props.ask.location || 'N/A'}</div>
			</td>
			<td className="hidden lg:table-cell">
				<div className="py-5">{props.ask.expirationDate}</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">{props.ask.categoryName || 'N/A'}</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">{props.ask.userName || 'N/A'} </div>
			</td>
			<td className="pr-2">
				<button
					disabled={askStatusUpdateState === 'inProgress'}
					onClick={handleAskStatusUpdates}
					className={
						askStatus === 'visible'
							? 'flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 text-xs font-medium'
							: 'flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 bg-primary-500 text-white  text-xs font-medium'
					}
				>
					<span className="inline-block">
						{askStatus === 'visible' ? 'Hide' : 'Unhide'}
					</span>

					{askStatusUpdateState === 'inProgress' && (
						<CgSpinnerTwoAlt className="ml-2 inline animate-spin" />
					)}
				</button>
			</td>
		</tr>
	);
};
