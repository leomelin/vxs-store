// rollup.config.js
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/decorators.ts',
  output: {
    file: 'dist/decorators.js',
    format: 'cjs'
  },
  plugins: [typescript()],
  external: ['vue', 'vue-class-component']
}
