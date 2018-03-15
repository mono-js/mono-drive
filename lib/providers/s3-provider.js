
var s3 = require('aws-sdk/clients/s3')

module.exports = ({ log, conf }) => {
	const config = conf.mono.drive.s3

	var s3Bucket = new s3({
		accessKeyId: config.AWSAccessKeyId,
		secretAccessKey: config.AWSSecretKey
	})

	var client = require('s3-upload-stream')(s3Bucket)

	function get(medium) {
		s3Bucket.getObject({ Bucket: config.bucket, Key: medium.key }).createReadStream()
	}

	function put(medium, next) {
		var upload = client.upload({
			Bucket: config.bucket,
			Key: medium.key,
			ACL: 'public-read'
		})

		upload.on('error', function (err) {
			if (err) return next(err)
		})

		upload.on('uploaded', function (result) {
			return next(null, {
				provider: 's3',
				key: result.Key,
				path: result.Location
			})
		})

		medium.stream.pipe(upload)
	}

	function del(medium, next) {
		client.deleteObject({
			Bucket: config.bucket,
			Key: medium.key
		}, next)
	}

	module.exports.get = get
	module.exports.put = put
	module.exports.del = del
}
