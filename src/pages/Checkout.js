import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AddressForm from "../components/forms/AddressForm";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";

const initialState = {
  prenom: "",
  nom: "",
  societe: "",
  adresse: "",
  adresse2: "",
  codePostal: "",
  ville: "",
  pays: "",
  portable: "",
};

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [values, setValues] = useState(initialState);
  const [coupon, setCoupon] = useState("");
  //const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  //const history = useHistory;
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      //console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //retirer de redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // retirer du server
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      toast.info(<b>Panier vider</b>);
    });
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    if (values.societe === "") {
      const AllAddress = `${values.prenom} ${values.nom}, ${values.adresse}, ${values.adresse2}, ${values.codePostal}, ${values.ville}, ${values.pays}, ${values.portable}`;
      saveUserAddress(user.token, AllAddress).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Adresse sauvegarder", {
            autoClose: 2000,
          });
        }
      });
      console.log(AllAddress);
    } else {
      const AllAddress = `${values.prenom} ${values.nom}, ${values.societe}, ${values.adresse}, ${values.adresse2}, ${values.codePostal}, ${values.ville}, ${values.pays}, ${values.portable}`;
      console.log(AllAddress);
      saveUserAddress(user.token, AllAddress).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Adresse sauvegarder");
        }
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const applyDiscountCoupon = () => {
    console.log(coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // envoyer le nouveau total à Redux
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        //MAJ redux
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
        placeholder="Code promo/bon d'achat"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Appliquer code promo
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="text-center">Adresse de livraison</h4>
        <AddressForm
          handleChange={handleChange}
          saveAddressToDb={saveAddressToDb}
          values={values}
        />
        <h4>Code promo ou bon d'achat ?</h4>
        <br />
        {showApplyCoupon()}
        <br />

        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Résumé de la commande</h4>
        <hr />
        <p>
          <b>Produits:</b> {products.length}
        </p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <b>
              <p>Liste des produits :</p>
            </b>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count} €
            </p>
          </div>
        ))}
        <hr />
        <p>
          <b>Total panier:</b> {total} euros
        </p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Total panier après réduction appliquer: {totalAfterDiscount} €
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Effectuer commande
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Effectuer commande
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
