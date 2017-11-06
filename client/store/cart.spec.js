/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import cartReducer, { addToCart, removeFromCart } from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


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
      initialState.concat([ {id: 1, price: 500, quantity: 2} ])

      let item = {id: 1, price: 500, quantity: 2}
      let action = removeFromCart(item);

      it('removes item with the same item id', () => {
        expect(cartReducer(initialState, action)).to.deep.equal([])
      })
    })
})

