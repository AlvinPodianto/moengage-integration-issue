/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    googleWidgetLogin(googleRefreshToken: string): Chainable<any>;
  }
}

Cypress.Commands.add('googleWidgetLogin', (googleRefreshToken: string) => {
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: googleRefreshToken,
    },
  })
    .then(({ body }) => {
      const { access_token, id_token } = body

      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then(({ body }) => {
          const userItem = {
            token: id_token,
            user: {
              googleId: body.sub,
              email: body.email,
              givenName: body.given_name,
              familyName: body.family_name,
              imageUrl: body.picture,
            },
          }

          window.localStorage.setItem('googleCypress', JSON.stringify(userItem));
        });
    });
});
