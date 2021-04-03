<template>
  <div class="home">
    <FilterNav @filterChange="filterChange($event)" />
    <div v-if="filteredTasks.length">
      <div v-for="task in filteredTasks" :key="task.id">
        <SingleTask
          :task="task"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
    <div v-else>
      <EmptyTask />
    </div>
    <GenericButton @click="clearAllTasks" buttonText="Clear All" />
  </div>
</template>

<script>
import SingleTask from "@/components/SingleTask.vue";
import EmptyTask from "@/components/EmptyTask.vue";
import FilterNav from "@/components/FilterNav.vue";
import GenericButton from "@/components/GenericButton.vue";
import { ref, onMounted, computed } from "vue";
import { getAllTasks, deleteTask } from "@/lib/api.js";

export default {
  name: "Home",
  components: {
    SingleTask,
    FilterNav,
    EmptyTask,
    GenericButton,
  },
  setup() {
    const tasks = ref([]);
    const currentFilter = ref("all");

    onMounted(() => {
      getAllTasks()
        .then((res) => res.json())
        .then((data) => (tasks.value = data))
        .catch((err) => console.log(err));
    });

    const handleDelete = (id) => {
      deleteTask(id)
        .then(
          () => (tasks.value = tasks.value.filter((task) => task.id !== id))
        )
        .catch((err) => console.log(err));
    };

    const handleComplete = (id) => {
      const updatedTask = tasks.value.find((task) => task.id === id);
      updatedTask.complete = !updatedTask.complete;
    };

    const clearAllTasks = () => {
      tasks.value.map((task) => handleDelete(task.id));
    };

    const filterChange = (event) => {
      currentFilter.value = event;
    };

    const filteredTasks = computed(() => {
      switch (currentFilter.value) {
        case "ongoing": {
          return tasks.value.filter((task) => !task.complete);
        }
        case "completed":
          return tasks.value.filter((task) => task.complete);
        case "all":
        default:
          return tasks.value;
      }
    });

    return {
      handleDelete,
      handleComplete,
      clearAllTasks,
      filteredTasks,
      filterChange,
    };
  },
};
</script>
