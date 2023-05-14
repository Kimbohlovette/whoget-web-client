import storage from '@/fbConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const SideBar = () => {
	const router = useRouter();
	const [logo, setLogo] = useState('');
	const defaultLogo = require('../assets/logo-transparent.png');
	useEffect(() => {
		getDownloadURL(ref(storage, 'images/whogetLogo.png')).then(
			(logoUrl) => {
				setLogo(logoUrl);
			}
		);
	}, []);
	return (
		<div className="px-4 h-full min-w-[220px] text-indigo-950 min-h-[50vh]">
			<div className="my-5">
				<Image
					src={logo !== '' ? logo : defaultLogo}
					alt="logo"
					width={150}
					height={100}
				/>
			</div>
			<nav className="py-8">
				<ul className="flex flex-col gap-4">
					<Link
						href={'/'}
						className={router.pathname === '/' ? 'font-bold' : ''}
					>
						<li>Overview</li>
					</Link>
					<Link
						href={'/users'}
						className={
							router.pathname === '/users' ? 'font-bold' : ''
						}
					>
						<li>Users</li>
					</Link>
					<Link
						href={'/asks'}
						className={
							router.pathname === '/asks' ? 'font-bold' : ''
						}
					>
						<li>Asks</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default SideBar;
