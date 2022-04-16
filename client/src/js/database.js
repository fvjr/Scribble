import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (id, content) => {
  // export const putDb = async () => {
  console.log("Posting to the database");

  //create a connection to our database and the version of the database we wish to use
  const jateDb = await openDB("jate", 1);

  //create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");

  //open our object store
  const store = tx.objectStore("jate");

  //pass in our desired content
  const request = store.put({ id: id, value: content });

  //get confirmation of the request
  const result = await request;

  // if (err) {
  //   return console.error('putDb not implemented');
  // }
  console.log("Added to the db", result);
  // return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Getting information from the database");

  //create a connection to the DB and the version of the DB we wish to use
  const jateDb = await openDB("jate", 1);
  console.log(jateDb);

  //create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");

  //open up the object store we wish to use
  const store = tx.objectStore("jate");

  //get ALL data from the database
  const request = store.getAll();

  //get confirmation of the request to the database
  const result = await request;
  console.log("result.value", result);
  // return result;
};

initdb();
