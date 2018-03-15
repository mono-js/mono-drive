const test = require('ava')
const { join } = require('path')
const isStream = require('is-stream');

const { waitForEvent } = require('@terrajs/mono').utils
const { start, stop } = require('mono-test-utils')

const monoModule = require('../lib/index')

let ctx

test.before('Start mono server', async () => {
	ctx = await start(join(__dirname, 'fixtures/ok/'), { env: 'fs-provider' })
})

test('monoDrive.get should throe an error if no key or path provided', async (t) => {
	const stream = await t.throws(monoModule.get({ provider: 'fs' }), Error)

	t.true(stream.message.includes('Unable to find key or path argument'))
})

test('monoDrive.get should return a readable stream', async (t) => {
	const stream = await monoModule.get({ provider: 'fs', path: 'test.js' })

	const [error] = await waitForEvent(stream, 'error')

	t.is(error.code, 'ENOENT')
	t.true(isStream(stream))
})

test.after('Stop mono server', async () => {
	await stop(ctx.server)
})
