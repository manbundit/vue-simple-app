import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'
import AddUser from '../views/AddUser.vue'
import NotFound from '../views/NotFound.vue'
// import About from '../views/About.vue'
import EditProfile from '../views/EditProfile.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/add-user',
        name: 'AddUser',
        component: AddUser
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile
      },
      {
        path: '/edit-profile/:id',
        name: 'EditOtherProfile',
        component: EditProfile
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFound
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  if (to.name !== 'Login' && !currentUser){
    next({ name: 'Login' })
  }else if(to.name === 'Login' && currentUser){
    next({ name: 'Home' })
  }else{
    next()
  } 
})

export default router
