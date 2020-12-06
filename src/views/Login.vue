<template lang="html">
   <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
             <v-toolbar-title>Login form</v-toolbar-title>
             <v-spacer></v-spacer>
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                  </v-btn>
                </template>
             </v-tooltip>
             <v-tooltip right>
             </v-tooltip>
            </v-toolbar>
            <v-card-text>
             <v-form>
                <v-text-field label="Put your e-mail" type="text" v-model='email'></v-text-field>
                <v-text-field label="Put your password" type="password" v-model='password'></v-text-field>
             </v-form>
            </v-card-text>
            <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn color="primary" @click="login({ email, password})">Login</v-btn>
              <!-- <v-btn color="primary" @click="getTest">getTest</v-btn>
              <v-btn color="primary" @click="postTest">postTest</v-btn> -->
            </v-card-actions>
          </v-card>
          <br>
          <v-alert type="error" :value="isLoginError">Check your ID or password</v-alert>
          <v-alert type="success" :value="isLogin">Login complete</v-alert>
      </v-flex>
   </v-layout>
</template>

<script>
import {
	mapState,
	mapActions
} from 'vuex';

export default {
	data: () => ({
		drawer: null,
		email: null,
		password: null,
	}),
	props: {
		source: String
	},
	computed: {
		...mapState(['isLogin', 'isLoginError'])
	},
	methods: {
		...mapActions(['login']),
		getTest() {
			axios.get('https://reqres.in/api/users?page=2')
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				})
				.then(() => {
					console.log('test');
				});
		},
		postTest() {
			axios.post('https://reqres.in/api/register', {
					email: 'eve.holt@reqres.in',
					password: 'pistol'
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
}
</script>

<style lang="css" scoped>
</style>
