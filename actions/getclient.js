'use server'
import connectDB from '@/db/connectDB';
import Employee from '@/models/Employee';

export const getclient = async ({ email }) => {
    await connectDB();
    const client = await Employee.findOne({ email });

    if (!client) return null;

    // Clean up the client data
    const plainClient = {
        _id: client._id.toString(), // Convert ObjectId to string
        name: client.name || '', // Default to empty string if undefined
        email: client.email || '',
        company: client.company || '',
        phone: client.phone || '',
        // Flatten the address object
        address: {
            street: client.address?.street || '',
            city: client.address?.city || '',
            state: client.address?.state || '',
            zip: client.address?.zip || '',
            country: client.address?.country || '',
        },
        projectsPosted: client.projectsPosted || 0,
        projectsCompleted: client.projectsCompleted || 0,
        projects: client.projects?.map(project => ({
            title: project.title || '',
            description: project.description || '',
            budget: project.budget || 0,
            skillsRequired: project.skillsRequired || [],
            deadline: project.deadline ? project.deadline.toISOString() : null,
            completed: project.completed || false,
        })) || [],
    };

    return plainClient;
};
