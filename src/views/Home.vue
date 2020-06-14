<template>
  <div class="home">
    <div class="wrap-loading" v-if="loading">
        <loading />
    </div>
    <Title msg="User List"/>
    <form-button :style="{marginLeft:'auto',marginTop:'20px'}" text="Add User" :onClick="toAddNewUser"/>
    <div class="user-list">
      <user-box :detail="userData" v-for="(userData, index) in userList" :key="index"></user-box>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue'
import Title from '@/components/Title.vue'
import UserBox from '@/components/UserBox.vue'
import FormButton from '@/components/FormButton.vue'
const {usersCollection} = require('@/firebaseConfig.js')
export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      userList: []
    }
  },
  methods: {
      toAddNewUser(){
          this.$router.push('/add-user')
      },
      getUserList() {
          this.loading = true
          let userListRef = usersCollection
          let userArr = []
          userListRef.orderBy("name").get().then(users => {
              users.docs.map(user => {
                if(user.exists){ 
                    let data = user.data()
                    data["id"] = user.id
                    userArr.push(data)
                }
              })
              this.userList = userArr;
              this.loading = false
          }).catch(err => {
              console.log(err)
              this.loading = false
          })
      },
  },
  created() {
    this.getUserList()
  },
  components: {
    Title, UserBox, Loading, FormButton
  }
}
</script>
<style scoped src="@/css/home.css"></style>
