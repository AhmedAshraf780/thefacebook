import React, { useState } from 'react';
import type { Post } from '../types';

interface PostCardProps {
    post: Post;
    currentProfilePic: string | null;
    onLike: (postId: number) => void;
    onComment: (postId: number, text: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentProfilePic, onLike, onComment }) => {
    const [commentInput, setCommentInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (commentInput.trim()) {
                onComment(post.id, commentInput);
                setCommentInput('');
            }
        }
    };

    const handleSendClick = () => {
        if (commentInput.trim()) {
            onComment(post.id, commentInput);
            setCommentInput('');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-3">
                {post.user === 'User Name' && currentProfilePic ? (
                    <img src={currentProfilePic} alt="User" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                )}
                <div>
                    <h3 className="font-bold text-[#050505] text-[15px]">{post.user}</h3>
                    <span className="text-xs text-gray-500">{post.time}</span>
                </div>
            </div>

            <p className="text-[#050505] text-[15px] mb-3 whitespace-pre-wrap">{post.content}</p>

            {post.image && (
                <div className="mb-3 -mx-4">
                    <img src={post.image} alt="Post content" className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-2">
                <div className="flex gap-1 w-full">
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-1 rounded cursor-pointer font-semibold hover:bg-gray-100 ${post.isLiked ? 'text-[#1877f2]' : 'text-gray-500'}`}
                        onClick={() => onLike(post.id)}
                    >
                        <span>{post.isLiked ? '👍 Liked' : '👍 Like'}</span>
                        <span>({post.likes})</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1 rounded cursor-pointer font-semibold hover:bg-gray-100 text-gray-500">
                        <span>💬 Comment</span>
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-3 mt-2">
                {post.comments && post.comments.length > 0 && (
                    <div className="mb-3 flex flex-col gap-2">
                        {post.comments.map(comment => (
                            <div key={comment.id} className="flex gap-2">
                                {/* Ideally we check comment.user to show correct avatar, but for now we assume 'User Name' is current user */}
                                {comment.user === 'User Name' && currentProfilePic ? (
                                    <img src={currentProfilePic} alt="User" className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                )}
                                <div className="bg-[#f0f2f5] rounded-2xl px-3 py-2">
                                    <div className="font-bold text-xs text-[#050505]">{comment.user}</div>
                                    <div className="text-sm text-[#050505] whitespace-pre-wrap">{comment.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    {currentProfilePic ? (
                        <img src={currentProfilePic} alt="User" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    )}
                    <div className="flex-grow relative">
                        <input
                            className="w-full bg-[#f0f2f5] rounded-full px-3 py-2 text-sm outline-none border border-transparent focus:border-gray-300"
                            placeholder="Write a comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSendClick}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877f2] font-semibold text-xs disabled:opacity-50"
                            disabled={!commentInput.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
