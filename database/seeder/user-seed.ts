import { client } from '../client';

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection

    const db = client.db('test');
    const userCollection = db.collection('users');
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
    await userCollection.insertMany(users);
    console.log('Inserted 30 users into the collection');
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}
run();
