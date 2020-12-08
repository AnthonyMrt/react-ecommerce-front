import React from 'react'

const ShowPaymentInfo = ({order, showStatus = true}) => {
    return (
        <div>
            <p>
                <span>ID commande: {order.paymentIntent.id}</span>{" / "}
                <span>Montant: {(order.paymentIntent.amount / 100).toLocaleString("fr-FR", {style: "currency", currency: "EUR" })}</span>{" / "}
                <span>Devise: {order.paymentIntent.currency.toUpperCase()}</span>{" / "}
                <span>Méthode de paiment: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
                <span>Statut paiment: {order.paymentIntent.status.toUpperCase()}</span>{" / "}
                <span>Commander le:{" "}
                {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                </span>{" / "}
                <br />
                {showStatus && (
                <span className="badge bg-primary text-white">
                    STATUT: {order.orderStatus}
                </span>
                )}
            </p>
        </div>
    )
}

export default ShowPaymentInfo
