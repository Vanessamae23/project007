import {createProxyMiddleware} from 'http-proxy-middleware';
import Config from 'react-native-config';

module.exports = app => {
  app.use(
    '/',
    createProxyMiddleware({
      target: `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}`,
      changeOrigin: true,
    }),
  );
};
