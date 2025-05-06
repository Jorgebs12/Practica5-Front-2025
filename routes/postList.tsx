import Axios from "axios";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import ListComponent from "../components/ListComponent.tsx";

type Book = {
    title: string;
    author: string;
    likes: number;
    cover: string;
};

type Data = {
  posts: Array<Book>;
};

type BooksAPI = {
    data: {
        posts: Array<{
            title: string;
            author: string;
            likes: number;
            cover: string;
        }>;
    }
};

export const handler: Handlers = {
  GET: async (_req, ctx: FreshContext<unknown, Data>) => {
    
    const url = "https://back-p5-y0e1.onrender.com/api/posts/";
    
    try {
      const response = await Axios.get<BooksAPI>(url);
      return ctx.render({ posts: response.data.data.posts});
    
    } catch(e){
      console.error(e);
      return new Response("Error de API", { status: 500 });
    }
  },
};

export default (props: PageProps<Data>) => {
    
    console.log(props.data.posts);
    return (
        ListComponent({books: props.data.posts})
    );
}