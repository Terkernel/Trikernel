# Trikernel# 🌾 AgroPulse

> Real-time market intelligence and direct market access platform for farmers

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🐳 Run with Docker

The application source is inside [agropulse](agropulse). To run with Docker:

```bash
cd agropulse
docker compose up --build
```

App: `http://localhost:3000`  
PostgreSQL: `localhost:5432`

To stop:

```bash
docker compose down
```

---

## 📋 Project Details

| Field | Details |
|-------|---------|
| **Project Name** | AgroPulse |
| **Problem Statement ID** | CS03AE |
| **Team Name** | Trikernel |
| **College** | NMAMIT |

---

## 🚨 Problem Statement

Farmers often lack access to real-time market prices, reliable demand insights, and direct connections with buyers. Current agricultural marketplaces are dominated by middlemen, delayed price updates, and fragmented information sources, which results in:

- ❌ **Unfair pricing** for farmers
- ❌ **Low bargaining power**
- ❌ **Inability to decide** the right time and place to sell produce

This leads to **reduced farmer income** and **inefficient agricultural trade**.

---

## 💡 Proposed Solution

**AgroPulse** is a real-time market intelligence and direct market access platform designed specifically for farmers.

### The platform:

- 📊 **Aggregates live mandi prices** and market data
- 🤖 **Uses AI/ML** to predict price trends and suggest optimal selling times
- 🤝 **Enables direct farmer-to-buyer interaction**, removing middlemen
- ⚡ **Supports real-time bidding**, smart buyer–farmer matching, and transparent pricing

> AgroPulse transforms raw data into actionable intelligence, empowering farmers to make profitable decisions.

---

## ✨ Innovation & Creativity

What makes AgroPulse unique:

### 📈 Price Prediction Intelligence
AI-based forecasting helps farmers decide **when** to sell, not just where.

### 🔄 Real-Time Direct Market Access
Farmers list produce and buyers place live bids, ensuring fair competition.

### 🎯 Smart Matchmaking Engine
Buyers and farmers are matched based on distance, quantity, price expectations, and trust ratings.

### 📱 Farmer-First Design
Simple, mobile-first UI with regional language readiness and future voice-based interactions.

> Unlike existing platforms that only show prices, **AgroPulse guides decisions and enables action**.

---

## 🛠️ Technical Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js** (App Router) | React framework |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components |
| **TypeScript** | Type safety |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js Server Actions** | Server-side logic |
| **tRPC** | Type-safe APIs |
| **NextAuth** | Authentication |

### Database
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary database |
| **Neon** | Serverless PostgreSQL |

### AI / ML
| Technology | Purpose |
|------------|---------|
| **Python** | ML services |
| **Time-series models** | Price prediction |
| **Demand forecasting** | Market analysis |

### Real-Time Features
- WebSockets / Server-Sent Events for live bidding and price updates

### External Data Sources
- Government mandi price datasets
- Weather APIs for price-impact analysis

---

## � Complete Feature List

### 🔐 **Authentication & User Management**
- **Role-based Registration**: Separate sign-up flows for Farmers and Buyers
- **NextAuth Integration**: Secure session management with JWT tokens
- **Profile Management**: Create and update user profiles with profile pictures, contact details
- **Two-Factor Authentication (2FA)**: Enhanced security with email/SMS OTP verification
- **Security Audit**: Track login activity and authentication events
- **User Verification**: Email verification on account creation
- **Account Recovery**: Password reset functionality

### 👨‍🌾 **Farmer Features**

#### Crop Listing Management
- **Create Listings**: Add new crop listings with detailed information
  - Crop type, quality grade, quantity, price per unit
  - Harvest date, storage method, delivery options
  - Crop categorization (Grains, Vegetables, Fruits, etc.)
- **Manage Active Listings**: View, edit, and delete existing listings
- **Listing Statistics**: Track active listings, total sold, revenue generated
- **Bulk Upload**: Support for uploading multiple listings at once

#### AI-Powered Price Prediction
- **Smart Price Suggestions**: AI recommends optimal pricing for new listings
  - Based on crop type, quantity, current market trends
  - Considers historical prices and demand patterns
- **Price Trend Analysis**: View historical price movements
- **Optimal Selling Time**: AI suggests when to sell for maximum profit
- **Market Insights**: Understand demand patterns for different crops

#### Bid Management
- **Incoming Bids**: View and manage bids received from buyers
  - Bid amount, buyer information, bid timestamp
  - Accept/reject bid decisions
- **Bid Analytics**: Track bid statistics (total bids, acceptance rate)
- **Bid Notifications**: Real-time alerts for new incoming bids

#### Direct Communication
- **Messaging System**: Direct chat with interested buyers
- **Real-time Messages**: Instant message delivery and synchronization
- **Chat Search**: Find conversations with specific users
- **Contact History**: View recent conversations and contacts
- **Message Management**: Pin important messages, mark as read, delete messages
- **Negotiation Support**: Discuss pricing and delivery terms directly

#### Dashboard & Analytics
- **Farmer Dashboard**: 
  - Overview of active listings, pending bids, revenue
  - Quick access to recent activity
- **Recent Activity Feed**: Track recent bids and messages
- **Performance Metrics**: Monitor selling success and buyer ratings

#### AI Assistant Hub
- **Disease Detection**: AI-powered crop disease identification and prevention tips
- **Weather Analysis**: Local weather forecasting and impact on crops
- **Price Comparison**: Compare mandi prices across different markets
- **Soil Analysis**: Get soil health assessment and improvement recommendations
- **Government Schemes**: Information about agricultural subsidies and schemes
- **Negotiation Tips**: AI-powered negotiation guidance for better deals

### 🏪 **Buyer Features**

#### Browse & Search
- **Crop Marketplace**: Browse all available crop listings
- **Advanced Filtering**: Filter by:
  - Crop category (Grains, Vegetables, Fruits, etc.)
  - Location/State
  - Price range
  - Seller rating
  - Quality grade
- **Search Functionality**: Search by crop name or seller
- **Sorting Options**: Sort by price, rating, newest listings
- **Crop Details**: Detailed information on each listing with seller info

#### Smart Bidding System
- **Place Bids**: Submit bids on crop listings with custom amounts
- **Bid Management**: Track all placed bids in one location
- **My Bids Dashboard**: View bid status (pending, accepted, rejected)
- **Bid History**: Access past bids and completed transactions
- **Bid Statistics**: Monitor bid performance and success rate

#### Intelligent Matchmaking
- **Smart Recommendations**: AI-powered crop recommendations based on:
  - Buyer preferences and purchase history
  - Distance from farm location
  - Quality requirements
  - Budget constraints
  - Trust score matching
- **Personalized Suggestions**: Daily updated recommendations
- **Confidence Scores**: See match quality ratings

#### Direct Communication
- **Message Buyers/Farmers**: Chat directly with sellers about crops
- **Negotiation Support**: Discuss pricing, delivery, quantity
- **Message History**: Keep conversation records
- **Chat Notifications**: Get alerts for new messages

#### Buyer Dashboard
- **Shopping Overview**: Active bids, favorite crops, total spent
- **Quick Actions**: Easy access to browse crops, place bids, market view
- **Recommendations**: View personalized crop suggestions

#### AI Assistant Hub
- **Demand Forecasting**: Understand which crops are in demand
- **Price Analysis**: Analyze price trends for procurement planning
- **Quality Guidance**: Learn about different quality grades
- **Supply Chain Tips**: Get best practices for agricultural sourcing
- **Negotiation Support**: Tips for getting better deals

### 📊 **Market Intelligence Hub**
- **Live Mandi Prices**: Real-time government agricultural market prices
  - Data from Data.gov.in AGMARKET API
  - Price data across multiple states and mandis (markets)
  - Last update timestamp for reference
- **Price Comparison**: Compare prices across different mandis for same crop
- **Trending Crops**: Identify high-demand crops with price trends
- **Market Statistics**: 
  - Total price records synced
  - Number of unique crops tracked
  - Average prices across markets
  - Number of mandis monitored
- **Price History**: View historical price movements and trends
- **Market Forecasts**: AI predictions on upcoming price changes
- **Data Refresh**: Manually sync latest prices from government APIs
- **Export Analytics**: Download market data for analysis

### 💬 **Messaging & Chat System**
- **Real-Time Chat**: Send and receive messages instantly
- **Search Users**: Find farmers or buyers by name
- **Inbox**: View all conversations in one place
- **Recent Contacts**: Quick access to frequently contacted users
- **Message Status**: See when messages are delivered and read
  - Single checkmark: Sent
  - Double checkmark: Delivered and read
- **Message Actions**:
  - Pin important messages for quick reference
  - React to messages with emoji
  - Delete messages
  - Archive conversations
  - Mark as favorite
- **Typing Indicators**: See when other user is typing
- **Loading States**: Visual feedback during message operations
- **Error Handling**: Graceful error messages if delivery fails

### ⭐ **Rating & Trust System**
- **User Ratings**: Rate farmers and buyers after transactions
  - 5-star rating system
  - Written reviews
  - Verified badges for trusted users
- **Trust Scores**: Calculate user trustworthiness based on:
  - Number of transactions
  - Average rating
  - Response time
  - Bid acceptance rate
- **Review Visibility**: Show ratings and reviews on profiles
- **Trust Indicators**: Visual badges for high-trust users

### 🎯 **Smart Matchmaking Engine**
- **Algorithm**: Intelligent matching based on:
  - Geographic proximity
  - Price expectations alignment
  - Quality preferences
  - Quantity requirements
  - Trust score compatibility
- **Personalized Matches**: Different recommendations for each user
- **Match Confidence**: Show how well buyer and farmer align
- **Dynamic Updates**: Recommendations refresh as profiles change

### 🤖 **AI/ML Features**

#### Google Gemini AI Integration
- **Natural Language Processing**: Understand agricultural queries
- **Context-Aware Responses**: Provide relevant agricultural advice
- **Multi-topic Support**: Answer questions on various agricultural topics

#### Price Prediction Engine
- **Time-Series Analysis**: Predict future price movements
- **Seasonal Patterns**: Account for crop seasonality
- **Market Trends**: Consider overall market conditions
- **Accuracy**: ML models trained on historical price data

#### Market Intelligence
- **Demand Forecasting**: Predict which crops will be in demand
- **Crop Recommendations**: Suggest crops to sell based on market trends
- **Optimal Pricing**: Calculate best price for maximum profit
- **Seller Insights**: Provide actionable insights for farmers

### 🌐 **Multi-Language Support**
- **Supported Languages**: 
  - English (en)
  - Hindi (hi)
  - Kannada (kn)
  - Malayalam (ml)
  - Marathi (mr)
  - Tamil (ta)
  - Telugu (te)
- **Regional Language UI**: Full interface translation
- **Language Persistence**: Remember user's language preference
- **Dynamic Switching**: Change language without page reload

### 📲 **Dashboard Features**

#### Farmer Dashboard
- **Quick Stats**: Active listings, pending bids, messages count
- **New Listing CTA**: One-click access to create listings
- **Recent Bids**: See latest bids on your products
- **Active Listings Preview**: Quick view of your top 6 listings
- **Quick Actions**: Links to AI assistant, market prices, messaging
- **Rating & Reviews**: Your seller reviews and ratings

#### Buyer Dashboard
- **Quick Stats**: Active bids, favorite crops, total spent
- **Browse CTA**: Quick access to crop marketplace
- **Recommendations**: Personalized crop suggestions
- **Recent Activity**: Latest bid activities
- **Quick Actions**: Browse crops, market intelligence, AI help

### 🔔 **Notifications System**
- **Real-time Alerts**: Get notified of:
  - New bid received (for farmers)
  - Bid accepted/rejected (for buyers)
  - New messages
  - Rating received
- **Notification Dropdown**: Quick access to recent notifications
- **Notification Count**: Badge showing unread count
- **Notification Management**: Clear old notifications

### ⚙️ **User Settings & Preferences**
- **Profile Settings**: Update personal information
- **Account Security**: Change password, manage 2FA
- **Notification Preferences**: Control alert settings
- **Language Settings**: Choose preferred interface language
- **Logout**: Secure session termination

### 📦 **Product Management**
- **Crop Categories**: Organized by type:
  - 🌾 Grains
  - 🥬 Vegetables
  - 🍎 Fruits
  - 🌰 Nuts & Seeds
  - 🌽 Cash Crops
- **Quality Grades**: Classification system (Grade A, B, C)
- **Delivery Options**: Multiple delivery methods
- **Storage Methods**: Track crop storage conditions

### 🗺️ **Location-Based Features**
- **State Selection**: Filter by Indian states
- **Distance Calculation**: Show distance to farmers
- **Location Filtering**: Find products near you
- **Mandi Locations**: Track prices across multiple mandis
- **Regional Preferences**: Customize by region

### 📈 **Analytics & Reports**
- **Personal Statistics**: Track your activity
  - Revenue generated (farmers)
  - Money spent (buyers)
  - Transaction count
  - Success rate
- **Market Data Export**: Download for external analysis
- **Trend Analysis**: Visualize price trends over time

### � **Offline Support & PWA Features**
- **Progressive Web App (PWA)**: Install AgroPulse as a standalone app
  - Add to home screen on mobile and desktop
  - Offline access to previously loaded content
  - Fast loading with service worker caching
  - Works without constant internet connection
- **Offline Messaging**: Draft and queue messages while offline
  - Messages automatically sync when reconnected
  - View draft history and pending messages
  - Draft manager shows all pending actions
- **Offline Listing Creation**: Create crop listings offline
  - Save listing drafts locally
  - Submit to server when internet returns
  - Automatic sync with status tracking
- **Cached Data Access**: View previously loaded information
  - Browse cached crop listings
  - View historical market prices
  - Access cached conversations
  - Smart cache expiration (default 60 minutes)
- **Service Worker**: Advanced caching strategy
  - Network-first for API calls (fallback to cache)
  - Cache-first for static assets
  - Background sync for queued actions
  - Automatic data sync on reconnection
- **Offline Indicators**: Visual feedback about connectivity
  - Real-time online/offline status
  - Pending action count display
  - Sync status notifications
  - Draft manager with pending items count
- **App Shortcuts**: Quick access to key features
  - Browse Crops shortcut
  - My Listings shortcut
  - Messages shortcut
- **Installable**: Full PWA capabilities
  - Home screen icon with custom app name
  - Standalone app experience
  - Web app manifest configuration
  - iOS support with custom meta tags

### �🔐 **Security & Privacy Features**
- **Data Encryption**: Secure transmission of sensitive data
- **Session Management**: Automatic logout on inactivity
- **Audit Logs**: Track important account activities
- **Password Security**: Bcrypt hashing for passwords
- **API Security**: Protected endpoints with authentication

### 📱 **Responsive Design**
- **Mobile-First Approach**: Optimized for mobile and tablet
- **Desktop Experience**: Full feature access on desktop
- **Cross-Device Sync**: Seamless experience across devices
- **Touch-Friendly UI**: Easy navigation on touch devices

---

## 👥 Usability & Impact

### Target Users
- 👨‍🌾 **Farmers**: Small to medium-scale agricultural producers
- 🏪 **Agricultural buyers**: Retailers, wholesalers, exporters, processors

### User Interaction
| User | Key Actions |
|------|---------|
| **Farmers** | List crops → Receive bids → Negotiate → Direct chat → Get ratings |
| **Buyers** | Browse crops → Place bids → Chat with farmers → Rate experience |
| **Both** | View market intelligence → Get AI insights → Use AI assistant → Track transactions |

### Real-World Impact
- ✅ **Increased farmer income** (20–40%) through fair pricing
- ✅ **Reduced dependency** on intermediaries and middlemen
- ✅ **Faster market access** with real-time connections
- ✅ **Fair and transparent** agricultural trading ecosystem
- ✅ **Data-driven decisions** using AI price predictions
- ✅ **Reduced transaction time** through direct communication
- ✅ **Quality assurance** with rating and verification system
- ✅ **Market empowerment** through price intelligence

---

## 🚀 Setup Instructions
### Prerequisites

- **Node.js** (v18+)
- **Python** (v3.9+)
- **PostgreSQL** / Neon account

### Installation

```bash
# Clone the repository
git clone https://github.com/Terkernel/AgroPulse.gitcd agropulse

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### AI Service Setup

```bash
# Navigate to AI service folder
cd ai-service

# Install Python dependencies
pip install -r requirements.txt

# Run AI prediction service
python app.py
```

---

## 📁 Project Structure

```
agropulse/
├── prisma/              # Database schema
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── _components/ # React components
│   │   └── api/         # API routes
│   ├── server/          # Server-side code
│   │   ├── api/         # tRPC routers
│   │   └── auth/        # Authentication config
│   ├── styles/          # Global styles
│   └── trpc/            # tRPC client setup
└── ...
```

---

## 🔗 Links

| Resource | Link |
|----------|------|
| **Demo** | _To be added_ |
| **Presentation** | _To be added_ |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <strong>Team Trikernel of Hari, Saniya & Fragan</strong> | NMAMIT
</p>
