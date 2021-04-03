<template>
  <form @submit.prevent="handleSubmit">
    <label>Title: </label>
    <input type="text" v-model="title" required />
    <label>Details:</label>
    <textarea v-model="details"></textarea>
    <button>Add Task</button>
  </form>
</template>

<script>
import { addTask } from "@/lib/api.js";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const taskObj = reactive({
      title: "",
      details: "",
    });

    const router = useRouter();

    const handleSubmit = () => {
      const task = {
        title: taskObj.title,
        details: taskObj.details,
        complete: false,
      };

      addTask(task)
        .then(() => {
          router.push("/");
        })
        .catch((err) => console.log(err));
    };

    return {
      ...toRefs(taskObj),
      handleSubmit,
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
  cursor: pointer;
}
</style>
