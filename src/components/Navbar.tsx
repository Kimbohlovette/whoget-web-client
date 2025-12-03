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
		<header className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between gap-4">
			<div className="flex-1 flex items-center gap-4">
				<div className="relative">
					<button
						className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onClick={() => setShowDropdownMenu((state) => !state)}
					>
						<HiMenu className="text-2xl text-gray-700" />
					</button>
					{showDropdownMenu && (
						<div className="bg-white shadow-lg border border-gray-200 rounded-xl absolute top-14 z-50 min-w-[200px] overflow-hidden">
							<nav className="py-2">
								<ul className="flex flex-col">
									<Link href={'/'} className="px-4 py-3 hover:bg-gray-50 transition-colors">
										<li className="text-gray-700">Overview</li>
									</Link>
									<Link href={'/users'} className="px-4 py-3 hover:bg-gray-50 transition-colors">
										<li className="text-gray-700">Users</li>
									</Link>
									<Link href={'/asks'} className="px-4 py-3 hover:bg-gray-50 transition-colors">
										<li className="text-gray-700">Asks</li>
									</Link>
								</ul>
							</nav>
						</div>
					)}
				</div>
				<div className="flex items-center flex-1 gap-3 border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 focus-within:border-blue-500 focus-within:bg-white transition-all">
					<HiOutlineMagnifyingGlass className="text-gray-400 text-xl" />
					<input
						type="search"
						className="outline-none bg-transparent w-full text-gray-700 placeholder:text-gray-400"
						placeholder="Search..."
					/>
				</div>
			</div>
			<div className="md:hidden relative">
				<button
					onClick={() => setShowProfile((state) => !state)}
					className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<AiOutlineUser className="text-2xl text-gray-700" />
				</button>
				{showProfile && (
					<div className="bg-white shadow-lg border border-gray-200 rounded-xl absolute top-14 right-0 min-w-max z-50 overflow-hidden">
						<nav className="py-2">
							<ul className="flex flex-col">
								<Link href={'/'} className="px-6 py-3 hover:bg-gray-50 transition-colors">
									<li className="text-blue-600 font-semibold">Your profile</li>
								</Link>
								<Link href={'/users'} className="px-6 py-3 hover:bg-gray-50 transition-colors">
									<li className="text-gray-700">Notifications</li>
								</Link>
								<Link href={'/asks'} className="px-6 py-3 hover:bg-gray-50 transition-colors">
									<li className="text-gray-700">Messages</li>
								</Link>
								<Link href={'/asks'} className="px-6 py-3 border-t border-gray-200 hover:bg-gray-50 transition-colors">
									<li className="text-red-600">Logout</li>
								</Link>
							</ul>
						</nav>
					</div>
				)}
			</div>
			<div className="hidden md:flex items-center gap-6">
				<div className="flex items-center gap-4">
					<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
						<IoMdNotificationsOutline className="text-2xl text-gray-600" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>
					<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
						<MdOutlineMailOutline className="text-2xl text-gray-600" />
					</button>
				</div>
				<div className="flex items-center gap-3 pl-6 border-l border-gray-200">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
						<AiOutlineUser className="text-xl text-white" />
					</div>
					<p className="text-gray-700 font-medium">Eyong Vanisiah</p>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
