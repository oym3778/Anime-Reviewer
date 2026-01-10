# Revo — Anime Review & AI Insight Platform

Revo is a full-stack React web application that allows users to create accounts, search anime via the AniList GraphQL API, write personalized reviews, and receive AI-generated insights comparing their tastes with friends.

The project focuses on user-generated content, social discovery, and AI-powered recommendations, built with scalable frontend architecture and Firebase-backed persistence.

---

## 🚀 Key Features (Implemented)

- 🔐 **User Authentication** using Firebase Authentication  
- 🔍 **Anime Search & Discovery** powered by the AniList GraphQL API  
- 📝 **User Reviews** stored per-anime and per-user using Firestore
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

## 📸 Progress & UI Screenshots

Below are snapshots of Revo’s current functionality and UI as development progresses.

### Authentication
<img width="2588" height="1308" alt="signin_login" src="https://github.com/user-attachments/assets/6757d703-d4aa-4172-9a25-f39536eea49e" />

### Anime Search & Discovery
<img width="1300" height="1306" alt="search" src="https://github.com/user-attachments/assets/0932368d-8dc1-4cf0-b65e-7152641a6eb8" />

### Reviews Overview
<img width="1301" height="1305" alt="reviews" src="https://github.com/user-attachments/assets/b389045b-b1df-47d5-b79c-714fcea11d03" />

### Individual Review Page
<img width="1302" height="1304" alt="review" src="https://github.com/user-attachments/assets/023f5384-1d36-45f6-aa2d-7ddae2ae4c68" />

### User Profile
<img width="1300" height="1304" alt="profile" src="https://github.com/user-attachments/assets/b288cdd6-a055-4b71-9077-e040855358fd" />

### Friends & Social Discovery
<img width="1301" height="1304" alt="friends" src="https://github.com/user-attachments/assets/8ef92c41-55d2-41bf-ba4d-6f58060bd80e" />

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
