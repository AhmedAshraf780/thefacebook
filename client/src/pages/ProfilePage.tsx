import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { Post, Comment, UserDetails } from '../types';
import { PostCard } from '../components/PostCard';

export const ProfilePage: React.FC = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const userName = "User Name";

    // Edit Details State
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails>(() => {
        const savedDetails = localStorage.getItem('userProfileDetails');
        if (savedDetails) {
            return JSON.parse(savedDetails);
        }
        return {
            work: 'Student at Cairo University',
            location: 'Lives in Cairo, Egypt',
            relationship: 'Single'
        };
    });
    // Temporary state for editing
    const [editForm, setEditForm] = useState<UserDetails>(userDetails);

    // Posts State
    const [posts, setPosts] = useState<Post[]>([]);

    // Create Post State
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState<string | null>(null);

    useEffect(() => {
        const savedPic = localStorage.getItem('userProfilePic');
        if (savedPic) {
            setProfilePic(savedPic);
        }
        loadPosts();
    }, []);

    const loadPosts = () => {
        const savedPosts = localStorage.getItem('feedPosts');
        if (savedPosts) {
            const allPosts: Post[] = JSON.parse(savedPosts);
            setPosts(allPosts);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfilePic(base64String);
                localStorage.setItem('userProfilePic', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDetails = () => {
        setUserDetails(editForm);
        localStorage.setItem('userProfileDetails', JSON.stringify(editForm));
        setIsEditingDetails(false);
    };

    const handlePostImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!postContent.trim() && !postImage) return;

        const newPost: Post = {
            id: Date.now(),
            user: userName,
            content: postContent,
            time: 'Just now',
            likes: 0,
            isLiked: false,
            image: postImage || undefined,
            comments: []
        };

        const savedPosts = localStorage.getItem('feedPosts');
        const currentPosts = savedPosts ? JSON.parse(savedPosts) : [];
        const updatedPosts = [newPost, ...currentPosts];

        localStorage.setItem('feedPosts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        setPostContent('');
        setPostImage(null);
    };

    const handleLike = (postId: number) => {
        const savedPosts = localStorage.getItem('feedPosts');
        if (!savedPosts) return;

        let allPosts: Post[] = JSON.parse(savedPosts);
        allPosts = allPosts.map(post => {
            if (post.id === postId) {
                const isLiked = !post.isLiked;
                return {
                    ...post,
                    isLiked,
                    likes: isLiked ? post.likes + 1 : post.likes - 1
                };
            }
            return post;
        });

        localStorage.setItem('feedPosts', JSON.stringify(allPosts));
        setPosts(allPosts);
    };

    const handleComment = (postId: number, text: string) => {
        const savedPosts = localStorage.getItem('feedPosts');
        if (!savedPosts) return;

        let allPosts: Post[] = JSON.parse(savedPosts);
        allPosts = allPosts.map(post => {
            if (post.id === postId) {
                const newComment: Comment = {
                    id: Date.now(),
                    user: userName,
                    text: text,
                    time: 'Just now'
                };
                return {
                    ...post,
                    comments: [...(post.comments || []), newComment]
                };
            }
            return post;
        });

        localStorage.setItem('feedPosts', JSON.stringify(allPosts));
        setPosts(allPosts);
    };

    // Filter posts for current user
    const userPosts = posts.filter(post => post.user === userName);

    return (
        <div className="max-w-[980px] mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow mb-4 overflow-hidden relative">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="px-8 pb-4 flex items-end relative">
                    <div className="w-40 h-40 bg-gray-300 rounded-full border-4 border-white absolute -top-16 cursor-pointer overflow-hidden group" onClick={() => document.getElementById('profile-upload')?.click()}>
                        {profilePic ? (
                            <div className="w-full h-full relative">
                                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-semibold text-sm">Update</span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 hover:bg-gray-400 transition-colors">
                                <span className="text-2xl">📷</span>
                            </div>
                        )}
                        <input
                            type="file"
                            id="profile-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="ml-44 pt-4 flex-grow">
                        <h1 className="text-3xl font-bold text-[#1c1e21]">{userName}</h1>
                    </div>
                </div>

                {/* Profile Tabs */}
                <div className="px-8 border-t border-gray-200">
                    <div className="flex gap-1">
                        <div className="px-4 py-3 font-semibold text-[#1877f2] border-b-2 border-[#1877f2] cursor-pointer">
                            Posts
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Left Column: Intro */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h2 className="text-xl font-bold text-[#1c1e21] mb-3">Intro</h2>
                        {isEditingDetails ? (
                            <div className="flex flex-col gap-3">
                                <Input
                                    value={editForm.work}
                                    onChange={e => setEditForm({ ...editForm, work: e.target.value })}
                                    placeholder="Work/Education"
                                />
                                <Input
                                    value={editForm.location}
                                    onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                    placeholder="Location"
                                />
                                <Input
                                    value={editForm.relationship}
                                    onChange={e => setEditForm({ ...editForm, relationship: e.target.value })}
                                    placeholder="Relationship Status"
                                />
                                <div className="flex gap-2 mt-2">
                                    <Button className="flex-1 bg-[#e4e6eb] text-black hover:bg-[#d8dadf]" onClick={() => setIsEditingDetails(false)}>Cancel</Button>
                                    <Button className="flex-1" onClick={handleSaveDetails}>Save</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 text-sm text-[#050505]">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 text-center">🎓</span>
                                    <span className="font-semibold">{userDetails.work}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-5 text-center">🏠</span>
                                    <span className="font-semibold">{userDetails.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-5 text-center">❤️</span>
                                    <span className="font-semibold">{userDetails.relationship}</span>
                                </div>
                                <Button className="w-full mt-4 bg-[#e4e6eb] text-black hover:bg-[#d8dadf]" onClick={() => setIsEditingDetails(true)}>
                                    Edit Details
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Wall */}
                <div className="w-full md:w-2/3">
                    {/* Create Post */}
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <div className="flex gap-2">
                            {profilePic ? (
                                <img src={profilePic} alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                            )}
                            <div className="flex-grow">
                                <Input
                                    placeholder="What's on your mind?"
                                    className="bg-[#f0f2f5] border-none rounded-full px-4 w-full"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handlePost();
                                    }}
                                />
                                {postImage && (
                                    <div className="mt-2 relative">
                                        <img src={postImage} alt="Preview" className="max-h-60 rounded-lg border border-gray-200" />
                                        <button
                                            onClick={() => setPostImage(null)}
                                            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 opacity-75 hover:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <div
                                    className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 font-semibold"
                                    onClick={() => document.getElementById('profile-post-image-upload')?.click()}
                                >
                                    <span className="text-green-500 text-xl">🖼️</span>
                                    <span>Photo/Video</span>
                                </div>
                                <input
                                    type="file"
                                    id="profile-post-image-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePostImageUpload}
                                />
                            </div>
                            <Button size="sm" className="px-6" onClick={handlePost} disabled={!postContent.trim() && !postImage}>
                                Post
                            </Button>
                        </div>
                    </div>

                    {/* User Posts Stream */}
                    <div className="flex flex-col gap-4">
                        {userPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                currentProfilePic={profilePic}
                                onLike={handleLike}
                                onComment={handleComment}
                            />
                        ))}
                        {userPosts.length === 0 && (
                            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                                No posts to show.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
