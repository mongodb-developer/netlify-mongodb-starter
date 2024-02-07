// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

describe('sample test', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('displays the resources text', () => {
      cy.get('h1')
      .contains('Task Manager');
    })
    it('Loads tasks', () => {
        // more than one or no tasks with class 'restaurant-tile'
       // cy.get().should('have.length.gt', 0)
        cy.get('.restaurant-tile').should('have.length.gt', 0)
    })
    it('Adds a task', () => {
      // Generate a random task title
      let taskTitle = `Task ${Math.random()}`;
  
      // Stub the window.prompt before the action that triggers the prompt
      cy.window().then(win => {
          cy.stub(win, 'prompt').callsFake(() => taskTitle);
      });
  
      // Trigger the action that causes the prompt to appear
      cy.get('button').contains('Add Task').click();
  
      // Add assertions or further actions here, for example:
       cy.contains(taskTitle).should('exist');
  })
  })