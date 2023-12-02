const { faker } = require('@faker-js/faker');
describe("Club", () => {

	beforeEach(() => {
		cy.window().then((win) => {
			win.localStorage.clear();
		})
	})

	it("[SUCCESS C-1] club details", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
			});
		});
	});

	it("[SUCCESS C-2] Not show club if the is no token", () => {
		cy.visit("/club", {
			failOnStatusCode: false,
		}).then(() => {
			cy.url().should("not.include", "/club");
			cy.url().should("include", "/login");
		});
	});

	it("[SUCCESS C-3] Add member", () => {
		cy.login()
		cy.visit("/club", {
			failOnStatusCode: false,
		});
		cy.waitElementNotVisible('#q-loading');
		cy.get('#6566466515980d613a6cdcb3').click();
		cy.waitElementNotVisible('#q-loading');
		cy.waitElementNotVisible('.q-spinner');
		cy.getMemberCount().then((initialCount) => {
			cy.contains('.q-btn', 'New member').click();
			cy.get('input[name="member-name"]').type(faker.person.firstName());
			cy.get('input[name="member-lastname"]').type(faker.person.lastName());
			cy.get('input[name="member-email"]').type(faker.internet.email());
			cy.get('input[name="member-dni"]').type(faker.number.int({min: 10000, max: 99999}).toString());
			cy.get('input[name="member-nickname"]').type(faker.internet.userName());
			cy.contains('.q-btn', 'Add Member').click();
			cy.waitElementNotVisible('#q-loading');
			cy.waitElementNotVisible('.q-spinner');
			cy.getMemberCount().then((finalCount) => {
				expect(parseInt(finalCount)).to.equal(parseInt(initialCount) + 1);
			});
		});
	});

	it("[SUCCESS C-4] Fail if member doesnt have an email", () => {
		cy.login()
		cy.visit("/club", {
			failOnStatusCode: false,
		});
		cy.waitElementNotVisible('#q-loading');
		cy.get('#6566466515980d613a6cdcb3').click();
		cy.waitElementNotVisible('#q-loading');
		cy.waitElementNotVisible('.q-spinner');
		cy.getMemberCount().then((initialCount) => {
			cy.contains('.q-btn', 'New member').click();
			cy.get('input[name="member-name"]').type('Yonathan');
			cy.get('input[name="member-lastname"]').type('Andía');
			cy.get('input[name="member-dni"]').type('12314');
			cy.get('input[name="member-nickname"]').type('Cachorro');
			cy.contains('.q-btn', 'Add Member').click();
			cy.waitElementNotVisible('#q-loading');
			cy.waitElementNotVisible('.q-spinner');
			cy.contains('.text-negative', 'email is required and must be a valid email')
		});
	});


	it("[SUCCESS C-5] No action on delete member", () => {
		cy.login()
		cy.visit("/club", {
			failOnStatusCode: false,
		});
		cy.waitElementNotVisible('#q-loading');
		cy.get('#6566466515980d613a6cdcb3').click();
		cy.waitElementNotVisible('#q-loading');
		cy.waitElementNotVisible('.q-spinner');
		cy.get('.q-table tbody tr').first()
			.find('td[for="actions"]')
			.find('.material-icons')
			.contains('delete_forever')
			.click();
		cy.get('.q-notification').should('be.visible').and('contain.text', 'Unavailable');
	});

});
