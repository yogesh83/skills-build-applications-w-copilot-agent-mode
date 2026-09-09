import mongoose from 'mongoose'
import Activity from '../models/activity.js'
import Leaderboard from '../models/leaderboard.js'
import Team from '../models/team.js'
import User from '../models/user.js'
import Workout from '../models/workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')
    console.log('Seed the octofit_db database with test data')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        name: 'Alex Rivera',
      },
      {
        username: 'jamie.lifts',
        email: 'jamie.lifts@example.com',
        name: 'Jamie Chen',
      },
      {
        username: 'taylor.yoga',
        email: 'taylor.yoga@example.com',
        name: 'Taylor Morgan',
      },
      {
        username: 'sam.cyclist',
        email: 'sam.cyclist@example.com',
        name: 'Sam Patel',
      },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Velocity Crew',
        members: [users[1]._id, users[3]._id],
      },
    ])

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Outdoor run',
        durationMinutes: 42,
        points: 420,
        recordedAt: new Date('2026-09-06T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 55,
        points: 385,
        recordedAt: new Date('2026-09-06T17:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga flow',
        durationMinutes: 35,
        points: 245,
        recordedAt: new Date('2026-09-07T08:00:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'Road cycling',
        durationMinutes: 70,
        points: 560,
        recordedAt: new Date('2026-09-07T09:30:00Z'),
      },
    ])

    const leaderboard = await Leaderboard.insertMany([
      { userId: users[3]._id, points: 560, rank: 1 },
      { userId: users[0]._id, points: 420, rank: 2 },
      { userId: users[1]._id, points: 385, rank: 3 },
      { userId: users[2]._id, points: 245, rank: 4 },
    ])

    const workouts = await Workout.insertMany([
      {
        name: 'Trail Builder',
        description: 'A progressive lower-body workout for stronger climbs and trails.',
        difficulty: 'Intermediate',
        durationMinutes: 45,
      },
      {
        name: 'Desk Break Mobility',
        description: 'A gentle mobility sequence for hips, shoulders, and the spine.',
        difficulty: 'Beginner',
        durationMinutes: 15,
      },
      {
        name: 'Power Circuit',
        description: 'A full-body circuit combining strength, balance, and short cardio bursts.',
        difficulty: 'Advanced',
        durationMinutes: 35,
      },
    ])

    console.log(
      `Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts`,
    )
    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
