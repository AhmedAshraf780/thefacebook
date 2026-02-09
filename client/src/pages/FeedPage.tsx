import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { Post, Comment } from '../types';
import { PostCard } from '../components/PostCard';

export const FeedPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(() => {
        const savedPosts = localStorage.getItem('feedPosts');
        if (savedPosts) {
            return JSON.parse(savedPosts);
        }
        return [
            { id: 1, user: 'Ahmed Mohamed', content: 'Excited to start the new semester at Cairo University!', time: '2h ago', likes: 12, comments: [] },
            { id: 2, user: 'Sara Ali', content: 'Does anyone have the lectures for CS101?', time: '4h ago', likes: 5, comments: [] },
            { id: 3, user: 'Mahmoud Hassan', content: 'Just finished my final project. Time to sleep!', time: '6h ago', likes: 24, comments: [] },
        ];
    });

    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState<string | null>(null);
    const [profilePic, setProfilePic] = useState<string | null>(null);

    React.useEffect(() => {
        const savedPic = localStorage.getItem('userProfilePic');
        if (savedPic) {
            setProfilePic(savedPic);
        }
    }, []);

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
            user: 'User Name',
            content: postContent,
            time: 'Just now',
            likes: 0,
            isLiked: false,
            image: postImage || undefined,
            comments: []
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('feedPosts', JSON.stringify(updatedPosts));
        setPostContent('');
        setPostImage(null);
    };

    const handleLike = (postId: number) => {
        const updatedPosts = posts.map(post => {
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
        setPosts(updatedPosts);
        localStorage.setItem('feedPosts', JSON.stringify(updatedPosts));
    };

    const handleComment = (postId: number, text: string) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newComment: Comment = {
                    id: Date.now(),
                    user: 'User Name',
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

        setPosts(updatedPosts);
        localStorage.setItem('feedPosts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="max-w-[680px] mx-auto px-4 pb-8">
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
                            onClick={() => document.getElementById('post-image-upload')?.click()}
                        >
                            <span className="text-green-500 text-xl">🖼️</span>
                            <span>Photo/Video</span>
                        </div>
                        <input
                            type="file"
                            id="post-image-upload"
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

            {/* Feed Stream */}
            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentProfilePic={profilePic}
                        onLike={handleLike}
                        onComment={handleComment}
                    />
                ))}
            </div>
        </div>
    );
};
