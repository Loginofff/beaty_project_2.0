// const path = require('path');

// module.exports = {
//   webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname);
//     return config;
//   }
// }; r

module.exports = {
    async rewrites() {
        return [
            {
                source:'/api/:path*',
                destination:'http://localhost:8080/api/:path*'
            }
        ]
    }
     
}
const nextConfig = {
    typescript: {
       ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;


