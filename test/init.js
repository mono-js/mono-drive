const test = require('ava')
const { join } = require('path')

const { start, stop } = require('mono-test-utils')

const monoModule = require('../lib/index')

let ctx

test.before('Start mono server', async () => {
	ctx = await start(join(__dirname, 'fixtures/ko/'), { env: 'development' })
})

test('monoDrive should throw an error if provider not exist', (t) => {
	const error = t.throws(() => monoModule.get({ provider: 'bad-provider' }), Error)

	t.true(error.message.includes('provider bad-provider not supported'))
})

test('monoDrive should throw an error if no configuration provided for the provider', (t) => {
	const error = t.throws(() => monoModule.get({ provider: 'fs' }), Error)

	t.true(error.message.includes('Unable to find configuration for provider fs'))
})

test('monoDrive should expose { get, put, del }', (t) => {
	t.truthy(monoModule.get)
	t.truthy(monoModule.put)
	t.truthy(monoModule.get)
})

test.after('Stop mono server', async () => {
	await stop(ctx.server)
})
