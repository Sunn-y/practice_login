import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from 'axios';

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
			dispatch
		}, loginObj) {
			// login 정보 확인 -> 토큰 반환
			axios.post('https://reqres.in/api/login', loginObj).then(res => {
				console.log(res);
				let token = res.data.token;
				localStorage.setItem('access_token',token);
				dispatch('getMemberInfo');

			}).catch(() => {
				alert('Check your email or password');
			});
		},
		// let checkUser = null;
		// state.allUsers.forEach((user, i) => {
		// 	if (user.email === loginObj.email) checkUser = user;
		// });
		// if (checkUser === null || checkUser.password !== loginObj.password) {
		// 	commit('loginError');
		// } else {
		// 	commit('loginSuccess', checkUser);
		// 	//state.userInfo = loginObj;
		// 	router.push({
		// 		name: 'mypage'
		// 	});
		// }
		// },
		logout({
			commit
		}) {
			commit('logout');
			router.push({
				name: 'home'
			});
		},
		getMemberInfo({
			commit
		}) {
			// 로컬에 저장된 토큰 가져오기
			let token = localStorage.getItem('access_token');
			let config = {
				hearders: {
					"access-token": token
				}
			};
			// 반환된 토큰을 다시 보냄 -> 토큰에 해당되는 정보를 넘겨줌
			axios.get('https://reqres.in/api/users/2', config)
				.then(response => {
					let userInfo = {
						avatar: response.data.data.avatar,
						id: response.data.data.id,
						email: response.data.data.email,
						first_name: response.data.data.first_name,
						last_name: response.data.data.last_name,
					}
					commit('loginSuccess', userInfo);
				})
				.catch(() => {
					alert('Check your email or password');
				})
				.then(() => {});
		},
	}
});
