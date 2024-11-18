// extract-rules.mjs
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({
  baseDirectory: __dirname
})

// Convert airbnb-base config
const flatConfig = compat.config({
    extends: ['airbnb-base']
})

// Extract all rules from all config objects
const allRules = flatConfig.reduce((acc, config) => ({
    ...acc,
    ...(config.rules || {})
}), {})

// Write rules to a file
fs.writeFileSync(
    'airbnb-rules.json', 
    JSON.stringify(allRules, null, 2)
)

console.log('Rules extracted to airbnb-rules.json')