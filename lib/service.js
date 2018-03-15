module.exports = function ({ conf, log }) {
	return {
		get: function (medium) {
			return require('./providers/' + medium.provider + '-provider')({ conf, log }).get(medium)
		},
		put: function (medium) {
			return require('./providers/' + medium.provider + '-provider')({ conf, log }).put(medium)
		},
		del: function (medium) {
			return require('./providers/' + medium.provider + '-provider')({ conf, log }).del(medium)
		}
	}
}
