/// <reference types="cypress" />

import auth from '../../fixtures/auth.json'

it('[POST] - Teste de autenticação', () => {
    cy.request({
        method: 'POST',
        url:'/api/auth',
        body: auth
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.empty
        expect(response.body).to.have.property("jwt")
        cy.getCookies('conexaoqa.herokuapp.com').should('exist')
    })
});

it('[POST] - Teste de autenticação com usuário inválido', () => {
    cy.request({
        method: 'POST',
        url:"/api/auth",
        failOnStatusCode: false,
        body:{
            "email":"ddd@123.com.br",
            "password":"ddd"
        }
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
});