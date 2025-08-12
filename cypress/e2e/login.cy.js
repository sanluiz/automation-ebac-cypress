/// <reference types="cypress" />

context('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')

    });


    describe('Login com sucesso', () => {
        it.only('Deve logar com sucesso', () => {
            cy.get('#username').type('alutest@teste.com')
            cy.get('#password').type('teste@teste')
            cy.get('.woocommerce-form > .button').click()

            //cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('a > .hidden-xs',{timeout: 10000}).should('contain', 'Welcome')

        })
    })


    describe('Login com falha', () => {
        it('Não deve logar com email invalido', () => {
            cy.get('#username').type('email_invalido@teste.com')
            cy.get('#password').type('teste@teste.com')
            cy.get('.woocommerce-form > .button').click()

            cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido.')
        })

        it('Deve exibir mensagem de erro ao inserir senha invalidos', () => {
            cy.get('#username').type('aluno_ebac@teste.com')
            cy.get('#password').type('senha_invalida.com')
            cy.get('.woocommerce-form > .button').click()

            cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta.')
        })

    })

})