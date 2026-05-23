import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaTshirt,
  FaMobileAlt,
  FaCouch,
} from "react-icons/fa";

const categories = [
  {
    name: "Electronics",
    icon: <FaLaptop />,
    path: "/products?category=Electronics",
  },
  {
    name: "Fashion",
    icon: <FaTshirt />,
    path: "/products?category=Fashion",
  },
  {
    name: "Mobiles",
    icon: <FaMobileAlt />,
    path: "/products?category=Mobiles",
  },
  {
    name: "Furniture",
    icon: <FaCouch />,
    path: "/products?category=Furniture",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className="group rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
            {category.icon}
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default Categories;