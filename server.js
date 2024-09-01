const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = 3000;

// Middleware
app.use(helmet()); // Secure headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object with your email service configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'rufusnjogu1@gmail.com', // Your email
            pass: '*Njogu4400', // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: email, // Sender's email address
        to: 'rufusnjogu1@gmail.com', // Your email address
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
