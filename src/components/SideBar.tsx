import storage from '@/fbConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const SideBar = () => {
	const router = useRouter();
	const [logo, setLogo] = useState('');
	useEffect(() => {
		getDownloadURL(ref(storage, 'images/whogetLogo.png')).then(
			(logoUrl) => {
				setLogo(logoUrl);
			}
		);
	}, []);
	return (
		<div className="px-4 h-full min-w-[200px] text-indigo-950">
			<div>
				<h1 className="text-2xl py-4">
					<Image src={logo} alt="logo" width={150} height={100} className="object-center object-cover aspect-video" />
				</h1>
			</div>
			<nav className="py-4">
				<ul className="flex flex-col gap-4">
					<Link href={'/'} className= {router.pathname==='/'? "font-bold": ""}>
						<li>Overview</li>
					</Link>
					<Link href={'/users'} className= {router.pathname==='/users'? "font-bold": ""}>
						<li>Users</li>
					</Link>
					<Link href={'/asks'} className= {router.pathname==='/asks'? "font-bold": ""}>
						<li>Asks</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default SideBar;
