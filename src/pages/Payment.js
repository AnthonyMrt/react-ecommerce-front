import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe("pk_test_51HsxzFGImgOpb5zJ6dLYjZp9FX1jvbpcmGnlDstYJcDrM1aDy6booHlIlUDalymqZvELZr9AMQW7mStGWf7jro7S00kAsDQksq");

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Finalisez votre achat</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
