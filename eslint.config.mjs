import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs}'],
        ignores: [
            'node_modules',
            'dist',
            'src/config/env.mjs',
            'src/schemas/choferes.joi.mjs',
            'src/tests/*',
            'README.md',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
    },
];
