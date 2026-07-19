export interface Author {
  id: string
  name: string
  slug: string
  photo: string | null
  bio: string
  field: string
  social: {
    instagram?: string
    facebook?: string
    twitter?: string
    website?: string
  }
  bookIds: string[]
}

export const authors: Author[] = [
  {
    id: "author-001",
    name: "Imam al-Bukhari",
    slug: "imam-al-bukhari",
    photo: null,
    bio: "Imam Abu Abdullah Muhammad bin Ismail al-Bukhari adalah salah satu Imam hadits terkemuka dalam sejarah Islam. Beliau dikenal melalui karyanya Shahih al-Bukhari yang menjadi kitab hadits paling otoritatif setelah Al-Qur'an. Lahir di Bukhara pada tahun 194 H, beliau menghabiskan hidupnya untuk mengumpulkan, memverifikasi, dan mengkodifikasikan hadits-hadits Nabi shallallahu 'alaihi wa sallam.",
    field: "Hadits",
    social: {},
    bookIds: ["bk-001"],
  },
  {
    id: "author-002",
    name: "Syaikh Muhammad bin Abdul Wahhab",
    slug: "syaikh-muhammad-bin-abdul-wahhab",
    photo: null,
    bio: "Muhammad bin Abdul Wahhab bin Sulaiman at-Tamimi adalah seorang ulama besar yang lahir di 'Uyaynah, Najd pada tahun 1115 H. Beliau dikenal sebagai pembaru (mujaddid) di bidang aqidah yang mengajak umat untuk kembali kepada Al-Qur'an dan As-Sunnah sesuai pemahaman Salafush Shalih. Dakwah tauhidnya memberikan dampak luas di seluruh dunia Islam.",
    field: "Aqidah & Tauhid",
    social: {},
    bookIds: ["bk-002"],
  },
  {
    id: "author-003",
    name: "Syaikh Abdurrahman as-Sa'di",
    slug: "syaikh-abdurrahman-as-sadi",
    photo: null,
    bio: "Syaikh Abdurrahman bin Nashir as-Sa'di adalah seorang ulama besar dan mufassir ternama dari Saudi Arabia. Beliau lahir di Unaizah pada tahun 1307 H. Karya tafsirnya, Taysir al-Karim ar-Rahman, dikenal sangat mudah dipahami dan kaya akan faedah. Beliau juga dikenal sebagai ulama yang memiliki kedalaman ilmu dan keindahan akhlaq.",
    field: "Tafsir",
    social: {},
    bookIds: ["bk-003"],
  },
  {
    id: "author-004",
    name: "Syaikh Muhammad Nashiruddin al-Albani",
    slug: "syaikh-muhammad-nashiruddin-al-albani",
    photo: null,
    bio: "Syaikh Muhammad Nashiruddin al-Albani adalah seorang ulama hadits terkemuka abad ini. Lahir di Shkodra, Albania pada tahun 1332 H, beliau dikenal sebagai ahli hadits yang mumpuni dengan ribuan karya takhrij dan tahqiq. Metodologi beliau dalam memverifikasi hadits menjadi rujukan utama di kalangan Ahlus Sunnah.",
    field: "Hadits & Fiqih",
    social: {},
    bookIds: ["bk-004"],
  },
  {
    id: "author-005",
    name: "Syaikh Musthafa al-'Adawi",
    slug: "syaikh-musthafa-al-adawi",
    photo: null,
    bio: "Syaikh Musthafa al-'Adawi adalah seorang ulama dan penulis produktif asal Mesir. Beliau lahir pada tahun 1374 H dan dikenal dengan karyanya di bidang hadits dan tafsir. Kitab-kitabnya banyak dikaji di pesantren dan majelis ilmu karena pembahasannya yang mendalam namun sistematis.",
    field: "Hadits",
    social: {},
    bookIds: ["bk-005"],
  },
  {
    id: "author-006",
    name: "Syaikh Muhammad al-Munajjid",
    slug: "syaikh-muhammad-al-munajjid",
    photo: null,
    bio: "Syaikh Muhammad Shalih al-Munajjid adalah seorang ulama kontemporer asal Saudi Arabia yang lahir pada tahun 1381 H. Beliau dikenal luas melalui website IslamQA yang menjadi rujukan fatwa online terbesar. Karya-karya beliau banyak membahas tazkiyatun nafs, fiqih kontemporer, dan bimbingan islami praktis.",
    field: "Akhlaq & Tazkiyah",
    social: {},
    bookIds: ["bk-006"],
  },
  {
    id: "author-007",
    name: "Dr. Shalih al-Maghamisi",
    slug: "dr-shalih-al-maghamisi",
    photo: null,
    bio: "Dr. Shalih bin Abdurrahman al-Maghamisi adalah seorang akademisi dan penulis produktif di bidang sejarah Islam. Beliau lahir di Riyadh dan menyelesaikan pendidikan doktoralnya di Universitas King Saud. Karya-karya sejarahnya dikenal dengan pendekatan yang sistematis dan bahasa yang mudah dicerna oleh pembaca awam.",
    field: "Sejarah Islam",
    social: {},
    bookIds: ["bk-007"],
  },
  {
    id: "author-008",
    name: "Ibnu Rajab al-Hanbali",
    slug: "ibnu-rajab-al-hanbali",
    photo: null,
    bio: "Imam Zainuddin Abdurrahman bin Ahmad bin Rajab al-Hanbali adalah seorang ulama besar mazhab Hanbali yang lahir di Baghdad pada tahun 736 H. Beliau dikenal sebagai seorang ahli hadits, faqih, dan penulis yang produktif. Karyanya Jami' al-'Ulum wa al-Hikam merupakan syarah atas 50 hadits inti yang mencakup seluruh ajaran Islam.",
    field: "Hadits & Fiqih",
    social: {},
    bookIds: ["bk-013"],
  },
  {
    id: "author-009",
    name: "Syaikh Abdullah Nashih 'Ulwan",
    slug: "syaikh-abdullah-nashih-ulwan",
    photo: null,
    bio: "Syaikh Abdullah Nashih 'Ulwan adalah seorang ulama dan da'i terkemuka asal Syria yang lahir di Halab pada tahun 1347 H. Beliau dikenal luas melalui karya monumentalnya Tarbiyatul Aulad fill Islam yang menjadi rujukan utama dalam pendidikan anak dalam perspektif Islam. Buku-buku beliau telah diterjemahkan ke berbagai bahasa.",
    field: "Pendidikan Islam",
    social: {},
    bookIds: ["bk-020"],
  },
  {
    id: "author-010",
    name: "Syaikh Abdul Aziz bin Baz",
    slug: "syaikh-abdul-aziz-bin-baz",
    photo: null,
    bio: "Syaikh Abdul Aziz bin Abdullah bin Baz adalah seorang ulama besar dan mufti umum Kerajaan Saudi Arabia. Lahir di Riyadh pada tahun 1330 H, beliau dikenal dengan kedalaman ilmunya di bidang aqidah, fiqih, dan hadits. Fatwa-fatwa beliau menjadi rujukan penting bagi umat Islam di seluruh dunia.",
    field: "Aqidah & Fiqih",
    social: {},
    bookIds: ["bk-015"],
  },
]
