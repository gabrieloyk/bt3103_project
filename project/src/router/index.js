import Vue from 'vue';
import VueRouter from 'vue-router';
import LogInPage from '../views/LogInPage.vue';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'LogInPage',
        component: LogInPage,
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import( '../views/Register.vue'),
    },
    
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import( '../views/Home.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/users',
        name: 'Users',
        component: () =>
            import( '../components/Users.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () =>
            import(
                 '../components/Reports.vue'
            ),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/family',
        name: 'Family',
        component: () =>
            import(
                 '../components/Family.vue'
            ),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/search',
        name: 'SearchBar',
        component: () =>
            import(
                 '../components/SearchBar.vue'
            ),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/aboutus',
        name: 'AboutUs',
        component: () =>
            import(
                 '../components/AboutUs.vue'
            ),
        meta: {
            authRequired: true,
        },
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (firebase.auth().currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;
