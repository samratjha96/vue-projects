<template>
  <form @submit.prevent="updateTask">
    <label>Title: </label>
    <input type="text" v-model="title" required />
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <GenericButton @click="handleUpdate" buttonText="Update Task" />
  </form>
</template>

<script>
import { getTask, updateTask } from "@/lib/api.js";
import GenericButton from "@/components/GenericButton.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "EditTaskComposition",
  components: {
    GenericButton,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const title = ref("");
    const details = ref("");

    const handleUpdate = () => {
      updateTask(route.params.id, {
        title: title.value,
        details: details.value,
      })
        .then(() => router.push("/"))
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      getTask(route.params.id)
        .then((res) => res.json())
        .then((data) => {
          title.value = data.title;
          details.value = data.details;
        });
    });

    return {
      title,
      details,
      handleUpdate,
    };
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}

input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}

form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
}
</style>
