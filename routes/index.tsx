export default function Home() {
  return (
    <div class="home-container">
      <h1 class="home-title">Bienvenido a la API de libros</h1>
      <a class="home-link" href="/postList">Ver todos los libros</a>
      <a class="home-link" href="/search">Buscar libros</a>
      <a class="home-link" href="/post/create">Crear libro</a>
    </div>
  );
}