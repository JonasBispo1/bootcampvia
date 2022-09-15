/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/experiencia-pages')
import dadosUsuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Adicionar experiencia', () => {

    /*beforeEach(() => {
        cy.visit('login')
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit('adicionar-experiencia')
    });*/

    beforeEach(() => {
        cy.loginApp()
        cy.visit('adicionar-experiencia')
    });

    it.only('Teste de outra coisa', () => {
        cy.log(2*2)
    });

    it('Deve adicionar uma experiência com sucesso', () => {
        cy.fixture("usuarios").then((user) => {
            experienciaPage.addExperiencia(
                user[0].experiencia_profissional[0].posicao,
                user[0].experiencia_profissional[0].empresa,
                user[0].experiencia_profissional[0].localizacao,
                user[0].experiencia_profissional[0].dataInicio,
                user[0].experiencia_profissional[0].dataFim,
                user[0].experiencia_profissional[0].descricao)
          })
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve adicionar experiência atual com sucesso', () => {
        experienciaPage.addExperienciaAtual(
            dadosUsuarios[1].experiencia_profissional[0].posicao,
            dadosUsuarios[1].experiencia_profissional[0].empresa,
            dadosUsuarios[1].experiencia_profissional[0].localizacao,
            dadosUsuarios[1].experiencia_profissional[0].dataInicio,
            dadosUsuarios[1].experiencia_profissional[0].descricao)
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve adicionar uma experiência com sucesso e remove-la', () => {
        experienciaPage.addExperiencia('QA', 'via','osasco','01/01/2020','01/01/2021','descrição atual')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.get('div[class="alert alert-success"]').should('contain','Experiência Removida')
    });
});