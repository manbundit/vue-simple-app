<template>
  <div class="login-page">
    <div class="wrap-loading" v-if="loading">
        <loading />
    </div>
    <h1 class="header">Add User</h1>
    <div class="wrap-form">
        <form-input ref="email" required title="Email" v-model="formData.email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"/>
        <form-input ref="password" required title="Password" type="password" v-model="formData.password"/>
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
// import {auth, currentUser, usersCollection} from '@/firebaseConfig.js'
// import firebase from 'firebase'
const {usersCollection, createUserApp,fs} = require('@/firebaseConfig.js')
export default {
  name: 'AddUser',
  data() {
      return {
          disabledDates: {
            from: new Date(),
          },
          loading: false,
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
      signup() {
        return new Promise((resolve, reject) =>{
            let data = this.formData;
            createUserApp.auth().createUserWithEmailAndPassword(data.email, data.password).then(res => {
                resolve(res.user.uid)
                createUserApp.auth().signOut()
            }).catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
                reject(errorMessage)
            });
        })
      },
      saveProfile() {
          if(!this.validateForm()){
              return;
          }
          let data = this.formData
          this.loading = true
          this.signup().then((userId) => {
              let userRef = usersCollection.doc(userId)
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
  created() {
    //   this.getProfile()
  },
}
</script>
<style src="@/css/login.css"></style>