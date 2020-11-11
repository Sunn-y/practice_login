<template lang="html">
   <v-layout row wrap align-center justify-center>
     <v-flex xs12 sm8 md4>
       <v-card class="elevation-12">
          Welcome! {{ userInfo.first_name }}
      </v-card>
   </v-flex>
</v-layout>
</template>

<script>
import {mapState} from 'vuex';
export default {
	computed: {
		...mapState(['userInfo'])
	},
}
</script>

<style lang="css" scoped>
</style>
