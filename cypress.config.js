const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'vx7m77',  // Ihre Projekt-ID
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  },
  video: true, // Videos von den Tests erstellen
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    setupNodeEvents(on, config) {
      // Event listeners oder Plugins hier hinzufügen
      on('after:run', (results) => {
        if (results) {
          console.log('Tests completed with status:', results.totalFailed > 0 ? 'Failed' : 'Passed');
        }
      });
    }
  }
});
