import { Link } from "react-router-dom";
import { Product } from "../types/Product";

type ProductsProp = {
  products: Product[];
  search: string;
  menu: string; 
};

const Home = ({ products, search, menu }: ProductsProp) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products
        .filter((product) => {
          const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
          const matchesMenu = menu === "" || product.category.toLowerCase() === menu.toLowerCase();
          return matchesSearch && matchesMenu; 
        })
        .map((product: Product) => (
          <Link to="/details" state={{ data: product }} key={product.id}>
            <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
              <img src={product.imageUrl} className="h-48 w-60" alt={product.title} />
              <h1 className="text-xl font-bold">${product.price}</h1>
              <h1 className="text-lg">{product.title}</h1>
              <h1 className="text-sm text-gray-600">{product.category}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;