import createApp from './entry-app';

const { app, router } = createApp();

router.onReady(() => {
  app.$mount('#app');
});
