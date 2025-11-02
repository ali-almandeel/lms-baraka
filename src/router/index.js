import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/DashboardView.vue";
import Login from "@/views/Login.vue";
import { useUserStore } from "@/stores/user";
import { components } from "vuetify/dist/vuetify.js";



const routes = [
  {
    path: "/home",
    component: () => import('@/layouts/ManagerLayout.vue'),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import('@/views/DashboardView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: "teachers",
        name: "Teachers",
        component: () => import('@/views/TeachersView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: "students",
        name: "Students",
        component: () => import('@/views/StudentsView.vue'),
        meta: { requiresAuth: true }
      }

    ]
  },
  {
    path: "/", redirect: "/home/dashboard"
  },
  { path: "/login", name: "Login", component: () => import('@/views/Login.vue') },
  { path: "/:pathMatch(.*)*", redirect: "/home/dashboard" },
  {
    path: "/teacherHomePage",
    component: () => import('@/layouts/TeacherLayout.vue')
    , children: [
      {
        path: "Courses",
        name: "TeacherCourses",
        component: () => import('@/views/CoursesView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta && to.meta.requiresAuth;

  if (requiresAuth && !userStore.isAuthenticated) {
    return next({ name: "Login", query: { redirect: to.fullPath } });
  }

  // If navigating to login while authenticated, redirect to dashboard
  if (to.name === "Login" && userStore.isAuthenticated) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
