# ⚾ BBBrainrot - The TikTokification of Baseball

BBBrainrot is a **TikTok-style web app** that delivers **fast, engaging, and personalized baseball content**.  
Users can **scroll through a dynamic feed** of **short-form baseball videos** and **MLB.com articles**, interact with the content, play **fun prediction-based games**, and get a **personalized baseball bio** based on their preferences.

---

## 🚀 Features

### 📜 **TikTok-Style Feed (`/feed`)**

- A **scrollable feed** where users can **swipe** between **short-form baseball content**.
- **Two main content types**:
  - 🎥 **Videos**: Game highlights, behind-the-scenes, player interviews.
  - 📰 **Articles**: Pulled from **MLB.com** with an inline reading experience.

### 🏆 **Interactive Games**

- **Guess the Exit Velocity** 🎯
  - Users predict the exit velocity of **home runs**.
  - Earn **points** by being accurate and **compare scores** with others.

### ⚾ **Personalized Baseball Bio**

- The app tracks what users **watch and engage with**.
- A **LLM-powered summary** generates a **Baseball Personality Bio**, outlining:
  - **Favorite Teams**
  - **Favorite Players**
  - **Content Preferences** (e.g., highlights, analysis, memes)

### 💬 **Upcoming: Comments & Forums**

- A **comment section** under content for discussion.
- A **forum** for deeper baseball debates, memes, and hot takes.

---

## 📄 Pages

### 🏠 **Home (`/`)**

- Welcome page introducing the platform.

### 📜 **Feed (`/feed`)**

- **The heart of the app** – swipeable, scrollable **TikTok-style baseball content**.

### ℹ️ **About (`/about`)**

- Brief explanation of the app and its mission.

---

## 🏗️ Tech Stack

### **Backend**

- 🖥️ **[Express.js](https://expressjs.com/)** – Lightweight Node.js framework.
- 🦺 **[TypeScript](https://www.typescriptlang.org/)** – Ensures type safety.
- 🛢️ **[Supabase](https://supabase.com/)** – Database + auth + real-time data.

### **Frontend**

- ⚡ **[React](https://react.dev/) + [Vite](https://vitejs.dev/)** – Ultra-fast frontend.
- 🚀 **[pnpm](https://pnpm.io/)** – Efficient package management.
- 🏠 **[TanStack Router](https://tanstack.com/router/)** – Modern, file-based routing.
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** – Sleek, customizable styling.

### **Authentication**

- 🔐 **[Clerk](https://clerk.dev/)** – Handles user authentication.

### **AI / LLM**

- 🤖 **Custom LLM Model** – Summarizes user preferences into a **Baseball Personality Bio**.

---

## 🔒 Privacy Policy

- **✅ Uses third-party authentication** (Clerk) – No passwords stored.
- **❌ No database of posted content** – Content is dynamically sourced.
- **✅ Only user preferences are stored** – Used for **personalized recommendations**.

---

## 🚀 Future Improvements

- 💬 **Commenting system + Forum**
- 🎮 **More games** (e.g., Pitch Speed Guessing, Baseball Trivia)
- 📈 **Better leaderboard + rewards system**
- 🔄 **More ways to use points earned from games**

---

## ⏳ Challenges

- **Time Constraint** ⏳
  - Had only **2 days** to build the MVP.
- **Limited Baseball Knowledge** ⚾
  - Had to learn about **stats, exit velocities, and baseball culture** on the fly.
- **Making the feed feel "TikTok-like"** 🔄
  - Had to implement **smooth transitions, video autoplay, and swipe interactions** effectively.

---

## 🔗 Useful Links

- 🏗️ **[Express.js](https://expressjs.com/)**
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)**
- 🔥 **[Supabase](https://supabase.com/)**
- 🔐 **[Clerk Authentication](https://clerk.dev/)**
- 🎥 **[MLB.com](https://www.mlb.com/)**
- 📜 **[TanStack Router](https://tanstack.com/router/)**

---

# Core Demographic Challenges

## Aging Traditional Audience

- **Median age of MLB ticket buyers** dropped from **51 (2019) to 45 (2024)** but remains older than competing sports.¹²
- **Only 10% of young adults (18-34)** name baseball as their favorite sport vs. **41% for football**.⁶

## Attention Span Mismatch

- **63% of MLB's TikTok followers** are under 35 vs. **47% on Facebook**.³⁵
- **46% of YouTube MLB viewers** are under 35, consuming **highlights over full games**.³

# TikTok as a Solution Vector

## Why It Works

- **Baseball content has 58B+ TikTok views globally**, with teams like **Yankees gaining 1.1M followers** through behind-the-scenes clips.⁵
- **71% of MLB Instagram followers** are under 35 (**vs. 61% platform average**).³

## Pain Points Addressed

| Traditional Issue              | TikTok-Style Web App Solution                     |
| ------------------------------ | ------------------------------------------------- |
| **3+ hour game lengths**       | Bite-sized highlight reels **<2 mins**            |
| **Passive viewing**            | Interactive features (guess pitch speed/outcomes) |
| **Regional team focus**        | Algorithmic **player-centric content**            |
| **Limited digital engagement** | Social sharing & creator tools                    |

# Additional Systemic Pain Points

## Accessibility Barriers

- **Average MLB ticket price rose 32% since 2019**, pricing out younger fans.⁶
- **Solution:** Free **short-form content lowers entry barrier**.

## Content Fragmentation

- **53% of Gen Z uses 4+ platforms** for sports content.⁴
- **Solution:** **Centralized hub** with cross-platform highlights.

## Stat Overload

- **Only 12% of under-25 fans** understand advanced metrics like WAR.¹
- **Solution:** **Visual stat explainers via AR overlays**.

# Implementation Evidence

- **MLB.TV saw 11% growth in 18-24 viewership** after introducing vertical video streams.¹
- **Teams using TikTok-style content achieve 94% higher engagement** than traditional posts.⁴
- **86% of 18-34yo report increased viewership** due to faster-paced content formats.²

---

### **Conclusion**

This data-driven approach suggests a **TikTok-inspired platform** could help **bridge baseball's generation gap** by aligning with how **72% of Gen Z consumes sports**—through **snackable, interactive content with social validation mechanics**.³⁴

1. Castrovince, A. (2024, April 26). _MLB fans getting younger as more kids taking to the diamond_. Major League Baseball. Retrieved from https://www.mlb.com/news/mlb-younger-fans-growing-youth-participation

2. _MLB's efforts to attract younger fans appears to be paying off_. (2023, August 19). FOX Sports. Retrieved from https://www.foxsports.com/stories/mlb/mlbs-efforts-to-attract-younger-fans-appears-to-be-paying-off

3. Castrovince, A. (2022, October 3). _Numerous indicators show youth MLB fandom is on the rise_. Major League Baseball. Retrieved from https://www.mlb.com/news/number-of-young-mlb-fans-rising

4. _TikTok and Twitch: Engaging the next generation of sports fans online_. (2021, March). Euromonitor International. Retrieved from https://www.euromonitor.com/tiktok-and-twitch-engaging-the-next-generation-of-sports-fans-online/report

5. _TikTok expands partnership with New York Yankees and the YES Network_. (n.d.). Newsroom TikTok. Retrieved from https://newsroom.tiktok.com/en-us/tiktok-expands-partnership-with-new-york-yankees-and-the-yes-network

6. Williams, M. T. (2024, April 17). _POV: Baseball needs to shake up the game—or risk a slow death_. BU Today. Retrieved from https://www.bu.edu/articles/2024/baseball-shake-up-the-game-or-risk-a-slow-death/

### **⚡ Built with love & caffeine in just 2 days!**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
