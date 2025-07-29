# MERN Stack Docker Setup

A complete Docker setup for MERN (MongoDB, Express.js, React, Node.js) stack with separate development and production configurations.

## 🚀 Features

- **Development Environment**: Hot reload for both frontend and backend
- **Production Environment**: Optimized builds with Nginx reverse proxy
- **Docker Networks**: Secure internal communication in production
- **Environment Management**: Separate configurations for dev/prod
- **Database Initialization**: Automated MongoDB setup with sample data
- **Security**: Non-root user in production, proper environment variables

## 📁 Project Structure

```
mern-app/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── nginx.conf
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.dev
├── .env.prod
├── mongo-init.js
└── README.md
```

## 🛠️ Prerequisites

- Docker Desktop installed
- Docker Compose installed
- Node.js knowledge for MERN stack development

## ⚙️ Environment Configuration

### Development (.env.dev)
```env
NODE_ENV=development
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
MONGO_DATABASE=mernapp_dev
JWT_SECRET=dev_jwt_secret_key_12345
BACKEND_PORT=5000
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.prod)
```env
NODE_ENV=production
MONGO_ROOT_USERNAME=your_prod_username
MONGO_ROOT_PASSWORD=your_secure_prod_password
MONGO_DATABASE=mernapp_prod
JWT_SECRET=your_super_secure_jwt_secret_key_for_production
BACKEND_PORT=5000
VITE_API_URL=http://localhost/api
```

> ⚠️ **Important**: Change the production credentials before deploying!

## 🚀 Quick Start

### Development Environment

1. **Clone and setup your project**
   ```bash
   git clone <your-repo>
   cd mern-app
   ```

2. **Start development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d
   ```

3. **Access your application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

4. **View logs**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

### Production Environment

1. **Update production environment variables**
   ```bash
   # Edit .env.prod with your production values
   nano .env.prod
   ```

2. **Build and start production**
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
   ```

3. **Access your application**
   - Frontend: http://localhost (port 80)
   - Backend: Internal network only
   - MongoDB: Internal network only

## 📋 Available Commands

### Development Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Clean database (remove volumes)
docker-compose -f docker-compose.dev.yml down -v

# Rebuild specific service
docker-compose -f docker-compose.dev.yml up -d --build backend
```

### Production Commands
```bash
# Build and start production
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production
docker-compose -f docker-compose.prod.yml down

# Update production (rebuild and restart)
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build --force-recreate
```

### Utility Commands
```bash
# Execute commands in running containers
docker exec -it mern_backend_dev bash
docker exec -it mern_mongo_dev mongosh

# Check container status
docker-compose -f docker-compose.dev.yml ps

# Clean up everything (images, containers, volumes)
docker system prune -a --volumes
```

## 🔧 Development Setup

### Frontend (React + Vite)
Your `frontend/package.json` should include:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.7.1",
    "@tailwindcss/vite": "^4.1.11",
    "tailwindcss": "^4.1.11",
    "axios": "^1.11.0"
  }
}
```

### Backend (Node.js + Express)
Your `backend/package.json` should include:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.16.5",
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express-validator": "^7.2.1",
    "jsonwebtoken": "^9.0.2",
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^30.0.5"
  }
}
```

## 🔒 Security Features

### Development
- All ports exposed for easy debugging
- Volume mapping for hot reload
- Development dependencies included

### Production
- Only frontend port (80) exposed externally
- Backend and database communicate via internal Docker network
- Multi-stage build for optimized image size
- Non-root user for backend container
- Nginx reverse proxy with security headers
- Production-only dependencies

## 🗄️ Database Setup

The `mongo-init.js` script automatically:
- Creates required collections (`users`, `posts`)
- Sets up indexes for performance
- Inserts sample admin user
- Configures database structure

### Connecting to MongoDB
```javascript
// In your backend code
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
```

## 🌐 API Proxy Configuration

In production, Nginx automatically proxies API requests:
- Frontend requests to `/api/*` → Backend server
- Static files served directly by Nginx
- Gzip compression enabled
- Security headers added

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :5000
   # Kill the process or change port in .env file
   ```

2. **Environment variables not loading**
   ```bash
   # Make sure you're using --env-file flag
   docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d
   ```

3. **Hot reload not working**
   ```bash
   # Ensure volume mapping is correct and restart
   docker-compose -f docker-compose.dev.yml down
   docker-compose -f docker-compose.dev.yml --env-file .env.dev up -d
   ```

4. **Database connection issues**
   ```bash
   # Check if MongoDB is running
   docker-compose -f docker-compose.dev.yml ps
   # Check logs
   docker-compose -f docker-compose.dev.yml logs mongodb
   ```

### Reset Everything
```bash
# Nuclear option - removes everything
docker-compose -f docker-compose.dev.yml down -v
docker system prune -a --volumes
```

## 📝 Development Workflow

1. **Start development environment**
2. **Make changes to your code** (hot reload works automatically)
3. **Test your changes** in the browser
4. **Commit your code**
5. **Test in production environment** before deploying
6. **Deploy to production server**

## 🚢 Deployment

For production deployment:

1. **Update `.env.prod`** with your production values
2. **Copy files to your server**
3. **Run production commands**
4. **Set up SSL certificates** (recommended)
5. **Configure domain name** (optional)

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both dev and prod environments
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🎉**