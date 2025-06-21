

---

## 📚 Quizzy

**The ultimate Grade 9 learning companion.**
Built with 💖 using ReactJS, TailwindCSS v4, and powered by a smart assistant — **Baraka AI**.

---

### 🚀 Features

* 🤖 **Baraka AI** – Built-in smart assistant for instant academic help
* 📘 **Multiple Choice Quizzes** – Fun, randomized & trackable quizzes
* 🧠 **Deep Revision Notes** – Bite-sized, clear and beautifully presented notes
* 🏆 **Achievements Page** – Unlock badges & celebrate learning milestones
* 📊 **Smart Dashboard** – Visualize your progress with graphs & charts
* 🔁 **Progress Tracking** – Monitor every quiz attempt and note revision
* 📡 **OTA Updates** – New content & features delivered instantly
* 📶 **Offline Capabilities** – Learn even without an internet connection
* 🎨 **Modern UI** – Clean, intuitive & mobile-friendly interface
* ✨ **Interactive UX** – Transitions, animations, and responsive elements

---

### 🧰 Tech Stack

| Tech                            | Description                             |
| ------------------------------- | --------------------------------------- |
| **ReactJS 19**                  | Frontend library                        |
| **TailwindCSS v4**              | Utility-first CSS styling               |
| **Vite**                        | Lightning-fast bundler                  |
| **PWA (via `vite-plugin-pwa`)** | Enables offline access & installability |
| **Chart.js + react-chartjs-2**  | Visual progress tracking                |
| **Lucide Icons + React Icons**  | Slick and consistent iconography        |
| **react-hot-toast**             | Instant user feedback                   |
| **Baraka AI**                   | Your in-app smart assistant             |

---

### 📦 Install & Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/quizzy.git
cd quizzy

# Install dependencies
npm install

# Run locally
npm run dev
```

---

### 🛠️ Available Scripts

| Script            | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the app in dev mode    |
| `npm run build`   | Build the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |

---

### 📁 Folder Structure (Core)

```
quizzy/
├─ public/              # Static files (audio, icons, manifest)
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/            # App pages like Dashboard, WelcomePage
│  ├─ hooks/            # Custom hooks (e.g., useProgress)
│  ├─ data/             # Notes, questions, achievement data
│  ├─ assets/           # Images, sounds, etc.
│  └─ main.jsx          # Entry point
```

---

### 🧠 Note to Devs

* Audio files must be in `/public/sounds/` to work offline in PWA/APK.
* Baraka AI works via custom logic — ensure prompt handling is connected.
* To update the APK without Play Store, just redeploy the web app (OTA supported via service worker).

---

### 📲 PWA Ready

* Installable on mobile/desktop
* Offline support via Workbox
* Supports auto-updates (OTA)

---

### 👑 Built by Dickie @ [dikie.dev](https://dikie.dev)

Made with style, sass, and a lot of love from 🇰🇪

---
