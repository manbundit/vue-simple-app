<template>
   <router-link class="user-box" :to="`/edit-profile/${detail.id}`">
     <div class="col-data">
         <div class="name">{{`${detail.name} ${detail.lname}`}}</div>
         <div class="age">Age: {{convertToYears(detail.birthdate)}}</div>
         <div class="phone">{{detail.phone}}</div>
     </div>
     <div class="col-action">
        <div class="edit">Edit</div>
     </div>
    </router-link>
</template>

<script>
export default {
  name: 'UserBox',
  methods: {
    convertToYears(date) {
      let today = new Date()
      let dateToSubtract = new Date(date.toDate())
      let years = today.getFullYear() - dateToSubtract.getFullYear()
      let monthsDiff = today.getMonth() - dateToSubtract.getMonth()
      if(monthsDiff < 0 || (monthsDiff == 0 && today.getDate() < dateToSubtract.getDate())){
        years--
      }
      return years
    }
  },
  props: {
    detail: {
        type:Object,
        default() {
            return {
                name: 'name',
                lname: 'surname',       
                phone: '123123123'         
            }
        }
    },
  },
}
</script>
<style scoped src="@/css/user-box.css"></style>
