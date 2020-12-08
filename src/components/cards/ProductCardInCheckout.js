import React from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import laptop from "../../images/laptop.png";
import { toast } from "react-toastify";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Noir", "Marron", "Argent", "Blanc", "Bleu"];

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      console.log("update color", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let quantité = e.target.value < 1 ? 1 : e.target.value;

    if (quantité > p.quantity) {
      toast.error(`le maximum de commande pour ce produit est: ${p.quantity}`);
      quantité = p.quantity;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = quantité;
        }
      });

      //console.log("update quantity", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div
            style={{
              width: "50px",
              height: "auto",
            }}
          >
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td className="p-2">{p.title}</td>
        <td className="text-center p-3">{p.price} €</td>
        <td className="text-center p-3">{p.brand}</td>
        <td className="text-center p-" style={{ width: "20px" }}>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control p-2"
          >
            {p.color ? (
              <option>{p.color}</option>
            ) : (
              <option>Sélectionner</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center" style={{ width: "10px" }}>
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
            style={{ padding: "16%" }}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseCircleTwoTone
            onClick={handleRemove}
            className="pointer"
            twoToneColor="red"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
