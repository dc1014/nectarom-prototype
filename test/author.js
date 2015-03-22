var Lab = require('lab'),
		Code = require('code'),
		Path = require('path'),
		server = require(Path.join(__dirname, '/../')),
		lab = exports.lab = Lab.script();


lab.experiment("Tesing author api", function() {
	//tests, yo
	lab.test("should display author list", function(done) {
		var options = {
			method: "GET",
			url: "/authors"
		};

		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(result).to.be.instanceof(Array);
			Code.expect(result).to.have.length(1);
			done();
		});
	});
});