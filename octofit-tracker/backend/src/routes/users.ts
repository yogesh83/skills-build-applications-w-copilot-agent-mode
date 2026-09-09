import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean())
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    next(error)
  }
})

export default router