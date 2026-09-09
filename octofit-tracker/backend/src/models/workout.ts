import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
)

export default mongoose.model('Workout', workoutSchema)