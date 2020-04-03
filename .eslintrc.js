module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'html'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: false,
          object: false
        },
        VariableDeclarator: {
          array: true,
          object: true
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'no-var': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
    'semi': [2, 'never'],
    'array-bracket-newline': 0,
    // Removed rule 'disallow the use of console' from recommended eslint rules
    'no-console': 'off',
    // Removed rule 'disallow multiple spaces in regular expressions' from recommended eslint rules
    'no-regex-spaces': 'off',
    // Removed rule 'disallow the use of debugger' from recommended eslint rules
    'no-debugger': 'off',
    // Removed rule 'disallow unused variables' from recommended eslint rules
    'no-unused-vars': 'off',
    // Removed rule 'disallow mixed spaces and tabs for indentation' from recommended eslint rules
    'no-mixed-spaces-and-tabs': 'off',
    // Removed rule 'disallow the use of undeclared variables unless mentioned in /*global */ comments' from recommended eslint rules
    'no-undef': 'off',
    // Warn against template literal placeholder syntax in regular strings
    'no-template-curly-in-string': 1,
    // Warn if return statements do not either always or never specify values
    'consistent-return': 1,
    // Warn if no return statements in callbacks of array methods
    'array-callback-return': 1,
    // Require the use of === and !==
    'eqeqeq': 2,
    // Disallow the use of alert, confirm, and prompt
    'no-alert': 2,
    // Disallow the use of arguments.caller or arguments.callee
    'no-caller': 2,
    // Disallow null comparisons without type-checking operators
    'no-eq-null': 2,
    // Disallow the use of eval()
    'no-eval': 2,
    // Warn against extending native types
    'no-extend-native': 1,
    // Warn against unnecessary calls to .bind()
    'no-extra-bind': 1,
    // Warn against unnecessary labels
    'no-extra-label': 1,
    // Disallow leading or trailing decimal points in numeric literals
    'no-floating-decimal': 2,
    // Warn against function declarations and expressions inside loop statements
    'no-loop-func': 1,
    // Disallow new operators with the Function object
    'no-new-func': 2,
    // Warn against new operators with the String, Number, and Boolean objects
    'no-new-wrappers': 1,
    // Disallow throwing literals as exceptions
    'no-throw-literal': 2,
    // Require using Error objects as Promise rejection reasons
    'prefer-promise-reject-errors': 2,
    // Enforce “for” loop update clause moving the counter in the right direction
    'for-direction': 2,
    // Enforce return statements in getters
    'getter-return': 2,
    // Disallow await inside of loops
    'no-await-in-loop': 2,
    // Disallow comparing against -0
    'no-compare-neg-zero': 2,
    // Warn against catch clause parameters from shadowing variables in the outer scope
    'no-catch-shadow': 1,
    // Disallow identifiers from shadowing restricted names
    'no-shadow-restricted-names': 2,
    // Enforce return statements in callbacks of array methods
    'callback-return': 2,
    // Require error handling in callbacks
    'handle-callback-err': 2,
    // Warn against string concatenation with __dirname and __filename
    'no-path-concat': 1,
    // Prefer using arrow functions for callbacks
    'prefer-arrow-callback': 1
  }
}
