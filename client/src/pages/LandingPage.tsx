import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center max-w-[980px] mx-auto w-full px-4 py-8 md:py-0">

                {/* Left Section: Branding */}
                <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-[#1877f2] text-6xl font-bold mb-2 tracking-tighter">the facebook</h1>
                    <h2 className="text-[#1c1e21] text-[24px] md:text-[28px] leading-8 font-normal">
                        A social utility that connects you with the people around you at your university.
                    </h2>
                </div>

                {/* Right Section: Login Form */}
                <div className="w-full md:w-[396px] flex flex-col">
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                        <form className="flex flex-col gap-3">
                            <Input
                                type="text"
                                placeholder="Email or phone number"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                            />
                            <Button
                                type="submit"
                                className="w-full text-xl font-bold py-2.5"
                            >
                                Log In
                            </Button>

                            <div className="text-center mt-2">
                                <a href="#" className="text-[#1877f2] hover:underline text-sm font-medium">
                                    Forgot password?
                                </a>
                            </div>

                            <hr className="my-4 border-gray-300" />

                            <div className="text-center">
                                <Link to="/signup">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        className="px-4 font-bold"
                                    >
                                        Create new account
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <span className="font-bold cursor-pointer hover:underline">Create a Page</span> for a celebrity, brand or business.
                    </div>
                </div>

            </div>

            {/* Footer (Simplified) */}
            <footer className="bg-white py-4 mt-auto">
                <div className="max-w-[980px] mx-auto px-4 text-gray-500 text-xs">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span>English (US)</span>
                        <span className="cursor-pointer hover:underline">Español</span>
                        <span className="cursor-pointer hover:underline">Français (France)</span>
                        <span className="cursor-pointer hover:underline">中文(简体)</span>
                        {/* Add more languages as needed */}
                    </div>
                    <hr className="my-2" />
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span>Sign Up</span>
                        <span>Log In</span>
                        <span>Messenger</span>
                        <span>Facebook Lite</span>
                        <span>Video</span>
                        <span>Places</span>
                        <span>Games</span>
                        <span>Marketplace</span>
                        <span>Meta Pay</span>
                        <span>Meta Store</span>
                        <span>Meta Quest</span>
                        <span>Instagram</span>
                        <span>Threads</span>
                        {/* ... other footer links */}
                    </div>
                    <div className="mt-4">
                        Meta © 2024
                    </div>
                </div>
            </footer>
        </div>
    );
};
