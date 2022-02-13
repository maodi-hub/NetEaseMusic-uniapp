<template>
	<view class="music-navhead">
		<view class="music-navhead-icon" v-if="!ishome">
			<text class="iconfont icon-zuojiantou" @tap="backTo"></text> | <text class="iconfont icon-shouye-tianchong" @tap="toHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"music-nav",
		props: ['title', 'ishome'],
		data() {
			return {
				
			};
		},
		mounted () {
		},
		methods: {
			backTo () {
				uni.navigateBack()
			},
			toHome () {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.music-navhead {
		position: relative;
		width: 100vw;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: black;
	}
	.music-navhead-icon {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		position: absolute;
		left: 8px;
		top: 26px;
		width: 90px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		background-color: rgba(0, 0, 0, .5);
		color: white;
	}
</style>
