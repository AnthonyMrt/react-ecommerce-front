import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setToolTip] = useState("Cliquer pour ajouter au panier");

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // création tableau panier d'achat
    let cart = [];
    if (typeof window !== "undefined") {
      // Si le panier est dans le localstorage, on le récupère
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // on envoie le produit vers le panier
      cart.push({
        ...product,
        count: 1,
      });
      //On vérifie si le panier existe déjà dans le localstorage, pour éviter les duplications.
      let unique = _.uniqWith(cart, _.isEqual);
      // On enregistre le panier dans le localstorage
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("le produit a été ajouté au panier");

      //ajout à redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //Afficher drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">Aucun avis</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt={title}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> Voir Produit
          </Link>,
          <Tooltip title={tooltip}>

            <Link onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br /> {product.quantity < 1 ? "Produit épuisé" : "Ajouter au panier"}
            </Link>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title.substring(0, 25)} - ${price}€`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
