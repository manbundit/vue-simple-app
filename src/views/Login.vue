<template>
  <div class="login-page" :style="{height:'100%'}">
    <div class="wrap-loading" v-if="loading">
        <loading />
    </div>
    <h1 class="header">Login</h1>
    <div class="wrap-form">
        <form-input ref="email" required title="Email" v-model="formData.email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"/>
        <form-input ref="password" required title="Password" type="password" v-model="formData.password"/>
        <form-button :text="'Login'" :onClick="login"/>
        <div class="error" v-if="error" :style="{color:'red',marginTop:'20px'}">
            {{error}}
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import firebase from 'firebase'
export default {
  name: 'Login',
  data() {
      return {
          loading: false,
          error: '',
          formData: {
              email: '',
              password: ''
          },
      }
  },
  methods: {
      validateForm(){
          let valid = true
          for(let field in this.formData){
              let input = this.$refs[field]
              let isRequired = input.required
              if(input && isRequired){
                  if(input.isInvalid){
                      input.showInvalid = true                     
                      input.$refs.input.focus()
                      valid = false
                      break;
                  }
              }
          }
          return valid
      },
      login() {
        let data = this.formData;
        this.error = ''
        if(!this.validateForm()){
            return
        }
        this.loading =  true
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {
            this.loading =  false
             this.$router.push('/')
        }).catch((error) => {
            this.loading =  false
            var errorCode = error.code
            // var errorMessage = error.message
            this.error = errorCode
            switch(errorCode) {
                case 'auth/user-not-found':
                    this.error = 'Email or password is incorrect, please try again.' 
                    break;
                default:
                    this.error = 'Email or password is incorrect, please try again.'
            }
        });
      },
  },
  components: {
    Loading,
    FormInput,
    FormButton
  }
}
</script>
<style scoped src="@/css/login.css"></style>