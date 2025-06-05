import { ButtonGroup, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown, FunnelSimple } from "phosphor-react";

const MenuSortButtons = ({ sortField, sortDirection, onToggleSort }) => (
  <div className="text-center mb-3">
    <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <div className="d-flex align-items-center me-2">
        <FunnelSimple size={20} className="me-1" />
        <strong>Sort by:</strong>
      </div>
      <ButtonGroup>
        <Button
          variant={sortField === "price" ? "primary" : "outline-primary"}
          onClick={() => onToggleSort("price")}
          aria-label="Sort by price"
        >
          Price{" "}
          {sortField === "price" &&
            (sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
        </Button>
        <Button
          variant={sortField === "name" ? "primary" : "outline-primary"}
          onClick={() => onToggleSort("name")}
          aria-label="Sort by name"
        >
          Name{" "}
          {sortField === "name" &&
            (sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
        </Button>
      </ButtonGroup>
    </div>
  </div>
);

export default MenuSortButtons;