import "./SearchBar.styles.css";

function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className="container">
      <form onChange={handleChange}>
        <input placeholder="Busqueda" type="search" className="search" />
        <button type="submit" className="butonSearch" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
