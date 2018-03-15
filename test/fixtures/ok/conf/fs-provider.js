const { join } = require('path')

module.exports = {
	mono: {
		drive: {
			fs: {
				root: join(__dirname, '../tmp')
			}
		}
	}
}
