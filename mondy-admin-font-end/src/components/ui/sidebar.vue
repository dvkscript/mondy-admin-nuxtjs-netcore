<template>
  <div class="flex h-screen bg-gray-900">
    <div :class="[`bg-gray-800 text-white p-4 transition-all duration-300`, isSidebarOpen ? 'w-64' : 'w-16']">
      <div :class="{'opacity-0': !isSidebarOpen}" class="transition-opacity duration-300">
        <!-- Logo/Company Section -->
        <div class="flex items-center space-x-2 mb-8">
          <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span class="text-lg font-bold">A</span>
          </div>
          <div>
            <h1 class="font-semibold">Acme Inc</h1>
            <p class="text-sm text-gray-400">Enterprise</p>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-6">
          <div>
            <h2 class="text-gray-400 text-sm mb-2">Platform</h2>
            <nav class="space-y-1">
              <a href="#" class="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-700">
                <span>🎮</span>
                <span>Playground</span>
              </a>
              <a href="#" class="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-700">
                <span>📚</span>
                <span>Models</span>
              </a>
              <a href="#" class="flex items-center space-x-2 px-2 py-2 rounded hover:bg-gray-700">
                <span>📖</span>
                <span>Documentation</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 p-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${isSidebarOpen.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

// Keyboard shortcut handler
const handleKeyDown = (event) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>