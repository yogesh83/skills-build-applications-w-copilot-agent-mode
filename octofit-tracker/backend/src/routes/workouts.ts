import { Router } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean())
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body))
  } catch (error) {
    next(error)
  }
})

export default router