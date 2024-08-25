import { defineBuildConfig } from 'unbuild'
import preserveDirective2 from 'rollup-plugin-preserve-directives'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/progress-bar/progress-bar',
    'src/next/link',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    output: {
      preserveModules: true,
    },
  },
  hooks: {
    'rollup:options':
      (_, options) => {
        options.plugins = [
          ...options.plugins as any[],
          preserveDirective2(),
        ]
      },

  },

})
