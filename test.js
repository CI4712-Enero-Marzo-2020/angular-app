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
		browser.sleep(400);
		
	});

	it("hacer pruebas", function(){
		browser.get("http://localhost:4200/projects");
		var agregar = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar.click();
		browser.sleep(400);
		var nombreProy = browser.findElement(protractor.by.css('[id="recipient-name"]'));
		nombreProy.sendKeys('Proyecto Prueba');
		browser.sleep(400);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(400);
		agregar.click();
		browser.sleep(400);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 2');
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
		agregar.click();
		browser.sleep(400);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 3');
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
	});

	it("agregar Historias", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(400);
		var agregar2 = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar2.click();
		browser.sleep(400);
		var nombreHist = browser.findElement(protractor.by.css('[id="addEditDescription"]'));
		browser.sleep(400);
		nombreHist.sendKeys('Historia Prueba 1');
		browser.sleep(400);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Historia Prueba 2');
		browser.sleep(400);
		submit.click()
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Epica Prueba 1');
		browser.sleep(400);
		var epica = browser.findElement(protractor.by.css('[class="check"]'));
		browser.sleep(400);
		epica.click();
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
		var agregar2 = browser.findElement(protractor.by.css('[id="agregar2"]'));
        browser.sleep(400);
        agregar2.click();
        browser.sleep(400);
        var input = browser.findElement(protractor.by.css('[class="form-check-input"]'))
        input.click();
        browser.sleep(500);
        var submit1 = browser.findElement(protractor.by.css('[id="asignar"]'));
        browser.sleep(400);
        submit1.click();
        browser.sleep(10000);




		//browser.sleep(100000);
		


	});
});