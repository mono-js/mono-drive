const test = require('ava')
const { join } = require('path')

const { start, stop } = require('mono-test-utils')

let monoModule

let ctx

test.before('Start mono server', async () => {
	// ctx = { server, app, conf, stdout, stderr }
	ctx = await start(join(__dirname, 'fixtures/ko/'), { env: 'development' })
	monoModule = require('../lib/index')
})

test('monoDrive should throw an error if provider not exist', (t) => {
	const error = t.throws(() => new monoModule('bad-provider'), Error)

	t.true(error.message.includes('provider bad-provider not supported'))
})

test('monoDrive should throw an error if no configuration provided for the provider', (t) => {
	const error = t.throws(() => new monoModule('local'), Error)

	t.true(error.message.includes('Unable to find configuration for provider local'))
})


test.after('Stop mono server', async () => {
	await stop(ctx.server)
})
