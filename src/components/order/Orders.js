import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prix</th>
              <th scope="col">Marque</th>
              <th scope="col">Couleur</th>
              <th scope="col">quantité</th>
              <th scope="col">Livraison</th>
            </tr>
          </thead>
    
          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>{p.product.price} €</td>
                <td>{p.product.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>
                  {p.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Statut Livraison</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="En cours de traitement">
                    En cours de traitement
                  </option>
                  <option value="Traité">Traité</option>
                  <option value="Paiment à la livraison">Paiment à la livraison</option>
                  <option value="En cours d'expédition">
                    En cours d'expédition{" "}
                  </option>
                  <option value="Expédié">Expédié</option>
                  <option value="Annuler">En cours de traitement</option>
                  <option value="Livrer">Livrer</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
