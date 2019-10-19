import { createRenderer } from 'vue-server-renderer';
import createApp from './entry-app';

export default (context = {}) => new Promise((resolve, reject) => {
  const { app, router } = createApp();

  if (!context.url) {
    resolve('404');
  }

  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new Error({ code: 404 }));
    }
    return createRenderer().renderToString(app, (err, html) => resolve(html));
  }, reject);
});
