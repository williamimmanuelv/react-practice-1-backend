import { it, expect, describe, vi, beforeEach } from 'vitest';
// screen lets us check the fake web page
import { render, screen, within } from '@testing-library/react';
//  MemoryRouter is for testing
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';
import axios from 'axios';

vi.mock('axios')

describe('HomePage component', () => {
  let loadCart;


  beforeEach(() => {
    loadCart = vi.fn();

    // the below code means whenenver we use axios.get its going
    //  to run this fake function. So basically we can get what we want from the fake api.
    // Here we can give axios.get a value and its going to be the parameter of this function.
    axios.get.mockImplementation(async(urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"]
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"]
            }
          ]
        }
      }
    });
  })

  it('displays the products correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    // to wait for the component to load we use  --> findAllByTestId
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);
    expect(
      within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  })
})