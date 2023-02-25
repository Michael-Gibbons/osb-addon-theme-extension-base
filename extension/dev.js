import fs from 'fs'
import { resolve } from 'path'
import toml from 'toml'
import chokidar from 'chokidar'
import shell from 'shelljs'

const config = toml.parse(fs.readFileSync(resolve('./', 'src', 'shopify.theme.extension.toml'), 'utf8'))

const watcher = chokidar.watch('src', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

const log = console.log.bind(console);
let ready = false

watcher
  .on('add', path => {
    log(`File ${path} has been added`)

    if(ready){
      shell.exec(`npm run build`)
      console.log(`${config.name}: Build Complete!`)
    }

  })
  .on('change', path => {
    log(`File ${path} has been changed`)

    if(ready){
      shell.exec(`npm run build`)
      console.log(`${config.name}: Build Complete!`)
    }
  })
  .on('unlink', path => {
    log(`File ${path} has been removed`)

    if(ready){
      shell.exec(`npm run build`)
      console.log(`${config.name}: Build Complete!`)
    }
  })
  .on('ready', () => {
    ready = true
    log(`Listening for changes in /extensions/addons/${config.name}/src`)
  })
  .on('error', error => log(`Watcher error: ${error}`))