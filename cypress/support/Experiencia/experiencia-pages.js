class ExperienciaPage {

    get #posicao() { return cy.get('input[name="title"]') }
    get #empresa() { return cy.get('input[name="company"]') }
    get #localizacao() { return cy.get('input[name="location"]') }
    get #dataIni() { return cy.get('input[id="from"]') }
    get #dataFim() { return cy.get('input[id="to"]') }
    get #descricao() { return cy.get('textarea[name="description"]') }
    get #btnAdd() { return cy.get('[data-test="experience-submit"]') }
    get #checkAtual() { return cy.get('[name="current"]') }

    addExperiencia(posicao, empresa, localizacao, dataIni, dataFim, descricao){
        this.#posicao.type(posicao)
        this.#empresa.type(empresa)
        this.#localizacao.type(localizacao)
        this.#dataIni.type(dataIni)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }

    addExperienciaAtual(posicao, empresa, localizacao, dataIni, descricao){
        this.#posicao.type(posicao)
        this.#empresa.type(empresa)
        this.#localizacao.type(localizacao)
        this.#dataIni.type(dataIni)
        this.#checkAtual.check()
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }
}

module.exports = new ExperienciaPage()