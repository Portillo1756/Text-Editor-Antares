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
  console.log('PUT in databse');

  const todosDb = await openDB ('jate', 1);

  const tx = todosDb.transaction('jate', 'rewrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, content });

  const result = await request;
  console.log('Data was put in database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const todosDb = await openDB('jate', 1);

  const tx = todosDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;;
  return result;
};

initdb();
