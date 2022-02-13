<template>
	<view class="index">
		<music-nav title="网易云音乐" :ishome="true"></music-nav>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="index-search">
					<text class="iconfont icon-sousuo"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view class="index-news-list">
					<view class="index-news-list-item"
					v-for="(item, index) in dataList"
					:key="index" @tap="handlerToList(item.day.id)">
						<view class="list-item-img"
						:style="{ background: `url(${item.day.img}) no-repeat center`, backgroundSize: 'cover'}">
						</view>
						<view class="list-item-content">
							<view class="list-item-text"
							v-for="(song, i) in item.songs"
							:key="i">
								<text>{{i+1}}</text>.<text>{{song.name}}</text>
							</view>
						</view>
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
				dataList: []
			}
		},
		onLoad() {
			this.$api.topList().then(res => {
				this.dataList = res.map( item => {
					return { 
						day: {
							id: item.data.playlist.id,
							name: item.data.playlist.name,
							img: item.data.playlist.coverImgUrl},
						songs: item.data.playlist.tracks.splice(0,3)
					}
				})
			}).catch(err => {
				console.log(err)
				
			})
		},
		methods: {
			handlerToList (i) {
				uni.navigateTo({
					url: `../list/list?listId=${i}`
				})
			}
		}
	}
</script>

<style scoped>
	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx;
		border-radius: 35rpx;
		background-color: #f7f7f7;
	}
	.index-search text {
		font-size: 26rpx;
		margin-left: 28rpx;
		margin-right: 25rpx;
	}
	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}
	
	.index-news-list {
		margin: 0 30rpx;
	}
	
	.index-news-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}
	.list-item-img {
		margin-right: 22rpx;
		position: relative;
		height: 212rpx;
		width: 212rpx;
		text-align: center;
		color: white;
		background-color: red;
		border-radius: 15rpx;
	}
	.list-item-img::after {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		content: "每天更新";
		font-size: 20rpx;
		color: white;
	}
	
	.list-item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list-item-text {
		font-size: 24rpx;
		color: black;
	}
</style>
