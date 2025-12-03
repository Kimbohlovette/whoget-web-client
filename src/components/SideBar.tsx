import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
const SideBar = () => {
	const router = useRouter();
	const defaultLogo = require('../assets/whoget-primary.png');
	return (
		<div className="px-6 h-full min-w-[240px] py-4">
			<div className="mb-8">
				<Image src={defaultLogo} alt="logo" width={150} height={100} />
			</div>
			<nav>
				<ul className="flex flex-col gap-2">
					<Link href={'/'}>
						<li className={`px-4 py-3 rounded-lg transition-all ${
							router.pathname === '/' 
								? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
								: 'text-gray-700 hover:bg-gray-100'
						}`}>
							Overview
						</li>
					</Link>
					<Link href={'/users'}>
						<li className={`px-4 py-3 rounded-lg transition-all ${
							router.pathname === '/users' 
								? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
								: 'text-gray-700 hover:bg-gray-100'
						}`}>
							Users
						</li>
					</Link>
					<Link href={'/asks'}>
						<li className={`px-4 py-3 rounded-lg transition-all ${
							router.pathname === '/asks' 
								? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
								: 'text-gray-700 hover:bg-gray-100'
						}`}>
							Asks
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default SideBar;
