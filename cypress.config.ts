import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: false,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
