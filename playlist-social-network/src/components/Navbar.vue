<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="" />
      <h1>
        <router-link :to="{ name: 'Home' }"
          >Playlist Social Network</router-link
        >
      </h1>
      <div class="links">
        <button v-if="user" @click="handleClick">Logout</button>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Sign up</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/lib/useLogout";
import getUser from "@/lib/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("User successfully logged out");
        router.push({ name: "Login" });
      }
    };

    return {
      user,
      handleClick
    };
  }
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>
