import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    
    const response = await axios.get(
      url.toString(),
      {
        responseType: 'blob',
      }
    );

    res.send(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao buscar o arquivo.');
  }
}
