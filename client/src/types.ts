export interface Comment {
    id: number;
    user: string;
    text: string;
    time: string;
}

export interface Post {
    id: number;
    user: string;
    content: string;
    time: string;
    likes: number;
    isLiked?: boolean;
    image?: string;
    comments?: Comment[];
}

export interface UserDetails {
    work: string;
    location: string;
    relationship: string;
}
