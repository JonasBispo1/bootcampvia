/// <reference types="cypress" />

let token
let id

beforeEach(() => {
    cy.tokenJwt().then((auth) => {
        token = auth
    })
});

describe('[POST] - Teste de criação de postagens', () => {
    it('Criar uma postagem', () => {
        cy.request({
            method:'POST',
            url:'/api/posts',
            body: {"text": "teste"},
            headers: {
                Cookies: token
            }
        }).then((response) => {
            expect(response.status).to.eq(201) 
        })
    });
});

describe('[GET] - Teste de consulta', () => {
    it('Consultar uma postagem', () => {
        cy.request({
            method:'GET',
            url:'/api/posts',
            headers: {
                Cookies: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200) 
        })
    });

    it('[GET] - Consultar uma postagem por ID', () => {
        cy.criarPostagem(token,"qualquer coisa").then((response) => {
            id = response.body._id

            cy.request({
                method:'GET',
                url:`/api/posts/${id}`,
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    });
});

describe('Teste de exclusão', () => {
    it('[DELETE] - Excluir uma postagem', () => {
        cy.criarPostagem(token,"qualquer coisa").then((response) => {
            id = response.body._id
            cy.request({
                method:'DELETE',
                url:`/api/posts/${id}`,
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })
        })
    });
});

describe('Teste de alteração de postagem', () => {
    it.only('[PUT] - curtir uma postagem', () => {
        cy.criarPostagem(token,"qualquer coisa").then((response) => {
            id = response.body._id
            cy.request({
                method:'PUT',
                url:`/api/posts/like/${id}`,
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(
                    cy.trazerPostagem(token,id).then((response) => {
                        expect(response.body.likes[0]._id).to.eq(id)
                    })
                )
            })
        })
    });
});