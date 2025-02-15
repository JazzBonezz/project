import axios from "axios";

const BASE_URL = "https://dummyjson.com/posts";

export const fetchPosts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.posts;
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    }
};