import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { XCircle } from "phosphor-react";

const MenuSearch = ({ value, onChange, onClear }) => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Search menu items"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Button
      variant="outline-secondary"
      onClick={onClear}
      title="Clear search"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <XCircle size={20} />
    </Button>
  </InputGroup>
);

export default MenuSearch;