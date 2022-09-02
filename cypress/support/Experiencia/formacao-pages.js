class FormacaoPage {

    get #escola() { return cy.get('input[name="school"]') }
    get #grau() { return cy.get('input[name="degree"]') }
    get #curso() { return cy.get('input[name="fieldofstudy"]') }
    get #dataIni() { return cy.get('input[id="from"]') }
    get #dataFim() { return cy.get('input[id="to"]') }
    get #descricao() { return cy.get('textarea[name="description"]') }
    get #btnAdd() { return cy.get('[data-test="education-submit"]') }
    get #checkAtual() { return cy.get('input[name="current"]') }

    addExperiencia(escola,grau,curso, dataIni, dataFim, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataIni.type(dataIni)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }

    addExperienciaAtual(escola,grau,curso, dataIni, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataIni.type(dataIni)
        this.#checkAtual.check()
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }

    addExperienciaSemCurso(escola,grau, dataIni, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#dataIni.type(dataIni)
        this.#checkAtual.check()
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }
}

module.exports = new FormacaoPage()