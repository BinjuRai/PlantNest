import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../../api/admin/adminProductApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await updateProduct(id, formData);
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <input name="name" defaultValue={product.name} className="input" />
      <input
        name="price"
        type="number"
        defaultValue={product.price}
        className="input"
      />
      <textarea
        name="description"
        defaultValue={product.description}
        className="input"
      />

      <input type="file" name="image" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditProduct;
