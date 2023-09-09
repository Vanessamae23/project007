import {createProxyMiddleware} from 'http-proxy-middleware';
import Config from 'react-native-config';

module.exports = app => {
  app.use(
    '/',
    createProxyMiddleware({
      target: `${Config.NODEJS_URL}`,
      changeOrigin: true,
    }),
  );
};
