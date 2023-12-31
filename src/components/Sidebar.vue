<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const isExpanded = ref(true)
const route = useRoute()

const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value
}

const updateIsExpanded = () => {
  isExpanded.value = window.innerWidth >= 650
}

// Call the function initially
updateIsExpanded()

// Add a resize event listener to update isExpanded value
onMounted(() => {
  window.addEventListener('resize', updateIsExpanded)
})

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', updateIsExpanded)
})

// highlight when student/techer -setting page
const isSettingsPage = computed(() => {
  return route.name && ['student-setting', 'teacher-setting'].includes(route.name as string)
})

const messageStore = useMessageStore()
const { message } = storeToRefs(messageStore)
</script>

<template>
  <aside
    :class="`fixed top-0 left-0 z-40 w-64 h-screen ${!isExpanded && 'w-[4rem]'}`"
    aria-label="Sidebar"
  >
    <div
      :class="`h-full px-4 pb-8 overflow-hidden bg-black text-orange-500 ${
        !isExpanded && 'hidden'
      }`"
    >
      <div class="flex items-center justify-center mt-5">
        <RouterLink to="/" class="flex p-2.5 mr-2">
          <img src="../assets/logo.png" class="" alt="Flowbite Logo" />
        </RouterLink>

        <button
          class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-orange/20"
          @click="ToggleMenu"
        >
          <font-awesome-icon icon="bars" class="text-orange" />
        </button>
      </div>
      <ul class="space-y-2 font-medium mt-4">
        <li>
          <RouterLink
            :to="{ name: 'home-page' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-yellow-800 group"
          >
            <font-awesome-icon icon="house" class="w-5 h-5" />
            <span class="ml-3 text-sm">Home Page</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'student-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-yellow-800 group"
          >
            <font-awesome-icon icon="user-graduate" class="w-5 h-5" />
            <span class="ml-3 text-sm">Students List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'teacher-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-yellow-800 group"
          >
            <font-awesome-icon icon="user-tie" class="w-5 h-5" />
            <span class="ml-3 text-sm">Advisors List</span>
          </RouterLink>
        </li>
        <li class="">
          <RouterLink
            :to="{ name: 'teacher-setting' }"
            class="flex justify-between text-orange-500 hover:pl-4 hover:bg-yellow-800 group rounded-lg"
            active-class="highlighted"
          >
            <div class="flex items-center p-2 rounded-lg" :class="{ highlighted: isSettingsPage }">
              <font-awesome-icon icon="user-plus" class="h-5" />
              <span class="ml-3 text-sm">Add</span>
            </div>
          </RouterLink>
          <div class="pt-2 pl-4">
            <ul class="flex flex-col pl-2 text-orange-500 border-l border-yellow-700">
              <li>
                <RouterLink
                  :to="{ name: 'teacher-setting' }"
                  class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-yellow-800 hover:text-white"
                  >Teachers
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'announcement-page' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-yellow-800 group"
          >
            <font-awesome-icon icon="user-tie" class="w-5 h-5" />
            <span class="ml-3 text-sm">Create Announcement</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div :class="`h-full ${isExpanded && 'hidden'}`">
      <button class="absolute py-2 px-3 rounded-lg bg-gray-900 left-2 top-2 border border-white/20" @click="ToggleMenu">
        <font-awesome-icon icon="bars" class="text-white" />
      </button>
    </div>
  </aside>

  <div
    :class="`my-4 transition ease-in-out delay-2000 px-2 sm:px-2 md:px-8 ${
      isExpanded ? 'sm:ml-64' : 'ml-0 mt-14'
    }`"
  >
    <div
      v-if="message"
      class="animate-flashMessage w-full flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-green-50"
    >
      <h2 class="font-medium">{{ message }}</h2>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
a.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

aside,
.smooth-transition,
template {
  transition: 0.2s ease-in-out;
}

.highlighted {
  color: white;
}

</style>
<style>
body {
  background-color: #313131;
}
</style>