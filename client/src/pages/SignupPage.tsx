import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { egyptianColleges } from '../data/colleges';

export const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        college: '',
        grade: '',
        gender: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Handle signup logic here
        alert("Sign up successful! Redirecting to login...");
        navigate('/home');
    };

    const gradeOptions = Array.from({ length: 7 }, (_, i) => ({
        value: String(i + 1),
        label: `Year ${i + 1}`
    }));

    const collegeOptions = egyptianColleges.map(college => ({
        value: college,
        label: college
    }));

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            <div className="bg-white shadow-sm py-4 mb-8">
                <div className="max-w-[980px] mx-auto px-4">
                    <h1 className="text-[#1877f2] text-4xl font-bold tracking-tighter">the facebook</h1>
                </div>
            </div>

            <div className="flex-grow flex justify-center px-4">
                <div className="w-full max-w-[500px]">
                    <div className="text-center mb-6">
                        <h2 className="text-[25px] font-bold text-[#1c1e21]">Create a new account</h2>
                        <p className="text-[17px] text-[#606770]">It's quick and easy.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <Input
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="lastName"
                                    placeholder="Surname"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Input
                                type="email"
                                name="email"
                                placeholder="Mobile number or email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                type="password"
                                name="password"
                                placeholder="New password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <div className="mt-2">
                                <label className="text-xs text-[#606770] font-semibold">College</label>
                                <Select
                                    name="college"
                                    options={collegeOptions}
                                    value={formData.college}
                                    onChange={handleChange}
                                    placeholder="Select your college"
                                    required
                                />
                            </div>

                            <div className="mt-2">
                                <label className="text-xs text-[#606770] font-semibold">Year</label>
                                <Select
                                    name="grade"
                                    options={gradeOptions}
                                    value={formData.grade}
                                    onChange={handleChange}
                                    placeholder="Select your year"
                                    required
                                />
                            </div>

                            <div className="mt-2">
                                <label className="text-xs text-[#606770] font-semibold">Gender</label>
                                <div className="flex justify-between gap-2 mt-1">
                                    {['Female', 'Male'].map((gender) => (
                                        <label key={gender} className="flex-1 flex items-center justify-between border border-gray-300 rounded p-2 cursor-pointer hover:bg-gray-50">
                                            <span className="text-[15px] text-[#1c1e21]">{gender}</span>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={gender}
                                                checked={formData.gender === gender}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="text-[11px] text-[#777] mt-2 mb-2">
                                People who use our service may have uploaded your contact information to Facebook. <a href="#" className="text-[#385898] hover:underline">Learn more</a>.
                                <br /><br />
                                By clicking Sign Up, you agree to our <a href="#" className="text-[#385898] hover:underline">Terms</a>, <a href="#" className="text-[#385898] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#385898] hover:underline">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.
                            </div>

                            <div className="texts-center mt-2 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="lg"
                                    className="w-[200px] font-bold text-lg"
                                >
                                    Sign Up
                                </Button>
                            </div>

                            <div className="text-center mt-4">
                                <Link to="/" className="text-[#1877f2] hover:underline text-lg">
                                    Already have an account?
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/* Footer (Simplified) */}
            <footer className="bg-white py-4 mt-8">
                <div className="max-w-[980px] mx-auto px-4 text-gray-500 text-xs">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span>English (US)</span>
                        <span className="cursor-pointer hover:underline">Español</span>
                        <span className="cursor-pointer hover:underline">Français (France)</span>
                        <span className="cursor-pointer hover:underline">中文(简体)</span>
                    </div>
                    <hr className="my-2" />
                    <div className="mt-4">
                        Meta © 2024
                    </div>
                </div>
            </footer>
        </div>
    );
};
