import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    
    const response = await axios.get(
      url.toString(),
      {
        responseType: 'stream',
      }
    );

    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', `attachment; filename="downloaded-file"`); 
    res.setHeader('Content-Length', response.headers['content-length'])
    
    response.data.pipe(res);
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao buscar o arquivo.');
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}