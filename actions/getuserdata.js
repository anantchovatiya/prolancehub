'use server';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export async function getuserdata() {
  try {
    await connectDB();
    const users = await User.find();
    const plainUsers = users.map(user => ({
        _id: user._id.toString(), // Convert ObjectId to string
        username: user.username,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        skills: user.skills,
        completedJobs: user.completedJobs,
        rating: user.rating,
        totalEarnings: user.totalEarnings,
        rate: user.rate,
        portfolio: user.portfolio,
        reviews: user.reviews?.map(review => ({
          email: review.email || '',
          comment: review.comment || ''
      })) || [],
        title: user.title,
        ratings: user.ratings
      }));

      return plainUsers;
  } catch (error) {
    console.error('❌ Database Fetch Error:', error.message);

  }
}
