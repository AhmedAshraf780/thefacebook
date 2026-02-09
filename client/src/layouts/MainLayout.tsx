import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Input } from '../components/ui/Input';

export const MainLayout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#f0f2f5] font-sans">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 h-14 flex items-center px-4 justify-between">

                {/* Left: Logo & Search */}
                <div className="flex items-center gap-4">
                    <Link to="/home" className="text-[#1877f2] text-3xl font-bold tracking-tighter no-underline">
                        the facebook
                    </Link>
                    <div className="hidden md:block w-64">
                        <Input
                            placeholder="Search"
                            className="py-1.5 px-3 bg-[#f0f2f5] border-none rounded-full text-[15px] placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Center: Navigation Links (Placeholder for standard icons, using text for now) */}
                <div className="hidden md:flex gap-8 h-full">
                    {/* Visual placeholder for centered nav icons if we had them */}
                </div>

                {/* Right: Profile & Settings */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/profile"
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#f2f2f2] transition-colors ${location.pathname === '/profile' ? 'bg-[#e7f3ff] text-[#1877f2]' : 'text-[#050505]'}`}
                    >
                        <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                        <span className="font-semibold text-[15px]">Profile</span>
                    </Link>

                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                        <span className="font-bold text-xl">⋮</span>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
};
