<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

interface Entry {
  id: number
  name: string
  done: boolean
  dueDate: string
  priority: Priority
}

const entries = ref<Entry[]>([])
onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/`)
  entries.value = await response.json()
})

</script>

<template>
  <ul class="list">
    <li v-for="entry in entries" :key="entry.id" :class="{ done: entry.done }">
      <input type="checkbox" v-model="entry.done" />
      <span class="name">{{ entry.name }}</span>
      <span class="date">fällig: {{ entry.dueDate }}</span>
      <span class="prio" :class="entry.priority.toLowerCase()">{{ entry.priority }}</span>
    </li>
  </ul>
</template>

<style scoped>
.list { list-style: none; padding: 0; }
li { display: flex; gap: 12px; align-items: center; padding: 8px 0; border-bottom: 1px solid #ddd; }
.name { flex: 1; }
.done .name { text-decoration: line-through; opacity: 0.5; }
.date { font-size: 0.9em; color: #666; }
.prio { font-size: 0.8em; padding: 2px 8px; border-radius: 4px; color: white; }
.high { background: #d9534f; }
.medium { background: #f0ad4e; }
.low { background: #5cb85c; }
</style>
