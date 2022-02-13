<template>
	<view>
		<view :style="{background: `url(${songDetail.al.picUrl}) center top`, filter: 'blur(10px)', position: 'fixed', left: 0, right: 0, height: '100vh', backgroundSize: 'cover'}">
		</view>
		<music-nav :title="songDetail.name" :ishome="false"></music-nav>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image :src="songDetail.al.picUrl" mode="" :class="[isplay?'detail-play-state': '']"></image>
					<text class="iconfont"
					:class="[isplay? 'icon-zanting':'icon-24gl-playCircle']"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item" :class="{ active: lyricIndex == index}" v-for="(item, index) in songLyric" :key="index">
							<text>{{item.word}}</text>
						</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						<text>喜欢这首歌的人也听</text>
					</view>
					<view class="detail-like-item"
					v-for="(item, index) in songSimi"
					:key="index">
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>
								{{item.name}}
							</view>
							<view>
								{{item.album.artists[0].name}} - {{item.name}}
							</view>
						</view>
						<view class="iconfont icon-24gl-playCircle">
						</view>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">
						<text>精彩评论</text>
					</view>
					<view class="detail-comment-item"
					v-for="(item, index) in songComment"
					:key="index">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>{{item.user.nickname}}</view>
									<view>{{item.time | formatTime}}</view>
								</view>
								<view class="detail-comment-like">
									<text>{{item.likedCount}}</text><text class="iconfont icon-icon"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								<text>{{item.content}}</text>
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
				songDetail: {
					name: '',
					al: {
						picUrl: ''
					}
				},
				songSimi: [],
				songComment: [],
				songLyric: [],
				bgManager: null,
				lyricIndex: 0,
				isplay: false
			}
		},
		onLoad (param) {
			if (!param.id) return
			this.getMusic(param.id)
		},
		methods: {
			getMusic (id) {
				Promise.all([this.$api.songDetail(id), this.$api.songSimi(id), this.$api.songComment(id), this.$api.songLyric(id), this.$api.songUrl(id)]).then(res =>{
					this.songDetail = res[0].data.songs[0]
					this.songSimi = res[1].data.songs
					this.songComment = res[2].data.hotComments
					this.songLyric = this.dealWithSongWord(res[3].data.lrc.lyric)
					this.bgManager = uni.getBackgroundAudioManager()
					this.bgManager.title = this.songDetail.name
					this.bgManager.src = res[4].data.data[0].url
					this.isplay = true
				}).catch(err => {
					console.log(err)
				})
			},
			dealWithSongWord (val) {
				const that = this
				const re = /\[([^\]]+)\]([^\[]+)/g
				const result = []
				val.replace(re, function ($0, $1, $2) {
					result.push({ time: that.formatTimeToSec($1), word: $2})
				})
				return result
			},
			formatTimeToSec (val) {
				let arr = val.split(':')
				return parseFloat(arr[0]) * 60 + parseFloat(parseFloat(arr[1]).toFixed(1))
			}
		}
	}
</script>

<style scoped>
	.detail-play {
		position: relative;
		margin: 214rpx auto 0;
		width: 580rpx;
		height: 580rpx;
		line-height: 580rpx;
		text-align: center;
	}
	.detail-play image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		border: 55rpx solid black;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}
	.detail-play .detail-play-state {
		animation-play-state: running;
	}
	@-ms-keyframes move{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
	.detail-play text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 100rpx;
		color: white;
	}
	.detail-play view {
		position: absolute;
		top: -170rpx;
		left: 50%;
		height: 360rpx;
		width: 230rpx;
		background-color: blue;
	}
	.detail-lyric {
		height: 246rpx;
		font-size: 32rpx;
		line-height: 82rpx;
		text-align: center;
		overflow: hidden;
	}
	.detail-lyric-item {
		height: 82rpx;
		color: #6f6e73;
	}
	.detail-lyric-item.active {
		color: white;
	}
	
	.detail-like {
		margin: 0 30rpx;
	}
	.detail-like-head {
		margin-bottom: 50rpx;
		font-size: 36rpx;
		color: white;
	}
	.detail-like-item {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
	}
	.detail-like-img {
		margin-right: 20rpx;
		width: 82rpx;
		height: 82rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.detail-like-img image {
		width: 100%;
		height: 100%;
	}
	.detail-like-song {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.detail-like-song view:nth-child(1) {
		font-size: 28rpx;
		color: white;
	}
	.detail-like-song view:nth-child(2) {
		font-size: 22rpx;
		color: #c6c2bf;
	}
	.detail-like-item view:nth-child(3) {
		font-size: 50rpx;
		color:  #c6c2bf;
	}
	
	.detail-comment {
		margin: 0 30rpx;
	}
	.detail-comment-head {
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}
	.detail-comment-item {
		display: flex;
		margin-bottom: 28rpx;
	}
	.detail-comment-img {
		margin-right: 18rpx;
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.detail-comment-img image {
		width: 100%;
		height: 100%;
	}
	.detail-comment-content {
		flex: 1;
	}
	.detail-comment-title {
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #cbcacf;
	}
	.detail-comment-name {}
	.detail-comment-name view:nth-child(1) {
		font-size: 26rpx;
	}
	.detail-comment-name view:nth-child(2) {
		font-size: 18rpx;
	}
	.detail-comment-like {
		font-size: 28rpx;
	}
	.detail-comment-text {
		padding-bottom: 40rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: white;
		border-bottom: 1rpx solid #e0e0e0;
	}
</style>
