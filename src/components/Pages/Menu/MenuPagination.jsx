import { Pagination } from "react-bootstrap";

const MenuPagination = ({ page, totalPages, onPageChange }) => (
  <Pagination className="justify-content-center mt-4">
    <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
    {[...Array(totalPages)].map((_, idx) => (
      <Pagination.Item
        key={idx + 1}
        active={page === idx + 1}
        onClick={() => onPageChange(idx + 1)}
      >
        {idx + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
  </Pagination>
);

export default MenuPagination;
