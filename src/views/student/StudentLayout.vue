<script setup lang="ts">
import type { Ref } from 'vue'
import { type TeacherItem, type StudentItem } from '@/type'
import { ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useStudentStore()
const students = storeToRefs(store).students
const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)



const props = defineProps({
  id: String
})

store
  .getStudentById(props.id!)
  .then((result) => {
    if (result) {
      student.value = result
    }
  })
  .catch((error) => {
    console.error(error)
  })

store.getTeacherInStudent(props.id!)?.then((result) => {
  if (result) {
    teacher.value = result
  }
})
</script>

<template>
  <div>
    <div v-if="student">
      <RouterView :oneStudent="student" :oneTeacher="teacher"></RouterView>
    </div>
  </div>
</template>

<style>
body {
  background-color: #313131;
}
</style>