// ----- Package -----
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import HomePage from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import StudentEdit from '../views/student/StudentEdit.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentList from '../views/student/StudentList.vue'
import TeacherDetail from '../views/teacher/TeacherDetail.vue'
import TeacherLayout from '../views/teacher/TeacherLayout.vue'
import TeacherList from '../views/teacher/TeacherList.vue'
import TeacherSetting from '../views/setting/TeacherSetting.vue'
import StudentSetting from '../views/setting/StudentSetting.vue'
import { useTeacherStore } from '../stores/teacher'
import { useStudentStore } from '../stores/student'
import StudentService from '../services/StudentService'
import AnnouncementView from '../views/announcement/AnnouncementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/announcement',
      name: 'announcement-page',
      component: AnnouncementView
    },
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },

    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '5')
      })
    },
    {
      path: '/students/setting',
      name: 'student-setting',
      component: StudentSetting
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayout,
      props: (route) => ({ id: route.params.id }),

      beforeEnter: (to) => {
        const id = to.params.id as string
        useStudentStore()
          .getStudentById(id)
          .catch((error) => {
            if (error.status && error.status === 404) {
              router.push({
                name: '404-resource',
                params: { resource: 'student' }
              })
            }
          })
        if (!navigator.onLine) {
          router.push({ name: 'network-error' })
        }
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail
        },
        {
          path: 'edit',
          name: 'student-edit',
          component: StudentEdit
        }
      ]
    },


    {
      path: '/teachers',
      name: 'teacher-list',
      component: TeacherList,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '5')
      })
    },
    {
      path: '/teachers/setting',
      name: 'teacher-setting',
      component: TeacherSetting
    },
    {
      path: '/teacher/:id',
      name: 'teacher-layout',
      component: TeacherLayout,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: (to) => {
        const id = to.params.id as string
        useTeacherStore()
          .getTeacherById(id)
          .catch((error) => {
            if (error.status && error.status === 404) {
              router.push({
                name: '404-resource',
                params: { resource: 'teacher' }
              })
            }
          })
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',
          component: TeacherDetail
        }
      ]
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }

  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const studentStore = useStudentStore()
  if (studentStore.students.length === 0) {
    await studentStore.fetchAllStudents()
  }

  const teacherStore = useTeacherStore()
  if (teacherStore.teachers.length === 0) {
    await teacherStore.fetchAllTeachers()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
