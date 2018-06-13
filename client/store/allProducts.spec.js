import {expect} from 'chai';
import {fetchProducts, postProduct, editProduct} from './allProducts';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {defaultAllProducts: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  })

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GET ALL PRODUCTS action', () => {
      const fakeProducts = [{id: 1, title: 'mocha'}, {id: 2, title: 'latte'}];
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts);
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS');
          expect(actions[0].allProducts).to.be.equal(fakeProducts);
        })
    })
  });
  describe('postProduct', () => {
    it('eventually dispatches the ADD PRODUCT action', () => {

      const newProduct = {id: 3, title: 'afogato'};
      mockAxios.onPost('/api/products').replyOnce(200, newProduct);
      return store.dispatch(postProduct(newProduct))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('ADD_PRODUCT');
          expect(actions[0].product).to.deep.equal(newProduct);
        })

    })
  });
  describe('editProduct', () => {
    it('eventually dispatches SET UPDATED PRODUCT', () => {
      let editedProduct = {id: 4, title: 'tea'};
      mockAxios.onPut(`/api/products/${editedProduct.id}`).replyOnce(200, editedProduct);
      return store.dispatch(editProduct(editedProduct))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('SET_UPDATED_PRODUCT');
          expect(actions[0].product).to.deep.equal(editedProduct);
        })
    })
  })

})
