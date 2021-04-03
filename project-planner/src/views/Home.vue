<template>
  <div class="home">
    <FilterNav @filterChange="currentFilter = $event"/>
    <div v-if="filteredTasks.length">
      <div v-for="task in filteredTasks" :key="task.id">
        <SingleTask :task="task" @delete="handleDelete" @complete="handleComplete" />
      </div>
    </div>
    <div v-else>
      <EmptyTask />
    </div>
    <GenericButton @click="clearAllTasks" buttonText="Clear All"/>

  </div>
</template>

<script>

import SingleTask from '@/components/SingleTask.vue'
import EmptyTask from '@/components/EmptyTask.vue'
import FilterNav from '@/components/FilterNav.vue'
import GenericButton from '@/components/GenericButton.vue'
import { databaseUrl } from '@/lib/database.js'

export default {
  name: 'Home',
  components: {
    SingleTask,
    FilterNav,
    EmptyTask,
    GenericButton
  },
  data() {
    return {
      tasks : [],
      currentFilter: 'all'
    }
  },
  computed: {
      filteredTasks: function() {
        switch(this.currentFilter) {
          case 'all': {
            return this.tasks
          }
          case 'ongoing': {
            return this.tasks.filter(task => !task.complete)
          }
          case 'completed': return this.tasks.filter(task => task.complete)
          default:
              return this.tasks
        }

      }
  },
  mounted() {
    fetch(databaseUrl)
    .then(res => res.json())
    .then(data => this.tasks = data)
    .catch(err => console.log(err))
  },
  methods: {
    handleDelete(id) {
      fetch(databaseUrl + id, {
        method: "DELETE",
      })
      .then(() => this.tasks = this.tasks.filter(task => task.id !== id))
      .catch((err) => console.log(err));
    },
    handleComplete(id) {
      const updatedTask = this.tasks.find(task => task.id === id)
      updatedTask.complete = !updatedTask.complete
    },
    clearAllTasks() {
      this.tasks.map(task => this.handleDelete(task.id))
    }
  }
}
</script>
