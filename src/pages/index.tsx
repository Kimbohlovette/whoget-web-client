import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsEye, BsQuestionCircle } from 'react-icons/bs';
import { CiWarning } from 'react-icons/ci';
import { IoBanOutline } from 'react-icons/io5';
import { FiEyeOff } from 'react-icons/fi';

import { useAppDispatch } from '../store/hooks';
import { updateAuthStatus, updateAuthToken } from '@/store/slices/userSlice';

export default function Home() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	
	useEffect(() => {
		const token = localStorage.getItem('@authToken');
		if (token) {
			dispatch(updateAuthToken(token));
			dispatch(updateAuthStatus(true));
		} else {
			router.push('/login');
		}
	}, []);

	if (!isAuthenticated) return null;

	return (
		<main>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
				<p className="text-gray-600">Monitor your platform metrics at a glance</p>
			</div>
			<div className="cards grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
				<Card
					title="Signups"
					figure={2}
					icon={<AiOutlineUser />}
					pastDays={18}
					color="blue"
				/>
				<Card
					title="Asks"
					figure={6}
					icon={<BsQuestionCircle />}
					pastDays={34}
					color="purple"
				/>
				<Card
					title="Page Views"
					figure={791}
					icon={<BsEye />}
					pastDays={54}
					color="green"
				/>
				<Card
					title="Reports"
					figure={0}
					icon={<CiWarning />}
					pastDays={54}
					color="yellow"
				/>
				<Card
					title="Banned"
					figure={0}
					icon={<IoBanOutline />}
					pastDays={54}
					color="red"
				/>
				<Card
					title="Hidden"
					figure={0}
					icon={<FiEyeOff />}
					pastDays={14}
					color="gray"
				/>
			</div>
		</main>
	);
}

const Card = (props: {
	title: string;
	figure: number;
	pastDays: number;
	icon: ReactNode;
	color: string;
}) => {
	const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
		blue: { bg: 'from-blue-50 to-blue-100', icon: 'text-blue-600', border: 'border-blue-200' },
		purple: { bg: 'from-purple-50 to-purple-100', icon: 'text-purple-600', border: 'border-purple-200' },
		green: { bg: 'from-green-50 to-green-100', icon: 'text-green-600', border: 'border-green-200' },
		yellow: { bg: 'from-yellow-50 to-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-200' },
		red: { bg: 'from-red-50 to-red-100', icon: 'text-red-600', border: 'border-red-200' },
		gray: { bg: 'from-gray-50 to-gray-100', icon: 'text-gray-600', border: 'border-gray-200' },
	};

	const colors = colorMap[props.color] || colorMap.blue;

	return (
		<div className={`card bg-gradient-to-br ${colors.bg} p-6 rounded-xl border ${colors.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
			<div className="flex items-start justify-between mb-4">
				<div className={`${colors.icon} text-4xl p-3 bg-white rounded-lg shadow-sm`}>
					{props.icon}
				</div>
			</div>
			<div>
				<h2 className="text-sm font-medium text-gray-600 mb-1">
					{props.title}
				</h2>
				<p className="text-3xl font-bold text-gray-800 mb-3">
					{props.figure.toLocaleString()}
				</p>
				<div className="pt-3 border-t border-gray-200">
					<span className="text-xs text-gray-500">
						Last {props.pastDays} days
					</span>
				</div>
			</div>
		</div>
	);
};
