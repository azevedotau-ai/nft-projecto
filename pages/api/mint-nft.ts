// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { mintNFT } from '../../services/nft-service'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const result = await mintNFT(
  //   'https://gateway.pinata.cloud/ipfs/QmdjVseFsnwbtVAJJUd3NVHLP9Xmd7kJbeXkjQpVgtpUwU'
  // )

  res.status(418).send('Disabled')
}
