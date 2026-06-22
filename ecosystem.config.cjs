// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'Portofolio Aan',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};   
