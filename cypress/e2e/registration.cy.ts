var registrationByPhoneData: any;
var registrationByEmailData: any;
var registrationByGoogleData: any;
var registrationByPhoneNVerifyData: any;

describe('registration scenario', () => {
  beforeEach(() => {
    // Visit Site
    cy.visit('/cart-page');

    // Get Login Test Data
    cy.fixture('account.json').then(data => {
      this.registrationByPhoneData = data.registrationByPhoneData;
      this.registrationByEmailData = data.registrationByEmailData;
      this.registrationByGoogleData = data.registrationByGoogleData;
      this.registrationByPhoneNVerifyData = data.registrationByPhoneNVerifyData;
    });
  });

  it('register by phone', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.registrationByPhoneData?.phone);

    // Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click({ force: true });
    cy.wait('@waitAvailableOtpMethod');

    // Click Button 'Daftar'
    cy.get('ion-button[name=btnRegister]').click();

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Fill Registration Form
    cy.get('input[name=fullname]').type(this.registrationByPhoneData.name);
    cy.get('input[name=password]').type(this.registrationByPhoneData.password);
    cy.get('input[name=confirmPassword]').type(this.registrationByPhoneData.password);
    cy.get('check-button[name=btnRegistationNext]').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Setup Wait API Request GET OTP
    cy.intercept('**/accounts/Register/Otp/WA*').as('waitGetOtp');

    // Choose OTP Method 
    cy.contains('ion-row', 'WhatsApp').click();

    // Wait API Request GET OTP
    cy.wait('@waitGetOtp');

    // Setup Wait API Register
    cy.intercept('**/accounts/Register').as('register');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Wait API Register
    cy.wait('@register');

    // Assert
    cy.getAllLocalStorage().then(element => {
      expect(element[Cypress.config('baseUrl')].token).to.exist;
    });
  });

  it('register by phone & do data verification', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.registrationByPhoneNVerifyData?.phone);

    // Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click({ force: true });
    cy.wait('@waitAvailableOtpMethod');

    // Click Button 'Daftar'
    cy.get('ion-button[name=btnRegister]').click();

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Fill Registration Form
    cy.get('input[name=fullname]').type(this.registrationByPhoneNVerifyData.name);
    cy.get('input[name=password]').type(this.registrationByPhoneNVerifyData.password);
    cy.get('input[name=confirmPassword]').type(this.registrationByPhoneNVerifyData.password);
    cy.get('check-button[name=btnRegistationNext]').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Setup Wait API Request GET OTP
    cy.intercept('**/accounts/Register/Otp/WA*').as('waitGetOtp');

    // Choose OTP Method 
    cy.contains('ion-row', 'WhatsApp').click();

    // Wait API Request GET OTP
    cy.wait('@waitGetOtp');

    // Setup Wait API Register
    cy.intercept('**/accounts/Register').as('register');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Wait API Register
    cy.wait('@register');

    // Visit Account Page
    cy.visit('/account');

    // Click Account Setting Menu
    cy.contains('ion-item', 'Pengaturan Akun').click({ force: true });

    // Setup Wait API Request GET Profile
    cy.intercept('**/Customer/Profile').as('getCustomerProfile');

    // Click Profile
    cy.contains('ion-item', 'Ubah Profil').click({ force: true });

    // Wait API Request GET Profile
    cy.wait('@getCustomerProfile');

    // Assert => Account Registered & Not Verified
    cy.getAllLocalStorage().then(element => {
      var profile = JSON.parse(element[Cypress.config('baseUrl')].profile.toString());

      expect(element[Cypress.config('baseUrl')].token).to.exist;
      expect(profile.isVerified).eq(false);
    });

    // Setup Wait API Request GET Verification Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableVerificationOtpMethod');

    // CLick Change Email Button
    cy.get('ion-button[name=btnChangeEmail]').click();

    // Wait API Request GET Verification Otp Option API
    cy.wait('@waitAvailableVerificationOtpMethod')

    // Setup Wait API Request GET Verification OTP
    cy.intercept('**/Customer/Verification/Otp/*').as('waitGetVerificationOtp');

    // Choose OTP Method 
    cy.contains('ion-row', 'WhatsApp').click();

    // Wait API Request GET Verification OTP
    cy.wait('@waitGetVerificationOtp');

    // Setup Wait OTP Verification
    cy.intercept('**/Customer/Verification/Otp/Verify').as('waitOtpVerification');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Wait OTP Verification
    cy.wait('@waitOtpVerification');

    // Simulate Input Phone Number
    cy.get('input[type=email]').focus().type(this.registrationByPhoneNVerifyData?.email);

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Next Button
    cy.contains('ion-button', 'Selanjutnya').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Setup Wait Get OTP
    cy.intercept('**/Customer/Verification/Otp/EMAIL?changes=email*').as('waitGetOtp');

    // Choose OTP Method 
    cy.contains('ion-row', this.registrationByPhoneNVerifyData.email).click();

    // Wait Get OTP
    cy.wait('@waitGetOtp');

    // Setup Wait OTP Verification
    cy.intercept('**/Customer/Verification/Otp/Verify').as('waitOtpVerification');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Setup Wait Update Email & Get Profile
    cy.intercept('**/Customer/Email').as('updateEmail');
    cy.intercept('**/Customer/Profile').as('getCustomerProfile');

    // Wait OTP Verification, Update Email & Get Profile
    cy.wait('@waitOtpVerification');
    cy.wait('@updateEmail');
    cy.wait('@getCustomerProfile');

    // Assert => Account Verified
    cy.getAllLocalStorage().then(element => {
      var profile = JSON.parse(element[Cypress.config('baseUrl')].profile.toString());

      expect(element[Cypress.config('baseUrl')].token).to.exist;
      //expect(profile.isVerified).eq(true);
    });
  });

  it('register by email', () => {
    // Simulate Input Phone Number
    cy.get('input').type(this.registrationByEmailData?.email);

    // Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Click Login Button
    cy.get('ion-button').click({ force: true });
    cy.wait('@waitAvailableOtpMethod');

    // Click Button 'Daftar'
    cy.get('ion-button[name=btnRegister]').click();

    // Setup Wait API Request GET Otp Option API
    cy.intercept('**/accounts/Otp/Methods*').as('waitAvailableOtpMethod');

    // Fill Registration Form
    cy.get('input[name=fullname]').type(this.registrationByEmailData.name);
    cy.get('input[name=phone]').type(this.registrationByEmailData.phone);
    cy.get('input[name=password]').type(this.registrationByEmailData.password);
    cy.get('input[name=confirmPassword]').type(this.registrationByEmailData.password);
    cy.get('check-button[name=btnRegistationNext]').click();

    // Wait API Request GET Otp Option API
    cy.wait('@waitAvailableOtpMethod');

    // Setup Wait API Request GET OTP
    cy.intercept('**/accounts/Register/Otp/WA*').as('waitGetOtp');

    // Choose OTP Method 
    cy.contains('ion-row', 'WhatsApp').click();

    // Wait API Request GET OTP
    cy.wait('@waitGetOtp');

    // Setup Wait API Register
    cy.intercept('**/accounts/Register').as('register');

    // Input OTP
    cy.get('[class^=otp-input]').each((otpInput, index) => {
      cy.wrap(otpInput).focus().type('1');
    });

    // Wait API Register
    cy.wait('@register');

    // Assert
    cy.getAllLocalStorage().then(element => {
      expect(element[Cypress.config('baseUrl')].token).to.exist;
    });
  });

  it('register & login by google', () => {
    var deviceId = localStorage.getItem('device-id');
    var deviceOs = localStorage.getItem('device-os');

    // Simulate Login With Google Widget
    cy.googleWidgetLogin(this.registrationByGoogleData.googleRefreshToken).then(() => {
      // Simulate Login With Google
      cy.request({
        method: 'POST',
        url: 'https://staging-mobile-api.securerx.id/v2/accounts/Login/Google',
        headers: {
          'Device-Id': deviceId,
          'Device-Os': deviceOs
        },
        body: {
          providerToken: JSON.parse(localStorage.getItem('googleCypress')).token
        },
      })
        .then(({ body }) => localStorage.setItem('token', body.accessToken));
    });

    // Setup Wait API Request GET Profile
    cy.intercept('**/Customer/Profile').as('getCustomerProfile');

    // Navigate to Account Page
    cy.visit('/account');

    // Wait API Request GET Profile
    cy.wait('@getCustomerProfile');

    // Assert
    cy.getAllLocalStorage().then(element => {
      var profile = JSON.parse(element[Cypress.config('baseUrl')].profile.toString());

      expect(profile.email).eq(this.registrationByGoogleData.email);
      expect(profile.isVerified).eq(false);
    });
  });

  afterEach(() => {
    var deviceId = localStorage.getItem('device-id');
    var deviceOs = localStorage.getItem('device-os');
    var authToken = localStorage.getItem('token');

    cy.request({
      method: 'DELETE',
      url: 'https://staging-mobile-api.securerx.id/v2/accounts',
      headers: {
        'Device-Id': deviceId,
        'Device-Os': deviceOs,
        'Platform': 'web',
        'App-Version': '1',
        'Authorization': `Bearer ${authToken}`
      },
    });
  });
});
