# 熊本城 深度導覽 ｜ Kumamoto Castle Field Guide

一個可離線使用的熊本城深度導覽網站，專為「到現場邊走邊對照看板」設計。
繁體中文解說 ＋ 日文原名對照，純靜態網頁、無建置步驟，可直接部署到 GitHub Pages。

## ✨ 功能

- **📖 四百年の物語（入口故事頁）** — 進站先以敘事式滾動（scrollytelling）讀懂這座城：圖文逐段淡入、章節圓點、閱讀進度條，每章結尾連到對應現場景點。
- **⭐ 推薦實戰路線（2026・已避開維修區）** — 把目前只能遠觀的宇土櫓、飯田丸等安排為眺望點，動線順不走回頭路；另附官方參考路線。
- **🟢🟡🔴 開放狀態徽章** — 每個景點標示「可參觀／僅能遠觀／維修中」，現場一眼判斷能不能進去（熊本城復原至 2052 年才完成，部分區域仍施工）。
- **🏯 景點打卡清單** — 勾選已參觀景點，進度自動存在瀏覽器（`localStorage`），離線、重整都不遺失；景點與故事章節雙向連結。
- **🗺 熊本周邊延伸** — 水前寺成趣園、通潤橋、田原坂、阿蘇草千里、黑川溫泉、八千代座，延續故事主題並附地圖連結。
- **📜 可展開歷史時間軸** — 從 1588 加藤清正入肥後到 2052 全體復原，點開每個節點深入了解。
- **📶 PWA 離線可用** — 城內收訊不佳也能看；可「加到主畫面」像 App 一樣開啟。
- **🎌 和風典雅設計** — 黑城／金箔／深紅配色，行動優先、手機單手可操作。

## 📁 檔案結構

```
.
├── index.html              # 入口・四百年の物語（敘事式滾動故事頁）
├── guide.html              # 行程導覽（路線／景點打卡／周邊延伸／資訊）
├── css/style.css           # 和風主題樣式（含故事頁 scrollytelling）
├── js/story.js             # 故事頁：進場動畫、章節圓點、閱讀進度條、SW 註冊
├── js/app.js               # 導覽頁：打卡、路線切換、篩選、周邊渲染、SW 註冊
├── data/spots.js           # 熊本城景點資料（含 2026 開放狀態、對應故事章節）
├── data/around.js          # 熊本周邊延伸景點資料
├── data/timeline.js        # 歷史時間軸資料
├── manifest.webmanifest    # PWA 設定
├── sw.js                   # Service Worker（離線快取）
├── icons/icon.svg          # App 圖示
├── images/                 # 景點照片（Wikimedia Commons）
└── .nojekyll               # 讓 GitHub Pages 不經 Jekyll 處理
```

## 🚀 本機預覽

PWA / Service Worker 需透過 http(s) 才會作用，請用本機伺服器開啟（直接雙開 file:// 不會啟用離線）：

```bash
# 專案根目錄執行其一
python -m http.server 8000
# 或
npx serve .
```

瀏覽器開 `http://localhost:8000`。

## 🌐 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "熊本城深度導覽網站"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo名稱>.git
git push -u origin main
```

然後在 GitHub repo → **Settings ▸ Pages** → Source 選 `main` 分支、`/ (root)` 資料夾 → Save。
數十秒後即可在 `https://<你的帳號>.github.io/<repo名稱>/` 開啟，並支援離線。

## 🖼 圖片授權

照片皆來自 Wikimedia Commons，各景點卡片內已標示作者與授權：

| 檔案 | 作者 | 授權 |
|---|---|---|
| hero_tenshu.jpg | 663highland | CC BY-SA 3.0 / CC BY 2.5 |
| tenshu.jpg | そらみみ | CC BY-SA 3.0 |
| uto_tenshu.jpg | そらみみ | CC BY-SA 4.0 |
| nagabei.jpg | そらみみ | CC BY-SA 4.0 |
| kuragari.jpg | そらみみ | CC BY-SA 3.0 |
| three_towers.jpg | Nagoya Taro | CC BY-SA 3.0 |
| iidamaru.png | ムカイ | Public Domain |
| niyou.jpg | Mukai | CC BY-SA 3.0 |
| johsaien.jpg | Jdjuice | CC BY-SA 4.0 |
| wakuwakuza.jpg | z tanuki | CC BY 3.0 |
| tokubetsu.jpg | 先従隗始 | CC0（公眾領域） |
| suizenji.jpg | 663highland | CC BY 2.5 |
| tsujun.jpg | Eiko from Japan | CC BY-SA 2.0 |
| tabaruzaka.jpg | STA3816 | CC BY-SA 4.0 |
| kusasenri.jpg | STA3816 | CC BY-SA 3.0 |
| kurokawa.jpg | hiroooooki | CC BY 2.0 |
| yachiyoza.jpg | Myaataro | CC BY-SA 3.0 |

你也可以把 `images/` 內的圖片換成自己現場拍的照片（沿用相同檔名即可）。

## ⚠️ 資料時效

開放／維修狀態整理自官方與 2025–2026 公開資料，實際請以
[官方熊本城復旧状況](https://castle.kumamoto-guide.jp/map/) 即時公告為準。

---
🤖 內容研究與網站由 [Claude Code](https://claude.com/claude-code) 協助產生。
