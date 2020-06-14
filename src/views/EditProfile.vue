<template>
  <div class="login-page">
    <div class="wrap-loading" v-if="loading">
        <loading />
    </div>
    <h1 class="header">{{this.$route.params.id ? 'Edit Others Profile' : 'Edit Profile'}}</h1>
    <div class="wrap-form">
        <form-input ref="name" required title="Name" v-model="formData.name"/>
        <form-input ref="lname" required title="Surname" v-model="formData.lname"/>
        <form-input ref="phone" required type="phone" title="Phone" v-model="formData.phone" pattern="^([\d]{9,10})$"/>
        <form-textarea ref="address" required title="Address" v-model="formData.address"/>
        <div class="wrap-datepicker" :class="{'has-value' : formData.birthdate !== ''}">
            <label class="input-label">Birthday</label>
            <datepicker :disabled-dates="disabledDates" v-model="formData.birthdate"></datepicker>
        </div>
        <form-button text="Save" :onClick="saveProfile"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import FormTextarea from '@/components/FormTextarea.vue'

import Datepicker from 'vuejs-datepicker';

const {auth, usersCollection, fs} = require('@/firebaseConfig.js')
export default {
  name: 'Login',
  data() {
      return {
          disabledDates: {
            from: new Date(),
          },
          loading: true,
          userId: '',
          userExists: false,
          formData: {
              name: '',
              lname: '',
              phone: '',
              address: '',
              birthdate: new Date(Date.now()).toString(),
          },
      }
  },
  methods: {
      validateForm(){
          let valid = true
          for(let field in this.$refs){
              let input = this.$refs[field]
              if(!input){
                 break
              }
              let isRequired = input.required 
              if(isRequired){
                  if(input.isInvalid){
                      input.showInvalid = true                     
                      input.$refs.input.focus()
                      valid = false
                      break
                  }
              }
          }
          return valid
      }, 
      getProfile() {
          this.userId = this.$route.params.id || auth.currentUser.uid
          let userRef = usersCollection.doc(this.userId)
          userRef.get().then(user => {
              if(user.exists){
                  this.userExists = true 
                  let data = user.data()
                //   console.log(user.data().birthdate.toDate())
                  if(data.birthdate){
                      data.birthdate = data.birthdate.toDate()
                  }
                  this.formData = data
              }
              this.loading = false
          }).catch(err => {
              console.log(err)
              this.loading = false
          })
      },
      saveProfile() {
          if(!this.validateForm()){
              return;
          }
          let data = this.formData
          this.loading = true
          let userRef = usersCollection.doc(this.userId)
          let formattedBirthDate;
          if(data.birthdate){
              formattedBirthDate = fs.Timestamp.fromDate(data.birthdate);
          }else{
              formattedBirthDate = null
          }
          userRef.set({
            name: data.name,
            lname: data.lname, 
            phone: data.phone,
            address: data.address,
            birthdate: formattedBirthDate
          }, {merge: true})
          .then(() => {
              this.$router.push('/')
              this.loading = false
          }).catch(err => {
              console.log(err)
              this.loading = false
          })
      }
  },
  components: {
    Loading,
    FormInput,
    FormTextarea,
    FormButton,
    Datepicker
  },
//   watch: {
//     '$route' () {
//        window.location.reload()
//     }
//   },
  beforeRouteUpdate(){
      this.getProfile()
  },
  created() {
      this.getProfile()
  },
}
</script>
<style src="@/css/login.css"></style>