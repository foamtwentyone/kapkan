/*
 * ===================================================================
 *  ВСЕ ДАННЫЕ САЙТА — В ЭТОМ ФАЙЛЕ.
 *  Чтобы обновить заявку, результаты или таблицу, правьте только его.
 *  Сейчас здесь стоят демонстрационные данные: замените их настоящими.
 * ===================================================================
 */
window.KAPKAN = {
  club: {
    name: "Капкан",
    fullName: "Мини-футбольный клуб «Капкан»",
    city: "Капкан",
    founded: 2019,
    league: "Любительская лига г. Капкан по футзалу",
    season: "2026/27",
    slogan: "Кто попал — тот не уйдёт",
    emblem: "assets/img/emblem.svg",
    socials: [
      { name: "ВКонтакте", url: "https://vk.com/" },
      { name: "Telegram", url: "https://t.me/" }
    ],
    contacts: { phone: "+7 (900) 000-00-00", email: "info@fc-kapkan.ru" }
  },

  /* ---------------- ЗАЯВКА ----------------
   * pos: "GK" — вратарь, "DF" — защитник, "WG" — фланговый (винг),
   *      "PV" — пивот, "UN" — универсал
   * stats: игры, голы, передачи, жёлтые карточки — за текущий сезон
   * photo: путь к фото (необязательно), например "assets/img/players/7.jpg"
   */
  players: [
    { number: 1,  name: "Артём Волков",      pos: "GK", born: "1995-03-14", height: 186, captain: false, stats: { games: 7, goals: 0, assists: 1, yellow: 0 } },
    { number: 16, name: "Илья Сорокин",      pos: "GK", born: "2000-07-02", height: 182, captain: false, stats: { games: 1, goals: 0, assists: 0, yellow: 0 } },
    { number: 4,  name: "Денис Медведев",    pos: "DF", born: "1992-11-21", height: 180, captain: true,  stats: { games: 7, goals: 2, assists: 3, yellow: 1 } },
    { number: 5,  name: "Роман Кузнецов",    pos: "DF", born: "1997-01-30", height: 178, captain: false, stats: { games: 5, goals: 1, assists: 1, yellow: 2 } },
    { number: 3,  name: "Павел Лисицын",     pos: "DF", born: "1999-05-09", height: 176, captain: false, stats: { games: 4, goals: 0, assists: 2, yellow: 0 } },
    { number: 7,  name: "Максим Егоров",     pos: "WG", born: "1998-09-17", height: 174, captain: false, stats: { games: 7, goals: 6, assists: 4, yellow: 0 } },
    { number: 11, name: "Кирилл Барсуков",   pos: "WG", born: "2001-02-25", height: 172, captain: false, stats: { games: 6, goals: 3, assists: 2, yellow: 1 } },
    { number: 8,  name: "Никита Орлов",      pos: "WG", born: "1996-12-03", height: 177, captain: false, stats: { games: 6, goals: 3, assists: 3, yellow: 0 } },
    { number: 17, name: "Тимур Хасанов",     pos: "WG", born: "2003-06-11", height: 170, captain: false, stats: { games: 3, goals: 1, assists: 0, yellow: 0 } },
    { number: 9,  name: "Александр Рысев",   pos: "PV", born: "1994-04-27", height: 184, captain: false, stats: { games: 7, goals: 6, assists: 1, yellow: 1 } },
    { number: 19, name: "Глеб Зайцев",       pos: "PV", born: "2002-10-08", height: 181, captain: false, stats: { games: 4, goals: 2, assists: 0, yellow: 0 } },
    { number: 10, name: "Сергей Капустин",   pos: "UN", born: "1993-08-19", height: 179, captain: false, stats: { games: 7, goals: 1, assists: 5, yellow: 0 } },
    { number: 14, name: "Владислав Ершов",   pos: "UN", born: "1999-03-05", height: 175, captain: false, stats: { games: 2, goals: 0, assists: 0, yellow: 0 } }
  ],

  staff: [
    { name: "Олег Беляев",    role: "Главный тренер" },
    { name: "Андрей Соколов", role: "Тренер вратарей" },
    { name: "Игорь Ястребов", role: "Администратор команды" }
  ],

  /* ---------------- МАТЧИ ----------------
   * date: "ГГГГ-ММ-ДДTЧЧ:ММ" (местное время)
   * home: true — «Капкан» играет дома (на своей арене)
   * score: [голы Капкана, голы соперника] или null, если матч ещё не сыгран
   * scorers: авторы голов «Капкана» (необязательно)
   */
  matches: [
    { date: "2026-09-13T19:00", tournament: "Лига", round: 1,  opponent: "Метеор",   home: true,  venue: "СК «Ледокол»",       score: [5, 2], scorers: ["Рысев 2", "Егоров", "Медведев", "Барсуков"] },
    { date: "2026-09-20T18:00", tournament: "Лига", round: 2,  opponent: "Сокол",    home: false, venue: "ФОК «Сокол»",        score: [4, 3], scorers: ["Егоров 2", "Рысев", "Орлов"] },
    { date: "2026-09-27T19:00", tournament: "Лига", round: 3,  opponent: "Гранит",   home: true,  venue: "СК «Ледокол»",       score: [3, 3], scorers: ["Зайцев", "Барсуков", "Кузнецов"] },
    { date: "2026-10-04T17:00", tournament: "Кубок города", round: "1/8 финала", opponent: "Ударник", home: false, venue: "Зал «Ударник»", score: [2, 1], scorers: ["Рысев", "Хасанов"] },
    { date: "2026-10-11T20:00", tournament: "Лига", round: 4,  opponent: "Энергия",  home: false, venue: "СОК «Энергия»",      score: [2, 4], scorers: ["Медведев", "Орлов"] },
    { date: "2026-10-25T19:00", tournament: "Лига", round: 5,  opponent: "Факел",    home: true,  venue: "СК «Ледокол»",       score: [6, 1], scorers: ["Егоров 2", "Рысев", "Зайцев", "Барсуков", "Капустин"] },
    { date: "2026-11-01T18:30", tournament: "Лига", round: 6,  opponent: "Вымпел",   home: false, venue: "ФОК «Вымпел»",       score: [3, 2], scorers: ["Рысев", "Егоров", "Орлов"] },
    { date: "2026-11-15T19:00", tournament: "Лига", round: 7,  opponent: "Торпедо",  home: true,  venue: "СК «Ледокол»",       score: null },
    { date: "2026-11-22T18:00", tournament: "Лига", round: 8,  opponent: "Спарта",   home: false, venue: "Арена «Спарта»",     score: null },
    { date: "2026-11-29T17:00", tournament: "Кубок города", round: "1/4 финала", opponent: "Энергия", home: true, venue: "СК «Ледокол»", score: null },
    { date: "2026-12-06T19:00", tournament: "Лига", round: 9,  opponent: "Звезда",   home: true,  venue: "СК «Ледокол»",       score: null },
    { date: "2026-12-13T18:00", tournament: "Лига", round: 10, opponent: "Метеор",   home: false, venue: "Зал «Метеор»",       score: null },
    { date: "2026-12-20T19:00", tournament: "Лига", round: 11, opponent: "Сокол",    home: true,  venue: "СК «Ледокол»",       score: null }
  ],

  /* ---------------- ТУРНИРНАЯ ТАБЛИЦА ----------------
   * Указывайте: выигрыши (w), ничьи (d), поражения (l), забитые (gf), пропущенные (ga).
   * Игры, очки, разница мячей и места считаются автоматически.
   * form — последние результаты (В / Н / П), от старых к новым.
   */
  table: {
    title: "Любительская лига г. Капкан — Высший дивизион",
    pointsForWin: 3,
    zones: [ // подсветка мест
      { from: 1, to: 1, label: "Чемпион", color: "gold" },
      { from: 2, to: 4, label: "Плей-офф", color: "accent" },
      { from: 10, to: 10, label: "Переход в Первый дивизион", color: "danger" }
    ],
    teams: [
      { name: "Капкан",   self: true, w: 4, d: 1, l: 1, gf: 23, ga: 15, form: ["В","Н","П","В","В"] },
      { name: "Энергия",  w: 4, d: 1, l: 1, gf: 20, ga: 13, form: ["В","В","В","Н","П"] },
      { name: "Спарта",   w: 4, d: 0, l: 2, gf: 19, ga: 13, form: ["П","В","В","П","В"] },
      { name: "Торпедо",  w: 3, d: 2, l: 1, gf: 17, ga: 11, form: ["Н","В","В","Н","В"] },
      { name: "Гранит",   w: 3, d: 2, l: 1, gf: 18, ga: 14, form: ["В","Н","Н","В","П"] },
      { name: "Звезда",   w: 2, d: 2, l: 2, gf: 15, ga: 15, form: ["П","Н","В","Н","В"] },
      { name: "Сокол",    w: 2, d: 1, l: 3, gf: 16, ga: 19, form: ["П","В","П","Н","В"] },
      { name: "Вымпел",   w: 2, d: 0, l: 4, gf: 13, ga: 18, form: ["В","П","П","В","П"] },
      { name: "Метеор",   w: 1, d: 1, l: 4, gf: 12, ga: 22, form: ["П","Н","В","П","П"] },
      { name: "Факел",    w: 0, d: 2, l: 4, gf: 9,  ga: 24, form: ["Н","П","П","Н","П"] }
    ]
  },

  /* ---------------- ДОМАШНЯЯ АРЕНА ---------------- */
  stadium: {
    name: "СК «Ледокол»",
    address: "г. Капкан, ул. Спортивная, 12",
    opened: 2011,
    capacity: 450,
    court: "40 × 20 м, паркет",
    lighting: "LED-освещение 1500 люкс",
    description:
      "Домашний зал «Капкана» — универсальный спортивный комплекс в центре города. " +
      "Профессиональное паркетное покрытие, трибуны на 450 мест, раздевалки для команд и судей, " +
      "буфет и бесплатная парковка. На домашние матчи вход для болельщиков свободный.",
    features: ["Паркет 40 × 20 м", "Трибуны на 450 мест", "Бесплатная парковка", "Буфет", "Раздевалки с душевыми", "Вход на матчи бесплатный"],
    transport: [
      { type: "Автобус", text: "№ 3, 7, 21 — остановка «Стадион»" },
      { type: "Маршрутка", text: "№ 45, 52 — остановка «Спортивная улица»" },
      { type: "Автомобиль", text: "Въезд на парковку с ул. Спортивной, 80 мест" }
    ],
    // Ссылка на карту (Яндекс или Google). Откроется по кнопке «Открыть на карте».
    mapUrl: "https://yandex.ru/maps/?text=%D0%9A%D0%B0%D0%BF%D0%BA%D0%B0%D0%BD%2C%20%D1%83%D0%BB.%20%D0%A1%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F%2C%2012"
  },

  /* ---------------- НОВОСТИ (на главной) ---------------- */
  news: [
    { date: "2026-11-02", title: "«Капкан» вырвал победу у «Вымпела» и возглавил таблицу", text: "Решающий гол на 38-й минуте забил Никита Орлов. Команда поднялась на первое место по разнице мячей." },
    { date: "2026-10-26", title: "Разгром «Факела»: 6:1 на домашнем паркете", text: "Максим Егоров оформил дубль, а шесть разных игроков отметились голами." },
    { date: "2026-10-05", title: "«Капкан» прошёл в 1/4 финала Кубка города", text: "В гостях обыграли «Ударник» — 2:1. В четвертьфинале соперником станет «Энергия»." }
  ]
};
