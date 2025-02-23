import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules', 'build', '.next', 'out', 'coverage'],
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettier,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'lf',
                    singleQuote: true,
                    semi: true,
                },
            ],
            semi: ['error', 'always'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
);
