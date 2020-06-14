<template>
  <div class="input-wrapper textarea" :class="{'invalid':showInvalid}" v-on:focus="handleFocus">
      <textarea ref="input" :class="{'has-value':hasValue}" :type="type" :value="value" @input="handleInput($event.target.value); adjustTextareaHeight()" class="textarea"></textarea>
      <label class="input-label">{{title}}</label>
      <span class="validate-text" v-if="showInvalid">{{InvalidText}}</span>
  </div>
</template>

<script>
export default {
  name: 'FormTextarea',
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
      handleEmptyInput() {
          this.isInvalid = true
          this.InvalidText = this.validateText.isEmpty
      },
      patternMismatch() {
          this.isInvalid = true
          this.InvalidText = this.validateText.incorrectPattern
      },
      adjustTextareaHeight(){
          this.$refs.input.style.height = 'auto'
          let height = this.$refs.input.scrollHeight
          this.$refs.input.style.height = height+'px'
      }
  },
  created() {
      if(this.required){
          this.handleEmptyInput()
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
        default: ""
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
  },
  watch: {
      value() {
        this.handleInput(this.value)
        setTimeout(()=>{
            this.adjustTextareaHeight()
        },100)
      }
  },
}
</script>
<style scoped src="@/css/form-input.css"></style>
