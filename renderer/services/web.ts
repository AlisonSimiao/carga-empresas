import axios from 'axios';
import * as cheerio from 'cheerio';

export async function loadLinks() {
  //const db  = cone
    const url = 'https://dadosabertos.rfb.gov.br/CNPJ/dados_abertos_cnpj/2024-10/'
    const { data: html } = await axios.get(url);
    const data = {}

    const $ = cheerio.load(html);

        $('td a').each((i, link) => {
          const href = $(link).text();
        
          if(!href.includes('zip'))
            return;

          const index = href.slice(0,-4).match(/[a-zA-Z]/g).join('')
          
          if(!data[index]) {
            data[index] = []
          }

          data[index].push(`${url}${href}`)
          
        });
      console.log(data)
      return data
}