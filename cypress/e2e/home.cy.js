describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	it("[SUCCESS H-2] Welcome the user when token is provided", () => {
		cy.login().then((token) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});
		});
		cy.get("h2").contains("Welcome NICOLÁS,");
	});

	it("[SUCCESS H-3] Get club list when the token is provided", () => {
		cy.login().then((token) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});
		});

		const clubesLabel = cy.contains(".q-item__label", "Clubes");

		const hrLine = cy.get(".q-separator--horizontal");

		const clubesBetween = clubesLabel.nextUntil(hrLine, ".q-item-type.row.no-wrap");

		const clubesActivos = clubesBetween.not(".disabled");

		clubesActivos.should("have.length.greaterThan", 0);
	});

	it("[SUCCESS H-4] Create club when token, name, and description are provided", () => {
		const nombreClub = "Prueba2";
		const descripcionClub = "Prueba2";
	  
		cy.login().then((token) => {
		  cy.visit("/", {
			failOnStatusCode: false,
		  });
	  
		  cy.contains(".q-item__label", "Clubes").then((clubesLabel) => {
			const hrLine = clubesLabel.parent().find(".q-separator--horizontal");
	  
			let clubesActivosAntes;
	  
			cy.get(".q-item-type.row.no-wrap")
			  .not(".disabled")
			  .should("have.length.greaterThan", 2)
			  .then((clubes) => {
				console.log(clubes);
				clubesActivosAntes = clubes.length;
	  
				cy.contains(".q-item__section--main", "Add Club").click();
	  
				cy.get("input[aria-label='Club name']").type(nombreClub);
				cy.get("input[aria-label='Club description']").type(descripcionClub);
	  
				cy.get("span[class=block]").contains("Add Club").click();
	  
				// Esperar hasta que la URL cambie después de agregar el club (ajusta según tu aplicación)
				cy.url().should("eq", "http://pruebas-soft.s3-website.us-east-2.amazonaws.com/");
	  
				// Esperar hasta que la lista de clubes se actualice
				cy.wait(2000); // Ajusta el tiempo de espera según sea necesario
	  
				cy.get(".q-item-type.row.no-wrap")
				  .not(".disabled")
				  .then((clubesDespues) => {
					cy.get("div[class='q-item__section column q-item__section--main justify-center']").contains(nombreClub).should("exist");
					expect(clubesDespues.length).to.eq(clubesActivosAntes + 1);
				  });
			  });
		  });
		});
	  });

	it("[Error H-5] Throw an error when the name of club is not provided", () => {
		const descripcionClub = "Descripción Glorioso Manchester United";

		cy.login().then((token) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});
			cy.wait(10);

			cy.contains(".q-item__label", "Clubes").then((clubesLabel) => {


				cy.contains(".q-item__section--main", "Add Club").click();

				cy.get("input[aria-label='Club description']").type(descripcionClub);

				cy.get("span[class=block]").contains("Add Club").click();

				cy.wait(10);

				cy.get(".text-negative").contains("name is required").should("exist");

			});
		});

	});

});
