// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

import auth from '../fixtures/auth.json'
import dadosUser from '../fixtures/usuarios.json'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add('troca_user',(email, password) =>{
    cy.get('a[data-test="navbar-logout"] span').click() 
    cy.visit('login')
    cy.get('input[type="email"]').clear().type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('input[type="submit"]').click() 
})

Cypress.Commands.add("login", (email, password) => {
    cy.get('input[type="email"]').clear().type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('input[type="submit"]').click() 
})

Cypress.Commands.add("loginApp", () => {
    cy.request({
        method:'POST',
        url: 'api/auth',
        body: {
            email:dadosUser[0].email,
            password: dadosUser[0].senha
        }
    }).then((response) => {
        cy.setCookie('region','BR-SP')
        window.localStorage.setItem('token',response.body.jwt)
    })
})

Cypress.Commands.add("listArray", (cargo, elemento) => {
    cy.get(elemento).then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('li').each(($listItem) =>{
            const carguinho = $listItem.text().trim()
            if (carguinho == cargo){
                cy.wrap($listItem).click()
            }
        })
    })
})

Cypress.Commands.add("cadastrarUsuario", (nome,email,password) => {
    cy.get('input[name="name"]').type(nome)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="password2"]').type(password)
    cy.get('input[data-test="register-submit"]').click()
})

Cypress.Commands.add("valida_cadastro_sucesso", (nome,email,password) => {
    cy.get('h1[class="large text-primary"]').should('contain','Dashboard')
    cy.get('a[data-test="dashboard-createProfile"]').should('exist')
})

Cypress.Commands.add("perfil_empresarial", () => {
    cy.get('input[name="company"]').type('Viahuber')
    cy.get('input[name="website"]').type('https://www.coisanenhuma.com/')
    cy.get('input[name="location"]').type('São Paulo - Osasco')
    cy.get('input[name="githubusername"]').type('JonasBispo1')
    cy.get('textarea[name="bio"]').type('este campo não será possível preencher, chame para um churrasco')
    cy.get('button[data-test="profile-socials"]').click()
    cy.get('input[name="twitter"]').should('exist')
    cy.get('input[name="twitter"]').type('https://www.twitter.com/')
    cy.get('input[name="facebook"]').type('https://www.facebook.com/')
    cy.get('input[name="youtube"]').type('https://www.youtube.com/')
    cy.get('input[name="linkedin"]').type('https://www.linkedin.com/')
    cy.get('input[name="instagram"]').type('https://www.instagram.com/')
    cy.get('input[name="medium"]').type('https://www.medium.com/')
})


Cypress.Commands.add("tokenJwt", () => {
    cy.request({
        method: 'POST',
        url:'/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add("criarPostagem", (token,value) => {
    cy.request({
        method: 'POST',
        url:'/api/posts',
        headers: { Cookies: token },
        body: { text: value }
    })
})

Cypress.Commands.add("criarProfile", (token) => {
    cy.request({
        method:'POST',
        url:'/api/profile/',
        headers: { Cookies: token },
        body: dadosUser[0].profile
    })
})

Cypress.Commands.add("trazerPostagem", (token,id) => {
    cy.request({
        method: 'GET',
        url:`/api/posts/${id}`,
        headers: { Cookies: token },
    })
})

Cypress.Commands.add("dadosUsuario", (token) => {
    cy.request({
        method:'GET',
        url:'/api/profile/me/',
        headers: {
            Cookies: token
        }
    })
})

Cypress.Commands.add("methodAPI", (token,method_,url_,body_) => {
    cy.request({
        method:method_,
        url:url_,
        body:body_,
        headers: {
            Cookies: token
        }
    })
})


