<template>
	<div>
		<div v-if="pc">
			<nav class="uk-navbar-container" uk-navbar>
				<div class="uk-navbar-center">
					<ul class="uk-navbar-nav">
						<li><router-link to="/"><span class="title uk-text-large uk-text-lead uk-text-bold">遊戯王の雑貨屋</span></router-link></li>
					</ul>
				</div>
			</nav>
			<div uk-grid class="uk-margin-top">
				<div class="uk-width-auto uk-margin-left">
					<ul class="uk-nav uk-nav-primary">
						<li class="uk-active"><a>ラインナップ</a></li>
						<li v-bind:class="{'uk-active': active[0]}"><router-link to="/"><span uk-icon="home"></span> トップページ</router-link></li>
						<li v-bind:class="{'uk-active': active[1]}"><router-link to="/calendar"><span uk-icon="calendar"></span> カレンダー</router-link></li>
						<li v-bind:class="{'uk-active': active[2]}"><router-link to="/quote"><span uk-icon="comments"></span> セリフ集</router-link></li>
						<li v-bind:class="{'uk-active': active[3]}"><router-link to="/fortune-telling"><span uk-icon="star"></span> カード占い</router-link></li>
						<li v-bind:class="{'uk-active': active[4]}"><router-link to="/probability"><span uk-icon="pencil"></span> ドロー確率計算機</router-link></li>
						<li v-bind:class="{'uk-active': active[5]}"><router-link to="/link"><span uk-icon="link"></span> リンク</router-link></li>
					</ul>
				</div>
				<div class="uk-width-expand uk-margin-left uk-margin-right uk-margin-bottom">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<div v-else>
			<nav class="uk-navbar-container" uk-navbar>
				<div class="uk-navbar-left">
					<a class="uk-navbar-toggle" uk-navbar-toggle-icon href="" uk-toggle="target: #navigation-menu"></a>
				</div>
				<div class="uk-navbar-center">
					<ul class="uk-navbar-nav">
						<li><router-link to="/"><span class="title uk-text-large uk-text-lead uk-text-bold">遊戯王の雑貨屋</span></router-link></li>
					</ul>
				</div>
			</nav>
			<div id="navigation-menu" uk-offcanvas="overlay: true">
				<div class="uk-offcanvas-bar">
					<button class="uk-offcanvas-close" type="button" uk-close></button>
					<ul class="uk-nav uk-nav-primary">
						<li class="uk-active"><a>ラインナップ</a></li>
						<li v-bind:class="{'uk-active': active[0]}" v-on:click="closeNavigation()"><router-link to="/"><span uk-icon="home"></span> トップページ</router-link></li>
						<li v-bind:class="{'uk-active': active[1]}" v-on:click="closeNavigation()"><router-link to="/calendar"><span uk-icon="calendar"></span> カレンダー</router-link></li>
						<li v-bind:class="{'uk-active': active[2]}" v-on:click="closeNavigation()"><router-link to="/quote"><span uk-icon="comments"></span> セリフ集</router-link></li>
						<li v-bind:class="{'uk-active': active[3]}" v-on:click="closeNavigation()"><router-link to="/fortune-telling"><span uk-icon="star"></span> カード占い</router-link></li>
						<li v-bind:class="{'uk-active': active[4]}" v-on:click="closeNavigation()"><router-link to="/probability"><span uk-icon="pencil"></span> ドロー確率計算機</router-link></li>
						<li v-bind:class="{'uk-active': active[5]}" v-on:click="closeNavigation()"><router-link to="/link"><span uk-icon="link"></span> リンク</router-link></li>
					</ul>
				</div>
			</div>
			<div class="uk-margin-top uk-margin-bottom">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted: function() {
		window.addEventListener('resize', () => this.pc = window.matchMedia("(min-width: 768.02px)").matches);
		this.activateNavigation();
	},
	beforeUpdate: function() {
		this.activateNavigation();
	},
	data: function() {
		return {
			active: [false, false, false, false, false, false],
			pc: window.matchMedia("(min-width: 768.02px)").matches
		};
	},
	methods: {
		activateNavigation: function() {
			for (let i = 0; i < this.active.length; ++i) {
				this.$set(this.active, i, false);
			}
			switch (this.$route.path) {
				case '/':
					this.$set(this.active, 0, true);
					break;
				case '/calendar':
					this.$set(this.active, 1, true);
					break;
				case '/quote':
					this.$set(this.active, 2, true);
					break;
				case '/fortune-telling':
					this.$set(this.active, 3, true);
					break;
				case '/probability':
					this.$set(this.active, 4, true);
					break;
				case '/link':
					this.$set(this.active, 5, true);
					break;
				default:
					break;
			}
		},
		closeNavigation: function() {
			UIkit.offcanvas('#navigation-menu').hide();
		}
	}
}
</script>
<style>
</style>
