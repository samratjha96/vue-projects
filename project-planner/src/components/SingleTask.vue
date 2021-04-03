<template>
  <div class="task" :class="{ complete: task.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ task.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'EditTask', params: { id: task.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="deletetask" class="material-icons">delete</span>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ task.details }}</p>
    </div>
  </div>
</template>

<script>
import { databaseUrl } from "@/lib/database.js";

export default {
  props: {
    task: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      showDetails: false,
      uri: databaseUrl + this.task.id,
    };
  },
  methods: {
    deletetask() {
      this.$emit("delete", this.task.id);
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !this.task.complete }),
      }).then(() => this.$emit("complete", this.task.id));
    },
  },
};
</script>

<style>
.task {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}

.task.complete {
  border-left: 4px solid #00ce89;
}

.task.complete .tick {
  color: #00ce89;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: #777;
}

h3 {
  cursor: pointer;
}
</style>
