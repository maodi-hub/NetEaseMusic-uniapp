<template>
	<view>
		<view :style="{background: `url(${playList.coverImgUrl}) center top`, filter: 'blur(10px)', position: 'fixed', left: 0, right: 0, height: '100vh', backgroundSize: 'cover'}">
		</view>
		<music-nav title="歌单" :ishome="false"></music-nav>
		<view class="container"  v-show="isLoading">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					<view class="list-head-img"
					:style="{background: `url(${playList.coverImgUrl})`, backgroundSize: 'cover'}">
						<text>{{playList.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>
							<text>{{playList.name}}</text>
						</view>
						<view>
							<view class="logo"
							:style="{width: '54rpx', height: '54rpx', background: `url(${playList.creator.avatarUrl})`, borderRadius: '50%', marginRight: '14rpx', backgroundSize: 'cover'}">
							</view>
							<text>{{playList.creator.nickname}}</text>
						</view>
						<view>
							<text>{{playList.description}}</text>
						</view>
					</view>
				</view>
				<button open-type="share" class="list-share">
					<text class="iconfont icon-fenxiang"></text>
					<text>分享给微信好友</text>
				</button>
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-24gl-playCircle"></text>
						<text>播放全部</text>
						<text>(共{{playList.trackCount}}首)</text>
					</view>
					<view class="list-music-item"
					v-for="(item, index) in playList.tracks"
					:key="index"
					@tap="ToDetail(item.id)">
						<view>
							{{index+1}}
						</view>
						<view>
							<view class="list-music-item-name">
								{{item.name}}
							</view>
							<view class="list-music-item-tag">
								{{item.ar[0].name}} - {{item.name}}
							</view>
						</view>
						<view class="iconfont icon-24gl-playCircle"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import MusicNav from '@/components/MusicNavgation/MusicNavgation.vue'
	export default {
		components: {
			MusicNav
		},
		data() {
			return {
				isLoading: false,
				playList: {
					coverImgUrl: '',
					description: '',
					playCount: 0,
					trackCount: 0,
					tracks: [],
					creator: {
						avatarUrl: '',
						nickname: ''
					}
				}
			}
		},
		onLoad (param) {
			if (!param) return
			uni.showLoading({
				title: '正在加载...'
			})
			this.$api.getDetails(param.listId).then(res => {
				console.log(res)
				this.playList = res.data.playlist 
				this.isLoading = true
				uni.hideLoading()
			}).catch(err =>{
				console.log(err)
			})
		},
		methods: {
			ToDetail (id) {
				let param = false
				function go() {
					if (param) return
					param = true
					uni.navigateTo({
						url: `../detail/detail?id=${id}`
					})
				}
				go()
			}
		}
	}
</script>

<style scoped>
	.list-head {
		display: flex;
		margin: 30rpx;
	}
	.list-head-img {
		margin-right: 42rpx;
		position: relative;
		height: 264rpx;
		width: 264rpx;
		border-radius: 20rpx;
	}
	.list-head-img text {
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		font-size: 26rpx;
		color: white;
	}
	.list-head-text {
		flex: 1;
		color: white;
	}
	.list-head-text view:nth-child(1) {
		font-size: 32rpx;
	}
	.list-head-text view:nth-child(2) {
		display: flex;
		margin: 20rpx 0;
		font-size: 24rpx;
		align-items: center;
	}
	.list-head-text view:nth-child(3) {
		line-height: 32rpx;
		font-size: 22rpx;
	}
	
	.list-share {
		margin: 0 auto;
		width: 330rpx;
		height: 74rpx;
		line-height: 74rpx;
		color: white;
		font-size: 28rpx;
		border-radius: 37rpx;
		background-color: rgba(0, 0, 0, .4);
	}
	.list-share text:nth-child(1) {
		margin-right: 16rpx;
	}
	
	.list-music {
		margin-top: 40rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background-color: white;
	}
	.list-music-head {
		margin: 0 30rpx;
		padding: 20rpx 0;
		height: 50rpx;
	}
	.list-music-head text:nth-child(1) {
		margin-right: 26rpx;
		font-size: 50rpx;
	}
	.list-music-head text:nth-child(2) {
		margin-right: 10rpx;
		font-size: 30rpx;
	}
	.list-music-head text:nth-child(3) {
		font-size: 26rpx;
		color: #c7c7c7;
	}
	
	.list-music-item {
		margin: 0 30rpx 66rpx;
		display: flex;
		align-items: center;
	}
	.list-music-item>view:nth-child(1) {
		color: #959595;
		width: 50rpx;
		text-align: center;
	}
	.list-music-item>view:nth-child(2) {
		flex: 1;
	}
	.list-music-item>view:nth-child(3) {
		color: #c7c7c7;
		width: 50rpx;
		text-align: center;
	}
	
	.list-music-item-name {
		width: 70vw;
		font-size: 28rpx;
		color: black;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list-music-item-tag {
		width: 70vw;
		font-size: 20rpx;
		color: #c7c7c7;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
