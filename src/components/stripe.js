import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './checkoutform';

const pub = 'pk_test_51JZpFfE7NvKgqgr0BLVwLsdMBTRhNmUIFaN1wdyGCwOn33Air2kJjafD0DLwQBh4pW0ww3stq61xIrgfwpOPFr0c00fhTuhlB0';
const stripePromise = loadStripe(pub);

const PayForm = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm error={props.setError} pay={props.pay} id={props.id} balance={props.balance}/>
    </Elements>
  );
}

export default PayForm;
