var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports={
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://kys061:multivision@ds027749.mongolab.com:27749/multivision',
        port: process.env.PORT || 80
    }
}