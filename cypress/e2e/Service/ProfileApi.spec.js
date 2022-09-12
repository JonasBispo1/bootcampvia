/// <reference types="cypress" />

import dadosUser from "../../fixtures/usuarios.json"

let token
let id

beforeEach(() => {
    cy.tokenJwt().then((auth) => {
        token = auth
    })
});

describe('[POST] - Teste de criação de Profile', () => {
    it('criar um profile', () => {
        cy.methodAPI(token,'POST','/api/profile/',dadosUser[0].profile)
            .then((response) => {
            expect(response.status).to.eq(200)
        }) 
    });
});

describe('[GET] - Teste de consulta profile', () => {
    it('Consultar um profile', () => {
        cy.request({
            method:'GET',
            url:'/api/profile',
            headers: {
                Cookies: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200) 
        })
    });

    it('[GET] - Consultar um profile por ID', () => {
        cy.criarProfile(token).then((response) => {
            id = response.body._id

            cy.request({
                method:'GET',
                url:'/api/profile/me/',
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body._id).to.eq(id)
            })
        })
    });

    it('[GET] - Selecionar perfil do usuário pelo ID', () => {
        cy.dadosUsuario(token).then((response) => {
            id = response.body.user._id

            cy.request({
                method:'GET',
                url:`/api/profile/user/${id}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    });

    it('[GET] - Selecionar usuário GITHUB', () => {
        cy.dadosUsuario(token).then((response) => {
            id = response.body.githubusername

            cy.request({
                method:'GET',
                url:`/api/profile/github/${id}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    });
});

describe('[PUT] - Testes de modificação', () => {
    it('Adicionar experiência proficional', () => {
        cy.methodAPI(token,'PUT','/api/profile/experience',dadosUser[0].experiencia_profissional[0],)
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('Adicionar nova formação academica', () => {
        cy.methodAPI(token,'PUT','/api/profile/education',dadosUser[0].formacao_academica[0],)
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    });
});

describe('[DELETE] - Teste de exclusão', () => {

    it('Excluir uma uducação adicionada', () => {
        cy.methodAPI(token,'PUT','/api/profile/education',dadosUser[0].formacao_academica[0],)
            .then((response) => { id = response.body.education[0]._id 
                cy.methodAPI(
                    token,'DELETE',`/api/profile/education/${id}`,null)
                    .then((response) => {
                    expect(response.status).to.eq(200)
                    })
            })
    });


    it('Excluir uma experiencia', () => {
        cy.methodAPI(token,'PUT','/api/profile/experience',dadosUser[0].experiencia_profissional[0],)
            .then((response) => { id = response.body.experience[0]._id 
            cy.methodAPI(
                token,'DELETE',`/api/profile/experience/${id}`,null)
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        })
    })

    it('Excluir uma conta de usuário', () => {
        cy.methodAPI(null,'POST','api/users',dadosUser[3])
        .then((response) => {
            token = response.body.jwt

            cy.methodAPI(token,'DELETE','api/profile',null).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Usuário removido")
            })

        })            
    });
});