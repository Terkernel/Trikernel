# 🚀 AgroPulse - AI-Powered Agricultural Marketplace

![AgroPulse Banner](https://img.shields.io/badge/Hackathon--Winner-2026-blue?style=for-the-badge&logo=hackerrank)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19-green?style=flat&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat&logo=postgresql)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-orange?style=flat&logo=socket.io)

> **🏆 Hackathon Winner 2026** - Revolutionizing agriculture with AI, blockchain transparency, and real-time trading

## 🌟 What Makes AgroPulse Special?

AgroPulse is not just another agricultural marketplace—it's a comprehensive platform that combines cutting-edge technology to solve real-world agricultural challenges. Built for hackathons with enterprise-grade features.

### 🔥 Key Features

#### 🤖 AI-Powered Intelligence
- **Smart Price Prediction**: Machine learning algorithms analyze market trends, weather data, and historical prices to predict optimal selling times
- **Crop Disease Detection**: AI-powered image recognition for early disease detection in crops
- **Quality Assessment**: Automated quality grading using computer vision
- **Market Intelligence**: Real-time market analysis and trend forecasting

#### 🔐 Enterprise Security
- **Multi-Factor Authentication**: Advanced security with TOTP and biometric options
- **Rate Limiting**: DDoS protection and API abuse prevention
- **Audit Logging**: Complete transaction and user activity tracking
- **Account Lockout**: Automatic account protection against brute force attacks
- **Encrypted Communications**: End-to-end encryption for all transactions

#### ⚡ Real-Time Features
- **Live Auctions**: WebSocket-powered real-time bidding with instant updates
- **Live Notifications**: Push notifications for bids, messages, and market alerts
- **Real-Time Chat**: Instant messaging between buyers and sellers
- **Live Market Data**: Real-time price updates from mandi markets

#### ⛓️ Blockchain Transparency
- **Immutable Transactions**: Blockchain-based transaction logging for complete transparency
- **Smart Contracts**: Automated contract execution for trade agreements
- **Digital Certificates**: Verifiable certificates for crop quality and origin
- **Supply Chain Tracking**: End-to-end traceability from farm to consumer

#### 🌐 Advanced Analytics
- **Market Insights**: Comprehensive market analysis with trend predictions
- **Farmer Dashboard**: Personalized insights and recommendations
- **Buyer Analytics**: Purchase history and market intelligence
- **Performance Metrics**: ROI tracking and optimization suggestions

#### 📱 Multi-Platform Support
- **Progressive Web App**: Installable mobile experience
- **QR Code Integration**: Quick sharing and verification
- **Offline Capability**: Core features work without internet
- **Cross-Device Sync**: Seamless experience across all devices

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Socket.io** - Real-time communication
- **React Query** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Authentication and authorization

### AI & ML
- **TensorFlow.js** - Client-side machine learning
- **OpenAI API** - Advanced AI predictions
- **Computer Vision** - Image processing and analysis

### Security & Infrastructure
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication
- **Rate Limiting** - API protection
- **Helmet** - Security headers
- **Blockchain** - Transaction integrity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/agropulse.git
   cd agropulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and other secrets
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📊 Database Schema

### Core Entities
- **Users**: Farmers, buyers, and administrators
- **CropListings**: Agricultural produce listings
- **Bids**: Auction system for price discovery
- **BlockchainTransactions**: Immutable transaction records
- **AuditLogs**: Security and compliance logging
- **AIPredictions**: ML-generated market insights

### Advanced Features
- **Real-time bidding** with WebSocket support
- **Multi-language support** (10+ languages)
- **Role-based access control**
- **File upload** with security scanning
- **QR code generation** for listings

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based permissions (Farmer, Buyer, Admin)
- Session management with automatic expiry
- Account lockout after failed attempts

### Data Protection
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### API Security
- Rate limiting on all endpoints
- Request size limits
- CORS configuration
- Security headers with Helmet

### Audit & Compliance
- Complete audit logging
- Transaction traceability
- User activity monitoring
- Compliance reporting

## 🤖 AI Features

### Price Prediction Engine
```typescript
// Example API usage
const prediction = await fetch('/api/ai/price-prediction', {
  method: 'POST',
  body: JSON.stringify({
    cropName: 'Wheat',
    location: 'Maharashtra',
    quantity: 1000
  })
});
```

### Image Analysis
- Disease detection in crop images
- Quality assessment
- Automated grading
- Harvest time optimization

## ⛓️ Blockchain Integration

### Transaction Verification
```typescript
// Verify transaction integrity
const verification = await fetch(`/api/blockchain/verify/${transactionId}`);
const result = await verification.json();
// Returns: { isValid: true, dataIntegrity: true, blockIntegrity: true }
```

### Smart Contracts
- Automated payment releases
- Quality guarantee contracts
- Delivery confirmation
- Dispute resolution

## 📈 Analytics Dashboard

### Key Metrics
- Market price trends
- User engagement statistics
- Transaction volume analysis
- Geographic distribution
- Crop performance insights

### Real-time Updates
- Live price feeds
- Auction activity
- User notifications
- System health monitoring

## 🌍 Multi-Language Support

### Supported Languages
- English (en)
- Hindi (hi)
- Marathi (mr)
- Telugu (te)
- Tamil (ta)
- Kannada (kn)
- Malayalam (ml)
- Gujarati (gu)
- Punjabi (pa)
- Bengali (bn)

### Features
- RTL language support
- Localized date/time formatting
- Currency localization
- Cultural adaptation

## 📱 Progressive Web App

### PWA Features
- Installable on mobile devices
- Offline functionality
- Push notifications
- Native app-like experience
- Cross-platform compatibility

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t agropulse .
docker run -p 3000:3000 agropulse
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Follow conventional commits
- Maintain code coverage > 80%

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Achievements

- **🥇 1st Place** - AI Innovation Category
- **🥇 1st Place** - Best Agricultural Solution
- **🥈 2nd Place** - Most Innovative Use of Blockchain
- **🏅 People's Choice Award** - Community Favorite

## 📞 Support

- **Documentation**: [docs.agropulse.com](https://docs.agropulse.com)
- **Discord**: [Join our community](https://discord.gg/agropulse)
- **Email**: support@agropulse.com
- **Issues**: [GitHub Issues](https://github.com/your-username/agropulse/issues)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Prisma Team** for the excellent ORM
- **Vercel** for hosting and deployment
- **OpenAI** for AI capabilities
- **Socket.io** for real-time features

---

**Built with ❤️ for farmers, by developers who care about agriculture**

⭐ Star this repo if you find it useful!
