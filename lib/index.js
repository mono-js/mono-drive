function getFnc(fnc, providers) {
	return function (medium) {
		if (!medium) throw new Error(`no config param provider`)

		// Check if provider is available
		if (['fs', 's3'].indexOf(medium.provider) === -1) throw new Error(`provider ${medium.provider} not supported`)

		// Check if provider conf exist
		if (providers.indexOf(medium.provider)) throw new Error(`Unable to find configuration for provider ${medium.provider}`)

		// Return loaded provider
		return require(`./providers/${medium.provider}-provider`)[fnc](medium)
	}
}

function initProviders({ conf, log }) {
	const providersName = ['fs', 's3']

	return providersName.map((providerName) => {
		if (!conf.mono.drive[providerName]) return ''
		else {
			//Load provider with configuration
			require(`./providers/${providerName}-provider`)({ conf, log })

			return providerName
		}
	}).filter((item) => item !== '')
}

module.exports = function ({ conf, log }) {
	// Set options default
	conf.mono.drive = conf.mono.drive || {}

	//Init providers
	const providers = initProviders({ conf, log })

	module.exports.get = getFnc('get', providers)
	module.exports.put = getFnc('put', providers)
	module.exports.del = getFnc('del', providers)
}
