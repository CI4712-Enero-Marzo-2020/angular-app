describe("Pruebas", function(){
	browser.ignoreSyncronization=true;

	it("Hacer login", function(){
		browser.get("http://localhost:4200/login");
		var username = browser.findElement(protractor.by.css('[name="username"]'));
		var password = browser.findElement(protractor.by.css('[name="password"]'));
		var submit = browser.findElement(protractor.by.css('[type="submit"]'));
		username.sendKeys('tu');
		password.sendKeys('1234');

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
		agregar.click();
		browser.sleep(400);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 4');
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
		agregar.click();
		browser.sleep(400);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 12321342135346356235321421345215');
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
		var prioridadHist = browser.findElement(protractor.by.css('[id="prioridad"]'));
		browser.sleep(400);
		prioridadHist.click();
		browser.sleep(400);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Historia Prueba 2');
		browser.sleep(400);
		prioridadHist.click();
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Historia Prueba 3');
		browser.sleep(400);
		prioridadHist.click();
		browser.sleep(400);
		submit.click();
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Historia Prueba 1233421342134524512342134234');
		browser.sleep(400);
		prioridadHist.click();
		browser.sleep(400);
		submit.click()
		browser.sleep(400);
		agregar2.click();
		browser.sleep(400);
		nombreHist.sendKeys('Epica Prueba');
		browser.sleep(400);
		prioridadHist.click();
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
        var input = $$('[class="form-check-input"]');
        input.click();
        browser.sleep(500);
        var submit1 = browser.findElement(protractor.by.css('[id="asignar"]'));
        browser.sleep(400);
        submit1.click();
        browser.sleep(400);




		//browser.sleep(100000);
		


	});

// it("generar sprint", function(){
// 		browser.get("http://localhost:4200/productbacklog/1");
// 		browser.sleep(400)
// 		var generarsprint = browser.findElement(protractor.by.css('[id="generarsprint"]'));
// 		browser.sleep(400);
// 		generarsprint.click();
// 		browser.sleep(400);
// 		var descripcion = browser.findElement(protractor.by.css('[id="description"]'));
// 		browser.sleep(400);
// 		descripcion.sendKeys("Super Sprint");
// 		browser.sleep(400);
// 		var date = browser.findElement(protractor.by.css('[id="date"]'));
// 		browser.sleep(400);
// 		date.sendKeys("01-01-2021");
// 		browser.sleep(400);
// 		var crearSprint = browser.findElement(protractor.by.css('[id="crearsprint"]'));
// 		browser.sleep(400);
// 		crearSprint.click();
// 		browser.sleep(400);

// 		// var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
// 		// planificacion.click();
// 		// browser.sleep(400);
// 		// agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
// 		// agregarPlan.click();
// 		// var tema = browser.findElement(protractor.by.css('[id="tema"]'));
// 		// browser.sleep(400);
// 		// tema.sendKeys("Tema 1");
// 		// browser.sleep(400);
// 		// var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
// 		// browser.sleep(400);
// 		// crearPlan.click();
// 		// browser.sleep(400);


// 		//browser.sleep(100000);
		


// 	});




	it("ver sprint", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(400)
		var verSprint = browser.findElement(protractor.by.css('[id="versprint"]'));
		browser.sleep(400);
		verSprint.click();
		browser.sleep(400);
		var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
		browser.sleep(400);
		planificacion.click();
		browser.sleep(400);
		agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(400);
		agregarPlan.click();
		browser.sleep(2000);
		var tema = browser.findElement(protractor.by.css('[id="tema"]'));
		browser.sleep(400);
		tema.sendKeys("Tema 1");
		browser.sleep(400);
		var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
		browser.sleep(400);
		crearPlan.click();
		browser.sleep(400);
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(400)
		var verSprint = browser.findElement(protractor.by.css('[id="versprint"]'));
		browser.sleep(400);
		verSprint.click();
		browser.sleep(400);
		var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
		browser.sleep(400);
		planificacion.click();
		browser.sleep(400);
		agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(400);
		agregarPlan.click();
		browser.sleep(400);
		var tema = browser.findElement(protractor.by.css('[id="tema"]'));
		browser.sleep(400);
		tema.sendKeys("Tema 2");
		browser.sleep(400);
		var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
		browser.sleep(400);
		crearPlan.click();
		browser.sleep(400);
		


	});

	it("pruebas unitarias", function(){
		browser.get("http://localhost:4200/sprintunittest/1");
		browser.sleep(400);
		var agregarPrueba = browser.findElement(protractor.by.css('[id="but2"]'));
		agregarPrueba.click();
		browser.sleep(400);
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(400);
		modulo.sendKeys("modulo prueba")
		browser.sleep(400);
		var componente =  browser.findElement(protractor.by.css('[id="modelo"]'));
		componente.click();
		browser.sleep(400);
		var agregar =  browser.findElement(protractor.by.css('[id="agregar"]'));
		agregar.click(400);
		browser.sleep(400);
		agregarPrueba.click();
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(400);
		modulo.sendKeys("modulo prueba 2")
		browser.sleep(400);
		componente.click();
		var descripcion =  browser.findElement(protractor.by.css('[id="descripcion"]'));
		descripcion.sendKeys("Un muy bonito modelo alksjdfkjashdfkjadshfkjasdfhkjsadfhkjadsfhkasjdfhasdkjf")
		browser.sleep(400);
		var agregar2 =  browser.findElement(protractor.by.css('[id="agregar"]'));
		browser.sleep(400);
		agregar2.click;
		browser.sleep(400);
		browser.get("http://localhost:4200/sprintuitest/1");
		browser.sleep(400);
		var agregarPruebaInterfaz = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(400);
		agregarPruebaInterfaz.click();
		browser.sleep(400);
		funcionalidad = browser.findElement(protractor.by.css('[id="funcionalidad"]'));
		browser.sleep(400);
		funcionalidad.sendKeys("DIOS PLAN");
		browser.sleep(400);
		crear = browser.findElement(protractor.by.css('[id="crear"]'));
		browser.sleep(400);
		crear.click();
		browser.sleep(400);
		browser.get("http://localhost:4200/sprintunittest/1");
		browser.sleep(400);
		var agregarPrueba = browser.findElement(protractor.by.css('[id="but2"]'));
		agregarPrueba.click();
		browser.sleep(400);
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(400);
		modulo.sendKeys("modulo prueba 3")
		browser.sleep(400);
		var componente =  browser.findElement(protractor.by.css('[id="modelo"]'));
		componente.click();
		browser.sleep(400);
		var agregar =  browser.findElement(protractor.by.css('[id="agregar"]'));
		agregar.click(400);
		browser.sleep(400);
		agregarPrueba.click();
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(400);
		modulo.sendKeys("modulo prueba 4")
		browser.sleep(400);
		componente.click();
		var descripcion =  browser.findElement(protractor.by.css('[id="descripcion"]'));
		descripcion.sendKeys("Un muy feo modelo alksjdfkjashdfkjadshfkjasdfhkjsadfhkjadsfhkasjdfhasdkjf")
		browser.sleep(400);
		var agregar2 =  browser.findElement(protractor.by.css('[id="agregar"]'));
		browser.sleep(400);
		agregar2.click;
		browser.sleep(400);
		browser.get("http://localhost:4200/sprintuitest/1");
		browser.sleep(400);
		var agregarPruebaInterfaz = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(400);
		agregarPruebaInterfaz.click();
		browser.sleep(400);
		funcionalidad = browser.findElement(protractor.by.css('[id="funcionalidad"]'));
		browser.sleep(400);
		funcionalidad.sendKeys("VIVIMOS EN UNA SOCIEDAD");
		browser.sleep(400);
		crear = browser.findElement(protractor.by.css('[id="crear"]'));
		browser.sleep(400);
		crear.click();
		browser.sleep(400);




		//browser.sleep(100000);
		


	});
});