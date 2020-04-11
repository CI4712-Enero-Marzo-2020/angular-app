exports.config = {
	directConnect: true,
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions' : {
	            args: ['--username=yo', 'password=1234', '--disable-web-security', '--disable-browser-side-navigation']
	        }
	 },
	framework: 'jasmine2',
	specs: ['test.js']
};