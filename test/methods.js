const test = require('ava')
const { join } = require('path')

const { start, stop } = require('mono-test-utils')

let monoModule

let ctx

test.before('Start mono server', async () => {
	// ctx = { server, app, conf, stdout, stderr }
	ctx = await start(join(__dirname, 'fixtures/ok/'), { env: 'development' })
	monoModule = require('../lib/index')
})

test('monoDrive should expose some methods', (t) => {
	const monoDrive = new monoModule('local')

	t.truthy(monoDrive.get)
	t.truthy(monoDrive.getStream)
	t.truthy(monoDrive.exists)
	t.truthy(monoDrive.create)
	t.truthy(monoDrive.delete)
})

test.after('Stop mono server', async () => {
	await stop(ctx.server)
})
