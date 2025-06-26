/** @type {import('jest').Config} */
const config = {
    // Set the test environment to node
    testEnvironment: 'node',

    // Disable Jest's default transformation for .mjs files
    // as Node.js handles them natively with --experimental-vm-modules
    transform: {},

    // Other Jest configurations as needed
    // e.g., moduleFileExtensions, testMatch, etc.
};

export default config;
