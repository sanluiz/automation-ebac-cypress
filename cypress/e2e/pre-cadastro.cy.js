/// <reference types="cypress" />
const faker = require('faker');


context('Funcionalidade: Pre Cadastro', () => {

    beforeEach(() => {
        //cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/') //utlizando o cypress.json para colocar a baseUrl.
        cy.visit('minha-conta')

    });

    it('Deve fazer pre cadastro com sucesso', () => {
        let email = faker.internet.email()

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('teste@teste')
        cy.get(':nth-child(4) > .button').click()

        cy.get('a > .hidden-xs', { timeout: 10000 }).should('contain', 'Welcome')

    })

    it('Deve completar pre cadastro com sucesso', () => {
        let firstName = faker.name.firstName()
        let lastName = faker.name.firstName()
        let email = faker.internet.email()

        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('teste@teste')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(firstName)
        cy.get('#account_last_name').type(lastName)
        cy.get('.woocommerce-Button').click()

        cy.get('a > .hidden-xs', { timeout: 10000 }).should('contain', 'Welcome')



    })

})