const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')

describe('Product Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products', () => {
    const testProduct = {
      title: 'test product',
      description: 'this is a test product',
      price: 200,
      inventory: 12,
      category: 'swag'
    }

    beforeEach(() => {
      return Product.create(testProduct)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.deep.equal('test product')
          expect(res.body[0].description).to.be.deep.equal('this is a test product')
          expect(res.body[0].price).to.be.deep.equal(2)
          expect(res.body[0].inventory).to.be.deep.equal(12)
          expect(res.body[0].category).to.be.deep.equal('swag')
        })
    })
  })
})
