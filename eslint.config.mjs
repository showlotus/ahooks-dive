import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.dev/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'content/**']),
])

export default eslintConfig
