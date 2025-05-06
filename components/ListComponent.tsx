import { FunctionalComponent } from "preact/src/index.d.ts";

type Books = {
    title: string;
    author: string;
    likes: number;
    cover: string;
};

type Props = {
    books: Books[];
};

//Hacer el cambio de vista lista a vista cuadrícula en una islands, si no, no se puede hacer el cambio de vista

const ListComponent: FunctionalComponent<Props> = (props) => {
    const mibooks = props.books
    return (
        <div>
            <h1>Lista de libros</h1>
            <ul>
                {mibooks.map((book) => (
                    <li key={book.title}>
                        <h2>{book.title}</h2>
                        <p>Autor: {book.author}</p>
                        <p>Likes: {book.likes}</p>
                        <img class="image" src={book.cover ? book.cover : "https://via.placeholder.com/150"} alt={book.title} />
                        <p>Likes: {book.likes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default ListComponent;