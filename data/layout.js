// 熊本城 平面導覽資料（自繪 SVG 俯瞰示意圖）
// 這是「示意圖」而非精確測繪：依各曲輪實際相對方位概略擺位，幫旅人建立空間感（北方朝上）。
// kuruwa：曲輪分區，rect/label 用於畫 SVG 線框與區名，desc 為解說，spots 為該區景點 id（決定文字導覽與編號順序）。
// pins：每個景點在示意圖上的標記座標（x,y）、圖上短標籤 short 與其位置（lx,ly,anchor）；
//        short 只為示意圖排版精簡用，下方曲輪導覽仍顯示景點全名。
// 名稱・開放狀態・Google Maps 連結一律以 spotById 回查 SPOTS，不在此重複。
window.LAYOUT = {
  viewBox: "0 0 400 360",

  kuruwa: [
    {
      id: "honmaru-kita",
      name: "本丸北",
      jp: "ほんまるきた",
      desc: "本丸北側，祭祀築城者加藤清正的加藤神社所在；境內可同框近拍大小天守與宇土櫓，是攝影名點。",
      rect: { x: 198, y: 50, w: 102, h: 44 },
      label: { x: 249, y: 44 },
      spots: ["katojinja"]
    },
    {
      id: "heizaemon",
      name: "平左衛門丸",
      jp: "へいざえもんまる",
      desc: "本丸西北的曲輪，創建當時留存至今的宇土櫓（第三天守）坐鎮西北隅；現解體復原中、不可入內，可遠望。",
      rect: { x: 66, y: 78, w: 90, h: 68 },
      label: { x: 111, y: 72 },
      spots: ["uto"]
    },
    {
      id: "ninomaru",
      name: "二の丸",
      jp: "にのまる",
      desc: "天守西側、昔日藩政中樞所在，今為開闊草坪廣場，是把大小天守與宇土櫓三塔並排盡收眼底的最佳眺望地。",
      rect: { x: 18, y: 156, w: 96, h: 96 },
      label: { x: 66, y: 150 },
      spots: ["ninomaru"]
    },
    {
      id: "honmaru",
      name: "本丸",
      jp: "ほんまる",
      desc: "全城核心，大小天守、本丸御殿與其地下的闇り通路皆在此；特別見学通路高架穿越本丸南緣，是登城高潮所在。",
      rect: { x: 158, y: 116, w: 150, h: 104 },
      label: { x: 233, y: 110 },
      spots: ["tokubetsu", "kuragari", "tenshu"]
    },
    {
      id: "honmaru-minami",
      name: "本丸南・見学通路眺望",
      jp: "ほんまるみなみ",
      desc: "本丸南到西南一帶的石垣與曲輪，多在維修中，目前自特別見学通路居高俯瞰：二様の石垣、数寄屋丸、飯田丸五階櫓。",
      rect: { x: 150, y: 244, w: 160, h: 56 },
      label: { x: 230, y: 238 },
      spots: ["niyou", "sukiya", "iidamaru"]
    },
    {
      id: "jogai",
      name: "城外・城彩苑・坪井川",
      jp: "じょうがい",
      desc: "上城前的門戶與最自然的起點／終點：城彩苑（餐飲土產與湧々座）；沿坪井川南緣則有日本現存最長的城牆長塀。",
      rect: { x: 40, y: 316, w: 320, h: 34 },
      label: { x: 200, y: 310 },
      spots: ["johsaien", "wakuwakuza", "nagabei"]
    }
  ],

  pins: [
    { id: "katojinja",  short: "加藤神社",   x: 249, y: 74,  lx: 249, ly: 90,  anchor: "middle" },
    { id: "uto",        short: "宇土櫓",     x: 111, y: 112, lx: 111, ly: 134, anchor: "middle" },
    { id: "ninomaru",   short: "二の丸広場", x: 66,  y: 200, lx: 66,  ly: 224, anchor: "middle" },
    { id: "kuragari",   short: "闇り通路",   x: 262, y: 145, lx: 280, ly: 147, anchor: "start"  },
    { id: "tenshu",     short: "天守閣",     x: 212, y: 165, lx: 212, ly: 188, anchor: "middle" },
    { id: "tokubetsu",  short: "見学通路",   x: 182, y: 206, lx: 168, ly: 208, anchor: "end"    },
    { id: "niyou",      short: "二様の石垣", x: 190, y: 272, lx: 190, ly: 290, anchor: "middle" },
    { id: "sukiya",     short: "数寄屋丸",   x: 235, y: 272, lx: 235, ly: 258, anchor: "middle" },
    { id: "iidamaru",   short: "飯田丸櫓",   x: 285, y: 272, lx: 285, ly: 290, anchor: "middle" },
    { id: "johsaien",   short: "城彩苑",     x: 120, y: 333, lx: 120, ly: 347, anchor: "middle" },
    { id: "wakuwakuza", short: "湧々座",     x: 200, y: 333, lx: 200, ly: 347, anchor: "middle" },
    { id: "nagabei",    short: "長塀",       x: 300, y: 333, lx: 300, ly: 347, anchor: "middle" }
  ]
};
