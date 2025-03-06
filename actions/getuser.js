'use server'
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export const getuser =  async({username}) => {
    await connectDB();
    const user = await User.findOne({ username });
    const plainUsers = {
        _id: user._id.toString(), // Convert ObjectId to string
        username: user.username,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        skills: user.skills,
        rating: user.rating,
        rate: user.rate,
        portfolio: user.portfolio,
        reviews: user.reviews?.map(review => ({
          email: review.email || '',
          comment: review.comment || ''
      })) || [],
        title: user.title,
        ratings: user.ratings
      };

      return plainUsers;

}
