import { Router } from 'express'
import Leaderboard from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('userId').sort({ points: -1 }).lean())
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Leaderboard.create(request.body))
  } catch (error) {
    next(error)
  }
})

export default router