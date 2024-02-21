import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

async function run() {
  const uri = process.env.MONGO_URI;
  console.log(uri);
  const client = new MongoClient(uri, {});

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection

    const db = client.db('shopclone');
    const userCollection = db.collection('users');
    const productCollection = db.collection('products');
    const users = [
      {
        name: 'Adam1',
        email: 'example1@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456781',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam2',
        email: 'example2@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456782',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam3',
        email: 'example3@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456783',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam4',
        email: 'example4@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456784',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam5',
        email: 'example5@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456785',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam6',
        email: 'example6@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456786',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam7',
        email: 'example7@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456787',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam8',
        email: 'example8@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456788',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam9',
        email: 'example9@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456789',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam10',
        email: 'example10@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456790',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam11',
        email: 'example11@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456791',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam12',
        email: 'example12@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456792',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam13',
        email: 'example13@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456793',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam14',
        email: 'example14@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456794',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam15',
        email: 'example15@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456795',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam16',
        email: 'example16@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456796',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam17',
        email: 'example17@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456797',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam18',
        email: 'example18@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456798',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam19',
        email: 'example19@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456799',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam20',
        email: 'example20@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456800',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam21',
        email: 'example21@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456801',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam22',
        email: 'example22@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456802',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam23',
        email: 'example23@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456803',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam24',
        email: 'example24@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456804',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam25',
        email: 'example25@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456805',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam26',
        email: 'example26@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456806',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam27',
        email: 'example27@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456807',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam28',
        email: 'example28@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456808',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam29',
        email: 'example29@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456809',
        avatarUrl: 'https://picsum.photos/200/300',
      },
      {
        name: 'Adam30',
        email: 'example30@email.com',
        dateOfBirth: '2003-10-30',
        phone: '0123456810',
        avatarUrl: 'https://picsum.photos/200/300',
      },
    ];
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
    await userCollection.insertMany(users);
    await productCollection.insertMany(products);
    console.log('Inserted documents');
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}
run();
