const formidable = require('formidable');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

export const config = {
    api: {
        bodyParser: false, // Disabling bodyParser to handle multipart/form-data
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm({ multiples: true }); // Enable multiple files

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                res.status(500).json({ error: 'Failed to process application' });
                return resolve();
            }

            const { name, email, phone, idea } = fields;
            const attachments = files.attachment;

            // Transporter for Hostinger SMTP
            const transporter = nodemailer.createTransport({
                host: 'smtp.hostinger.com',
                port: 465,
                secure: true, // SSL
                auth: {
                    user: 'info@xvector.fi',
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            try {
                // Prepare attachments array (handle single or multiple files)
                const fileAttachments = [];
                if (attachments) {
                    const filesArray = Array.isArray(attachments) ? attachments : [attachments];
                    filesArray.forEach(file => {
                        fileAttachments.push({
                            filename: file.originalFilename || 'attachment',
                            path: file.filepath,
                        });
                    });
                }

                // 1. Send notification to XVector team
                const teamMailOptions = {
                    from: '"XVector Application" <info@xvector.fi>',
                    to: 'saroj.bhandari@cogknit.io, rajkumar.shrestha@xvector.fi',
                    replyTo: email,
                    subject: `New Cohort Application: ${name}`,
                    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Idea: ${idea}
                    `,
                    attachments: fileAttachments,
                };

                await transporter.sendMail(teamMailOptions);

                // 2. Send confirmation email to applicant with banner
                const applicantMailOptions = {
                    from: '"XVector Team" <info@xvector.fi>',
                    to: email,
                    subject: '🚀 Application Received - Welcome to XVector!',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px 20px;">
                            <h2 style="color: #ccff00; margin-bottom: 20px;">Application Received!</h2>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                                Hi ${name},
                            </p>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                                Thank you for applying to <strong>XVector Cohort I</strong>! Our team has received your application and will review it carefully.
                            </p>
                            
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                We'll be in touch soon. In the meantime, share your achievement with the world!
                            </p>
                            
                            <div style="text-align: center; margin: 40px 0;">
                                <img src="https://www.xvector.fi/assets/applied-banner.jpg" alt="I proudly Applied to XVector" style="max-width: 100%; border-radius: 12px;" />
                            </div>
                            
                            <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; text-align: center; color: #888;">
                                Download this banner and share it on LinkedIn, Instagram, or Facebook to showcase your founder journey!
                            </p>
                            
                            <!-- Community Section -->
                            <div style="background: rgba(204, 255, 0, 0.05); border: 1px solid rgba(204, 255, 0, 0.2); border-radius: 12px; padding: 30px 20px; margin: 40px 0;">
                                <h3 style="color: #ccff00; font-size: 20px; margin-bottom: 15px; text-align: center;">
                                    💬 Join Our Community!
                                </h3>
                                <p style="font-size: 14px; color: #ccc; margin-bottom: 20px; text-align: center;">
                                    Connect with fellow founders, mentors, and the XVector team. Join any of our WhatsApp groups:
                                </p>
                                
                                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 20px;">
                                    <tr>
                                        <td align="center">
                                            <a href="https://chat.whatsapp.com/KX7NxXJkDTG4Y8VikyoQPP" style="display: inline-block; width: 90%; background: rgba(204, 255, 0, 0.1); border: 1px solid rgba(204, 255, 0, 0.3); border-radius: 8px; padding: 12px; color: #ccff00; text-decoration: none; font-size: 14px; text-align: center;">
                                                💬 Join XVector Community
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="font-size: 14px; color: #ccc; margin-bottom: 15px; text-align: center; border-top: 1px solid rgba(204, 255, 0, 0.2); padding-top: 20px;">
                                    Follow us on social media:
                                </p>
                                <div style="text-align: center;">
                                    <a href="https://www.tiktok.com/@x__vector" style="display: inline-block; margin: 0 8px; font-size: 24px; text-decoration: none;">📱</a>
                                    <a href="https://www.instagram.com/xvector" style="display: inline-block; margin: 0 8px; font-size: 24px; text-decoration: none;">📷</a>
                                    <a href="https://twitter.com/xvector" style="display: inline-block; margin: 0 8px; font-size: 24px; text-decoration: none;">🐦</a>
                                    <a href="https://facebook.com/xvector" style="display: inline-block; margin: 0 8px; font-size: 24px; text-decoration: none;">👥</a>
                                    <a href="https://linkedin.com/company/xvector" style="display: inline-block; margin: 0 8px; font-size: 24px; text-decoration: none;">💼</a>
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
                                <p style="font-size: 14px; color: #888;">
                                    Best regards,<br>
                                    <strong style="color: #ccff00;">The XVector Team</strong><br>
                                    <a href="https://www.xvector.fi" style="color: #ccff00; text-decoration: none;">www.xvector.fi</a>
                                </p>
                            </div>
                        </div>
                    `,
                };

                await transporter.sendMail(applicantMailOptions);

                res.status(200).json({ status: 'success' });
                resolve();
            } catch (error) {
                console.error('Email send error:', error);
                res.status(500).json({ error: 'Could not send email' });
                resolve();
            }
        });
    });
}
