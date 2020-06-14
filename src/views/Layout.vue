<template>
  <div class="layout">
    <div id="nav">
      <router-link class="nav-btn" to="/">Home</router-link> |
      <router-link class="nav-btn" to="/edit-profile">Edit Profile</router-link>
      <button class="nav-btn ml-auto" @click="logout">Logout</button>
    </div> 
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Layout',
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
         this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style src="@/css/layout.css"></style>