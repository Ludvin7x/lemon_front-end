const MenuCategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-full border transition 
          ${selectedCategory === "all" 
            ? "bg-primary text-white" 
            : "bg-background border-muted text-muted-foreground hover:bg-muted"}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.slug)}
          className={`px-4 py-2 rounded-full border transition 
            ${selectedCategory === cat.slug 
              ? "bg-primary text-white" 
              : "bg-background border-muted text-muted-foreground hover:bg-muted"}`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export default MenuCategoryFilter;