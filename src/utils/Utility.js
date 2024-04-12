import fs from 'fs';
import path from 'path';

const loadEnv = () => {
    const envPath = path.resolve(process.cwd(), '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envLines = envFile.split('\n');

    for (const line of envLines) {
        if (line.trim() && !line.startsWith('#')) {
            const [key, value] = line.split('=');
            process.env[key.trim()] = value.trim();
        }
    }
};

export default loadEnv