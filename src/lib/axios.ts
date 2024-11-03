import { env } from '@/lib/env';
import axios from 'axios';

const backendInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

export { backendInstance };
