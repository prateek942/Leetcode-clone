# 🚀 LeetCode Clone

A full-featured coding challenge platform built with **Next.js 13**, **TypeScript**, **MongoDB**, and **TailwindCSS**. Practice algorithmic problems, get instant feedback with automatic test case evaluation, and track your progress.

**Built by [Prateek Kumar Pandey](https://github.com/)**

---

## ✨ Features

- **🔐 User Authentication** — Secure sign up, sign in, and sign out with session-based auth
- **📝 10+ Coding Problems** — Diverse set of algorithmic challenges (Two Sum, Jump Game, Reverse Linked List, etc.)
- **▶️ Code Execution** — Write Python code directly in the browser and run it against test cases
- **✅ Automatic Test Case Evaluation** — Submit solutions and get instant pass/fail feedback
- **👍 Like / Dislike / Favorite** — Interact with problems like the real LeetCode
- **📊 User Dashboard** — Track solved problems, likes, and progress
- **🎉 Confetti Animation** — Celebration effect when you solve a problem
- **⏱️ Built-in Timer** — Track how long you spend on each problem
- **📱 Responsive Design** — Works on desktop and mobile
- **🌙 Dark Theme** — Easy on the eyes for late-night coding sessions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 13, React 18, TypeScript |
| **Styling** | TailwindCSS |
| **Code Editor** | CodeMirror (VS Code theme) |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB with Mongoose |
| **Authentication** | Custom session tokens with HMAC-SHA256 |
| **Code Execution** | Python Shell |
| **Notifications** | React Toastify |

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── accounts/
│   │   ├── dashboard/        # User profile & problem list
│   │   ├── problems/[id]/    # Problem workspace (editor + description)
│   │   ├── signIn/           # Sign in page
│   │   └── signUp/           # Sign up page
│   ├── api/
│   │   ├── auth/             # Sign in, sign up, sign out, profile
│   │   ├── handler/          # Like, dislike, favorite, solved handlers
│   │   ├── languages/python/ # Code run & submit endpoints
│   │   └── utils/            # Problem sets & user verification
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Landing page
├── assets/                   # Static images
├── components/
│   ├── Footer/               # Footer component
│   ├── Header/               # Navigation bars (landing, account, problem, playground)
│   ├── Timer/                # Coding timer
│   ├── Workspace/            # Code editor + problem description + console
│   └── home/                 # Landing page content
├── database/                 # MongoDB connection config
├── helpers/                  # Encryption & TypeScript types
├── hooks/                    # Custom React hooks (localStorage, windowSize)
├── middleware.ts             # Route protection middleware
└── models/                   # Mongoose schemas (User, Problem)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Python 3** (for code execution)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/leetcode-clone.git
   cd leetcode-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB connection string:
   ```env
   MONGO_URL="mongodb://localhost:27017/Leet-code-2023"
   SECRET_KEY="your-secret-key-here"
   TOKEN_NAME="User-Token"
   ```

4. **Import problem data into MongoDB**
   ```bash
   mongoimport --db Leet-code-2023 --collection problems --file problem.json --jsonArray
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

| Landing Page | Problem List |
|:---:|:---:|
| Landing page with animations | Dashboard with problem list |

| Code Editor | User Profile |
|:---:|:---:|
| Split-pane editor with test cases | Profile with stats |

---

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/Leet-code-2023` |
| `SECRET_KEY` | HMAC secret for password hashing | — |
| `TOKEN_NAME` | Cookie name for session token | `User-Token` |

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signUp` | Register a new user |
| `POST` | `/api/auth/signIn` | Login with email & password |
| `GET` | `/api/auth/signOut` | Logout (clears session cookie) |
| `GET` | `/api/auth/profile` | Get authenticated user profile |
| `GET` | `/api/utils/problemSets` | Get all problems |
| `GET` | `/api/utils/verifiedUserDetails` | Get current user details |
| `POST` | `/api/languages/python/run` | Run Python code |
| `POST` | `/api/languages/python/submit` | Submit solution for evaluation |
| `POST` | `/api/handler/handelLikedproblems` | Toggle like on a problem |
| `POST` | `/api/handler/handelDisLikedproblems` | Toggle dislike on a problem |
| `POST` | `/api/handler/handelFavoritesproblems` | Toggle favorite on a problem |
| `POST` | `/api/handler/handelSolvedproblems` | Update solved status |

---

## 🔮 Future Improvements

- [ ] Multi-language support (JavaScript, Java, C++)
- [ ] Judge0 API integration for sandboxed code execution
- [ ] Contest mode with leaderboards
- [ ] Discussion forum for each problem
- [ ] User statistics and solved streaks
- [ ] Dark/Light mode toggle
- [ ] Admin panel for problem management
- [ ] OAuth login (Google, GitHub)
- [ ] Redis caching for problem data
- [ ] Docker containerization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Prateek Kumar Pandey**

- GitHub: [@your-github-username](https://github.com/)
- Email: your-email@example.com

---

⭐ **Star this repo if you found it helpful!**
