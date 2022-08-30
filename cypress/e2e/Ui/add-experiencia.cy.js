/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/experiencia-pages')

describe('Funcionalidade: Adicionar experiencia', () => {

    beforeEach(() => {
        cy.visit('login')
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit('adicionar-experiencia')
    });

    it('Deve adicionar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('QA', 'via','osasco','01/01/2020','01/01/2021','descrição atual')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it.only('Deve adicionar experiência atual com sucesso', () => {
        experienciaPage.addExperienciaAtual('QA', 'via','osasco','01/01/2020','descrição atual')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve adicionar uma experiência com sucesso e remove-la', () => {
        experienciaPage.addExperiencia('QA', 'via','osasco','01/01/2020','01/01/2021','descrição atual')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.get('div[class="alert alert-success"]').should('contain','Experiência Removida')
    });
});