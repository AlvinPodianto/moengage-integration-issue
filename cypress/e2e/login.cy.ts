var loginTestData: any;

describe('login scenario', () => {
  beforeEach(() => {
    // Visit Site
    cy.visit('/cart-page');

    // Get Login Test Data
    cy.fixture('account.json').then(data => this.loginTestData = data);
  });

  it('navigate cart without login => redirect to login', () => {
    cy.url().should('contain', 'login');
  });

  it('login with otp', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.loginTestData?.loginOtpPhone);

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Setup Wait API Request GET OTP
    cy.intercept('**/accounts/Otp/Login/WA*').as('waitGetOtp');

    // Choose OTP Method 
    cy.contains('ion-row', 'WhatsApp').click();

    // Wait API Request GET OTP
    cy.wait('@waitGetOtp');

    // Setup Wait API Request GET Profile
    cy.intercept('**/Customer/Profile').as('getCustomerProfile');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    })

    // Wait API Request GET Profile
    cy.wait('@getCustomerProfile');

    // Assert Token Exist
    cy.getAllLocalStorage().then(element => {
      expect(element[Cypress.config('baseUrl')].token).to.exist;
    });
  });

  it('login with password', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.loginTestData?.loginOtpPhone);

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Choose Password Method 
    cy.contains('ion-row', 'Kata Sandi').click();

    // Setup Wait API OTP Verification
    cy.intercept('**/accounts/Login/Password*').as('waitPasswordVerification');

    // Simulate Input Password
    cy.get('input[type=password]').type(this.loginTestData?.loginPassword);
    cy.contains('ion-button', 'Masuk').click();

    // Wait API OTP Verification
    cy.wait('@waitPasswordVerification');

    // Setup & Wait API Request GET Profile
    cy.intercept('**/Customer/Profile').as('getCustomerProfile');
    cy.wait('@getCustomerProfile');

    // Assert
    cy.getAllLocalStorage().then(element => {
      expect(element[Cypress.config('baseUrl')].token).to.exist;
    });
  });

  it('forgot password', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.loginTestData?.loginOtpPhone);

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Choose Password Method 
    cy.contains('ion-row', 'Kata Sandi').click();

    // Click 'Lupa Kata Sandi'
    cy.contains('a', 'Lupa kata sandi').click();

    // Assert Link Should in Reset Password Page
    cy.location().should(location => {
      expect(location.pathname).to.equal('/reset-password');
    });

    // Click 'Selanjutnya' in Forgot Password Form
    cy.get("check-button[id='nextForgetPassword']").click();

    // Choose 'Whatsapp' Verification Method
    cy.contains('ion-row', 'WhatsApp').click();

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Setup Wait API Request Create New Password
    cy.intercept('**/accounts/Password/Forgot').as('createNewPassword');

    // Simulate Input New Password
    cy.get("srx-input-password[id='newPassword']").type(this.loginTestData?.loginPassword);

    // Simulate Input Confirm Password
    cy.get("srx-input-password[id='confirmNewPassword']").type(this.loginTestData?.loginPassword);

    // Click Submit Button
    cy.get("ion-button[id='btnSubmitNewPassword']").click();

    // Wait API Request Create New Password
    cy.wait('@createNewPassword');

    cy.get('.alert-head').should(header => {
      expect(header).contain('Berhasil');
    });
  });

  afterEach(() => {
    // Get Banner Close Button if Exist
    cy.get('body').then(body => {
      if (body.find('ion-fab-button').length > 0)
        cy.get('ion-fab-button').click();
    });

    // Clear Storage
    cy.clearAllLocalStorage();
  });
});
