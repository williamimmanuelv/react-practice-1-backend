import { beforeEach, describe, expect, it, vi, } from 'vitest';
// screen lets us check the fake web page
import { screen, render, } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');
let loadCart;
let paymentSummary;

describe('Payment summary', () => {
  beforeEach(() => {
    paymentSummary = {
      "totalItems": 1,
      "productCostCents": 2067,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 2067,
      "taxCents": 207,
      "totalCostCents": 2274
    }
    loadCart = vi.fn()
  })
  it('testing dollor amount', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    )

    const totalItems = screen.getByTestId('totalItems');

    expect(totalItems).toHaveTextContent('Items (1)')

    const productCostCents = screen.getByTestId('productCostCents');

    expect(productCostCents).toHaveTextContent('$20.67')

    const shippingCostCents = screen.getByTestId('shippingCostCents');

    expect(shippingCostCents).toHaveTextContent('0');

    const totalCostBeforeTaxCents = screen.getByTestId('totalCostBeforeTaxCents');

    expect(totalCostBeforeTaxCents).toHaveTextContent('$20.67');   
    
    const taxCents = screen.getByTestId('taxCents');

    expect(taxCents).toHaveTextContent('$2.07');   

    const totalCostCents = screen.getByTestId('totalCostCents');

    expect(totalCostCents).toHaveTextContent('$22.74');   

  })

  it('place order button', async() => {

    function Location (){
      const location = useLocation()
      return(
        <div data-testid="url-path"> {location.pathname} </div>
      )
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location/>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const placeOrderButton = screen.getByTestId('place-order-button button-primary');
    await user.click(placeOrderButton)

    expect(axios.post).toHaveBeenCalledWith('/api/orders')
    expect(loadCart).toHaveBeenCalled()
    const locationPath = screen.getByTestId('url-path')

    expect(locationPath).toHaveTextContent('/orders')

  })
})