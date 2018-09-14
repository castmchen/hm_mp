// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 三等号
        'eqeqeq': 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 0,
        // 关键字后面使用一致的空格
        'keyword-spacing': 0,
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': 0,
        // 引号类型
        "quotes": [0, "single"],
        "indent": 0

    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        getApp: true,
        getPage: true,
        requirePlugin: true
    }
}
