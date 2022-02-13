<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
		width: 100vw;
		height: calc(100vh - 75px);
	}
	.container scroll-view {
		height: 100%;
	}
</style>
