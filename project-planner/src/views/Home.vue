<template>
  <div class="home">
    <FilterNav @filterChange="currentFilter = $event" :current="currentFilter"/>
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete" />
      </div>
    </div>
  </div>
</template>

<script>

import SingleProject from '@/components/SingleProject.vue'
import FilterNav from '@/components/FilterNav.vue'


export default {
  name: 'Home',
  components: {
    SingleProject,
    FilterNav
  },
  data() {
    return {
      projects : [],
      currentFilter: 'all'
    }
  },
  computed: {
      filteredProjects: function() {
        switch(this.currentFilter) {
          case 'all': {
            return this.projects
          }
          case 'ongoing': {
            return this.projects.filter(project => !project.complete)
          }
          case 'completed': return this.projects.filter(project => project.complete)
          default:
              return this.projects
        }

      }
  },
  mounted() {
    fetch("http://localhost:3000/projects")
    .then(res => res.json())
    .then(data => this.projects = data)
    .catch(err => console.log(err))
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter(project => project.id !== id)
    },
    handleComplete(id) {
      const updatedProject = this.projects.find(project => project.id === id)
      updatedProject.complete = !updatedProject.complete
    }
  }
}
</script>
