<template>
  <div class="input-wrapper" :class="{'invalid':showInvalid}" @focus="handleFocus">
      <input ref="input" :class="{'has-value':hasValue}" :type="type" :value="value" @input="handleInput($event.target.value)" @keypress="type == 'phone' ? phoneInput($event) : null">
      <label class="input-label">{{title}}</label>
      <span class="validate-text" v-if="showInvalid">{{InvalidText}}</span>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  data() {
      return {
          hasValue: false,
          isInvalid: false,
          showInvalid: false,
          InvalidText: ""
      }
  },
  methods: {
      handleFocus() {
          this.$refs.input.$el.focus();
      },
      handleInput(val) {
          if(val !== ""){
            this.hasValue = true
          }else{
            this.hasValue = false
          }          
          this.$emit('input', val)
          this.showInvalid = false

          if(this.required && !val){
              this.handleEmptyInput()
              return
          }
          let regPattern = new RegExp(this.pattern)
          if(!val.match(regPattern)){
              this.patternMismatch()
              return
          }
          this.isInvalid = false
      },
      phoneInput(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault()
            }else{
                return true;
            }
      },
      handleEmptyInput() {
          this.isInvalid = true
          this.InvalidText = this.validateText.isEmpty
      },
      patternMismatch() {
          this.isInvalid = true
          this.InvalidText = this.validateText.incorrectPattern
      }
  },
  created() {
      if(this.required){
          this.handleEmptyInput()
      }
  },
  watch: {
      value() {
        this.handleInput(this.value)
      }
  },
  props: {
    title: {
        type: String,
        default: 'Title'
    },
    type: {
        type: String,
        default: 'text'
    },
    value: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    pattern: {
        type: String,
        default: "^(.*)$"
    },
    validateText: {
        type: Object,
        default() {
            return {
                isEmpty:'This field is required',
                incorrectPattern:'Invalid format',
            }
        }
    }
  }
}
</script>
<style scoped src="@/css/form-input.css"></style>
