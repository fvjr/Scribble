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

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Posting to the database");

  //create a connection to our database and the version of the database we wish to use
  const jateDb = await openDB("jate", 1);

  //create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");

  //open our object store
  const store = tx.objectStore("jate");

  //pass in our desired content
  const request = store.add({ content: content });

  //get confirmation of the request
  const result = await request;
  console.log(`Data successfully saved to the database. Data: ${result}`);

  if (err) {
    return console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error("getDb not implemented");

initdb();
