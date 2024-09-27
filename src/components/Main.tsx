import { useEffect, useState } from "react";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import { db } from "../firebase/setup";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types/Product"; 

const Main = () => {
  const [prod, setProd] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("");

  const getProducts = async () => {
    setLoading(true); 
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray: any[] = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProd(productsArray); 
    } catch (error) {
      console.error("Error fetching products from Firestore: ", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getProducts();  
  }, []);

  return (
    <div>
      <Navbar setSearch={setSearch}  />
      
      <Menubar setMenu={setMenu} />

      {loading ? (
        <div className="text-center">Loading products...</div> 
      ) : (
        <Home products={prod} search={search} menu={menu} />
      )}
      <Footer />
    </div>
  );
};

export default Main;
