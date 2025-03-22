import React from 'react';
import {useCheckout} from '@stripe/react-stripe-js'

const ShippingOptions = () => {
  const {shipping, shippingOptions, updateShippingOption} = useCheckout();

  const handleChange = (shippingOption) => () => {
    updateShippingOption(shippingOption);
  };

  return (
    <form>
      {shippingOptions.map((option) => {
        return (
          <label key={option.id}>
            <input
              type="radio"
              name="shippingOption"
              value={option.id}
              checked={shipping?.shippingOption?.id === option.id}
              onChange={handleChange(option.id)}
            />
            {option.displayName}
          </label>
        );
      })}
    </form>
  )
};

export default ShippingOptions;