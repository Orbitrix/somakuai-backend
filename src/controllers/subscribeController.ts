import { Request, Response } from "express";
import { validateEmail } from "../utils/helpers.js";
import { Subscriber } from "../models/subscriberModel.js";

export const subscribeGuest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ success: true, message: 'Email is already subscribed to the waitlist' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    //send email notification

    res.status(200).json({ success: true, message: 'Successfully subscribed to the waitlist!' });
  } catch (error) {
    console.error('Error subscribing guest:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};