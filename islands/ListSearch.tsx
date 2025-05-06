import { FunctionalComponent } from "preact/src/index.d.ts";
import { useEffect, useState } from "preact/hooks";

type Books = {
    title: string;
    author: string;
    likes: number;
    cover: string;
};

type BooksRes = {
    data: {
        posts: Array<{
            title: string;
            author: string;
            likes: number;
            cover: string;
        }>;
    }
}
const ListSearch: FunctionalComponent = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://back-p5-y0e1.onrender.com/api/posts/";
            try {
                const response = await fetch(url);
                const data: BooksRes = await response.json();
                setBooks(data.data.posts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div class="list-search-container">
            <h1 class="list-search-title">Lista de libros</h1>
            <form class="list-search-form">
                <input
                    class="list-search-input"
                    type="text"
                    placeholder="Buscar libros"
                    value={searchText}
                    onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
                />
            </form>
            <ul class="list-search-list">
                {filteredBooks.map((book) => (
                    <li class="list-search-item" key={book.title}>
                        <h2 class="list-search-item-title">{book.title}</h2>
                        <p class="list-search-item-info">Autor: {book.author}</p>
                        <p class="list-search-item-info">Likes: {book.likes}</p>
                        <img
                            class="list-search-item-image"
                            src={book.cover ? book.cover : "https://via.placeholder.com/150"}
                            alt={book.title}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListSearch;