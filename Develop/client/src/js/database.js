import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT to DB');

  //open connection do the db (or create one if not exist)
  const jateDb = await openDB('jate', 1);

  // db recognized, request readwrite permission to db
  const tx = jateDb.transaction('jate', 'readwrite');

  // This can acces specific store you want to add data to
  const store = tx.objectStore('jate');

  // defines the action you can take
  const request = store.put({ jate: content });

  // once action is defined, execute the action, await the request for the result, once results are finished...
  const result = await request;

  // Data is added to the db
  console.log('Data saved to DB', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET from DB');

  // Creates connection 
  const jateDb = await openDB('jate', 1);

  //Request data access 
  const tx = jateDb.transaction('jate', 'readonly');

  //Define object store you want to use 
  const store = tx.objectStore('jate');

  //define request you want to make (action)
  const request = store.getAll();

  //Execute that request and await results 
  const result = await request;

  //...
  console.log('result.value', result);
};

initdb();
