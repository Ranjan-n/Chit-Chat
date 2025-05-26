# Chit-Chat

A modern, scalable real-time chat application built with a microservices architecture using Turborepo.

## 🚀 Overview

Chit-Chat is a feature-rich chat application that demonstrates the power of modern web technologies and microservices architecture. Built using Turborepo for monorepo management, it provides a seamless real-time communication experience with features like instant messaging, real-time updates, and efficient message queuing.

## 🏗️ Architecture

The project is structured as a monorepo with multiple apps and shared packages:

### Applications (`/apps`)

- `frontend`: The main web client application built with NextJS and TailwindCSS
- `backend`: REST API server built with ExpressJS
- `websocket`: WebSocket server for real-time communication
- `worker`: Background job processor using BullMQ

### Shared Packages (`/packages`)

- `db`: Database models and migrations
- `common`: Shared utilities and types
- `common-backend`: Shared backend utilities
- `typescript-config`: Shared TypeScript configuration

## 🛠️ Tech Stack

- **Frontend**: 
  - NextJS for server-side rendering and routing
  - TypeScript for type safety
  - TailwindCSS for modern, utility-first styling
  - Zustand for efficient state management
- **Backend**: 
  - NodeJS runtime environment
  - ExpressJS for REST API
  - TypeScript for enhanced development experience
- **Real-time Communication**: 
  - WebSocket for bidirectional communication
- **Message Queue**:
  - Redis for in-memory data storage
  - BullMQ for reliable job queuing and processing
- **Development Tools**:
  - Turborepo for monorepo management
  - PNPM for fast, disk-space efficient package management
  - TypeScript for static type checking

## 🚦 Getting Started

### Prerequisites

- Node.js >= 18
- PNPM >= 9.0.0
- Redis server (for message queuing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ranjan-n/Chit-Chat
cd Chit-Chat
```

2. Install dependencies:

```bash
pnpm install
```

### Development

Run all applications in development mode:

```bash
pnpm run dev
```

### Building

Build all applications and packages:

```bash
pnpm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [BullMQ Documentation](https://docs.bullmq.io/)
