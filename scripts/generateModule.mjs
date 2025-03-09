import { exec } from 'child_process';

const moduleName = process.argv[2];


if (!moduleName) {
  console.error('Please provide a module name.');
  process.exit(1);
}

exec(`nest generate module ${moduleName} && nest generate controller ${moduleName} && nest generate service ${moduleName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});