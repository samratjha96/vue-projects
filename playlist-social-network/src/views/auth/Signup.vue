<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/lib/useSignup";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("User successfully signed up");
      }
    };
    return {
      displayName,
      email,
      password,
      handleSubmit,
      error,
      isPending
    };
  }
};
</script>

<style></style>
