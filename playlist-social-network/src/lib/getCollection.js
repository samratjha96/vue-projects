import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = collection => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  const unsub = collectionRef.onSnapshot(
    snap => {
      let results = [];
      snap.docs.forEach(doc => {
        // Need the first check to ensure we are waiting for the actual
        // createdAt value from firebase and not the local snapshot
        doc.data().createdAt &&
          results.push({
            ...doc.data(),
            id: doc.id
          });
      });
      documents.value = results;
      error.value = null;
    },
    err => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch data";
    }
  );

  watchEffect(onInvalidate => {
    // unsub from previous collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return {
    documents,
    error
  };
};

export default getCollection;
