# 🐻 ROMI MD — Dady Bear WhatsApp Bot

<p align="center">
  <img src="https://i.ibb.co/QvwpYmP9/16a3a79b-dd94-4124-ad8a-de6a107c6453.png" alt="ROMI MD — Dady Bear" width="280" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

<p align="center">
  <b>A modern, high-performance WhatsApp Multi-Device bot powered by Baileys, featuring 858 commands, multi-database persistence, and the charismatic Dady Bear personality.</b>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-environment-variables">Configuration</a> •
  <a href="#-pairing--sessions">Session Setup</a> •
  <a href="#-commands--categories">Commands</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-troubleshooting">Troubleshooting</a> •
  <a href="#-license--credits">Credits</a>
</p>

---

## 🌟 1. Project Introduction & Branding

**ROMI MD** is a full-featured WhatsApp automation suite built for communities, developers, and power users. Designed with a distinct **Dady Bear** visual theme and a friendly, confident, and charismatic personality, ROMI MD handles everything from media downloads, AI conversations, image generation, and group management to developer tooling and games.

* **Bot Name:** ROMI MD
* **Mascot & Personality:** Dady Bear 🐻
* **Default Prefix:** `.` (customizable)
* **Official Visual Asset:** [Dady Bear Artwork](https://i.ibb.co/QvwpYmP9/16a3a79b-dd94-4124-ad8a-de6a107c6453.png)

---

## 🚀 2. Verified Core Features

* **Multi-Device WhatsApp Engine:** Powered by Baileys (`wolfsocket`) with auto-reconnection and session key healing.
* **858 Specialized Command Modules:** Categorized across 32 domain folders including AI, Media, Group Admin, Games, and Ethical Recon.
* **Tri-Database Resilience:**
  * **SQLite (Primary):** Ultra-fast zero-configuration local database using `better-sqlite3` (with `sql.js` WASM fallback).
  * **PostgreSQL & MongoDB (Mirrors):** Optional cloud mirrors that restore data automatically on ephemeral container reboots.
* **Integrated Web Dashboard:** Express server (Port 5000) providing live memory stats, web pairing, and streaming log monitor.
* **Smart Media Pipelines:** Audio effects, sticker converters, video watermarking, and voice-note processing via static FFmpeg.
* **Zero Remote Lock-in:** Decoupled architecture with direct execution through `node index.js` or `node bear.js`.

---

## 📋 3. Prerequisites

* **Node.js:** `v20.x` or `v22.x` (Node 22 LTS recommended)
* **Package Manager:** `npm` or `pnpm`
* **Operating System:** Linux, macOS, or Windows WSL2
* **FFmpeg:** Built-in via `ffmpeg-static` (no system install required)

---

## ⚙️ 4. Installation Instructions

```bash
# 1. Clone your ROMI MD repository
git clone https://github.com/ROMI-MD/ROMI-MD.git
cd ROMI-MD

# 2. Install dependencies (skipping engine check scripts)
npm install --ignore-scripts

# 3. Create your environment configuration
cp .env.example .env
```

---

## 🔑 5. Environment Variables

Configure your `.env` file with the required variables:

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `SESSION_ID` | Yes | `""` | WhatsApp session string (`ROMI-MD:~base64`). If empty, a QR code or pairing code prompt is shown. |
| `OWNER_NUMBER` | Yes | `""` | Owner phone number in international format without `+` (e.g., `254712345678`). |
| `BOT_NAME` | No | `"ROMI MD"` | Display name shown in menus, replies, and status footers. |
| `MASCOT_NAME` | No | `"Dady Bear"`| Mascot theme name. |
| `BOT_PREFIX` | No | `"."` | Command trigger prefix (`.`, `!`, `/`, `#`, etc.). |
| `BOT_MODE` | No | `"public"` | Access mode: `public` (everyone), `private` (owner only), or `groups` (groups only). |
| `DATABASE_URL` | No | `""` | Optional PostgreSQL connection string for mirror storage. |
| `MONGODB_URI` | No | `""` | Optional MongoDB connection string for session and state mirroring. |
| `GEMINI_API_KEY`| No | `""` | Google Gemini API key for `.gemini` and `.ai` commands. |
| `PORT` | No | `5000` | Web dashboard and pairing server port. |

---

## 📱 6. WhatsApp Pairing & Session Setup

ROMI MD supports two simple methods to connect your WhatsApp account:

### Method A: Pairing Code (Recommended for Mobile)
1. Run `npm start`.
2. When prompted in the terminal:
   * Select **Pairing Code** option.
   * Enter your WhatsApp phone number with country code (e.g. `254712345678`).
3. You will receive an 8-digit code on the console.
4. On your phone, open **WhatsApp > Linked Devices > Link with Phone Number Instead**, and enter the code.
5. Once connected, ROMI MD will generate your `SESSION_ID` and print it to the console. Save this into your `.env` file.

### Method B: QR Code
1. Start the bot with `npm start` with no `SESSION_ID`.
2. Select **QR Code** login.
3. Scan the terminal QR code using **WhatsApp > Linked Devices > Link a Device**.

---

## 👤 7. Owner Configuration & Runtime Prefix

You can change the bot name, prefix, or mascot dynamically at any time without restarting the server:

* **Change Bot Name:**
  ```text
  .setbotname ROMI MD
  ```
* **Change Prefix:**
  ```text
  .setprefix !
  ```
* **Check Bot Status:**
  ```text
  .alive
  ```

---

## 🚀 8. Starting the Application

```bash
# Direct startup (Recommended)
npm start

# Using the bear.js wrapper
npm run start:bear

# Development mode with live reload
npm run dev
```

---

## ☁️ 9. Deployment on Cloud Platforms

### Heroku
1. Create a new Heroku app.
2. In **Settings > Config Vars**, add `SESSION_ID`, `OWNER_NUMBER`, `BOT_NAME="ROMI MD"`.
3. Add Buildpacks:
   * `heroku/nodejs`
4. Deploy the repository. The included `Procfile` automatically runs:
   ```
   worker: npm start
   ```

### Railway
1. Click **New Project > Deploy from GitHub repo**.
2. Railway detects `railway.json` and `Dockerfile`.
3. Add your environment variables in the Railway dashboard.

### Fly.io
1. Run `fly launch` using the included `fly.toml`.
2. Set secrets: `fly secrets set SESSION_ID="your_session"`.
3. Deploy: `fly deploy`.

---

## 🧩 10. How to Add, Edit, and Register Commands

All commands reside in the `commands/` directory organized by category. To add a new command, create a file (e.g. `commands/utility/mycommand.js`):

```javascript
import { BRAND, STATUS } from '../../lib/emojis.js';
import { getBotName } from '../../lib/botname.js';

export default {
  name: 'mycommand',
  alias: ['mycmd', 'testcmd'],
  category: 'utility',
  description: 'Sample Dady Bear custom command',
  async execute(sock, message, args, context) {
    const jid = message.key.remoteJid;
    const botName = getBotName();
    
    await sock.sendMessage(jid, {
      text: `${BRAND.BEAR} *${botName}* is here! Dady Bear handled your command with ease.`
    }, { quoted: message });
  }
};
```
ROMI MD automatically discovers and registers the new command upon startup!

---

## 🎨 11. Customizing Dady Bear Logo & Watermark

* **Central Image Configuration:** `lib/repoConfig.js` contains the canonical URL:
  ```javascript
  export const AVATAR_URL = "https://i.ibb.co/QvwpYmP9/16a3a79b-dd94-4124-ad8a-de6a107c6453.png";
  ```
* **Canvas Watermark:** `lib/logo-watermark.js` applies `"ROMI MD — Dady Bear"` to generated graphics.

---

## 🛠️ 12. Troubleshooting & Common Errors

* **"Cannot find module" on first run:** Run `npm install --ignore-scripts`.
* **"ERR_INVALID_PACKAGE_CONFIG" in Baileys on Node 25:** ROMI MD includes an automated patch in `index.js` for Baileys exports. Node 22 LTS is recommended.
* **"Database is locked" (SQLite):** WAL mode and periodic checkpoint workers are enabled in `lib/database.js`. Avoid opening the SQLite database concurrently in external editors.
* **Session expired:** Run `rm -rf session_keys auth_info_baileys` and re-pair using `npm start`.

---

## 🔒 13. Security Guidance

* **Never commit your `.env` file or session folders (`auth_info_baileys`, `session_keys`) to GitHub.**
* Set `BOT_MODE="private"` or configure `sudo-store.js` if running in large untrusted groups.
* Rotate your `GEMINI_API_KEY` and external API secrets regularly.

---

## 📜 14. License & Credits

* **Bot Engine & Rebranding:** ROMI MD — Powered by Dady Bear.
* **WhatsApp Multi-Device Layer:** Based on [WhiskeySockets / Baileys](https://github.com/WhiskeySockets/Baileys).
* **Attribution:** Original base architecture acknowledges contributions from Baileys open-source maintainers.
* **License:** [MIT License](LICENSE)
