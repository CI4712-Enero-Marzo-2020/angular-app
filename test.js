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
		browser.sleep(800);
		
	});

	it("hacer pruebas", function(){
		browser.get("http://localhost:4200/projects");
		var agregar = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar.click();
		browser.sleep(800);
		var nombreProy = browser.findElement(protractor.by.css('[id="recipient-name"]'));
		nombreProy.sendKeys('Proyecto Prueba');
		browser.sleep(800);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(800);
		agregar.click();
		browser.sleep(800);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 2');
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		agregar.click();
		browser.sleep(800);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 3');
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		agregar.click();
		browser.sleep(800);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 4');
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		agregar.click();
		browser.sleep(800);
		nombreProy.clear();
		nombreProy.sendKeys('Proyecto Prueba 12321342135346356235321421345215');
		browser.sleep(800);
		submit.click();
	});

	it("cambiar", function(){
		browser.sleep(800);
		var parar = browser.findElement(protractor.by.css('[id="cambiar"]'));
		browser.sleep(800);
		parar.click();
		browser.sleep(800);
		var si = browser.findElement(protractor.by.css('[id="si"]'));
		browser.sleep(800);
		si.click()
		browser.sleep(800);
	});

	it("agregar Historias", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(800);
		var agregar2 = browser.findElement(protractor.by.css('[id="but2"]'));
		agregar2.click();
		browser.sleep(800);
		var nombreHist = browser.findElement(protractor.by.css('[id="addEditDescription"]'));
		browser.sleep(800);
		nombreHist.sendKeys('Historia Prueba 1');
		browser.sleep(800);
		var prioridadHist = browser.findElement(protractor.by.css('[id="prioridad"]'));
		browser.sleep(800);
		prioridadHist.click();
		browser.sleep(800);
		var submit = browser.findElement(protractor.by.css('[class="btn btn-primary"]'));
		submit.click();
		browser.sleep(800);
		agregar2.click();
		browser.sleep(800);
		nombreHist.sendKeys('Historia Prueba 2');
		browser.sleep(800);
		prioridadHist.click();
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		agregar2.click();
		browser.sleep(800);
		nombreHist.sendKeys('Historia Prueba 3');
		browser.sleep(800);
		prioridadHist.click();
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		agregar2.click();
		browser.sleep(800);
		nombreHist.sendKeys('Historia Prueba 1233421342134524512342134234');
		browser.sleep(800);
		prioridadHist.click();
		browser.sleep(800);
		submit.click()
		browser.sleep(800);
		agregar2.click();
		browser.sleep(800);
		nombreHist.sendKeys('Epica Prueba');
		browser.sleep(800);
		prioridadHist.click();
		browser.sleep(800);
		var epica = browser.findElement(protractor.by.css('[class="check"]'));
		browser.sleep(800);
		epica.click();
		browser.sleep(800);
		submit.click();
		browser.sleep(800);
		var agregar2 = browser.findElement(protractor.by.css('[id="agregar2"]'));
        browser.sleep(800);
        agregar2.click();
        browser.sleep(800);
        var input = $$('[class="form-check-input"]');
        input.click();
        browser.sleep(500);
        var submit1 = browser.findElement(protractor.by.css('[id="asignar"]'));
        browser.sleep(800);
        submit1.click();
        browser.sleep(800);




		//browser.sleep(100000);
		


	});


// it("generar sprint", function(){
// 		browser.get("http://localhost:4200/productbacklog/1");
// 		browser.sleep(800)
// 		var generarsprint = browser.findElement(protractor.by.css('[id="generarsprint"]'));
// 		browser.sleep(800);
// 		generarsprint.click();
// 		browser.sleep(800);
// 		var descripcion = browser.findElement(protractor.by.css('[id="description"]'));
// 		browser.sleep(800);
// 		descripcion.sendKeys("Super Sprint");
// 		browser.sleep(800);
// 		var date = browser.findElement(protractor.by.css('[id="date"]'));
// 		browser.sleep(800);
// 		date.sendKeys("01-01-2021");
// 		browser.sleep(800);
// 		var crearSprint = browser.findElement(protractor.by.css('[id="crearsprint"]'));
// 		browser.sleep(800);
// 		crearSprint.click();
// 		browser.sleep(800);

// 		// var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
// 		// planificacion.click();
// 		// browser.sleep(800);
// 		// agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
// 		// agregarPlan.click();
// 		// var tema = browser.findElement(protractor.by.css('[id="tema"]'));
// 		// browser.sleep(800);
// 		// tema.sendKeys("Tema 1");
// 		// browser.sleep(800);
// 		// var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
// 		// browser.sleep(800);
// 		// crearPlan.click();
// 		// browser.sleep(800);


// 		//browser.sleep(100000);
		


// 	});




	it("ver sprint", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(800)
		var verSprint = browser.findElement(protractor.by.css('[id="versprint"]'));
		browser.sleep(800);
		verSprint.click();
		browser.sleep(800);
		var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
		browser.sleep(800);
		planificacion.click();
		browser.sleep(800);
		agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(800);
		agregarPlan.click();
		browser.sleep(2000);
		var tema = browser.findElement(protractor.by.css('[id="tema"]'));
		browser.sleep(800);
		tema.sendKeys("Tema 1");
		browser.sleep(800);
		var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
		browser.sleep(800);
		crearPlan.click();
		browser.sleep(800);
		browser.get("http://localhost:4200/productbacklog/1");
		browser.sleep(800)
		var verSprint = browser.findElement(protractor.by.css('[id="versprint"]'));
		browser.sleep(800);
		verSprint.click();
		browser.sleep(800);
		var planificacion =  browser.findElement(protractor.by.css('[id="planificacion"]'));
		browser.sleep(800);
		planificacion.click();
		browser.sleep(800);
		agregarPlan = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(800);
		agregarPlan.click();
		browser.sleep(800);
		var tema = browser.findElement(protractor.by.css('[id="tema"]'));
		browser.sleep(800);
		tema.sendKeys("Tema 2");
		browser.sleep(800);
		var crearPlan = browser.findElement(protractor.by.css('[id="crearPlan"]'));
		browser.sleep(800);
		crearPlan.click();
		browser.sleep(800);
		


	});

	it("pruebas unitarias", function(){
		browser.get("http://localhost:4200/sprintunittest/1");
		browser.sleep(800);
		var agregarPrueba = browser.findElement(protractor.by.css('[id="but2"]'));
		agregarPrueba.click();
		browser.sleep(800);
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(800);
		modulo.sendKeys("modulo prueba")
		browser.sleep(800);
		var componente =  browser.findElement(protractor.by.css('[id="modelo"]'));
		componente.click();
		browser.sleep(800);
		var agregar =  browser.findElement(protractor.by.css('[id="agregar"]'));
		agregar.click(800);
		browser.sleep(800);
		agregarPrueba.click();
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(800);
		modulo.sendKeys("modulo prueba 2")
		browser.sleep(800);
		componente.click();
		var descripcion =  browser.findElement(protractor.by.css('[id="descripcion"]'));
		descripcion.sendKeys("Un muy bonito modelo alksjdfkjashdfkjadshfkjasdfhkjsadfhkjadsfhkasjdfhasdkjf")
		browser.sleep(800);
		var agregar2 =  browser.findElement(protractor.by.css('[id="agregar"]'));
		browser.sleep(800);
		agregar2.click;
		browser.sleep(800);
		browser.get("http://localhost:4200/sprintuitest/1");
		browser.sleep(800);
		var agregarPruebaInterfaz = browser.findElement(protractor.by.css('[id="but2"]'));
		browser.sleep(800);
		agregarPruebaInterfaz.click();
		browser.sleep(800);
		funcionalidad = browser.findElement(protractor.by.css('[id="funcionalidad"]'));
		browser.sleep(800);
		funcionalidad.sendKeys("DIOS PLAN");
		browser.sleep(800);
		crear = browser.findElement(protractor.by.css('[id="crear"]'));
		browser.sleep(800);
		crear.click();
		browser.sleep(800);
		browser.get("http://localhost:4200/sprintunittest/1");
		browser.sleep(800);
		var agregarPrueba = browser.findElement(protractor.by.css('[id="but2"]'));
		agregarPrueba.click();
		browser.sleep(800);
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(800);
		modulo.sendKeys("modulo prueba 3")
		browser.sleep(800);
		var componente =  browser.findElement(protractor.by.css('[id="modelo"]'));
		componente.click();
		browser.sleep(800);
		var agregar =  browser.findElement(protractor.by.css('[id="agregar"]'));
		agregar.click(800);
		browser.sleep(800);
		agregarPrueba.click();
		var modulo =  browser.findElement(protractor.by.css('[id="modulo"]'));
		browser.sleep(800);
		modulo.sendKeys("modulo prueba 4")
		browser.sleep(800);
		componente.click();
		var descripcion =  browser.findElement(protractor.by.css('[id="descripcion"]'));
		descripcion.sendKeys("Un muy feo modelo alksjdfkjashdfkjadshfkjasdfhkjsadfhkjadsfhkasjdfhasdkjf")
		browser.sleep(800);
		var agregar2 =  browser.findElement(protractor.by.css('[id="agregar"]'));
		browser.sleep(800);
		agregar2.click;
		browser.sleep(800);
		// browser.get("http://localhost:4200/sprintuitest/1");
		// browser.sleep(800);
		// var agregarPruebaInterfaz = browser.findElement(protractor.by.css('[id="but2"]'));
		// browser.sleep(800);
		// agregarPruebaInterfaz.click();
		// // browser.sleep(1000);
		// funcionalidad = browser.findElement(protractor.by.css('[id="funcionalidad"]'));
		// browser.sleep(800);
		// funcionalidad.sendKeys("VIVIMOS EN UNA SOCIEDAD");
		// browser.sleep(800);
		// crear = browser.findElement(protractor.by.css('[id="crear"]'));
		// browser.sleep(800);
		// crear.click();
		// browser.sleep(800);




		//browser.sleep(100000);
		


	});
});