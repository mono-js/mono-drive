const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

module.exports = ({ log, conf }) => {
	const config = conf.mono.drive.fs

	function get(medium) {
		return fs.createReadStream(medium.key ? (config.destination + medium.key) : medium.path)
	}

	function put(medium) {
		const dir = (config.destination + medium.key).match(/(.*)\//)[1]

		mkdirp(dir, function (err) {
			if (err) return next(err)

			medium.stream
				.pipe(fs.createWriteStream(config.destination + medium.key))
				.on('error', function (err) { if (err) return next(err) })
				.on('finish', (err) => {
					if (err) return next(err)

					return next(null, {
						provider: 'fs',
						key: medium.key,
						url: `/${config.path}${medium.key}`
					})
				})
		})
	}

	function del(medium) {
		fs.unlink(config.destination + medium.key, next)
	}

	module.exports.get = get
	module.exports.put = put
	module.exports.del = del
}
