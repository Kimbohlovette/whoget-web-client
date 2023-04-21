import Link from 'next/link';
import React from 'react';

const SideBar = () => {
	return (
		<div className="px-4 h-full min-w-[200px] border-r text-indigo-950">
			<div>
                <h1 className="text-2xl py-4">WhoGet</h1>
			</div>
			<nav className='py-4'>
				<ul className="flex flex-col gap-4">
					<Link href={'/'} className='active:font-semibold'>
						<li>Overview</li>
					</Link>
					<Link href={'/users'}>
						<li>Users</li>
					</Link>
					<Link href={'/asks'}>
						<li>Asks</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default SideBar;
