import { useState } from "preact/hooks";

export default function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    content: "",
    author: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const sentForm = async (e: Event) => {
    e.preventDefault();
  
    if (!formData.title || formData.title.length < 3) {
      setMessage("El título es obligatorio y debe tener al menos 3 caracteres.");
      return;
    }
    if (!formData.cover) {
      setMessage("El cover es obligatorio.");
      return;
    }
    if (!formData.content || formData.content.length < 10) {
      setMessage("El contenido es obligatorio y debe tener al menos 10 caracteres.");
      return;
    }
    if (!formData.author) {
      setMessage("El autor es obligatorio.");
      return;
    }
  
    setIsSubmitting(true);
    setMessage("");
  
    try {
      const response = await fetch("https://back-p5-y0e1.onrender.com/api/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response) throw new Error("Error al crear el post.");
      
      const data = await response.json();

      setMessage(`Creado con ID ${data.data._id}`);
      setFormData({title: "", cover: "", content: "", author: "" }); 
      setIsSubmitting(false);

    } catch (error) {
        console.error("Error:", error);
        setMessage("Error al crear el post.");
        setIsSubmitting(false);
    }
  };

  return (
    <div class="form-container">
      <h1 class="form-title">Crear Post</h1>
      <form onSubmit={sentForm} class="form">
        <div class="form-group">
          <label htmlFor="title" class="form-label">Título:</label>
          <input type="text" id="title" name="title"
            value={formData.title} onChange={handleChange} required class="form-input" />
        </div>
        
        <div class="form-group">
          <label htmlFor="cover" class="form-label">Cover (URL):</label>
          <input type="text" id="cover" name="cover"
            value={formData.cover} onChange={handleChange} required class="form-input" />
        </div>
        
        <div class="form-group">
          <label htmlFor="content" class="form-label">Contenido:</label>
          <textarea id="content" name="content"
            value={formData.content} onChange={handleChange} required class="form-textarea" />
        </div>
  
        <div class="form-group">
          <label htmlFor="author" class="form-label">Autor:</label>
          <input type="text" id="author" name="author"
            value={formData.author} onChange={handleChange} required class="form-input" />
        </div>
  
        <button type="submit" disabled={isSubmitting} class="form-button">
          {isSubmitting ? "Creando..." : "Crear"}
        </button>
      </form>
      {message && <p class="form-message">{message}</p>}
    </div>
  );
}