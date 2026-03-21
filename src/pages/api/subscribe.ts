import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  // Placeholder: integrate with mailing list provider here
  return res.status(200).json({ ok: true })
}
