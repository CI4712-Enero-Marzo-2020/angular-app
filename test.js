describe("Agregar Historia", function(){
	browser.ignoreSyncronization=true;

	it("Agregar Historia", function(){
		browser.get("http://localhost:4200/productbacklog/1");
		console.log("entrada a Backlog exitosa")
		browser.sleep(5000)
	});
});