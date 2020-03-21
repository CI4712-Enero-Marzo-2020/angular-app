describe("Hacer login", function(){
	browser.ignoreSyncronization=true;

	it("Hacer login", function(){
		browser.get("http://localhost:4200/login");
		var username = browser.findElement(protractor.by.css('[name="username"]'));
		var password = browser.findElement(protractor.by.css('[name="password"]'));
		var submit = browser.findElement(protractor.by.css('[type="submit"]'));
		username.sendKeys('yo');
		password.sendKeys('1');

		submit.click();
		
	});

	it("hacer pruebas", function(){
		browser.get("http://localhost:4200/projects");
		
	});
});