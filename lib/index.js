module.exports = function ({ conf, log }) {
	// Set options default
	conf.mono.drive = conf.mono.drive || {}

	const { get, put, del } = require('./service')({ conf, log })

	module.exports.get = get
	module.exports.put = put
	module.exports.del = del
}
