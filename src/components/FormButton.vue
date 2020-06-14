<template>
  <button class="form-button" v-on:click="onClick">
      {{text}}
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    text: {
        type:String,
        default: 'Button'
    },
    onClick: {
        type: Function,
        default: () => {
            alert('button clicked');
        }
    },
  },
}
</script>
<style scoped src="@/css/form-button.css"></style>
