if (process.env.NODE_ENV === 'production') {
  const child_process = require('child_process');
  const path = require('path');

  const webpackExec = `${path.resolve(process.cwd(), 'node_modules/.bin/webpack')}`;
  const file = `${path.resolve(__dirname, 'webpack/webpack.production.config.js')}`;
  const command = `${webpackExec} -p --config ${file}`;

  console.log('Building production bundle...');

  child_process.exec(command, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`warnings: ${stderr}`);
    console.log('Bundle complete!');
    if (error !== null) {
      console.log(`Bundle execution failed: ${error}`);
    }
  });
}
