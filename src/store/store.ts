import { create } from "zustand";
import axios from "axios";

type PostType = {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: {
        likes: number;
        dislikes: number;
    };
    liked?: boolean;
    disliked?: boolean;
}

interface PostState {
    posts: PostType[];
    isLoading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    likePost: (postId: number) => void;
    dislikePost: (postId: number) => void;
    initializeReactions: () => void;
}

export const useStore = create<PostState>((set) => ({
    posts: [],
    isLoading: false,
    error: null,

    fetchPosts: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get("https://dummyjson.com/posts");
            const posts = response.data.posts;

            const updatedPosts = posts.map((post: PostType) => {
                const storedData = localStorage.getItem(`post-${post.id}-reactions`);
                if (storedData) {
                    const { likes, dislikes, liked, disliked } = JSON.parse(storedData);
                    return {
                        ...post,
                        reactions: {
                            likes: likes ?? post.reactions.likes,
                            dislikes: dislikes ?? post.reactions.dislikes,
                        },
                        liked,
                        disliked
                    };
                }
                return { ...post, liked: false, disliked: false };
            });

            set({ posts: updatedPosts, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Unknown error",
                isLoading: false,
            });
        }
    },

    likePost: (postId) => {
        set((state) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === postId) {
                    const isLiked = !post.liked;
                    const isDisliked = false; // Снимаем дизлайк, если он стоял
                    const newLikes = isLiked ? post.reactions.likes + 1 : post.reactions.likes - 1;
                    const newDislikes = post.reactions.dislikes - (post.disliked ? 1 : 0);

                    // Сохраняем состояние в localStorage
                    localStorage.setItem(`post-${postId}-reactions`, JSON.stringify({
                        likes: newLikes,
                        dislikes: newDislikes,
                        liked: isLiked,
                        disliked: isDisliked
                    }));

                    return {
                        ...post,
                        reactions: {
                            likes: newLikes,
                            dislikes: newDislikes,
                        },
                        liked: isLiked,
                        disliked: isDisliked
                    };
                }
                return post;
            });

            return { posts: updatedPosts };
        });
    },

    dislikePost: (postId) => {
        set((state) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === postId) {
                    const isDisliked = !post.disliked;
                    const isLiked = false; // Снимаем лайк, если он стоял
                    const newDislikes = isDisliked ? post.reactions.dislikes + 1 : post.reactions.dislikes - 1;
                    const newLikes = post.reactions.likes - (post.liked ? 1 : 0);

                    // Сохраняем состояние в localStorage
                    localStorage.setItem(`post-${postId}-reactions`, JSON.stringify({
                        likes: newLikes,
                        dislikes: newDislikes,
                        liked: isLiked,
                        disliked: isDisliked
                    }));

                    return {
                        ...post,
                        reactions: {
                            likes: newLikes,
                            dislikes: newDislikes,
                        },
                        liked: isLiked,
                        disliked: isDisliked
                    };
                }
                return post;
            });

            return { posts: updatedPosts };
        });
    },

    initializeReactions: () => {
        set((state) => {
            const updatedPosts = state.posts.map((post) => {
                const storedData = localStorage.getItem(`post-${post.id}-reactions`);
                if (storedData) {
                    const { likes, dislikes, liked, disliked } = JSON.parse(storedData);
                    return {
                        ...post,
                        reactions: {
                            likes: likes ?? post.reactions.likes,
                            dislikes: dislikes ?? post.reactions.dislikes,
                        },
                        liked,
                        disliked
                    };
                }
                return { ...post, liked: false, disliked: false };
            });

            return { posts: updatedPosts };
        });
    },
}));

