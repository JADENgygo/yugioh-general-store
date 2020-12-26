import UIkit from 'uikit';
import Icons from './uikit-icons';
import './uikit.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import host from './host';
import topPage from './topPage';
import calendar from './calendar';
import quote from './quote';
import fortuneTelling from './fortuneTelling';
import probability from './probability';
import link from './link';

UIkit.use(Icons);

Vue.config.productionTip = false;

const router = new VueRouter({
	routes: [
		{path: '/', component: topPage},
		{path: '/calendar', component: calendar},
		{path: '/quote', component: quote},
		{path: '/fortune-telling', component: fortuneTelling},
		{path: '/probability', component: probability},
		{path: '/link', component: link}
	]
});

Vue.use(VueRouter);

new Vue({
	el: '#app',
	components: {
		'host': host
	},
	template: '<host></host>',
	router
});
