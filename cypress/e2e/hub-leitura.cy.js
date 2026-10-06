describe('Formulario Fale Conosco', () => {

  it('preenche e envia o formulario com sucesso', () => {
    cy.intercept('POST', '/api/contact').as('enviarContato')
    cy.visit('http://localhost:3000/index.html')
    cy.get('input[placeholder="Seu nome completo"]').type('Isabella Costa Alves')
    cy.get('input[placeholder="Seu e-mail"]').type('isabella@teste.com')
    cy.get('select').select(1)
    cy.get('textarea[placeholder="Escreva sua mensagem..."]').type('Mensagem de teste automatizado com Cypress.')
    cy.contains('Enviar Mensagem').click()
    cy.wait('@enviarContato').its('response.statusCode').should('eq', 200)
  })

  it('nao envia se o nome estiver vazio', () => {
    cy.intercept('POST', '/api/contact').as('enviarContato')
    cy.visit('http://localhost:3000/index.html')
    cy.get('input[placeholder="Seu e-mail"]').type('isabella@teste.com')
    cy.get('select').select(1)
    cy.get('textarea[placeholder="Escreva sua mensagem..."]').type('Teste sem nome')
    cy.contains('Enviar Mensagem').click()
    cy.get('@enviarContato.all').should('have.length', 0)
  })

  it('nao envia se o e-mail estiver vazio', () => {
    cy.intercept('POST', '/api/contact').as('enviarContato')
    cy.visit('http://localhost:3000/index.html')
    cy.get('input[placeholder="Seu nome completo"]').type('Isabella Costa Alves')
    cy.get('select').select(1)
    cy.get('textarea[placeholder="Escreva sua mensagem..."]').type('Teste sem email')
    cy.contains('Enviar Mensagem').click()
    cy.get('@enviarContato.all').should('have.length', 0)
  })

  it('nao envia se o assunto nao for selecionado', () => {
    cy.intercept('POST', '/api/contact').as('enviarContato')
    cy.visit('http://localhost:3000/index.html')
    cy.get('input[placeholder="Seu nome completo"]').type('Isabella Costa Alves')
    cy.get('input[placeholder="Seu e-mail"]').type('isabella@teste.com')
    cy.get('textarea[placeholder="Escreva sua mensagem..."]').type('Teste sem assunto')
    cy.contains('Enviar Mensagem').click()
    cy.get('@enviarContato.all').should('have.length', 0)
  })

  it('nao envia se a mensagem estiver vazia', () => {
    cy.intercept('POST', '/api/contact').as('enviarContato')
    cy.visit('http://localhost:3000/index.html')
    cy.get('input[placeholder="Seu nome completo"]').type('Isabella Costa Alves')
    cy.get('input[placeholder="Seu e-mail"]').type('isabella@teste.com')
    cy.get('select').select(1)
    cy.contains('Enviar Mensagem').click()
    cy.get('@enviarContato.all').should('have.length', 0)
  })

})