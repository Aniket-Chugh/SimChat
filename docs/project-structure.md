backend/
│
├── src/
│
│   ├── api/                          # API Layer
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   ├── message.routes.js
│   │   │   ├── ai.routes.js
│   │   │   └── collaboration.routes.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   ├── message.controller.js
│   │   │   ├── ai.controller.js
│   │   │   └── collaboration.controller.js
│
│
│   ├── services/                     # Business Logic Layer
│   │   ├── auth.service.js
│   │   ├── chat.service.js
│   │   ├── message.service.js
│   │   ├── presence.service.js
│   │   ├── notification.service.js
│   │   └── collaboration.service.js
│
│
│   ├── ai/                           # AI Engine Layer
│   │   │
│   │   ├── agents/
│   │   │   ├── chatAgent.js
│   │   │   ├── meetingAgent.js
│   │   │   └── taskAgent.js
│   │   │
│   │   ├── pipelines/
│   │   │   ├── summarizeConversation.js
│   │   │   ├── generateReply.js
│   │   │   ├── extractTasks.js
│   │   │   └── semanticSearch.js
│   │   │
│   │   ├── embeddings/
│   │   │   ├── embeddingService.js
│   │   │   └── vectorSearch.js
│   │   │
│   │   ├── prompts/
│   │   │   ├── summarization.prompt.js
│   │   │   ├── replySuggestion.prompt.js
│   │   │   └── taskExtraction.prompt.js
│   │   │
│   │   └── providers/
│   │       ├── openai.provider.js
│   │       ├── localLLM.provider.js
│   │       └── whisper.provider.js
│
│
│   ├── realtime/                     # WebSocket Infrastructure
│   │   ├── socketServer.js
│   │   ├── events/
│   │   │   ├── message.events.js
│   │   │   ├── typing.events.js
│   │   │   ├── presence.events.js
│   │   │   └── reaction.events.js
│
│
│   ├── queues/                       # Async Workers
│   │   ├── message.queue.js
│   │   ├── ai.queue.js
│   │   ├── notification.queue.js
│   │   └── workers/
│   │       ├── message.worker.js
│   │       ├── ai.worker.js
│   │       └── notification.worker.js
│
│
│   ├── search/                       # Smart Search System
│   │   ├── elastic.client.js
│   │   ├── messageIndex.js
│   │   └── search.service.js
│
│
│   ├── repositories/                 # Database Layer
│   │   ├── user.repository.js
│   │   ├── chat.repository.js
│   │   ├── message.repository.js
│   │   ├── task.repository.js
│   │   └── file.repository.js
│
│
│   ├── models/                       # Database Models
│   │   ├── user.model.js
│   │   ├── chat.model.js
│   │   ├── message.model.js
│   │   ├── task.model.js
│   │   └── file.model.js
│
│
│   ├── infrastructure/               # External Systems
│   │   ├── database/
│   │   │   ├── mysql.js
│   │   │   └── migrations/
│   │   │
│   │   ├── redis/
│   │   │   └── redisClient.js
│   │   │
│   │   ├── storage/
│   │   │   └── s3Storage.js
│   │   │
│   │   └── vectorDB/
│   │       └── pineconeClient.js
│
│
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── rateLimiter.js
│   │   ├── validation.middleware.js
│   │   └── errorHandler.js
│
│
│   ├── utils/
│   │   ├── logger.js
│   │   ├── jwt.js
│   │   ├── responseFormatter.js
│   │   └── idGenerator.js
│
│
│   ├── config/
│   │   ├── env.js
│   │   ├── ai.config.js
│   │   └── socket.config.js
│
│
│   ├── app.js
│   └── server.js
│
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
│
├── docs/
│   ├── architecture.md
│   ├── api-spec.md
│   └── system-design.md
│
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
│
├── scripts/
│   ├── seedDatabase.js
│   └── startWorkers.js
│
│
├── .env
├── package.json
└── README.md
