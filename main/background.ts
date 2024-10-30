import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { IMapper } from '../renderer/typing/mapper'
import csvParser from 'csv-parser'
import JSZip from 'jszip'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    //mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle('do-a-thing', async (event, responseData: any, resourceName: string)=> {
       // Processar o responseData diretamente como um stream
       const resource: IMapper = require('./../renderer/assets/mappers.json')[resourceName];
       const zipBuffer = Buffer.from(responseData);

      // Carrega o conteúdo ZIP usando JSZip
      const zip = await JSZip.loadAsync(zipBuffer);
      for(const i of Object.keys(zip.files)) {
        const csvContent = zip.files[i].nodeStream('nodebuffer')
        .pipe(csvParser({ headers: resource.headers, separator:';' }))
        .on('data', async entry =>{
          const data = resource.mappers.reduce((acc: Record<string, string>, mapper) =>{
            acc[mapper.dataBaseProp] = entry[mapper.fileProp]

            return acc
          }, {})
          
          await prisma[resource.model].create({
            data
          })
        })
        .on('end', () => {
          console.log('CSV processado com sucesso!');
        })
        .on('error', (err) => {
          console.error('Erro ao processar o CSV:', err);
        })
      }
    
  return 200
})
