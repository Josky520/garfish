/// <reference types="cypress" />

const basename = '/garfish_master';

describe('whole process vm sandbox global context', () => {
  beforeEach(() => {
    Cypress.env({
      garfishRunConfig: {
        basename: basename,
        disablePreloadApp: true,
        sandbox: {
          snapshot: false,
        },
      },
    });
  });

  it('set global history variable', () => {
    cy.visit(`http://localhost:2333${basename}/react/set-proxy-variable`);

    const ProxyVariableTitle = 'set proxy variable';

    cy.window().then((win) => {
      cy.contains('[data-test=title]', ProxyVariableTitle)
        .then(() => {
          return cy
            .get('[data-test=click-set-global-context-variable]')
            .click();
        })
        .then(() => {
          expect(win.history.scrollRestoration).to.equal('manual');
        });
    });
  });
});
