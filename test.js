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
		browser.sleep(2500);
		
	});

	it("hacer pruebas", function(){
		browser.get("http://localhost:4200/projects");
		var agregar = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar.click();
		browser.sleep(2500);
		var nombreProy = browser.findElement(protractor.by.css('[id="recipient-name"]'));
		nombreProy.sendKeys('Proyecto Prueba');
		browser.sleep(2500);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(2500);
		agregar.click();
		browser.sleep(2500);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 2');
		browser.sleep(2500);
		submit.click();
		browser.sleep(2500);
		agregar.click();
		browser.sleep(2500);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 3');
		browser.sleep(2500);
		submit.click();

		//agregar proyecto

		
	});
});