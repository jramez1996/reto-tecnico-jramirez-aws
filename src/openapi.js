const fs = require('fs');
const path = require('path');
module.exports.openapi = async (event) => {
  try {
    const filePath = path.join(__dirname, '../openapi.yml'); // Asegúrate de que la ruta sea correcta
    let data = fs.readFileSync(filePath, 'utf8');
    const protocol = event.headers['X-Forwarded-Proto'] || 'http'; 
    const apiGatewayUrl = `${protocol}://${event.headers['Host']}`;
    data = data.replace('$$URL_APIGATEGAY',apiGatewayUrl);
    const metaPath = path.join(__dirname, '../.serverless/meta.json');
    let metaData = fs.readFileSync(metaPath, 'utf8');
    metaData = JSON.parse(metaData);
    const firstKey = Object.keys(metaData)[0];
    const outputs = metaData[firstKey].serviceProviderAwsCfStackOutputs.find((event)=>{ return event.OutputKey=="HttpApiUrl"});
    if(!(event.headers['Host'] && event.headers['Host'].includes('localhost')) ){
      data = data.replace('$$URL_APIGATEGAY', outputs.OutputValue);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-yaml',
        'Access-Control-Allow-Origin': '*', // Permitir todos los orígenes
      },
      body: data,
    };
  } catch (error) {
    console.error('Error loading openapi.yml:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

