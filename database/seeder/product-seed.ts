import { client } from '../client';

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection

    const db = client.db('shopclone');
    const productCollection = db.collection('products');
    const products = [
      {
        name: 'car1',
        price: 2.13,
        quantity: 1000,
        description: 'Lorem Ipsum 12345',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car2',
        price: 3.14,
        quantity: 2000,
        description: 'Lorem Ipsum 23456',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car3',
        price: 4.15,
        quantity: 3000,
        description: 'Lorem Ipsum 34567',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car4',
        price: 5.16,
        quantity: 4000,
        description: 'Lorem Ipsum 45678',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car5',
        price: 6.17,
        quantity: 5000,
        description: 'Lorem Ipsum 56789',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car6',
        price: 7.18,
        quantity: 6000,
        description: 'Lorem Ipsum 67890',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car7',
        price: 8.19,
        quantity: 7000,
        description: 'Lorem Ipsum 78901',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car8',
        price: 9.2,
        quantity: 8000,
        description: 'Lorem Ipsum 89012',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car9',
        price: 10.21,
        quantity: 9000,
        description: 'Lorem Ipsum 90123',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car10',
        price: 11.22,
        quantity: 10000,
        description: 'Lorem Ipsum 01234',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car11',
        price: 12.23,
        quantity: 11000,
        description: 'Lorem Ipsum 12345',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car12',
        price: 13.24,
        quantity: 12000,
        description: 'Lorem Ipsum 23456',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car13',
        price: 14.25,
        quantity: 13000,
        description: 'Lorem Ipsum 34567',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car14',
        price: 15.26,
        quantity: 14000,
        description: 'Lorem Ipsum 45678',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car15',
        price: 16.27,
        quantity: 15000,
        description: 'Lorem Ipsum 56789',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car16',
        price: 17.28,
        quantity: 16000,
        description: 'Lorem Ipsum 67890',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car17',
        price: 18.29,
        quantity: 17000,
        description: 'Lorem Ipsum 78901',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car18',
        price: 19.3,
        quantity: 18000,
        description: 'Lorem Ipsum 89012',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car19',
        price: 20.31,
        quantity: 19000,
        description: 'Lorem Ipsum 90123',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car20',
        price: 21.32,
        quantity: 20000,
        description: 'Lorem Ipsum 01234',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car21',
        price: 22.33,
        quantity: 21000,
        description: 'Lorem Ipsum 12345',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car22',
        price: 23.34,
        quantity: 22000,
        description: 'Lorem Ipsum 23456',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car23',
        price: 24.35,
        quantity: 23000,
        description: 'Lorem Ipsum 34567',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car24',
        price: 25.36,
        quantity: 24000,
        description: 'Lorem Ipsum 45678',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car25',
        price: 26.37,
        quantity: 25000,
        description: 'Lorem Ipsum 56789',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car26',
        price: 27.38,
        quantity: 26000,
        description: 'Lorem Ipsum 67890',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car27',
        price: 28.39,
        quantity: 27000,
        description: 'Lorem Ipsum 78901',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car28',
        price: 29.4,
        quantity: 28000,
        description: 'Lorem Ipsum 89012',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car29',
        price: 30.41,
        quantity: 29000,
        description: 'Lorem Ipsum 90123',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'car30',
        price: 31.42,
        quantity: 30000,
        description: 'Lorem Ipsum 01234',
        imageUrl: 'https://picsum.photos/200/300',
      },
    ];
    await productCollection.insertMany(products);
    console.log('Inserted 30 products into the collection');
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}
run();
