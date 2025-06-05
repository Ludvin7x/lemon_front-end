import { Pagination } from "react-bootstrap";

const MenuPagination = ({ page, totalPages, onPageChange }) => {
  // Evitar renderizar paginación si no hay páginas o solo 1 página
  if (totalPages <= 1) return null;

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
      {[...Array(totalPages)].map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <Pagination.Item
            key={pageNum}
            active={page === pageNum}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Pagination.Item>
        );
      })}
      <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
    </Pagination>
  );
};

export default MenuPagination;