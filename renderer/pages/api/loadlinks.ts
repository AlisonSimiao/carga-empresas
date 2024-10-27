import type { NextApiRequest, NextApiResponse } from 'next'
import { loadLinks } from '../../services/web'
let cache
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method != 'GET')
        return res.status(502).json({ message: 'not implement'})
    
    try {
        if(cache)
            return res.status(200).json(cache)
        
        const links =  await loadLinks()
        cache = links
        res.status(200).json(links)
    } catch(e) {
        res.status(400).json({message: e.message})
    }
    return
}