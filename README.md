# WhatsApp Gateway Frontend

A modern, beautiful WhatsApp Gateway dashboard built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS v4**.

![Landing Page](https://via.placeholder.com/800x400?text=WhatsApp+Gateway+Dashboard)

## ✨ Features

- 🎨 **Modern UI** - Dark theme with glassmorphism effects
- 📱 **Multi-Device Management** - Connect and manage multiple WhatsApp accounts
- 💬 **Bulk Messaging** - Send messages to thousands of contacts
- 📊 **Real-time Analytics** - Track message delivery and engagement
- 🔐 **Secure Authentication** - JWT-based auth with role management
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Vue 3
- **Styling**: Tailwind CSS v4
- **Charts**: Chart.js
- **Real-time**: Socket.io Client

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (whatsapp-gateway-be)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/whatsapp-gateway-fe.git
   cd whatsapp-gateway-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `.env` file:
   ```env
   NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Navigate to `http://localhost:3000`

---

## 🏭 Production Deployment

### Option 1: Standard Node.js Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment**
   ```env
   NUXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
   ```

3. **Start the server**
   ```bash
   node .output/server/index.mjs
   ```

### Option 2: PM2 (Recommended for VPS)

1. **Install PM2 globally**
   ```bash
   npm install -g pm2
   ```

2. **Build and start**
   ```bash
   npm run build
   pm2 start .output/server/index.mjs --name "wa-gateway-fe"
   ```

3. **Enable auto-restart on reboot**
   ```bash
   pm2 startup
   pm2 save
   ```

### Option 3: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine
   WORKDIR /app
   COPY --from=builder /app/.output .output
   ENV NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   EXPOSE 3000
   CMD ["node", ".output/server/index.mjs"]
   ```

2. **Build and run**
   ```bash
   docker build -t wa-gateway-fe .
   docker run -p 3000:3000 -e NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api wa-gateway-fe
   ```

---

## 🌐 Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📁 Project Structure

```
whatsapp-gateway-fe/
├── app/
│   ├── assets/css/      # Global styles
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables (useAuth, useDevices, etc.)
│   ├── layouts/         # Page layouts
│   ├── middleware/      # Route middleware
│   └── pages/           # Application pages
├── public/              # Static assets
├── nuxt.config.ts       # Nuxt configuration
└── package.json
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run generate` | Generate static site |

---

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:3001/api` |

---

## 📄 License

MIT License © 2026

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
