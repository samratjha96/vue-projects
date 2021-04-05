<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" required placeholder="Email" v-model="email" />
      <input
        type="password"
        required
        placeholder="Password"
        v-model="password"
      />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginForm",
  setup() {
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      console.log(email.value, password.value);
    };
    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
