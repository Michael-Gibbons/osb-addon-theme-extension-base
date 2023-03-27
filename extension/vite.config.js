import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import toml from 'toml'
import fg from 'fast-glob';

const config = toml.parse(fs.readFileSync(resolve(__dirname, 'src', 'shopify.theme.extension.toml'), 'utf8'))

const ROOT_APP_DIRECTORY = resolve(process.cwd(), '../../../..')
const SHOPIFY_EXTENSIONS_DIRECTORY = resolve(ROOT_APP_DIRECTORY, 'extensions/')
const OUTPUT_DIRECTORY = resolve(SHOPIFY_EXTENSIONS_DIRECTORY, config.name)

const EXTENSION_MODE = process.env.EXTENSION_MODE
const isDev = EXTENSION_MODE === 'development'

const devServerUrl = JSON.stringify(process.env.DEV_HOST) // Injected by HOST.txt file and dev script
const prodServerUrl = JSON.stringify(process.env.HOST) // Injected by hosting provider

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "VITE_PUBLIC_SERVER_URL": isDev ? devServerUrl: prodServerUrl,
  },
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
    emptyOutDir: false,
    rollupOptions: {
      plugins: [
        {
          name: 'watch-external',// Watches static files outside the module graph.
          // Must restart build if you want to watch a newly added file since the file didn't exist at build time and therefore could not be watched.
          // When you add a new file simply make a dummy change to an already watched file, this plugin will refire and watch the new file.
          async buildStart(){
            const files = await fg('src/**/*');
            for(let file of files){
              this.addWatchFile(file);
            }
          }
        }
     ],
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
