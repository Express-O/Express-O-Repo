import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleProduct} from './SingleProduct';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleProduct', () => {
  let singleProduct;
  beforeEach(() => {
    singleProduct = shallow(<SingleProduct />)
  })


})
