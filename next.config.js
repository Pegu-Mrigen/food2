/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            
            {protocol:"https",hostname:"*.googleusercontent.com"},
            {protocol:"https",hostname:"firebasestorage.googleapis.com"},
        ]
    },
    
    webpack: (config) => {
      config.resolve.fallback = { fs: false,
        path: false };
  
      return config;
    },
    
}






