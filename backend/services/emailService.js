// emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

async function sendAppointmentConfirmation(email, name, date, time, day,counselorName) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email service
            auth: {
                user: process.env.EMAIL_USER, // Use environment variable
                pass: process.env.EMAIL_PASS // Use environment variable
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Use environment variable
            to: email,
            subject: 'Appointment Confirmation - Your Mental Health Matters',
            html: `
                <p>Dear ${name},</p>
                <p>Your Appointment was successful🎉🎉. Your Mental health 🧠 matters with us.Thank you!</p>
                <p><strong>Appointment Details:</strong></p>
                <ul>
                    <li>Date: ${date}</li>
                    <li>Time: ${time}</li>
                    <li>Day: ${day}</li>
                    <li>Counselor: ${counselorName}</li
                </ul>
                <p>We look forward to seeing you.</p>
            `
        };
        console.log("Day being sent in email:", day);
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export { sendAppointmentConfirmation };