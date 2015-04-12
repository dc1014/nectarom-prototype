var Lab = require('lab'),
		Code = require('code'),
		Path = require('path'),
		server = require(Path.join(__dirname, '/../')),
		lab = exports.lab = Lab.script();

var expect = Code.expect;

lab.experiment("Tesing author api", function() {

	lab.test("should display author list", function(done) {
		var options = {
			method: "GET",
			url: "/authors"
		};

		server.inject(options, function(response) {
			var result = response.result;

			expect(response.statusCode).to.equal(200);
			expect(result).to.be.instanceof(Array);
			expect(result).to.have.length(3);
			done();
		});
	});
});
