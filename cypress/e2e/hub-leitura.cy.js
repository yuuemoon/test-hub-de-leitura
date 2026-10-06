describe('Formulario Fale Conosco', () => {
  it('preenche e envia o formulario de contato', () => {
    cy.visit('http://localhost:3000/index.html')

    cy.get('input[placeholder="Seu nome completo"]').type('Isabella Costa Alves')
    cy.get('input[placeholder="Seu e-mail"]').type('isabella@teste.com')
    cy.get('select').select(1)
    cy.get('textarea[placeholder="Escreva sua mensagem..."]').type('Mensagem de teste automatizado com Cypress.')

    cy.contains('Enviar Mensagem').click()
  })
})
