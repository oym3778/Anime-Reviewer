# Revo — Anime Review & AI Insight Platform

Revo is a full-stack React web application that allows users to create accounts, search anime via the AniList GraphQL API, write personalized reviews, and receive AI-generated insights comparing their tastes with friends.

The project focuses on user-generated content, social discovery, and AI-powered recommendations, built with scalable frontend architecture and Firebase-backed persistence.

---

## 🚀 Key Features (Implemented)

- 🔐 **User Authentication** using Firebase Authentication  
- 🔍 **Anime Search & Discovery** powered by the AniList GraphQL API  
- 📝 **User Reviews** stored per-anime and per-user using Firestore
- 🤖 **AI-Powered Review Insights** generated via Google’s AI API, analyzing similarities and differences between users’ reviews (In Progress)
- 🧠 **Custom Auth Hook (`useUser`)** to centralize Firebase auth logic and handle real-time auth state changes  
- 🧭 **Multi-Page Routing** with reusable components and clean separation of concerns  

---

## 🧠 AI Insight Feature (In Progress)

Revo integrates Google’s AI API to analyze review text and generate:

- Comparative insights between users’ anime preferences  
- Highlighted similarities and differences in themes and tone  
- Personalized recommendations for future anime to watch  

The AI feature is designed to be informative, entertaining, and contextual, enhancing social discovery rather than replacing user opinion.

---

## 🛠 Tech Stack

### Frontend
- React  
- JavaScript (Vite)  
- Tailwind CSS  

### APIs & Services
- AniList GraphQL API  
- Google AI API  

### Backend / Data
- Firebase Authentication  
- Firebase Firestore  

### Tooling
- ESLint  
- Prettier  

---

## 🏗 Architecture Notes

- Reviews are stored using a key–value mapping where each review is tied to a unique AniList anime ID.  
- Firebase logic is encapsulated in a shared configuration layer to keep authentication and persistence concerns isolated from UI components.  
- Designed with scalability in mind to support future social features such as friend connections and shared activity feeds.  

---

## 📌 Current Status

Revo is actively under development. Core functionality is implemented, with additional social features and UI polish in progress.

---

## ▶️ Running Locally

```bash
npm install
npm run dev
