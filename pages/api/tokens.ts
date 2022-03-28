// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { tokens } from '../../services/nft-service'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await tokens()
  res.status(200).send(result)
}
