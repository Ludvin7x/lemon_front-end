import { ButtonGroup, Button } from "react-bootstrap";

const MenuCategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="text-center mb-3">
    <ButtonGroup>
      <Button
        variant={selectedCategory === "all" ? "primary" : "outline-primary"}
        onClick={() => onSelectCategory("all")}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.slug ? "primary" : "outline-primary"}
          onClick={() => onSelectCategory(cat.slug)}
        >
          {cat.title}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

export default MenuCategoryFilter;