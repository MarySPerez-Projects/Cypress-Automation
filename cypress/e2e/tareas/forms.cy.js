describe('Formulario con Buenas Prácticas', () => {
    let testData;

    beforeEach(() => {
        cy.fixture('formData').then((data) => {
            testData = data;
        });
        cy.visit('https://cypress-playground.vercel.app/forms');
    });

    it('completar formulario exitosamente usando datos del fixture', () => {
        cy.get('[data-testid="bp-name"]').type(testData.nombre);
        cy.get('[data-testid="bp-email"]').type(testData.email);
        cy.get('[data-testid="bp-comments"]').type(testData.comentarios);
        cy.get('[data-testid="bp-country"]').select(testData.pais);
        cy.contains('label', testData.genero).click();
        cy.contains('label', testData.interes).click();
        cy.contains('label', testData.interes2).click();
        cy.get('[data-testid="bp-experience"]').then($input => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call($input[0], testData.experiencia);
        })
        .trigger('input', { force: true })
        .trigger('change', { force: true });
        cy.get('[data-testid="bp-birthdate"]').type(testData.fechaNacimiento);
        
      cy.get('[data-testid="bp-color"]').click({ force: true }).then($input => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call($input[0], testData.color);
        })
        .trigger('input', { force: true })
        .trigger('change', { force: true });

        cy.get('[data-testid="bp-submit"]').click();
    });
});