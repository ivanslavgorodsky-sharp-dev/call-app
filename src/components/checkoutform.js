import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CardForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const stripePaymentMethodHandler = (result) =>{
        if (result.error) {
            props.error(result.error.message);
        } else {
          props.pay(props.id, result.paymentMethod.id)
            .then( res => {
                if (res === "Success")
                    props.balance(props.id);
            });
        }
      }

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        stripePaymentMethodHandler(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group m-3 d-flex justify-content-between align-items-center">
                <CardElement options={{hidePostalCode: true}} />
                <button type="submit" className="btn btn-secondary" disabled={!stripe}>Pay $10</button>
            </div>
        </form>
    );
};
  
export default CardForm;
  