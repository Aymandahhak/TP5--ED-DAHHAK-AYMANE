const { exec } = require('child_process');
const services = ['authentification', 'produit', 'commande', 'livraison'];

services.forEach(service => {
  exec(`cd ${service} && npm install && npm start`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting ${service}: ${error}`);
      return;
    }
    console.log(`${service} output: ${stdout}`);
  });
});