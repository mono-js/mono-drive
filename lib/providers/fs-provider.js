const fs = require('fs')
const mkdirp = require('mkdirp')

const { cb } = require('@terrajs/mono').utils

module.exports = ({ conf }) => {
	const config = conf.mono.drive.fs

	async function get(medium) {
		if (!medium || (!medium.key && !medium.path)) throw new Error('Unable to find key or path argument')

		return fs.createReadStream(medium.key ? (config.destination + medium.key) : medium.path)
	}

	async function put(medium) {
		const dir = (config.root + medium.key).match(/(.*)\//)[1]

		await cb(mkdirp, dir)

		return new Promise((resolve, reject) => {
			medium.stream
				.pipe(fs.createWriteStream(config.root + medium.key))
				.on('error', (err) => reject(err))
				.on('finish', (err) => {
					if (err) return reject(err)

					return resolve({
						provider: 'fs',
						key: medium.key,
						url: `/${config.path}${medium.key}`
					})
				})
		})
	}

	async function del(medium) {
		return fs.unlinkSync(config.root + medium.key)
	}

	module.exports.get = get
	module.exports.put = put
	module.exports.del = del

	return module.exports
}
