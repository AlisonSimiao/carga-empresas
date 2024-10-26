import type { NextApiRequest, NextApiResponse } from 'next'
import { loadLinks } from '../../services/web'
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method != 'GET')
        return res.status(502).json({ message: 'not implement'})
    
    try {
        const links = await loadLinks()
        res.status(200).json(links)
    } catch(e) {
        res.status(400).json({message: e.message})
    }
    return
}