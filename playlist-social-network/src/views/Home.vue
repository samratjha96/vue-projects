<template>
  <div class="home">
    <div v-if="error" class="error">
        Could not fetch playlists
    </div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import ListView from "@/components/ListView"
import getCollection from "@/lib/getCollection"

export default {
  name: "Home",
  components: {
    ListView
  },
  setup() {

    const { documents, error } = getCollection("playlists");

    return {
      documents,
      error
    }
  }
};
</script>
