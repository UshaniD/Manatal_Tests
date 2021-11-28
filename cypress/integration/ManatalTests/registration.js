describe('Test Registration Page', () => {

/* Visit the registration page */
  beforeEach(() => {
    cy.visit('/signup/')
  })

  it('Verify Mandatory Fields', () => {
    cy.log('=====Verify Mandatory Fields Error Messages=====')

    /* Verify visited signup page */
    cy.get('h5.text-xs-center.mt-4').should('have.text', 'Start Your Free Trial')

    /* Click signup */
    cy.get('button.signup-material-button-contained.mt-4').click()

    /* Give validation error for username */
    cy.xpath('//input[@id="name"]/..//following-sibling::span[1]').should('have.text', 'The name field is required')

    /* Give validation error for organization name */
    cy.xpath('//input[@id="organization_name"]/..//following-sibling::span[1]').should('have.text', 'The organization name field is required')

    /* Give validation error for e-mail address */
    cy.xpath('//input[@id="company_email_address"]/..//following-sibling::span[1]').should('have.text', 'The company email address field is required')

    /* Give validation error for confirm e-mail address */
    cy.xpath('//input[@id="confirm_company_email_address"]/..//following-sibling::span[1]').should('have.text', 'The confirm company email address field is required')

    /* Give validation error for password */
    cy.xpath('//input[@id="password"]/..//following-sibling::span[1]').should('have.text', 'The password field is required')

    /* Verify validation error for accept terms */
    cy.xpath('//a[text()="privacy policy"]/..//following-sibling::span[1]').should('have.text', 'The agree field is required')

  })

  it('Verify E-mail Address', () => {
      cy.log('=====Verify E-mail Addresses Error=====')

      /* Generates random number */
      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()
      const email1 = `ushani.demel+1${id}@candidate.manatal.com`
      const email2 = `ushani.demel+2${id}@candidate.manatal.com`

      /* Give e-mail address */
      cy.get('input#company_email_address').type(email1)

      /* Confirm e-mail address */
      cy.get('input#confirm_company_email_address').type(email2)

      /* Verify error message for confirm e-mail address */
      cy.xpath('//input[@id="confirm_company_email_address"]/..//following-sibling::span[1]').should('have.text', 'The confirm company email address confirmation does not match')

    })

  it('Verify Mobile Number', () => {
      cy.log('=====Verify Invalid Mobile Number Error=====')

      /* Select country from the dropdown */
      cy.get('span.vti__selection').click()
      cy.get('li>div.vti__flag.lk').click()

      /* Give phone number */
      cy.get('input.vti__input').type('77725401')

      /* Verify error message for confirm e-mail address */
      cy.xpath('//label[text()="Phone Number"]//following::span[3]').should('have.text', 'Enter a valid phone number')
    })

  it('Verify Successful Registration', () => {
      cy.log('=====Verify Successful Registration=====')

      /* Verify visited signup page */
      cy.get('h5.text-xs-center.mt-4').should('have.text', 'Start Your Free Trial')

      /* Give username */
      cy.get('input#name').type('Ushani De Mel')

      /* Give organization name */
      cy.get('input#organization_name').type('Manatal')

      /* Select radio button */
      cy.get('input#company').click()

      /* Generates random number */
      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()
      const email = `ushani.demel+${id}@candidate.manatal.com`

      /* Give e-mail address */
      cy.get('input#company_email_address').type(email)

      /* Confirm e-mail address */
      cy.get('input#confirm_company_email_address').type(email)

      /* Give password */
      cy.get('input#password').type('Password1')

      /* Select country from the dropdown */
      cy.get('span.vti__selection').click()
      cy.get('li>div.vti__flag.lk').click()

      /* Give phone number */
      cy.get('input.vti__input').type('777254017')

      /* Check accept terms */
      cy.get('input#agree').click()

      /* Verify accept terms checked */
      cy.get('input#agree').check().should('be.checked')

      /* Click signup */
      cy.xpath('//button[@type="submit"]').click()

      /* Verify confirm your e-mail address page displayed */
      cy.get('h5.text-xs-center.mt-4').should('have.text', 'Confirm your e-mail address')

      /* Verify registered e-mail address is displaying */
      cy.get('h6>b.pa-2.border-1').should('have.text',''+email)

    })

})