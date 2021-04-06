<template>
  <nav v-if="user">
    <div>
      <p>Hey there {{ user.displayName }}</p>
      <div class="email">Current logged in as {{ user.email }}</div>
    </div>
    <button @click="handleClick">Logout</button>
    <div class="error">{{ error }}</div>
  </nav>
</template>

<script>
import useLogout from "@/lib/useLogout";
import getUser from "@/lib/getUser";

export default {
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("User logged out");
      }
    };
    return {
      handleClick,
      error,
      user,
    };
  },
};
</script>

<style lang="scss" scoped></style>
