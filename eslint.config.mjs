// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'node/prefer-global/process': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
})
