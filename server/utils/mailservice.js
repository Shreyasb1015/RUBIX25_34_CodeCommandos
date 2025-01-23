import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS_KEY,
  },
});


export const sendTeamInviteEmail = async (user, team, hackathon) => {
  const acceptUrl = `http://${process.env.FRONTEND_URL}/api/v1/teams/accept-invite?teamId=${team._id}&userId=${user._id}`;
  const declineUrl = `http://${process.env.FRONTEND_URL}/api/team/decline-invite?teamId=${team._id}&userId=${user._id}`;


  const filePath = path.join(__dirname, '../views/teamInviteEmail.html');
  let htmlTemplate = fs.readFileSync(filePath, 'utf8');
  htmlTemplate = htmlTemplate
    .replaceAll('{{teamName}}', team.name)
    .replace('{{hackathonName}}', hackathon.name)
    .replace('{{hackathonDetails}}', hackathon.description || 'No details available')
    .replace('{{acceptUrl}}', acceptUrl)
    .replace('{{declineUrl}}', declineUrl);

  await transporter.sendMail({
    to: user.email,
    subject: `Invitation to join ${team.name} for ${hackathon.name}`,
    html: htmlTemplate,
  });
};
