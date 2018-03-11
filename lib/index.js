const StorageManager = require('@slynova/flydrive')

module.exports = function ({ conf }) {
	// Set options default
	const options = conf.mono.drive = conf.mono.drive || {}
	options.provider = options.provider || 'local'

	const monoDrive = class MonoDrive {
		constructor(providerName) {
			if (['local', 's3'].indexOf(providerName) === -1) throw new Error(`provider ${providerName} not supported`)
			// Get provider config from loaded configuration
			const providerConf = conf.mono.drive[providerName]
			if (!providerConf) throw new Error(`Unable to find configuration for provider ${providerName}`)

			const providerConfiguration = {
				default: providerName || 'local',
				disks: {}
			}

			providerConfiguration.disks[providerName] = providerConf
			providerConfiguration.disks[providerName].driver = providerName

			// Init flydrive driver
			this.storage = new StorageManager(providerConfiguration)

			// Expose defaults driver methods
			this.get = this.storage.driver.get
			this.getStream = this.storage.driver.getStream
			this.exists = this.storage.driver.exists
			this.create = this.storage.driver.put
			this.delete = this.storage.driver.delete
		}
	}

	module.exports = monoDrive

	return monoDrive
}
