<template>
  <nav>
    <div>
      <p>Hey there {{ displayName }}...</p>
      <div class="email">Current logged in as {{ email }}</div>
    </div>
    <button @click="handleClick">Logout</button>
    <div class="error">{{ error }}</div>
  </nav>
</template>

<script>
import useLogout from "@/lib/useLogout";

export default {
  setup() {
    const { logout, error } = useLogout();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("User logged out");
      }
    };
    return {
      handleClick,
      error,
    };
  },
};
</script>

<style lang="scss" scoped></style>
