import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { getBlogPool } from '../server/blogDatabase.js';

dotenv.config();

const sql = await fs.readFile(path.join(process.cwd(), 'migrations', '001_blog.sql'), 'utf8');
await getBlogPool().query(sql);
console.log('Blog migration completed.');
await getBlogPool().end();
