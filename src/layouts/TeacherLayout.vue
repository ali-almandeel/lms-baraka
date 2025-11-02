<template>
    <v-app>
        <!-- Only show sidebar and app bar if not on login page -->
        <template v-if="!isLoginPage">

            <app-bar />
            <side-bar :items="teacherItems" />

        </template>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
// import 'SideBar.vue'
// import SteudentsTable from '../components/teachers/SteudentsTable.vue';
import AppBar from '../components/ui/AppBar.vue';
import SideBar from '../components/ui/SideBar.vue';
import CoursesView from '../views/CoursesView.vue';
import vuetify from '../plugins/vuetify';
export default {
    name: 'ManagerLayout',
    components: {
        SideBar,
        AppBar,
        // StudentsView
        CoursesView
    },
    data() {
        return {
            // drawer: true,
            teacherItems: [
                { text: "My Coursres", icon: "mdi-account-group", link: "/teacherHomePage/courses" },
                // { text: "My Courses", icon: "mdi-book-open-page-variant", link: "/teacher/courses" },
                // { text: "My Sessions", icon: "mdi-calendar-clock", link: "/teacher/sessions" },
            ]
        };
    },
    // computed: {
    //     isLoginPage() {
    //         return this.$route.name === "Login";
    //     },
    // },
};
</script>
