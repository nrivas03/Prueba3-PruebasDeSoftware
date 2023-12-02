describe("Login", () => {
	it("[SUCCESS L-1] valid login credentials", () => {
		const email = "n.rivas03@ufromail.cl";
		const password = "RTIDlzk1";
		cy.visit("/login", {
			failOnStatusCode: false,
		});
	
		cy.get('input[id="login-email"]').type(email);
		cy.get('input[id="login-password"]').type(password);
		cy.get("button").click();
	
		cy.url().should("eq", "http://pruebas-soft.s3-website.us-east-2.amazonaws.com/");	
	});
	it("[Error L-2] invalid credentials", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("correo@incorrecto.cl");
		cy.get('input[id="login-password"').type("correo");
		cy.get("button").click();
		cy.waitElementNotVisible('#q-loading');
		cy.get(".text-negative").should("text", "invalid credentials");
	});
});
