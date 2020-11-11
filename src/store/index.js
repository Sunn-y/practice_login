import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		allUsers: [{
				id: 1,
				name: 'Mike',
				email: 'mike@gmail.com',
				password: 'mike1'
			},
			{
				id: 2,
				name: 'Jane',
				email: 'jane@gmail.com',
				password: 'jane2'
			},
			{
				id: 3,
				name: 'Tom',
				email: 'tom@gmail.com',
				password: 'tom3'
			},
		],
		isLogin: false,
		isLoginError: false,
	},
	mutations: {
		loginSuccess(state, payload) {
			state.isLogin = true;
			state.isLoginError = false;
			state.userInfo = payload;
		},
		loginError(state) {
			state.isLogin = false;
			state.isLoginError = true;
		},
		logout(state) {
			state.isLogin = false;
			state.isLoginError = false;
			state.userInfo = null;
		}
	},
	actions: {
		login({
			state,
			commit
		}, loginObj) {
			let checkUser = null;
			state.allUsers.forEach((user, i) => {
				if (user.email === loginObj.email) checkUser = user;
			});
			if (checkUser === null || checkUser.password !== loginObj.password) {
				commit('loginError');
			} else {
				commit('loginSuccess', checkUser);
				//state.userInfo = loginObj;
				router.push({
					name: 'mypage'
				});
			}
		},
		logout({
			commit
		}) {
			commit('logout');
			router.push({
				name: 'home'
			});
		}
	},
	modules: {}
});
