import {create} from 'zustand';
import axios from "axios";

type PostType = {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: {
        likes: number;
        dislikes: number;
    }
}

interface PostState {
    posts: PostType[];
    isLoading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
}

export const useStore = create<PostState>(set => ({
    posts: [],
    isLoading: false,
    error: null,
    fetchPosts: async () => {
        set({isLoading: true});
        try {
            const response = await axios.get('https://dummyjson.com/posts');
            set({posts: response.data.posts, isLoading: false});
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Unknown error",
                isLoading: false,
            });
        }
    }
}));