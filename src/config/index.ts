import { development } from "./environments";
import { Environment } from "./types";


const env = import.meta.env.VITE_NODE_ENV as Environment ?? 'development';

const config = {
  development,
  //todo: add production and test configurations
  production: development,
  test: development,
} [env];

export default config;
