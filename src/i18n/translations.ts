/**
 * ✦ ALL website text lives here, in English and Arabic. ✦
 * Edit names, messages and letters below. `Record<Lang, Translations>` makes TypeScript
 * fail the build if a key is missing in either language.
 * In any string, "{name}" is replaced with her name.
 */

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'
export const DIRECTION: Record<Lang, Dir> = { en: 'ltr', ar: 'rtl' }

export type QualityIcon = 'sparkles' | 'heart' | 'brain' | 'shield' | 'smile' | 'gem'

export interface Quality {
  icon: QualityIcon
  title: string
  description: string
}

export interface LoveLetter {
  id: string
  envelopeTitle: string
  title: string
  /** Blank line (\n\n) between paragraphs */
  body: string
}

export interface Translations {
  herName: string
  myName: string
  pageTitle: string

  greeting: string
  subtitle: string
  wishButton: string
  wishAgainButton: string
  wishMessage: string
  cakeLabel: string

  qualitiesTitle: string
  qualitiesIntro: string
  qualitiesHint: string
  qualitiesNextLabel: string
  /** {n} = card number */
  qualitiesCardNote: string
  qualities: Quality[]

  lettersTitle: string
  lettersIntro: string
  lettersHint: string
  closeLetter: string
  skipLetter: string
  /** Exactly three letters */
  letters: LoveLetter[]
  signoff: string
  /** Handwritten signature (falls back to myName when empty) */
  signature: string

  finalMessage: string
  finalSubMessage: string

  themeLabels: { toLight: string; toDark: string }
  languageLabel: string
  navLabel: string
  nav: { id: string; label: string }[]
}

const en: Translations = {
  herName: 'Mariam',
  myName: 'Ebraam',
  pageTitle: 'Happy Birthday, My Love',

  greeting: 'Happy Birthday, {name}!',
  subtitle: 'Today is all about celebrating the most beautiful soul in my life.',
  wishButton: 'Make a Wish',
  wishAgainButton: 'Light the candles again',
  wishMessage: 'I wished for another year of you, and every year after that.',
  cakeLabel: 'A birthday cake with candles',

  qualitiesTitle: "Why You're So Special",
  qualitiesIntro: 'A few of the thousand reasons, written down just for you.',
  qualitiesHint: 'Tap to discover another reason why I love you.',
  qualitiesNextLabel: 'Show the next reason',
  qualitiesCardNote: 'Reason {n} of a thousand',
  qualities: [
    {
      icon: 'sparkles',
      title: 'Beautiful',
      description:
        "Your beauty is more than just what I see. It's the light and warmth you bring into my life.",
    },
    { icon: 'heart', title: 'Kind', description: 'Your heart is one of the most beautiful things about you.' },
    {
      icon: 'brain',
      title: 'Smart',
      description: 'I admire your intelligence, your ideas, and the way you see the world.',
    },
    {
      icon: 'shield',
      title: 'Strong',
      description: 'Your strength and determination inspire me every single day.',
    },
    {
      icon: 'smile',
      title: 'Funny',
      description: 'You have this incredible way of making even my worst days better.',
    },
    {
      icon: 'gem',
      title: 'Special',
      description:
        "There is nobody in this world quite like you, and that's what makes you so precious to me.",
    },
  ],

  lettersTitle: 'Three Little Letters for You',
  lettersIntro: 'Tap an envelope to open it.',
  lettersHint: 'Tap to open',
  closeLetter: 'Close letter',
  skipLetter: 'Skip',
  letters: [
    {
      id: 'reminder',
      envelopeTitle: 'A Letter for the Beautiful One',
      title: 'A Letter for the Beautiful One',
      body:
        'Happy birthday to the sweetest girl in the whole world! 😍 Everyone is jealous of you — even Berry 😂😉\n\nYou are beautiful inside and out, so lovely, and so effortlessly cool. I love listening to your voice, especially when I fall asleep to it. 🥺 I really wish I could see you at the institute, but what can we do? 😒',
    },
    {
      id: 'love',
      envelopeTitle: 'A Letter for the Smart One',
      title: 'A Letter for the Smart One',
      body:
        'Happy birthday to the smartest girl in the world, my love! May you always succeed, keep getting excellent grades, and leave those guys in our class behind. Even if they do not believe it, I know you are the smartest one, and you are going to surprise them all.\n\n(I know you are going to surprise the whole world. 😉)\n\n“Beloved, I pray that you may prosper in all things and be in health, just as your soul prospers.”\n3 John 1:2',
    },
    {
      id: 'heart',
      envelopeTitle: 'A Letter from My Heart',
      title: 'A Letter from My Heart',
      body:
        'Happy birthday, my Marioma! I hope you celebrate a million more years with the people you love, and that you always stay by my side, lighting up my life and understanding me before I even say a word. 😂 May you always be happy and smiling, and whatever happens, never let it bring you down.\n\nI thank God for giving me the most beautiful thing in the world. And if we call it a coincidence, then it is the most beautiful coincidence that has ever happened in my life. ❤️🤍\n\nMay God keep you in my life, my love. 💓',
    },
  ],
  signoff: 'With zeared,',
  signature: 'Ebraam',

  finalMessage: 'I LOVE YOU SO MUCH',
  finalSubMessage: 'Happy Birthday, My Love.',

  themeLabels: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
  languageLabel: 'Language',
  navLabel: 'Sections',
  nav: [
    { id: 'hero', label: 'Birthday' },
    { id: 'special', label: 'Why you’re special' },
    { id: 'letters', label: 'Letters' },
    { id: 'ending', label: 'I love you' },
  ],
}

// Arabic is written in a warm Egyptian colloquial voice, addressed to her (feminine).
// Switch to Modern Standard Arabic here if you prefer.
const ar: Translations = {
  herName: 'مريم',
  myName: 'أبرام',
  pageTitle: 'كل سنه و انتي طيبه يا حبيبتي',

  greeting: 'كل سنه و انتي طيبه يا {name}!',
  subtitle: 'وسع وسع انهارده عيد ميلاد حبيبتي😍.',
  wishButton: 'اتمني أمنية',
  wishAgainButton: 'ولّعي الشموع تاني',
  wishMessage: 'ربنا يخليك ليا يا روحي',
  cakeLabel: 'تورتة عيد ميلاد عليها شموع',

  qualitiesTitle: 'ليه إنتِ مميزة أوي',
  qualitiesIntro: 'كام سبب من ألف سبب، مكتوبين ليكي إنتِ بس.',
  qualitiesHint: 'دوسي هنا عشان تعرفي سبب تاني بحبك علشانه.',
  qualitiesNextLabel: 'اعرضي السبب الي بعده',
  qualitiesCardNote: 'السبب {n} من ألف',
  qualities: [
    {
      icon: 'sparkles',
      title: 'جميلة',
      description: 'انت اجمل قلب شوفته في الزمن ده انت انت',
    },
    { icon: 'heart', title: 'طيبة', description: 'كفايه انك مستحملاني انا و بيري😂' },
    {
      icon: 'brain',
      title: 'شاطرة',
      description: 'اشطر واحدة في الدنيا كلها بس بنستعبط😉',
    },
    { icon: 'shield', title: 'قوية', description: 'هالبنت القويه شو غيرت فيا؟'  },
    {
      icon: 'smile',
      title: 'خفيفة الدم',
      description: 'ضحكتها مبتهزرش و جمالها ميتقدرش😍',
    },
    {
      icon: 'gem',
      title: 'مميزة',
      description: 'اغلي حاجة عندي بجد🥺',
    },
  ],

  lettersTitle: 'تلات رسايل صغيرة ليكي',
  lettersIntro: 'دوسي على الرساله عشان تفتحيها.',
  lettersHint: 'اضغطي للفتح',
  closeLetter: 'إغلاق الرسالة',
  skipLetter: 'تخطّي',
  letters: [
    {
      id: 'reminder',
      envelopeTitle: 'رسالة للحلوة',
      title: 'رسالة للحلوة',
      body:
        'كل سنة وإنتِ طيبة يا أحلى واحدة في الدنيا دي 😍 وكل الناس غيرانة منك، حتى بيري 😂😉\n\nوجميلة وحلوة من جوه قبل بره، ورايقة، وبحب أسمع صوتك جدًا وأنام عليه 🥺 وببقى نفسي أشوفك في المعهد، بس الدنيا بقى هنعمل إيه 😒',
    },
    {
      id: 'love',
      envelopeTitle: 'رسالة للشطورة',
      title: 'رسالة للشطورة',
      body:
        'كل سنة وإنتِ أشطر واحدة في الدنيا يا روحي، ودايمًا ناجحة وبتجيبي امتياز ودايسة على شوية الفلاحين اللي معانا في الدفعة. حتى لو مش مصدقين، ده أنا عارف إنك أشطر واحدة وهتصدميهم كلهم.\n\n(عارف إنك هتفاجئي الدنيا كلها 😉)\n\n«أَيُّهَا الْحَبِيبُ، فِي كُلِّ شَيْءٍ أَرُومُ أَنْ تَكُونَ نَاجِحًا وَصَحِيحًا، كَمَا أَنَّ نَفْسَكَ نَاجِحَةٌ».\nرسالة يوحنا الثالثة 1:2',
    },
    {
      id: 'heart',
      envelopeTitle: 'رسالة من قلبي',
      title: 'رسالة من قلبي',
      body:
        'كل سنة وإنتِ طيبة يا مريومة، وعقبال مليون سنة مع حبايبك، ودايمًا معايا ومنوّرة حياتي وفهماني من قبل ما أتكلم 😂 يا رب دايمًا تبقي مبسوطة وفرحانة، ومهما حصل متتضايقيش.\n\nبشكر ربنا إنه ادّاني أحلى حاجة في الدنيا، ولو اعتبرناها صدفة، فدي أجمل صدفة حصلتلي في حياتي ❤️🤍\n\nربنا يخليكي ليا يا روحي 💓',
    },
  ],
  signoff: 'زقرد صاحبك و حبيبك',
  signature: 'أبرام',

  finalMessage: 'بحبك أوي',
  finalSubMessage: 'كل سنه و انتي طيبه يا حبيبتي.',

  themeLabels: { toLight: 'التبديل للوضع الفاتح', toDark: 'التبديل للوضع الداكن' },
  languageLabel: 'اللغة',
  navLabel: 'الأقسام',
  nav: [
    { id: 'hero', label: 'عيد الميلاد' },
    { id: 'special', label: 'ليه إنتِ مميزة' },
    { id: 'letters', label: 'الرسايل' },
    { id: 'ending', label: 'بحبك' },
  ],
}

export const translations: Record<Lang, Translations> = { en, ar }
