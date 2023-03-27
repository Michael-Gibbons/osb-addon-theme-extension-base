import fs from 'fs'
import { resolve } from 'path'
import shell from 'shelljs'

// Waits for HOST.txt to become available (shopify assigns a dynamic ngrok url) so we can spin up our development server with the server url
async function getHostfromFile(){
  const PATH_TO_HOST_FILE = resolve('../../../../HOST.txt')
  const hostPollingInterval = setInterval(() => {
    if(fs.existsSync(PATH_TO_HOST_FILE)){
      const HOST = fs.readFileSync(PATH_TO_HOST_FILE, {encoding:'utf8', flag:'r'});
      if(HOST){
        clearInterval(hostPollingInterval)
        shell.exec(`cross-env EXTENSION_MODE=development DEV_HOST=${HOST} vite build --watch`)
      }
    }
  }, 100)
}

getHostfromFile()