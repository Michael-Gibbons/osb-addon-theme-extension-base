import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import toml from 'toml'

const config = toml.parse(fs.readFileSync(resolve(__dirname, 'src', 'shopify.theme.extension.toml'), 'utf8'))

const ROOT_APP_DIRECTORY = resolve(process.cwd(), '../../../../..')// will need to change this
const SHOPIFY_EXTENSIONS_DIRECTORY = resolve(ROOT_APP_DIRECTORY, 'extensions/')
const OUTPUT_DIRECTORY = resolve(SHOPIFY_EXTENSIONS_DIRECTORY, config.name)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/blocks/**/*.liquid',
          dest: 'blocks/'
        },
        {
          src: 'src/snippets/**/*.liquid',
          dest: 'snippets/'
        },
        {
          src: 'src/locales/**/*.json',
          dest: 'locales/'
        },
        {
          src: 'src/shopify.theme.extension.toml',
          dest: ''
        }
      ]
    }),
    {
      name: 'postbuild-commands',
      closeBundle: async () => {
        fs.unlink(resolve(OUTPUT_DIRECTORY, 'index.html'), () => {})
      }
    },
  ],
  build: {
    outDir: OUTPUT_DIRECTORY,
    rollupOptions: {
      output: {
        entryFileNames: `assets/app.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'assets/app.css';
          return `assets/[name].[ext]`;
        },
      },
    },
  }
})
