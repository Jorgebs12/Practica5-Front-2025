import { Handlers, PageProps } from "$fresh/server.ts";

type Post = {
    data: {
        title: string;
        author: string;
        likes: number;
        cover: string;
        comments: Array<{
            id: string;
            text: string;
        }>;  
    }
}

export const handler: Handlers<Post | null> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const res = await fetch(`https://back-p5-y0e1.onrender.com/api/posts/${id}`);
    const post: Post = await res.json();
    return ctx.render(post);
  },
};

export default function PostPage({ data }: PageProps<Post>) {
    console.log(data);
    return (
        <div>
            <h1>{data.data.title}</h1>
            <p>Autor: {data?.data.author}</p>
            <p>Likes: {data?.data.likes}</p>
            <img class="image" src={data?.data.cover ? data?.data.cover : "https://via.placeholder.com/150"} alt={data?.data.title} />
            <p>Likes: {data?.data.likes}</p>
            <h2>Comentarios</h2>
            <ul>
                {data?.data.comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
            
        </div>
    );

}