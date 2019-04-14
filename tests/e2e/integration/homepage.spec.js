describe('The homepage', () => {
  const firstLink = 'ul li:first a'
  const secondLink = 'ul li:nth-child(2) a'
  const lastLink = 'ul li:last a'
  const selectedName = '[data-e2e="selected-name"]'
  const selectedCalories = '[data-e2e="selected-calories"]'
  const updateButton = '[data-e2e="update-button"]'
  const addName = '[data-e2e="add-name"]'
  const addCalories = '[data-e2e="add-calories"]'
  const addButton = '[data-e2e="add-button"]'
  const deleteButton = '[data-e2e="delete-button"]'
  const clearButton = '[data-e2e="clear-button"]'

  it('displays the name of the application', () => {
    cy.visit('/')
    cy.contains('Fruit FTW!')
  })

  it('has selectable fruit', () => {
    cy.visit('/')
    cy.get(firstLink).invoke('text').then((text) => {
      cy.get(firstLink).click()
      cy.get(selectedName).should('have.value', text)
    })
  })

  it('can update fruit', () => {
    cy.visit('/')
    cy.get(secondLink).click()
    cy.get(selectedName).clear()
    cy.get(selectedName).type('blueberries')
    cy.get(updateButton).click()
  })

  it('can add fruit', () => {
    cy.server()
    cy.route('fruits').as('fruits')
    cy.visit('/')
    cy.get(addName).type('Papaya')
    cy.get(addCalories).type('62')
    cy.get(addButton).click()
    cy.wait('@fruits')
    cy.get(lastLink).contains('Papaya')
  })

  it('can delete fruit', () => {
    cy.server()
    cy.route('fruits').as('fruits')
    cy.visit('/')
    cy.get(lastLink).click()
    cy.get(deleteButton).click()
    cy.wait('@fruits')
    cy.get('ul li').should('have.lengthOf', 3)
  })

  it('can clear selected fruit', () => {
    cy.visit('/')
    cy.get(firstLink).click()
    cy.get(clearButton).click()
    cy.get(selectedName).should('be.empty')
    cy.get(selectedCalories).should('be.empty')
  })
})
