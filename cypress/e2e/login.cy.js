/// <reference types="cypress" />

// Importa diretamente os dados do arquivo "perfil.json" usando require.
// Assim, as credenciais já estão disponíveis na constante "perfil".
// Usa os campos "perfil.email" e "perfil.senha" para preencher o login.
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade: Login', () => {

    beforeEach(() => {
        //cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/') //utlizando o cypress.json para colocar a baseUrl.
        cy.visit('minha-conta')

    });


    describe('Login com sucesso', () => {
        it('Deve logar com sucesso', () => {
            cy.get('#username').type('alutest@teste.com')
            cy.get('#password').type('teste@teste')
            cy.get('.woocommerce-form > .button').click()

            //cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('a > .hidden-xs', { timeout: 10000 }).should('contain', 'Welcome')

        })
    })

    // A importação dos dados do arquivo "perfil.json" serão usadas aqui. 
    it('Deve logar com sucesso - usando arquivos de dados', () => {
        cy.get('#username').type(perfil.email) // Preenche o campo de usuário com o e-mail do objeto perfil
        cy.get('#password').type(perfil.senha) // Preenche o campo de senha com o valor do objeto perfil
        cy.get('.woocommerce-form > .button').click()

        //cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('a > .hidden-xs', { timeout: 10000 }).should('contain', 'Welcome')

    })

    // Carrega os dados do arquivo "perfil.json" da pasta fixtures e executa o bloco de código com esses dados.
    // O Cypress vai chamar "dado.email" e "dado.senha" conforme definidos no arquivo.
    //
    // O parâmetro {log: false} em cy.get('#password').type(dado.senha, {log: false})
    // serve para não exibir a senha digitada no log do Cypress, garantindo mais segurança dos dados sensíveis.
    it.only('Deve logar com sucesso - usando afixture', () => {
        cy.fixture('perfil').then(dado => {
            cy.get('#username').type(dado.email)
            cy.get('#password').type(dado.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()

            //cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('a > .hidden-xs', { timeout: 10000 }).should('contain', 'Welcome')
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