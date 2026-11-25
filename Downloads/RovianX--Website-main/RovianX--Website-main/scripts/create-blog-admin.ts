import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { getBlogPool } from '../server/blogDatabase.js';

dotenv.config();

const [, , email, password] = process.argv;
if (!email || !password || password.length < 12) throw new Error('Usage: npm run blog:admin -- admin@example.com "A-password-at-least-12-chars"');
const hash = await bcrypt.hash(password, 12);
await getBlogPool().query(`INSERT INTO blog_admin_users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`, [email.toLowerCase(), hash]);
console.log(`Blog admin created or updated for ${email.toLowerCase()}.`);
await getBlogPool().end();
