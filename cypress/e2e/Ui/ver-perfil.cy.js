/// <reference types="cypress" />

describe('Funcionalidade: Visualização dos perfis', () => {

    beforeEach(() => {
        cy.visit('perfis')
        cy.intercept({
            method: 'GET',
            url: 'api/profile'
        },{
            statusCode: 200,
            fixture: "profile"
        })
        cy.reload()
    });
    it('validar o primeiro item da lista', () => {
        cy.get('[data-test="profile-name"]').first().should('contain', 'Pedro dos Santos')
        
    });
    it.only('Validar lista vazia', () => {
        cy.intercept('api/profile',{statusCode: 404})
        cy.reload()
        cy.get('[data-test="profiles-noProfiles"]').last().should('contain', 'Nenhum perfil encontrado')
    });

    it('validar o último item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('contain', 'Roberto Carlos')
    });

    it('validar o terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Pa Sun')
    });
});