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
		browser.sleep(500);
		
	});

	it("hacer pruebas", function(){
		browser.get("http://localhost:4200/projects");
		var agregar = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar.click();
		browser.sleep(500);
		var nombreProy = browser.findElement(protractor.by.css('[id="recipient-name"]'));
		nombreProy.sendKeys('Proyecto Prueba');
		browser.sleep(500);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(500);
		agregar.click();
		browser.sleep(500);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 2');
		browser.sleep(500);
		submit.click();
		browser.sleep(500);
		agregar.click();
		browser.sleep(500);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 3');
		browser.sleep(500);
		submit.click();
		browser.sleep(500);
	});

	it("agregar Historias", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(500);
		var agregar2 = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar2.click();
		browser.sleep(500);
		var nombreHist = browser.findElement(protractor.by.css('[id="addEditDescription"]'));
		browser.sleep(500);
		nombreHist.sendKeys('Historia Prueba 1');
		browser.sleep(500);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(500);
		agregar2.click();
		browser.sleep(500);
		nombreHist.sendKeys('Historia Prueba 2');
		browser.sleep(500);
		submit.click()
		browser.sleep(500);
		agregar2.click();
		browser.sleep(500);
		nombreHist.sendKeys('Epica Prueba 1');
		browser.sleep(500);
		var epica = browser.findElement(protractor.by.css('[class="check"]'));
		browser.sleep(10000);
		epica.click();
		browser.sleep(10000);
		submit.click();

	});
});