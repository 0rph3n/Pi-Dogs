import "./Paginado.styles.css";
import { Link } from "react-router-dom";

function Paginado({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlerPrevious = () => {
    if (currentPage === 1) return;
    paginado(currentPage - 1);
  };
  const handlerNext = () => {
    if (currentPage === pageNumbers.length) return;
    paginado(currentPage + 1);
  };
  return (
    <div>
      <nav className="page">
        <button className="pagenumber" onClick={() => handlerPrevious()}>
          Prev
        </button>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div key={number}>
              <Link to={number} className="linkPage">
                <button className="pagenumber" onClick={() => paginado(number)}>
                  {number}
                </button>
              </Link>
            </div>
          ))}
        <button className="pagenumber" onClick={() => handlerNext()}>
          Next
        </button>
      </nav>
    </div>
  );
}

export default Paginado;
