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
const db = require('../server/db')
const {User, Item, Product} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({firstName: 'cody', lastName: 'greene', email: 'cody@email.com', password: '123', phone: '2123334343'}),
    User.create({firstName: 'eddie', lastName: 'murphy', email: 'murphy@email.com', password: '123', phone: '2125555555'})
  ])
  const items = await Promise.all([
    Item.create({price: 500, quantity: 12}),
    Item.create({price: 600, quantity: 13}),
    Item.create({price: 700, quantity: 14}),
    Item.create({price: 800, quantity: 15}),
    Item.create({price: 900, quantity: 1}),
    Item.create({price: 10000, quantity: 44})
  ])
  const products = await Promise.all([
    Product.create({name: 'Yeezys', description: 'So fresh', price: 12000, inventory: 562, image: '/public/images/1-cat-running-shoes.jpg'}),
    Product.create({name: 'Air Force Ones', description: 'And so clean', price: 17000, inventory: 1114, image: '/public/images/56d0c03a55a8c60e3dab6d813af741bc.jpg'}),
    Product.create({name: 'Gucci Stilettos', description: 'Gettem', price: 30000, inventory: 34, image: '/public/images/61b9f688c3b28312c31e08eccab9e3bea61cf1dce4ed06e161031a5e0c8a9f33.jpeg'}),
    Product.create({name: 'Boots', description: 'For rugged, out-doorsy cats', price: 9000, inventory: 320, image: '/public/images/869c8cab884965b9ddb6fcd3fc36fa53--adorable-kittens-cute-cats.jpg'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users, ${items.length} items, and ${products.length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
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
