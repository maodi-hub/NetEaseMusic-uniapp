import http from "./default.js"

const api = {
	topList () {
		const ids = ['19723756', '3779629', '2884035', '3778678']
		const datas = ids.map(item => {
			return this.getDetails(item)
		})
		return Promise.all(datas)
	},
	getDetails (id) {
		return http('/playlist/detail', 'GET', { id })
	},
	songDetail (id) {
		return http( '/song/detail', 'GET', { ids: id })
	},
	songSimi (id) {
		return http( '/simi/song', 'GET', { id })
	},
	songComment (id) {
		return http( '/comment/music', 'GET', { id })
	},
	songLyric (id) {
		return http( '/lyric', 'GET', { id })
	},
	songUrl (id) {
		return http( '/song/url', 'GET', { id })
	}
}
export default api
