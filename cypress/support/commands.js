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

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => {
    cy.get('input[type="email"]').clear().type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('input[type="submit"]').click() 
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
