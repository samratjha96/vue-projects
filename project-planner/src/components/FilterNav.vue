<template>
  <nav class="filter-nav">
    <button
      @click="updateFilter('all')"
      class="view"
      :class="{ active: currentSelection === 'all' }"
    >
      View All
    </button>
    <button
      @click="updateFilter('completed')"
      class="completed"
      :class="{ active: currentSelection === 'completed' }"
    >
      Completed
    </button>
    <button
      @click="updateFilter('ongoing')"
      class="ongoing"
      :class="{ active: currentSelection === 'ongoing' }"
    >
      Ongoing
    </button>
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const currentSelection = ref("all");

    const updateFilter = (by) => {
      currentSelection.value = by;
      emit("filterChange", by);
    };

    return {
      currentSelection,
      updateFilter,
    };
  },
};
</script>

<style>
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}

.filter-nav button.active {
  color: #555;
}
</style>
