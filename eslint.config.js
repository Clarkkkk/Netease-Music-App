import vueParser from 'vue-eslint-parser'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import * as regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    regexpPlugin.configs['flat/recommended'],
    {
        files: ['**/*.{ts,tsx,js,mjs,cjs,vue}'],
        plugins: {
            vue: pluginVue,
            'simple-import-sort': simpleImportSort,
            ts: tseslint.plugin
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 'es2022',
                sourceType: 'module'
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            indent: 'off',
            '@typescript-eslint/indent': ['error', 4],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'consistent-return': 'error',
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always'
                }
            ],
            'no-redeclare': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [
                            // Side effect imports.
                            '^\\u0000',
                            // Packages. `vue` related packages come first.
                            '^vue',
                            '^@?\\w',
                            // Internal packages.
                            '^(src|components|config|utils|pages|hooks|api)(/.*|$)',
                            // Parent imports. Put `..` last.
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                            // Other relative imports. Put same-folder imports and `.` last.
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                            // Style imports.
                            '^.+\\.s?css$'
                        ]
                    ]
                }
            ],
            'simple-import-sort/exports': 'error',
            'vue/multi-word-component-names': 'off',
            'vue/attribute-hyphenation': [
                'warn',
                'always',
                {
                    ignore: ['on']
                }
            ],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'vue/component-name-in-template-casing': [
                'error',
                'PascalCase',
                {
                    registeredComponentsOnly: true
                }
            ],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-indent': [
                'error',
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: []
                }
            ],
            'func-call-spacing': 'off',
            '@typescript-eslint/func-call-spacing': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports'
                }
            ],
            'no-undef': 'off',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': [
                'error',
                {
                    enums: false,
                    typedefs: false,
                    ignoreTypeReferences: false,
                    functions: false
                }
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ],
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
]
