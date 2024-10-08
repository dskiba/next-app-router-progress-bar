// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    jest: true,
    ignores: ['./website/*/**.tsx', 'README.md', '.gitignore'],
  },
)
