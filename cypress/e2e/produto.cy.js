/// <reference types="cypress" />

context('Funcionalidade: Prodto', () => {

    beforeEach(() => {
        //cy.visit('http://lojaebac.ebaconline.art.br/produtos/') //utlizando o cypress.json para colocar a baseUrl.
        cy.visit('produtos')
    });

    it('Deve selecionar produto', () => {
        var qtd = 5

        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-L').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.input-text').clear().type(5)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie”')
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', qtd)

    })

})