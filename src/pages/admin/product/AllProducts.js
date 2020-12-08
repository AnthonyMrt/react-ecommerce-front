import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import Loader from "../../../components/Loader/Loader.gif";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`Product: ${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <img src={Loader} alt="loading..." />
          ) : (
            <h4>Tout les produits</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-2 pb-3">
                <AdminProductCard
                  key={product._id}
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
