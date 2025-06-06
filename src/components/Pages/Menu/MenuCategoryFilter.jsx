const MenuCategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-full border transition
          ${
            selectedCategory === "all"
              ? "bg-primary text-white border-primary dark:bg-green-600 dark:border-green-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.slug)}
          className={`px-4 py-2 rounded-full border transition
            ${
              selectedCategory === cat.slug
                ? "bg-primary text-white border-primary dark:bg-green-600 dark:border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export default MenuCategoryFilter;