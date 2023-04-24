import Link from 'next/link';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Navbar = () => {
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	return (
		<header className="py-4 px-4 flex flex-row items-center justify-between gap-4">
			<div className="flex-1 flex flex-row items-center gap-4">
				<div className="relative">
					<button
					className="sm:hidden"
						onClick={() => {
							setShowDropdownMenu((state) => !state);
						}}
					>
						<HiMenu className="text-2xl" />
					</button>
					{showDropdownMenu && (
						<div className="bg-white px-8 py-5 border rounded-md absolute top-10 min-w-[200px]">
							<nav className="py-4">
								<ul className="flex flex-col gap-4">
									<Link
										href={'/'}
										className="active:font-semibold"
									>
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
					)}
				</div>
				<div className="flex justify-start items-center flex-1 gap-2 border bg-white rounded-sm">
					<HiOutlineMagnifyingGlass className="ml-4" />
					<input
						type="search"
						className="outline-none px-2 py-2 min-w-0 w-full"
						placeholder="Type search"
					/>
				</div>
			</div>
			<div className="md:hidden relative">
				<button
					onClick={() => {
						setShowProfile((state) => !state);
					}}
				>
					<AiOutlineUser className="text-2xl" />
				</button>
				{showProfile && (
					<div className="bg-white px-8 py-5 border absolute top-10 right-0 min-w-max">
						<nav className="py-4 text-primary font-bold">
							<ul className="flex flex-col gap-4">
								<Link
									href={'/'}
									className="active:font-semibold"
								>
									<li className="text-primary font-bold">
										Your profile
									</li>
								</Link>
								<Link href={'/users'}>
									<li>Notifications</li>
								</Link>
								<Link href={'/asks'}>
									<li>Messages</li>
								</Link>
								<Link href={'/asks'}>
									<li className="border-t pt-4">Logout</li>
								</Link>
							</ul>
						</nav>
					</div>
				)}
			</div>
			<div className="hidden md:flex flex-1 flex-row justify-evenly">
				<div className="flex flex-row items-center gap-4">
					<IoMdNotificationsOutline />
					<MdOutlineMailOutline />
				</div>
				<div className="flex flex-row items-center justify-center gap-2 place-content-end">
					<AiOutlineUser className="text-xl" />
					<p>Eyong Vanisiah</p>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
