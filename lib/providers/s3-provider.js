
var s3 = require('aws-sdk/clients/s3')

module.exports = ({ conf }) => {
	const config = conf.mono.drive.s3

	var s3Bucket = new s3({
		accessKeyId: config.AWSAccessKeyId,
		secretAccessKey: config.AWSSecretKey
	})

	var client = require('s3-upload-stream')(s3Bucket)

	async function get(medium) {
		return s3Bucket.getObject({ Bucket: config.bucket, Key: medium.key }).createReadStream()
	}

	async function put(medium) {
		var upload = client.upload({
			Bucket: config.bucket,
			Key: medium.key,
			ACL: 'public-read'
		})

		return new Promise((resolve, reject) => {
			upload.on('error', (err) => {
				return reject(err)
			})

			upload.on('uploaded', function (result) {
				return resolve({
					provider: 's3',
					key: result.Key,
					path: result.Location
				})
			})

			medium.stream.pipe(upload)
		})
	}

	async function del(medium, next) {
		return client.deleteObject({
			Bucket: config.bucket,
			Key: medium.key
		}, next)
	}

	module.exports.get = get
	module.exports.put = put
	module.exports.del = del
}
