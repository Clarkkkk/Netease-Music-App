module.exports = {
    tabWidth: 4,
    printWidth: 100,
    vueIndentScriptAndStyle: false,
    semi: false,
    singleQuote: true,
    proseWrap: 'always',
    singleAttributePerLine: true,
    plugins: [import('prettier-plugin-tailwindcss')],
    trailingComma: 'none'
}
