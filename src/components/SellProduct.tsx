import React, { useState } from "react";
import Navbar from "./Navbar";
import "../sellProduct.css";
import { db, storage } from "../firebase/setup";  
import { addDoc, collection } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellProduct: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors: any = {};
    const titleRegex = /^[a-zA-Z0-9\s]+$/; 
    const descriptionRegex = /^[a-zA-Z0-9\s.,]+$/;  
    const priceRegex = /^(?!0)([1-9]\d*)(\.\d{1,2})?$/;
    const mobileRegex = /^[0-9]{10}$/;
    const categoryRegex = /^[a-zA-Z\s]+$/; 
    if (!titleRegex.test(title)) {
      formErrors.title = "Title can only contain letters, numbers, and spaces.";
    }

    if (!descriptionRegex.test(description)) {
      formErrors.description = "Description can only contain letters, numbers, spaces, commas, and full stops.";
    }

    if (!priceRegex.test(price)) {
      formErrors.price = "Price must be a valid number and at least $1.";
    }

    if (!mobileRegex.test(mobileNumber)) {
      formErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }

    if (!categoryRegex.test(category)) {
      formErrors.category = "Category can only contain letters and spaces.";
    }

    if (!image) {
      formErrors.image = "Please upload an image.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const imageRef = ref(storage, `products/${image?.name}`);
      await uploadBytes(imageRef, image!);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        title,
        description,
        price,
        imageUrl,
        mobileNumber,
        category,
      });

      toast.success("Product added successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product, please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sell-product-container">
        <form className="sell-product-form" onSubmit={handleSubmit}>
          <h2>Sell Your Product</h2>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Title"
              required
            />
            {errors.title && <small className="error-text">{errors.title}</small>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              required
            ></textarea>
            {errors.description && <small className="error-text">{errors.description}</small>}
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (in $)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in USD"
              required
            />
            {errors.price && <small className="error-text">{errors.price}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number (10 digits)"
              required
            />
            {errors.mobileNumber && <small className="error-text">{errors.mobileNumber}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Product Category"
              required
            />
            {errors.category && <small className="error-text">{errors.category}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              required
            />
            {errors.image && <small className="error-text">{errors.image}</small>}
          </div>
          
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;
