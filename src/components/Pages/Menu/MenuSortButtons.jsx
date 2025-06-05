import { ButtonGroup, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown, FunnelSimple, XCircle } from "phosphor-react";

const MenuSortButtons = ({ sortField, sortDirection, onToggleSort, onResetSort }) => {
  const renderSortLabel = (label, field) => (
    <span className="d-flex align-items-center gap-1">
      {label}
      {sortField === field &&
        (sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
    </span>
  );

  return (
    <div className="text-center mb-3">
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        {/* Texto + ícono */}
        <div className="d-flex align-items-center me-2">
          <FunnelSimple size={20} className="me-1" />
          <strong>Sort by:</strong>
        </div>

        {/* Botones de ordenar */}
        <div className="d-flex align-items-center gap-2">
          <ButtonGroup>
            <Button
              variant={sortField === "price" ? "primary" : "outline-primary"}
              onClick={() => onToggleSort("price")}
              aria-label="Sort by price"
            >
              {renderSortLabel("Price", "price")}
            </Button>
            <Button
              variant={sortField === "name" ? "primary" : "outline-primary"}
              onClick={() => onToggleSort("name")}
              aria-label="Sort by name"
            >
              {renderSortLabel("Name", "name")}
            </Button>
          </ButtonGroup>

          {/* Botón Reset alineado a la par */}
          <Button
            variant="outline-danger"
            onClick={onResetSort}
            aria-label="Reset sort"
            title="Reset to default"
          >
            <span className="d-flex align-items-center gap-1">
              <XCircle size={16} />
              Reset
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuSortButtons;