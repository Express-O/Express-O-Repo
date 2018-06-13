'use strict'

const db = require('../server/db')
const { User, Product, Review } = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ firstName: 'Cody', lastName: 'McGee', isAdmin: true, streetName: '145 North 5th Street', city: 'Manhattan', state: 'NY', zip: 11201, country: 'USA', email: 'cody@email.com', password: '123' }),
    User.create({ firstName: 'Murphy', lastName: 'Arcos', streetName: '456 North 78th Street', city: 'Brooklyn', state: 'NY', zip: 11201, country: 'USA', email: 'murphy@email.com', password: '123' })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded users successfully`)

  const products = await Promise.all([
    Product.create({ productId: 1, title: `Lattè`, description: `is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte [kafˈfɛ ˈlatte], caffelatte [kaffeˈlatte] or caffellatte [kaffelˈlatte], which means "milk coffee". Our lattès are made from our premium beans`, price: 400, inventory: 15, photo: 'https://dailycoffeenews.com/wp-content/uploads/2016/01/Sawada-Coffee-Latte-1.jpg', category: 'drink' }),
    Product.create({
      productId: 2, title: `Cappuccino`, description: `An espresso-based coffee drink that originated in Italy, and is traditionally prepared with double espresso, and steamed milk. Variations of the drink involve the use of cream instead of milk, and flavoring with cinnamon or chocolate powder. It is typically smaller in volume than a caffè latte, with a thicker layer of micro foam.

    The name comes from the Capuchin friars, referring to the colour of their habits, and in this context referring to the colour of the beverage when milk is added in small portion to dark, brewed coffee (today mostly espresso). The physical appearance of a modern cappuccino with espresso créma and steamed milk is a result of a long evolution of the drink.
    Our cappucinos are made from our premium beans`, price: 450, inventory: 15, photo: 'https://www.ideahacks.com/wp-content/uploads/2017/01/Iced-Mocha-Cappuccino-Drink.jpg', category: 'drink'
    }),
    Product.create({ productId: 3, title: `Caffè Macchiato`, description: `Sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed. In Italian, macchiato means "stained" or "spotted" so the literal translation of caffè macchiato is "stained coffee", or coffee with a spot of milk. The origin of the name "macchiato" stems from baristas needing to show the serving waiters the difference between an espresso and an espresso with a tiny bit of milk in it; the latter was "marked". The caffè macchiato has the highest ratio of espresso to milk of any drink made with those ingredients. The intent is that the milk moderates, rather than overwhelms, the taste of the coffee while adding a touch of sweetness. The drink is typically prepared by pouring a small amount of steamed milk directly into a single shot of espresso. As much as this sounds like 'mocha' there is absolutely no chocolate in this coffee. Our Caffè Macchiatos are made from our premium beans`, price: 350, inventory: 15, photo: 'https://keithpp.files.wordpress.com/2015/07/caffe-macchiato-cappuccino-july-2015.jpg', category: 'drink' }),
    Product.create({ productId: 4, title: `Caffè Mocha`, description: `This a chocolate-flavored variant of a caffè latte. Other commonly used spellings are mochaccino and also mochachino. The name is derived from the city of Mocha, Yemen, which was one of the centers of early coffee trade. Like a caffè latte, caffè mocha is based on espresso and hot milk, but with added chocolate, in the form of sweet cocoa powder. Our mochas can contain dark chocolate. Our lattès are made from our premium beans and finest of chocolates`, price: 500, inventory: 15, photo: 'https://blog.cafecampesino.com/wp-content/uploads/recipe-images/Mocha-de-Mexico.jpg', category: 'drink' }),
    Product.create({ productId: 5, title: `Caffè Americano`, description: ` Also known simply as Americano (shortened from Italian: caffè americano or American; Spanish: café americano, literally American coffee) is a type of coffee drink prepared by diluting an espresso with hot water, giving it a similar strength to, but different flavor from traditionally brewed coffee. Please note there is no dairy, vegan or otherwise, in this version. Our Caffè Americanos are made from our premium beans`, price: 500, inventory: 15, photo: 'https://d3mrtwiv4dr09z.cloudfront.net/media/catalog/product/cache/2/image/600x/9df78eab33525d08d6e5fb8d27136e95/1/7/17BRD_BEV_16_Americano_FA_LARGE.png', category: 'drink' }),
    Product.create({ productId: 6, title: `Guide To Coffe Poster`, description: `Do the many styles of coffee confuse you? have no fear with this cute poster`, price: 1500, inventory: 15, photo: 'https://previews.123rf.com/images/mix3r/mix3r1410/mix3r141000039/33043341-coffee-type-recipe-illustration.jpg', category: 'swag' }),
    Product.create({ productId: 7, title: `Cappuccino Glass`, description: `When you brew at home you always have the best to brew, but you should also have the best to showcase your wonderful drinks. Made with the finest tempered glass have no fear of temperature fluctuations`, price: 1650, inventory: 15, photo: 'https://www.dollartree.com/assets/product_images_2016/styles/xlarge/261271.jpg', category: 'swag' }),
    Product.create({ title: `Rise and Shine Mug`, description: `Get ready for the day with this fun and uplifting mug!`, price: 1350, inventory: 15, photo: 'https://ihfiles.com/products/47/14400/p/4/925614.jpg', category: 'swag' }),
    Product.create({ productId: 8, title: `Coffee Percolator`, description: `Brew at home with our amazing quality percolator, just as much fun to brew as it is to say!`, price: 4700, inventory: 15, photo: 'https://i02.hsncdn.com/is/image/HomeShoppingNetwork/prodfull/elite-platinum-stainless-steel-12-cup-percolator-d-2013110818163475~7332717w.jpg', category: 'swag' }),
    Product.create({ productId: 9, title: `Coffee Percolator, Mad Scientist Edition`, description: `When a a normal percolator is not enough for you, unleash your inner mad scientist with this contraption. As always we use fine tempered glass so no need to worry about temper fluctuations`, price: 15000, inventory: 10, photo: 'https://i.pinimg.com/originals/57/df/83/57df838b883e9eb97938926f04b5ea40.jpg', category: 'swag' }),
    Product.create({ productId: 10, title: `Cold Drip`, description: `For when you get serious about your cold drip. This system ensures the most perfect cold drip drink everytime`, price: 15000, inventory: 10, photo: 'https://images-na.ssl-images-amazon.com/images/I/41tRrVDoWJL._SL500_AC_SS350_.jpg', category: 'swag' })
  ]);
  console.log(`seeded ${products.length} products`)
  console.log(`seeded products  successfully`)
  const reviews = await Promise.all([
    Review.create({ title: 'Best Late Ever!!!', body: 'Holy cow guys this latte is one of the most delicious lattes I have ever tasted. I do not know where they source their beans or milk but dang this is good!', rating: 5, userId: 2, productId: 1 }),
    Review.create({ title: 'Ok lattee', body: 'I mean I guess this is a pretty good Latte. Its not bad but its nothing to write home about', rating: 3.5, userId: 1, productId: 1 }),
    Review.create({ title: 'Best Cappuccino Ever!!!', body: 'Holy cow guys this drink is one of the most delicious drinks s I have ever tasted. I do not know where they source their beans or milk but dang this is good!', rating: 5, userId: 2, productId: 2 }),
    Review.create({ title: 'Ok cappuccino', body: 'I mean I guess this is a pretty good drink. Its not bad but its nothing to write home about', rating: 3.5, userId: 1, productId: 2 }),
    Review.create({ title: 'Best Macchiato Ever!!!', body: 'Holy cow guys this drink is one of the most delicious drinks s I have ever tasted. I do not know where they source their beans or milk but dang this is good! I thought it had chocolate in it, but I didnt mind it when I found out it didnt!', rating: 5, userId: 2, productId: 3 }),
    Review.create({ title: 'Ok Macchiato', body: 'I mean I guess this is a pretty good drink. Its not bad but its nothing to write home about. Although I was pretty upset to find out there was no chocolate', rating: 2.5, userId: 1, productId: 3 }),
    Review.create({ title: 'Cool poster', body: 'I love coffee but can never remember all the components of the different drinks so this looks great and is helpful', rating: 5, userId: 2, productId: 6 }),
    Review.create({ title: 'Scare your visitors with delicious coffee', body: 'Ok I guess this is pretty cool, my friends think this is just a decoration but really Im just brewing my coffee', rating: 4.5, userId: 1, productId: 10 }),
  ]);
  console.log(`seeded ${reviews.length} products`)
  console.log(`seeded reviews successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .finally(() => { // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
