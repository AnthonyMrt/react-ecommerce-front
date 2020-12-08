import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //console.log("panier", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    //console.log("panier", JSON.stringify(cart, null, 4));
    dispatch({
      type: 'COD',
      payload: true
    })
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };


  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Produit</th>
          <th className="text-center" scope="col">
            Prix
          </th>
          <th className="text-center" scope="col">
            Marque
          </th>
          <th className="text-center" style={{ width: "8%" }} scope="col">
            Couleur
          </th>
          <th className="text-center" scope="col">
            Quantité
          </th>
          <th className="text-center" scope="col">
            Livraison
          </th>
          <th className="text-center" scope="col">
            Supprimer
          </th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Panier / {cart.length} produit(s)</h4>

          {!cart.length ? (
            <p>
              Aucun produit dans le panier.{" "}
              <Link to="/shop">Retournez vers le magasin</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Résumé de la commande</h4>
          <hr />
          <p>Produits</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.price * c.count}€
              </p>
            </div>
          ))}
          <hr />
          Total: <b>{getTotal()} €</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Passer commande
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Payer à la livraison
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Connectez-vous pour passer commande
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
