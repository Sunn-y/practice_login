<template>
<v-app id="inspire" app>
	<v-navigation-drawer v-model="drawer" app>
		<v-list nav dense>
			<v-list-item-group active-class="deep-purple--text text--accent-4">
				<v-list-item router :to="{name:'home'}" exact>
					<v-list-item-title>HOME</v-list-item-title>
				</v-list-item>

				<v-list-item router :to="{name:'login'}" exact v-if="isLogin === false">
					<v-list-item-title>LOGIN</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="{name:'mypage'}" exact v-else>
					<v-list-item-title>MYPAGE</v-list-item-title>
				</v-list-item>

			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>

	<v-app-bar app dark color="cyan">
		<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

		<v-toolbar-title>Application</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-menu offset-y v-if="isLogin">
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item router :to="{name:'mypage'}">
						<v-list-item-title>MYPAGE</v-list-item-title>
					</v-list-item>
					<v-list-item router :to="{name:'logout'}" @click="$store.dispatch('logout')">
						<v-list-item-title>LOGOUT</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>



			<v-btn depressed color="cyan" v-else router :to="{name:'login'}">Login</v-btn>
		</v-toolbar-items>

	</v-app-bar>

	<v-main>
		<v-container fluid fill-height>
			<router-view />
		</v-container>
	</v-main>
</v-app>
</template>

<script>
import {
	mapState
} from 'vuex'
export default {
	data: () => ({
		drawer: null
	}),
	computed: {
		...mapState(['isLogin'])
	},
}
</script>
