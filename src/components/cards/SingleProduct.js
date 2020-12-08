import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined, HeartFilled } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../../functions/user";

import "./overrides.css";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

// this is children component of Product
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [wishlist, setWishlist] = useState([]);
  const [favorite, setFavorite ] = useState([])
  const [fav, setFav] = useState("")
  const [display, setDisplay ] = useState(false)

  const [tooltip, setToolTip] = useState("Cliquer pour ajouter au panier");

  // eslint-disable-next-line no-unused-vars
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
      getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
      console.log('testid', _id)
      wishlist.map((p) => (
        p._id = _id ? (setDisplay(true)) : (setDisplay(false))
      ))
      console.log(display)
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
      setFavorite(user.wishlist)
      toast.success("retirer des favoris");
    });

  

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
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("Ajouter aux favoris", res.data);
      toast.success("Ajouter aux favoris");
      history.push("/user/wishlist");
    });
  };

  const handleFavorite = () => {
    if (display === true) {
      return (
        <a onClick={() => handleRemove(_id)}>
          <HeartFilled className="text-info" /> <br /> Retirer des favoris
        </a>
      )
    } else { 
      return (
      <a onClick={handleAddToWishlist}>
        <HeartOutlined className="text-info" /> <br /> Ajouter aux favoris
    </a>
    )
  }   
  }

  return (
    <>
      <div className="col-md-3">
        {images && images.length ? (
          <Carousel
            showArrows={true}
            autoPlay
            infiniteLoop
            dynamicHeight={true}
          >
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={title} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className="mb-3 card-image" alt={title} />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Contacter-nous si vous souhaitez plus d'information au sujet de ce
            produit.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-9">
        <h1 className="bg-info p-3">{title}</h1>

        <h4 className="text-center pt-1 pb-3">Avis client</h4>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">Aucun avis</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <Link onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Ajouter
                au panier
              </Link>
            </Tooltip>,


            handleFavorite(),


            <RatingModal>
              {" "}
              <StarRatings
                rating={star}
                starRatedColor="#FFB800"
                starHoverColor="#FFB800"
                name={_id}
                changeRating={onStarClick}
                isSelectable={true}
                starDimension="40px"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
