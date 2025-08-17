import {webhook} from 'svix'
import User from '../models/User'
import { create } from './../node_modules/@types/whatwg-url/lib/URLSearchParams.d';

//API controller Function to manage Clerk User with database

export const clerkWebhooks =async (req,res) =>{
     try{
         const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET)

         await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers['svix-id'],
            "svix-timestamp" : req.headers['svix-timestamp'],
            "svix-signature" : req.headers['svix-signature']
         })

         const {data,type} = req.body

         switch(type){
            case 'user.created': {
                    // Create a new user in the database
                const userData = {
                    _id: data.id,
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    imageUrl: data.image_url,
                }
                await User.create(userData);
                res.json({})
                break;
            }

            case 'user.updated': {
                // Update existing user in the database
                const userData = {
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData, {new: true});
                res.json({})
                break;
            }
            case 'user.deleted': {
                // Delete user from the database
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
            }
            default:
                console.log(`Unhandled event type: ${type}`);
         }
     }
     catch(err){
        res.json({success:false , error: err.message})
             }
}