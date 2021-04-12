import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = collection => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async doc => {
    error.value = null;
    isPending.value = true;
    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "Could not send the message";
    }
  };

  return {
    error,
    addDoc,
    isPending
  };
};

export default useCollection;
