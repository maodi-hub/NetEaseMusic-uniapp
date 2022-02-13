import { baseUrl } from "@/common/config.js"

const net = function (url, method, data = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl+url}`,
			method,
			data,
			success (res) {
				resolve(res)
			},
			fail (err) {
				reject(err)
			}
		})
	})
}


export default net