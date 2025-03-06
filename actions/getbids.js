'use server'
import connectDB from '@/db/connectDB';
import Bid from '@/models/Bid';

export const getbids =  async({email}) => {
    await connectDB();
    const users = await Bid.find({ email });
    const plainUsers = users.map(user=>({
        title: user.title,
        femail: user.femail,
        email: user.email,
        amount: user.amount,
        deltime: user.deltime,
        coverletter: user.coverletter,
        phoneNumber: user.phoneNumber
      }));

      return plainUsers;

}
