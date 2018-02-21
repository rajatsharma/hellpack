import { Router } from 'express'

const router = new Router()

const func = (rt: string) => rt + 'Changed'

router.route('/').get(async (req, res) => {
  const response = await Promise.resolve('Server Working Fine')
  console.log(func('Hello'))
  res.json(response)
})

export default router
