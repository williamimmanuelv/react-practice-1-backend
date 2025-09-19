import { it, expect, describe, vi } from 'vitest';
// screen lets us check the fake web page
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from './Product';
import axios from 'axios';

vi.mock('axios');

describe('Product component', () => {
    it('displays the product details correctly', () => {
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }
        // vi.fn = creates a fake function that doesn't do anything.
        const loadCart = vi.fn();

        render(<Products product={product} loadCart={loadCart} />)

        // toBeInTheDocument() --> this method is provided by jest-dom
        // this checks if this (screen.()..etc) element exists on the screen
        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();
        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')
        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    })

    it('adds a product to the cart', async() => {
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }
        // vi.fn = creates a fake function that doesn't do anything.
        const loadCart = vi.fn();

        render(<Products product={product} loadCart={loadCart} />)

        // setting up userEvet
        const user = userEvent.setup();
        const addToCartButtom = screen.getByTestId('add-to-cart-button');
        // this simulates the event click
        await user.click(addToCartButtom);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );
        expect(loadCart).toHaveBeenCalledWith();
    });
})