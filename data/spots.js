// 熊本城 景點資料
// status: 'open'=🟢可參觀 / 'view'=🟡僅能遠觀 / 'closed'=🔴維修中不可進入
// image 為 images/ 內檔名；credit 為作者與授權（CC BY-SA 需姓名標示）
window.STATUS_META = {
  open:   { icon: "🟢", label: "可參觀",   cls: "st-open" },
  view:   { icon: "🟡", label: "僅能遠觀", cls: "st-view" },
  closed: { icon: "🔴", label: "維修中",   cls: "st-closed" }
};

window.SPOTS = [
  {
    id: "johsaien",
    name: "櫻之馬場 城彩苑",
    jp: "桜の馬場 城彩苑",
    status: "open",
    area: "城外・起點",
    image: null,
    desc: [
      "熊本城腳下重現城下町風情的觀光設施，櫻花小路集結約 23 家餐飲與土產店，是整趟行程的最佳起點與終點。",
      "設有觀光案內所，可在此索取地圖、確認當日開放與活動資訊。"
    ],
    tip: "建議先在這裡用餐或補給，再上城；回程再來買伴手禮。"
  },
  {
    id: "wakuwakuza",
    name: "湧々座（熊本城博物館）",
    jp: "熊本城ミュージアム わくわく座",
    status: "open",
    area: "城彩苑內",
    image: null,
    desc: [
      "體感型歷史館。可看「熊本城 VR」重現江戶時代天守、清正公生平與西南戰爭的大型紙芝居，還能試穿時代服裝拍照。",
      "先在這裡看過震前↔現在的對比，再進城參觀會更有感觸。"
    ],
    tip: "天守閣＋湧々座共通券高中生以上 ¥850，比分開買划算。"
  },
  {
    id: "tokubetsu",
    name: "特別見学通路",
    jp: "特別見学通路",
    status: "open",
    area: "本丸",
    image: null,
    desc: [
      "2021 年啟用、約 350m 的高架步道，高約 6m，讓你與崩落的石垣、修復工程在同一視線高度對望，是熊本城『見せる復興』的核心。",
      "沿途可一覽二様の石垣、數寄屋丸、飯田丸與本丸御殿。可推嬰兒車、輪椅通行。",
      "屬期間限定設施，預計 2042 年度復原完成後拆除——現在來才看得到。"
    ],
    tip: "走通路時放慢腳步，留意腳下與兩側標示牌對照修復前後。"
  },
  {
    id: "niyou",
    name: "二様の石垣",
    jp: "二様の石垣",
    status: "view",
    area: "本丸（見学通路眺望）",
    image: null,
    desc: [
      "一處可同時看見兩個時代石垣的名場面。右側緩坡是加藤時代的『乱れ積み』（用大小不一的石頭堆疊）；左側陡峭是細川時代增築的『布積み』（切割成相近大小整齊堆砌）。",
      "兩種勾配並排，一眼讀出近世石垣技術的演進。"
    ],
    tip: "從特別見学通路上取景最完整，注意右緩左陡的對比。"
  },
  {
    id: "sukiya",
    name: "數寄屋丸二階御広間",
    jp: "数寄屋丸二階御広間",
    status: "view",
    area: "天守西南（見学通路眺望）",
    image: null,
    desc: [
      "位於天守西南的數寄屋丸，其「二階御広間」昔日是舉辦能樂、茶會、歌會的風雅接待空間，展現城主生活文化的一面。"
    ],
    tip: "目前從見学通路眺望其外觀。"
  },
  {
    id: "iidamaru",
    name: "飯田丸五階櫓（奇跡の一本石垣）",
    jp: "飯田丸五階櫓",
    status: "view",
    area: "本丸南（見学通路眺望）",
    image: "iidamaru.png",
    credit: "ムカイ / Public Domain（Wikimedia Commons）",
    desc: [
      "名稱來自加藤清正重臣「飯田覺兵衛」所掌管的曲輪。外觀三層、內部五階，石垣高 14.3m，規模達天守級。",
      "2016 地震時櫓體幾乎懸空，僅靠一隅石垣支撐而未倒塌，被稱為『奇跡の一本石垣』，成為震災與復興的象徵。",
      "石垣已於 2024 年復原完成，櫓體自 2025 年度起進行復原工程，預計 2028 完工。"
    ],
    tip: "目前可從通道遠觀、不可進入；對照震災照片更能體會那一柱石垣的奇蹟。"
  },
  {
    id: "kuragari",
    name: "闇り通路",
    jp: "闇り通路",
    status: "open",
    area: "本丸御殿地下",
    image: null,
    desc: [
      "穿過本丸御殿地下的昏暗通道，是日本城郭中少見的設計——御殿建在石垣之上，地下成為進入天守前的幽暗甬道，氣氛獨特。"
    ],
    tip: "從這裡走出後，眼前豁然開朗就是天守前廣場。"
  },
  {
    id: "tenshu",
    name: "天守閣（大・小天守）",
    jp: "天守閣",
    status: "open",
    area: "本丸",
    image: "tenshu.jpg",
    credit: "そらみみ / CC BY-SA 3.0（Wikimedia Commons）",
    desc: [
      "熊本城的主角，大天守外觀三重、內部地上 6 層地下 1 層，與小天守並立。2021 年完全復原開放，內部為訴說熊本城歷史的博物館。"
    ],
    floors: [
      "地下1階　穴蔵：保留古井戶與石垣遺構，重現江戶時代的台所（廚房）空間。",
      "1F　加藤時代：以大型模型呈現清正築城與城下町建設，並有影院短片。",
      "2F　細川時代：在模型上投影地圖，呈現細川統治期與大名行列。",
      "3F　近代：以影像述說明治軍事、西南戰爭與天守燒失、1960 昭和重建。",
      "4F　現代：戰後修復與 2016 震災／復興，設有捐款者數位芳名板。",
      "6F　展望層：360° 俯瞰熊本市區，晴天可遠望阿蘇山；用官方 App 的 AR 功能把明治古照片疊在現景上。"
    ],
    tip: "最終登閣 16:30 截止，請預留時間；6F 展望層是全城最佳眺望點。"
  },
  {
    id: "uto",
    name: "宇土櫓",
    jp: "宇土櫓",
    status: "closed",
    area: "平左衛門丸",
    image: "uto_tenshu.jpg",
    credit: "そらみみ / CC BY-SA 4.0（Wikimedia Commons・圖為宇土櫓與天守）",
    desc: [
      "築城當初唯一現存的多重櫓（五階櫓），規模媲美天守，被譽為『第三天守』，是國指定重要文化財。",
      "2016 地震受損，2022 年起進行解體保存、2025 年解體完成，2026/3 起調查設計、2028 起復原工程，預計 2032 完工。",
      "內部目前不可參觀（素屋根內部特別公開已於 2024/8 休止），現場可看周邊投影重現震前樣貌。"
    ],
    tip: "雖不能進入，但從加藤神社、二の丸広場仍可遠望其身影（含工程素屋根）。"
  },
  {
    id: "katojinja",
    name: "加藤神社",
    jp: "加藤神社",
    status: "open",
    area: "本丸北側",
    image: "three_towers.jpg",
    credit: "Nagoya Taro / CC BY-SA 3.0（Wikimedia Commons・小天守・宇土櫓・大天守）",
    desc: [
      "祭祀加藤清正的神社，鎮座於本丸一帶。境內是同時仰望天守閣與宇土櫓的絕佳取景點，攝影人氣極高。"
    ],
    tip: "拍『天守＋宇土櫓』同框的經典角度就在這裡；可順道參拜求旅途平安。"
  },
  {
    id: "ninomaru",
    name: "二の丸広場",
    jp: "二の丸広場",
    status: "open",
    area: "二の丸",
    image: "hero_tenshu.jpg",
    credit: "663highland / CC BY-SA 3.0（Wikimedia Commons）",
    desc: [
      "開闊的大草坪，可一次將大小天守與宇土櫓盡收眼底，是野餐、休息與全景拍照的好地方。"
    ],
    tip: "傍晚光線柔和，天守逆光剪影很美；空間大、適合帶小孩放電。"
  },
  {
    id: "nagabei",
    name: "長塀",
    jp: "長塀",
    status: "open",
    area: "城外・坪井川沿",
    image: "nagabei.jpg",
    credit: "そらみみ / CC BY-SA 4.0（Wikimedia Commons）",
    desc: [
      "沿坪井川延伸約 242m 的城牆，是國指定重要文化財，也是日本現存最長的城牆之一。",
      "2016 地震東側約 80m 倒塌，已於 2021 年復原完成。"
    ],
    tip: "屬城外延伸景點；沿川散步＋清正公銅像可串成回程路線。"
  }
];

// 參觀路線：steps 以景點 id 串連，extra 為非景點的補充節點
window.ROUTES = [
  {
    id: "recommend",
    name: "⭐ 推薦實戰路線（2026・已避開維修區）",
    time: "約 2.5–3 小時",
    note: "把只能遠觀的宇土櫓、飯田丸、二様の石垣安排為眺望／拍照點，動線順不走回頭路。",
    steps: ["johsaien", "wakuwakuza", "tokubetsu", "niyou", "sukiya", "iidamaru", "kuragari", "tenshu", "katojinja", "uto", "ninomaru", "nagabei"]
  },
  {
    id: "rain",
    name: "雨天／時間少 精簡版",
    time: "約 2 小時",
    note: "全程多為步道與室內，下雨或趕時間時走這條。",
    steps: ["johsaien", "wakuwakuza", "tokubetsu", "tenshu"]
  },
  {
    id: "official-special",
    name: "官方・特別公開路線（付費）",
    time: "約 120 分",
    note: "城彩苑／二之丸 → 見学通路 → 天守 → 城彩苑。",
    steps: ["johsaien", "tokubetsu", "tenshu", "johsaien"]
  },
  {
    id: "official-photo",
    name: "官方・外周拍照路線（免費）",
    time: "約 60 分",
    note: "繞城拍天守與宇土櫓，不進入收費區。",
    steps: ["katojinja", "uto", "ninomaru", "nagabei", "johsaien"]
  }
];
