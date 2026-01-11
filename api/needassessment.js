const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { teamName, email, phone, teamCount, idea, totalScore, stage, scores, questionSummary } = req.body;

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
        // 1. Send notification to XVector team
        const teamMailOptions = {
            from: '"XVector Need Assessment" <info@xvector.fi>',
            to: 'saroj.bhandari@cogknit.io, rajkumar.shrestha@xvector.fi',
            replyTo: email,
            subject: `New Need Assessment: ${teamName} (${stage})`,
            text: `
Team Name: ${teamName}
Members: ${teamCount}
Email: ${email}
Phone: ${phone}
Idea: ${idea}

ASSESSMENT RESULTS
------------------
Total Score: ${totalScore}/30
Stage: ${stage}

Breakdown:
1. Clarity: ${scores.clarity}/5
2. Discovery: ${scores.discovery}/5
3. Readiness: ${scores.readiness}/5
4. Market: ${scores.market}/5
5. Business: ${scores.business}/5
6. Execution: ${scores.execution}/5

${questionSummary}
            `.trim(),
        };

        await transporter.sendMail(teamMailOptions);

        // 2. Send confirmation email to applicant
        const applicantMailOptions = {
            from: '"XVector Team" <info@xvector.fi>',
            to: email,
            subject: '🚀 Need Assessment Received - XVector',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px 20px;">
                    <h2 style="color: #ccff00; margin-bottom: 20px;">Assessment Received!</h2>
                    
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hi ${teamName},
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for completing the <strong>XVector Need Assessment</strong>. We have received your results and are analyzing your startup's current stage.
                    </p>
                    
                    <div style="background: rgba(204, 255, 0, 0.1); border: 1px solid #ccff00; padding: 20px; border-radius: 8px; margin: 30px 0;">
                        <h3 style="color: #ccff00; margin-top: 0;">Your Results</h3>
                        <p style="font-size: 18px; margin-bottom: 5px;">Stage: <strong>${stage}</strong></p>
                        <p style="font-size: 18px; margin-top: 0;">Total Score: <strong>${totalScore}/30</strong></p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        We will follow up with your personalized journey soon. In the meantime, join our community of founders!
                    </p>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="https://chat.whatsapp.com/KX7NxXJkDTG4Y8VikyoQPP" style="display: inline-block; background: #ccff00; color: #000; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">💬 Join XVector Community</a>
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
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ error: 'Could not send email' });
    }
}
