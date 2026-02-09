import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SettingsPage: React.FC = () => {
    return (
        <div className="max-w-[980px] mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-[#1c1e21]">Settings</h1>

            <div className="flex gap-8">
                {/* Sidebar Navigation */}
                <div className="w-1/4">
                    <ul className="bg-white rounded-lg shadow overflow-hidden">
                        {['General', 'Security and Login', 'Your Facebook Information', 'Privacy', 'Blocking', 'Language and Region'].map((item, index) => (
                            <li key={item} className={`px-4 py-3 cursor-pointer hover:bg-gray-100 font-semibold ${index === 0 ? 'bg-[#e7f3ff] text-[#1877f2] border-l-4 border-[#1877f2]' : 'text-gray-600'}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Settings Content */}
                <div className="w-3/4">
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">General Account Settings</h2>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <span className="font-bold text-gray-700 block">Name</span>
                                    <span className="text-gray-600">User Name</span>
                                </div>
                                <Button variant="secondary" size="sm">Edit</Button>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <span className="font-bold text-gray-700 block">Username</span>
                                    <span className="text-gray-600">http://www.facebook.com/username</span>
                                </div>
                                <Button variant="secondary" size="sm">Edit</Button>
                            </div>

                            <div className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <span className="font-bold text-gray-700 block">Contact</span>
                                    <span className="text-gray-600">Primary: email@example.com</span>
                                </div>
                                <Button variant="secondary" size="sm">Edit</Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Security and Login</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-gray-700 mb-2">Change Password</h3>
                                <div className="flex flex-col gap-3 max-w-md">
                                    <Input type="password" placeholder="Current" />
                                    <Input type="password" placeholder="New" />
                                    <Input type="password" placeholder="Retype new" />
                                    <div className="flex justify-end">
                                        <Button size="sm">Save Changes</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
