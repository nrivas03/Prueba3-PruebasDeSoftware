// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require('dotenv').config();

/**
 * Send login request with email and password
 */
Cypress.Commands.add("login", () => {
	return cy
		.request({
			method: "POST",
			url: `${Cypress.env('API_URL')}/auth/login`,
			body: {
				email: Cypress.env('USER_TEST_EMAIL'),
				password: Cypress.env('USER_TEST_PASSWORD'),
			},
		})
		.then(({ body }) => {
			const { token, user } = body;
			cy.window().then((win) => {
				win.localStorage.setItem("user", JSON.stringify({ token, user }));
				return token;
			});
		});
});

/**
 * Send request to clubs endpoint with the input token and return the user clubs
 */
Cypress.Commands.add("getClubs", (token) => {
	cy.request({
		url: `${Cypress.env('API_URL')}/clubs`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then(({ body }) => {
		return body.clubs;
	});
});

Cypress.Commands.add("waitElementNotVisible", (elementId) => {
	cy.get(elementId).should('not.exist').then(() => {
		cy.log('Elemento no es visible');
	});
});

Cypress.Commands.add("getMemberCount", () => {
	return cy.get('.text-h6').contains('Members').then(($members) => {
		const memberText = $members.text();
		return memberText.match(/\d+/)[0];
	});
});

