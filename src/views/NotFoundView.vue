<template>
    <h1>Oop!</h1>
    <h3>The {{ resource }} you're looking for is not here</h3>
    <RouterLink :to="{ name: 'home-page' }">Back to home page</RouterLink>
</template>
<script setup lang="ts">
defineProps({
    resource: {
        type: String,
        required: true,
        default: 'page'
    },
})
</script>

<style>
body {
  background-color: #313131;
}
</style>