import PostCard from "../../components/post/PostCard.tsx";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../api/api.ts";

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

const PostList = () => {

    const [post, setPost] = useState<PostType[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPost(data);
            }
            catch (error) {
                console.error('Error fetching post', error);
            }
        }
        loadPosts();
    }, [])

    return (
        <div>
            {post.map(post => (
                <div key={post.id}>
                    <PostCard
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        views={post.views}
                        likes={post.reactions.likes}
                        dislikes={post.reactions.dislikes}
                    />
                </div>


            ))}

        </div>
    );
};

export default PostList;