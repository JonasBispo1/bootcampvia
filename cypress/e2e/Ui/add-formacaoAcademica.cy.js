/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/formacao-pages')
import dadosUsuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Adicionar formação academica', () => {

    beforeEach(() => {
        cy.visit('login')
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
    });

    it('Deve adicionar uma formação com sucesso usando import', () => {
        for (let i = 0; i < dadosUsuarios[0].formacao_academica.length; i++){
            cy.visit('adicionar-formacao')
            experienciaPage.addExperiencia(
                dadosUsuarios[0].formacao_academica[i].escola,
                dadosUsuarios[0].formacao_academica[i].grau,
                dadosUsuarios[0].formacao_academica[i].curso,
                dadosUsuarios[0].formacao_academica[i].dataInicio,
                dadosUsuarios[0].formacao_academica[i].dataFim,
                dadosUsuarios[0].formacao_academica[i].descricao)
            cy.get('table[class="table"]:nth-child(7) td').first().should('contain', dadosUsuarios[0].formacao_academica[i].escola)
        }
    });

    it('Deve adicionar uma formação atual', () => {
        cy.visit('adicionar-formacao')
        cy.fixture("usuarios").then((user) => {
            experienciaPage.addExperienciaAtual(
                user[0].formacao_academica[0].escola,
                user[0].formacao_academica[0].grau,
                user[0].formacao_academica[0].curso,
                user[0].formacao_academica[0].dataInicio,
                user[0].formacao_academica[0].descricao)
            cy.get('table[class="table"]:nth-child(7) td').first().should('contain', user[0].formacao_academica[0].escola)
            cy.get('table[class="table"]:nth-child(7) td:nth-child(3)').should('contain', user[0].formacao_academica[0].dataInicio + ' - '+ 'Atual')
        })
    });

    it('Deve adicionar formação academica de todos usuários cadastrados na lista(extra-classe)', () => {
        cy.fixture("usuarios").then((user) => {
            for (let u = 0; u < user.length; u++){
                if (u > 0){ cy.troca_user(user[u].email, user[u].senha) }
                for (let i = 0; i < user[u].formacao_academica.length; i++){
                    cy.visit('adicionar-formacao')
                    experienciaPage.addExperiencia(
                        user[u].formacao_academica[i].escola,
                        user[u].formacao_academica[i].grau,
                        user[u].formacao_academica[i].curso,
                        user[u].formacao_academica[i].dataInicio,
                        user[u].formacao_academica[i].dataFim,
                        user[u].formacao_academica[i].descricao)
                    cy.get('table[class="table"]:nth-child(7) td').first().should('contain', user[u].formacao_academica[i].escola)
                }

            }
        })
    });

    it('Deve realizar adicionar cadastro sem informar curso', () => {
        cy.visit('adicionar-formacao')
        experienciaPage.addExperienciaSemCurso(
            dadosUsuarios[0].formacao_academica[0].escola,
            dadosUsuarios[0].formacao_academica[0].grau,
            dadosUsuarios[0].formacao_academica[0].dataInicio,
            dadosUsuarios[0].formacao_academica[0].dataFim,
            dadosUsuarios[0].formacao_academica[0].descricao)
            cy.get('p[class="MuiFormHelperText-root Mui-error Mui-required"]').should('contain', 'Curso é obrigatório')
    });
});