/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import React from 'react'
import cartReducer, { addToCart, removeFromCart, updateCartItem } from './cart'
import {Cart} from '../components/Cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart store', () => {

  describe('action creators', () => {
    let store;

    const initialState = [];

    beforeEach(() => {
      store = mockStore(initialState)
    })

    afterEach(() => {
      store.clearActions();
    })

    describe('add to cart', () => {
      let item = {id: 1, price: 500, quantity: 2}
      let action = addToCart(item);
      it('returns an action type ADD_TO_CART, price 500, quantity 2', () => {
        expect(action.type).to.equal('ADD_TO_CART')
        expect(action.item.price).to.equal(500)
        expect(action.item.quantity).to.equal(2)
      })
    })

    describe('remove from cart', () => {
      let item = {id: 1, price: 500, quantity: 2}
      let action = removeFromCart(item);
      it('returns an action type REMOVE_FROM_CART with item to be removed', () => {
        expect(action.type).to.equal('REMOVE_FROM_CART')
        expect(action.item).to.deep.equal(item);
      })
    })
  })

  describe('cart reducer', () => {
    let store;
    const initialState = [];
      beforeEach(() => {
        store = mockStore(initialState)
      })

      afterEach(() => {
        store.clearActions();
      })

      describe('add to cart', () => {

        let item = {id: 1, price: 500, quantity: 2}
        let action = addToCart(item);

        it('returns an updated state with the new item added', () => {
          expect(cartReducer(initialState, action)).to.deep.equal([ item ])
        })
      })

      describe('remove from cart', () => {


        let item = {id: 1, price: 500, quantity: 2}
        let action = removeFromCart(item)

        it('removes item with the same item id', () => {
          expect(cartReducer([item], action)).to.deep.equal([])
        })
      })

      describe('update item', () => {
        let item = {id: 1, price: 500, quantity: 10}
        let action = updateCartItem(item)
        let newState = cartReducer([{id: 1, price: 500, quantity: 2}], action)

        it('updates a current item with the action item', () => {

          expect(newState[0].id).to.equal(1)
          expect(newState[0].quantity).to.equal(10)
        })
      })
  })

})

describe('Cart Component', () => {
  const initialCart = [{
    id: 1,
    image: 'image1',
    name: 'name1',
    price: 500,
    quantity: 1
  }, {
    id: 2,
    image: 'image2',
    name: 'name2',
    price: 600,
    quantity: 1
  }]
  let renderedCart

  beforeEach(() => {
    renderedCart = shallow(<Cart cart={initialCart} />)
  })

  it('renders two SingleItem components', () => {
    expect(renderedCart.find('h1').exists()).to.be.equal(true)
  })
})

