import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react"

type Lang = "ja" | "en"
type Page = "home" | "about" | "contact"

const HERO_IMAGE =
  "/assets/Showcase_img.jpg"
const PARTS_IMAGE =
  "/assets/Engine.jpg"
const LOGISTICS_IMAGE =
  "/assets/Ship.jpg"

const copy = {
  ja: {
    nav: {
      home: "ホーム",
      about: "会社情報",
      faq: "FAQ",
      contact: "お問い合わせ",
    },
    contactCta: "お問い合わせ",
    learnMore: "会社情報を見る",
  },
  en: {
    nav: { home: "Home", about: "About", faq: "FAQ", contact: "Contact" },
    contactCta: "Contact Us",
    learnMore: "About ALTAI",
  },
} as const

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

function Icon({
  name,
}: {
  name: "car" | "parts" | "message" | "globe" | "target" | "support" | "mail" | "phone" | "pin"
}) {
  const paths: Record<typeof name, ReactNode> = {
    car: (
      <>
        <path d="M4 13l1.7-5h12.6l1.7 5v5h-2v-2H6v2H4v-5Z" />
        <path d="M7 13h.01M17 13h.01M8 8l1-3h6l1 3" />
      </>
    ),
    parts: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    message: (
      <>
        <path d="M4 5h16v11H9l-5 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <path d="m12 12 7-7M16 5h3v3" />
      </>
    ),
    support: (
      <>
        <path d="M5 15a8 8 0 1 1 14 0" />
        <path d="M5 14H3v5h4v-5H5ZM19 14h2v5h-4v-5h2ZM17 19c-1 2-3 2-5 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    phone: (
      <path d="M8 4 5 6c0 7 6 13 13 13l2-3-4-3-2 2c-3-1-4-2-5-5l2-2-3-4Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  }
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}

function Logo({ lang }: { lang: Lang }) {
  return (
    // LOGO — REPLACE WITH OFFICIAL ALTAI LOGO
    <span
      className="logo"
      aria-label={lang === "ja" ? "ALTAI合同会社" : "ALTAI LLC"}
    >
      <span className="logo-mark"><img src="/assets/Logo.jpg" alt="logo" /></span>
      <span className="logo-type">
        <strong>ALTAI</strong>
        <small>{lang === "ja" ? "合同会社" : "LLC"}</small>
      </span>
    </span>
  )
}

function LinkButton({
  children,
  variant = "primary",
  onClick,
  href,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "light"
  onClick?: () => void
  href?: string
}) {
  return (
    <a className={`button button-${variant}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function Header({
  lang,
  setLang,
  navigate,
  page,
}: {
  lang: Lang
  setLang: (lang: Lang) => void
  navigate: (page: Page, hash?: string) => void
  page: Page
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [page])

  const go = (target: Page, hash?: string) => {
    setOpen(false)
    navigate(target, hash)
  }
  const c = copy[lang]

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a
          href="/"
          className="logo-link"
          onClick={(event) => {
            event.preventDefault()
            go("home")
          }}
        >
          <Logo lang={lang} />
        </a>
        <nav
          className="desktop-nav"
          aria-label={
            lang === "ja" ? "メインナビゲーション" : "Main navigation"
          }
        >
          <a
            className={page === "home" ? "active" : ""}
            href="/"
            onClick={(e) => {
              e.preventDefault()
              go("home")
            }}
          >
            {c.nav.home}
          </a>
          <a
            className={page === "about" ? "active" : ""}
            href="/about"
            onClick={(e) => {
              e.preventDefault()
              go("about")
            }}
          >
            {c.nav.about}
          </a>
          <a
            href="/#faq"
            onClick={(e) => {
              e.preventDefault()
              go("home", "faq")
            }}
          >
            {c.nav.faq}
          </a>
          <a
            className={page === "contact" ? "active" : ""}
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              go("contact")
            }}
          >
            {c.nav.contact}
          </a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <a
            className="header-cta"
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              go("contact")
            }}
          >
            {c.contactCta}
            <ArrowIcon />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={
              open
                ? lang === "ja"
                  ? "メニューを閉じる"
                  : "Close menu"
                : lang === "ja"
                  ? "メニューを開く"
                  : "Open menu"
            }
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav
          aria-label={
            lang === "ja" ? "モバイルナビゲーション" : "Mobile navigation"
          }
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              go("home")
            }}
          >
            {c.nav.home}
            <span>01</span>
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault()
              go("about")
            }}
          >
            {c.nav.about}
            <span>02</span>
          </a>
          <a
            href="/#faq"
            onClick={(e) => {
              e.preventDefault()
              go("home", "faq")
            }}
          >
            {c.nav.faq}
            <span>03</span>
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              go("contact")
            }}
          >
            {c.nav.contact}
            <span>04</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: Lang
  setLang: (lang: Lang) => void
}) {
  return (
    <div className="language-switcher" aria-label="Language selection">
      <button
        type="button"
        className={lang === "ja" ? "selected" : ""}
        aria-pressed={lang === "ja"}
        onClick={() => setLang("ja")}
      >
        日本語
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        className={lang === "en" ? "selected" : ""}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function Home({
  lang,
  navigate,
}: {
  lang: Lang
  navigate: (page: Page, hash?: string) => void
}) {
  const ja = lang === "ja"
  const business = [
    {
      icon: "car" as const,
      no: "01",
      title: ja ? "自動車輸出" : "Vehicle Export",
      text: ja
        ? "日本から海外のお客様へ、自動車の輸出を行っています。具体的な取扱車両や輸出先については、お問い合わせください。"
        : "We export vehicles from Japan to overseas customers. Please contact us for information regarding available vehicles and export destinations.",
    },
    {
      icon: "parts" as const,
      no: "02",
      title: ja ? "自動車部品輸出" : "Automotive Parts Export",
      text: ja
        ? "自動車部品の海外向け輸出に対応しています。お探しの部品やご希望の条件について、お気軽にお問い合わせください。"
        : "We handle the export of automotive parts to overseas customers. Please contact us with your required parts and specifications.",
    },
  ]
  const principles = [
    [
      "message",
      ja ? "明確なコミュニケーション" : "Clear Communication",
      ja
        ? "ご要望や取引条件を確認し、分かりやすい情報共有を大切にします。"
        : "We value clear information sharing when discussing requirements and transaction terms.",
    ],
    [
      "globe",
      ja ? "海外取引への対応" : "International Business Support",
      ja
        ? "海外のお客様からの輸出に関するご相談を受け付けています。"
        : "We welcome export-related discussions with overseas customers.",
    ],
    [
      "target",
      ja ? "ご要望に合わせた対応" : "Customer-Oriented Support",
      ja
        ? "商品や条件について、お客様のご要望を確認したうえでご案内します。"
        : "We discuss products and conditions based on each customer’s requirements.",
    ],
    [
      "support",
      ja ? "自動車・部品輸出への対応" : "Vehicle & Parts Export Support",
      ja
        ? "自動車と自動車部品、二つの輸出分野に対応しています。"
        : "We handle export inquiries for both vehicles and automotive parts.",
    ],
  ] as const
  const steps = ja
    ? [
        ["お問い合わせ", "ご希望の商品や条件をお知らせください。"],
        ["ご要望・条件の確認", "必要な情報を確認し、ご相談を進めます。"],
        [
          "お見積り・輸出手続きのご案内",
          "取引条件と手続きについてご案内します。",
        ],
        ["輸出・お引き渡し", "合意した条件に沿って輸出を進めます。"],
      ]
    : [
        ["Inquiry", "Tell us about your requested product and conditions."],
        [
          "Requirement Confirmation",
          "We review the information needed for your inquiry.",
        ],
        [
          "Quotation & Export Procedure Guidance",
          "We provide details on terms and procedures.",
        ],
        ["Export & Delivery", "Export proceeds according to the agreed terms."],
      ]

  return (
    <main>
      <section className="home-hero">
        <img
          src={HERO_IMAGE}
          alt={
            ja
              ? "輸出ビジネスをイメージした自動車"
              : "Vehicle representing automotive export business"
          }
        />
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <p className="hero-kicker">
            <span>ALTAI LLC</span>
            <span>{ja ? "AUTOMOTIVE EXPORT" : "JAPAN · EST. 2022"}</span>
          </p>
          <h1>
            {ja ? (
              <>
                <span>自動車・自動車部品を、世界へ。</span>
                <br />
                
              </>
            ) : (
              <>
                <span>Automotive Vehicles & Parts, connecting Japan with the World.</span>
                <br />
                
              </>
            )}
          </h1>
          <p className="hero-copy">
            {ja
              ? "当社は、日本国内から厳選した中古車を仕入れ、海外のお客様へ輸出・販売しています。お客様のご希望やご予算に合わせた車両探しから、購入、輸出に必要な手続き、海外への輸送まで、安心してお取引いただけるよう丁寧にサポートいたします。"
              : "We source carefully selected, high-quality used vehicles from across Japan to export and sell to clients worldwide. From finding the perfect vehicle that fits your specific needs and budget to handling the purchase, export documentation, and global shipping, we provide dedicated, end-to-end support to ensure a seamless and reliable transaction."}
          </p>
          <div className="hero-actions">
            <LinkButton href="/contact" onClick={() => navigate("contact")}>
              {copy[lang].contactCta}
            </LinkButton>
            <LinkButton
              variant="light"
              href="/about"
              onClick={() => navigate("about")}
            >
              {copy[lang].learnMore}
            </LinkButton>
          </div>
        </div>
        <div className="hero-caption">
          <span>ALTAI</span>
          <p>{ja ? "自動車・自動車部品輸出" : "VEHICLES & AUTOMOTIVE PARTS"}</p>
        </div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-inner">
          <p>
            {ja
              ? "日本から海外へ。明確で実務的な輸出サポート。"
              : "From Japan to overseas markets. Clear, practical export support."}
          </p>
          <div>
            <span>01</span>
            <span>{ja ? "自動車" : "VEHICLES"}</span>
            <i />
            <span>02</span>
            <span>{ja ? "自動車部品" : "PARTS"}</span>
          </div>
        </div>
      </section>

      <section className="section business-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR BUSINESS"
            title={ja ? "事業内容" : "Our Business"}
            description={
              ja
                ? "海外のお客様に向けて、自動車と自動車部品の輸出に関するご相談を承ります。"
                : "We welcome export inquiries from overseas customers for vehicles and automotive parts."
            }
          />
          <div className="business-grid">
            {business.map((item, index) => (
              <article className="business-card" key={item.title}>
                <div className="business-visual">
                  <img
                    loading="lazy"
                    src={index === 0 ? LOGISTICS_IMAGE : PARTS_IMAGE}
                    alt={
                      index === 0
                        ? ja
                          ? "車両輸送のイメージ"
                          : "Vehicle transportation concept"
                        : ja
                          ? "自動車部品整備のイメージ"
                          : "Automotive parts service concept"
                    }
                  />
                  <span>{item.no}</span>
                </div>
                <div className="business-body">
                  <div className="icon-box">
                    <Icon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate("contact")
                    }}
                  >
                    {ja ? "お問い合わせ" : "Make an inquiry"}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              eyebrow="OUR APPROACH"
              title={ja ? "ALTAIが提供すること" : "What We Focus On"}
            />
            <p>
              {ja
                ? "誠実な情報共有を基礎に、海外のお客様との円滑な取引を目指します。"
                : "Our approach is grounded in clear information sharing for smooth international business discussions."}
            </p>
          </div>
          <div className="principles-grid">
            {principles.map(([icon, title, text], index) => (
              <article className="principle-card" key={title}>
                <span className="card-number">0{index + 1}</span>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeading
            light
            eyebrow="EXPORT PROCESS"
            title={ja ? "輸出までの流れ" : "How the Process Works"}
            description={
              ja
                ? "お問い合わせから輸出までの基本的な流れをご案内します。"
                : "A general overview from inquiry through export."
            }
          />
          <ol className="process-list">
            {steps.map(([title, text], index) => (
              <li key={title}>
                <div className="process-no">0{index + 1}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index < 3 && <ArrowIcon />}
              </li>
            ))}
          </ol>
          <p className="process-note">
            {ja
              ? "※具体的な手続きや条件は、商品・輸出先・取引条件によって異なります。詳細はお問い合わせください。"
              : "*Specific procedures and conditions may vary depending on the product, destination, and transaction terms. Please contact us for details."}
          </p>
        </div>
      </section>

      {/* <section className="section overseas-section">
        <div className="container overseas-grid">
          <div className="overseas-map" aria-hidden="true">
            <div className="map-circle">
              <Icon name="globe" />
              <span>
                ALTAI
                <br />
                JAPAN
              </span>
            </div>
            <i className="line line-a" />
            <i className="line line-b" />
            <i className="line line-c" />
          </div>
          <div>
            <SectionHeading
              eyebrow="FOR OVERSEAS BUYERS"
              title={ja ? "海外のお客様へ" : "For Overseas Buyers"}
            />
            <p>
              {ja ? (
                <>
                  海外からのお問い合わせを歓迎しています。
                  <br />
                  自動車・自動車部品に関するご相談、輸出についてのご質問など、お気軽にお問い合わせください。
                </>
              ) : (
                <>
                  We welcome inquiries from overseas buyers.
                  <br />
                  Please contact us for vehicle and automotive parts inquiries,
                  export-related questions, and business discussions.
                </>
              )}
            </p>
            <LinkButton href="/contact" onClick={() => navigate("contact")}>
              {copy[lang].contactCta}
            </LinkButton>
          </div>
        </div>
      </section> */}

      <FAQ lang={lang} navigate={navigate} />
      <CTA lang={lang} navigate={navigate} />
    </main>
  )
}

function FAQ({
  lang,
  navigate,
}: {
  lang: Lang
  navigate: (page: Page) => void
}) {
  const ja = lang === "ja"
  const [open, setOpen] = useState<number | null>(null)
  const faqs = ja
    ? [
        [
          "海外からでも問い合わせできますか？",
          "はい。海外のお客様からのお問い合わせを受け付けています。ご希望の商品や条件などをお問い合わせフォームからお知らせください。",
        ],
        [
          "自動車部品だけの問い合わせも可能ですか？",
          "はい。自動車部品に関するお問い合わせも受け付けています。お探しの部品や必要な情報をご記入ください。",
        ],
        [
          "輸出可能な車両について確認できますか？",
          "はい。ご希望の車両についてお問い合わせください。取扱可否や条件について確認のうえご案内します。",
        ],
        [
          "海外への発送について相談できますか？",
          "はい。輸出先や商品などの条件をお知らせいただければ、具体的な内容についてご相談いただけます。",
        ],
        [
          "英語で問い合わせできますか？",
          "はい。英語でお問い合わせいただけます。お問い合わせフォームの言語を英語に切り替えてご利用ください。",
        ],
      ]
    : [
        [
          "Can I make an inquiry from outside Japan?",
          "Yes. We welcome inquiries from overseas customers. Please use the inquiry form to tell us about your requested product and conditions.",
        ],
        [
          "Can I inquire about automotive parts only?",
          "Yes. We accept inquiries regarding automotive parts. Please provide details about the parts and information you require.",
        ],
        [
          "Can I check which vehicles can be exported?",
          "Yes. Please inquire about your preferred vehicle. We will review availability and applicable conditions before providing information.",
        ],
        [
          "Can I discuss overseas shipping?",
          "Yes. Please provide the destination, product, and other relevant conditions so the details can be discussed.",
        ],
        [
          "Can I contact you in English?",
          "Yes. You can submit your inquiry in English using the English version of our inquiry form.",
        ],
      ]
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <SectionHeading
            eyebrow="FAQ"
            title={ja ? "よくあるご質問" : "Frequently Asked Questions"}
            description={
              ja
                ? "お問い合わせ前に多く寄せられるご質問をご案内します。"
                : "Helpful information before making an inquiry."
            }
          />
          <p>{ja ? "その他のご質問はこちら" : "Have another question?"}</p>
          <LinkButton
            variant="secondary"
            href="/contact"
            onClick={() => navigate("contact")}
          >
            {copy[lang].contactCta}
          </LinkButton>
        </div>
        <div className="accordion">
          {faqs.map(([question, answer], index) => {
            const expanded = open === index
            return (
              <div
                className={`faq-item ${expanded ? "expanded" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span className="faq-q">Q</span>
                    <span>{question}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-hidden={!expanded}
                >
                  <div>
                    <span>A</span>
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
}: {
  eyebrow: string
  title: string
  subtitle: string
  description: string
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-lines" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <div className="page-hero-bottom">
          <h2>{subtitle}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}

function About({
  lang,
  navigate,
}: {
  lang: Lang
  navigate: (page: Page) => void
}) {
  const ja = lang === "ja"
  const profile = ja
    ? [
        [
          "会社名",
          <>
            <strong>ALTAI合同会社</strong>
            <small>ALTAI LLC</small>
          </>,
        ],
        ["設立", "2022年"],
        ["事業内容", "自動車・自動車部品の輸出"],
        ["所在地", "〒287-0211 千葉県成田市所1037-12"],
        ["電話番号", "0476-37-4948"],
        ["メール", "altaicar2022@gmail.com"],
        ["Google Maps", "〒287-0211 千葉県成田市所1037-12"],
      ]
    : [
        [
          "Company",
          <>
            <strong>ALTAI LLC</strong>
            <small>ALTAI合同会社</small>
          </>,
        ],
        ["Founded", "2022"],
        ["Business", "Export of vehicles and automotive parts"],
        ["Address", "〒287-0211 千葉県成田市所1037-12"],
        ["Phone", "0476-37-4948"],
        ["Email", "altaicar2022@gmail.com"],
        ["Google Maps", "〒287-0211 千葉県成田市所1037-12"],
      ]
  const values = ja
    ? [
        [
          "01",
          "信頼できるコミュニケーション",
          "お客様との対話を大切にし、ご要望や条件を丁寧に確認します。",
        ],
        [
          "02",
          "正確な情報共有",
          "商品や取引条件について、明確で分かりやすい情報共有を心がけます。",
        ],
        [
          "03",
          "長期的なビジネス関係",
          "一つひとつのご相談に誠実に向き合い、継続的な関係を大切にします。",
        ],
      ]
    : [
        [
          "01",
          "Reliable Communication",
          "We value dialogue and carefully review each customer’s requirements and conditions.",
        ],
        [
          "02",
          "Accurate Information",
          "We focus on clear, understandable information about products and transaction terms.",
        ],
        [
          "03",
          "Long-Term Business Relationships",
          "We approach each discussion sincerely and value sustainable business relationships.",
        ],
      ]
  return (
    <main>
      <PageHero
        eyebrow="ABOUT ALTAI"
        title={ja ? "会社情報" : "About ALTAI"}
        subtitle={
          ja
            ? "世界とつながる、誠実なビジネスを。"
            : "Clear business, connected internationally."
        }
        description={
          ja
            ? "ALTAI合同会社は2022年に設立され、自動車および自動車部品の輸出を行っています。"
            : "ALTAI LLC was established in 2022 and operates in the export of vehicles and automotive parts."
        }
      />

      <section className="section profile-section">
        <div className="container profile-grid">
          <SectionHeading
            eyebrow="COMPANY PROFILE"
            title={ja ? "会社概要" : "Company Profile"}
          />
          <dl className="profile-table">
            {profile.map(([term, detail]) => (
              <div key={term as string}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section about-business">
        <div className="container about-business-grid">
          <div className="about-image">
            <img
              src={LOGISTICS_IMAGE}
              alt={
                ja
                  ? "自動車輸送のイメージ"
                  : "Automotive transportation concept"
              }
            />
            <span>{ja ? "自動車・自動車部品輸出" : "AUTOMOTIVE EXPORT"}</span>
          </div>
          <div>
            <SectionHeading
              eyebrow="OUR BUSINESS"
              title={ja ? "事業について" : "About Our Business"}
            />
            <p>
              {ja
                ? "自動車および自動車部品を海外のお客様へ提供するための輸出業務を行っています。具体的な取扱商品や条件については、お客様のご要望を確認したうえでご案内します。"
                : "We handle export-related business for vehicles and automotive parts for overseas customers. Specific products and transaction conditions are discussed based on each customer's requirements."}
            </p>
            <LinkButton
              variant="secondary"
              href="/contact"
              onClick={() => navigate("contact")}
            >
              {copy[lang].contactCta}
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR VALUES"
            title={ja ? "私たちが大切にすること" : "What We Value"}
            description={
              ja
                ? "海外のお客様とのビジネスにおいて、三つの姿勢を大切にしています。"
                : "Three principles guide our approach to international business."
            }
          />
          <div className="values-grid">
            {values.map(([no, title, text]) => (
              <article key={no}>
                <span>{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-section">
        <div className="container">
          <SectionHeading
            eyebrow="LOCATION"
            title={ja ? "所在地" : "Location"}
          />
          <MapPlaceholder />
          <div className="location-address">
            <Icon name="pin" />
            <div>
              <small>{ja ? "所在地" : "ADDRESS"}</small>
              <strong>〒287-0211 千葉県成田市所1037-12</strong>
            </div>
          </div>
        </div>
      </section>
      <CTA lang={lang} navigate={navigate} compact />
    </main>
  )
}

function MapPlaceholder() {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.3458069447906!2d140.47119809999998!3d35.845967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022f6fd4bf5148f%3A0xfae8207fb536c48!2s1037-12%20Tokoro%2C%20Narita%2C%20Chiba%20287-0211%2C%20Japan!5e1!3m2!1sen!2s!4v1791186578501!5m2!1sen!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="ALTAI LLC location"
      />
    </div>
  )
}

type Errors = Record<string, string>

function ContactForm({ lang }: { lang: Lang }) {
  const ja = lang === "ja"
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const formId = useId()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next: Errors = {}
    ;[
      "name",
      "company",
      "email",
      "phone",
      "country",
      "type",
      "message",
    ].forEach((field) => {
      if (!String(form.get(field) || "").trim())
        next[field] = ja
          ? "必須項目を入力してください。"
          : "Please complete this required field."
    })
    const email = String(form.get("email") || "")
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = ja
        ? "有効なメールアドレスを入力してください。"
        : "Please enter a valid email address."
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSuccess(true)
      formRef.current?.reset()
      window.setTimeout(
        () => document.getElementById(`${formId}-success`)?.focus(),
        0,
      )
    }
  }
  const field = (
    name: string,
    label: string,
    input: ReactNode,
    optional = false,
  ) => (
    <div className={`form-field ${errors[name] ? "has-error" : ""}`}>
      <label htmlFor={`${formId}-${name}`}>
        {label}{" "}
        {optional ? (
          <span>{ja ? "任意" : "Optional"}</span>
        ) : (
          <em>{ja ? "必須" : "Required"}</em>
        )}
      </label>
      {input}
      {errors[name] && (
        <p className="field-error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  )
  if (success) {
    return (
      <div className="form-success" id={`${formId}-success`} tabIndex={-1}>
        <span>✓</span>
        <p className="eyebrow">{ja ? "送信完了" : "INQUIRY RECEIVED"}</p>
        <h2>
          {ja
            ? "お問い合わせありがとうございます。"
            : "Thank you for your inquiry."}
        </h2>
        <p>
          {ja
            ? "内容を確認のうえ、担当者よりご連絡いたします。"
            : "We will review your message and contact you."}
        </p>
        <button type="button" onClick={() => setSuccess(false)}>
          {ja ? "フォームに戻る" : "Return to form"}
        </button>
        <small>
          {ja
            ? "※現在はデモフォームです。バックエンド接続後に送信機能が有効になります。"
            : "*This is currently a demonstration form. Submission will be enabled when a backend is connected."}
        </small>
      </div>
    )
  }
  return (
    <form className="contact-form" ref={formRef} onSubmit={submit} noValidate>
      <div className="form-heading">
        <p className="eyebrow">
          <span />
          INQUIRY FORM
        </p>
        <h2>{ja ? "お問い合わせフォーム" : "Send an Inquiry"}</h2>
        <p>
          {ja
            ? "必要事項をご入力ください。必須項目はすべてご入力をお願いいたします。"
            : "Please complete the form below. All required fields must be filled in."}
        </p>
      </div>
      <div className="form-grid">
        {field(
          "name",
          ja ? "お名前" : "Name",
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />,
        )}
        {field(
          "company",
          ja ? "会社名" : "Company",
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
          />,
        )}
        {field(
          "email",
          ja ? "メールアドレス" : "Email Address",
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />,
        )}
        {field(
          "phone",
          ja ? "電話番号" : "Phone Number",
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />,
        )}
        {field(
          "country",
          ja ? "国・地域" : "Country / Region",
          <input
            id={`${formId}-country`}
            name="country"
            type="text"
            autoComplete="country-name"
            aria-invalid={!!errors.country}
          />,
        )}
        {field(
          "type",
          ja ? "お問い合わせ種別" : "Inquiry Type",
          <select
            id={`${formId}-type`}
            name="type"
            defaultValue=""
            aria-invalid={!!errors.type}
          >
            <option value="" disabled>
              {ja ? "選択してください" : "Please select"}
            </option>
            <option>{ja ? "自動車について" : "Vehicle Inquiry"}</option>
            <option>
              {ja ? "自動車部品について" : "Automotive Parts Inquiry"}
            </option>
            <option>{ja ? "輸出について" : "Export Inquiry"}</option>
            <option>{ja ? "その他" : "Other"}</option>
          </select>,
        )}
        {field(
          "requested",
          ja ? "希望商品・車種" : "Requested Vehicle / Part",
          <input id={`${formId}-requested`} name="requested" type="text" />,
          true,
        )}
        {field(
          "quantity",
          ja ? "数量" : "Quantity",
          <input
            id={`${formId}-quantity`}
            name="quantity"
            type="text"
            inputMode="numeric"
          />,
          true,
        )}
        <div className="form-field full">
          <label htmlFor={`${formId}-attachment`}>
            {ja ? "資料・画像" : "Attachment"}{" "}
            <span>{ja ? "任意" : "Optional"}</span>
          </label>
          <label className="file-upload" htmlFor={`${formId}-attachment`}>
            <input
              id={`${formId}-attachment`}
              name="attachment"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
            />
            <span className="upload-icon">＋</span>
            <strong>{ja ? "ファイルを選択" : "Choose a file"}</strong>
            <small>
              {ja
                ? "必要に応じて、車両・部品に関する画像や資料を添付してください。"
                : "If necessary, attach images or documents related to the vehicle or part."}
            </small>
          </label>
        </div>
        {field(
          "message",
          ja ? "お問い合わせ内容" : "Message",
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={7}
            aria-invalid={!!errors.message}
          />,
          false,
        )}
      </div>
      <p className="form-note">
        {ja
          ? "※このフォームは現在UIデモです。バックエンドが接続されるまで、実際のメール送信は行われません。"
          : "*This form is currently a UI demonstration. It does not send email until a backend is connected."}
      </p>
      <button className="submit-button" type="submit">
        <span>{ja ? "送信する" : "Submit Inquiry"}</span>
        <ArrowIcon />
      </button>
    </form>
  )
}

function Contact({ lang }: { lang: Lang }) {
  const ja = lang === "ja"

  return (
    <main>
      <PageHero
        eyebrow="CONTACT"
        title={ja ? "お問い合わせ" : "Contact Us"}
        subtitle={ja ? "お問い合わせ・ご相談" : "Get in Touch"}
        description={
          ja
            ? "自動車・自動車部品に関するお問い合わせ、輸出についてのご相談など、お気軽にご連絡ください。"
            : "For inquiries about vehicles, automotive parts, or export-related business, please contact us."
        }
      />

      <section className="section contact-section">
        <div className="container">
          <div className="contact-layout contact-layout-single">
            <aside className="contact-aside">
              <SectionHeading
                eyebrow="CONTACT INFORMATION"
                title={ja ? "お問い合わせ先" : "Contact Information"}
              />

              <p className="contact-description">
                {ja
                  ? "自動車・自動車部品の輸出に関するお問い合わせやご相談は、以下の連絡先までお気軽にご連絡ください。"
                  : "For inquiries or consultations regarding vehicle and automotive parts exports, please feel free to contact us using the information below."}
              </p>

              <div className="contact-info-list">
                <div>
                  <Icon name="mail" />
                  <p>
                    <small>EMAIL</small>
                    <strong>altaicar2022@gmail.com</strong>
                  </p>
                </div>

                <div>
                  <Icon name="phone" />
                  <p>
                    <small>PHONE</small>
                    <strong>0476-37-4948</strong>
                  </p>
                </div>

                <div>
                  <Icon name="pin" />
                  <p>
                    <small>{ja ? "所在地" : "ADDRESS"}</small>
                    <strong>〒287-0211 千葉県成田市所1037-12</strong>
                  </p>
                </div>

                <div className="hours">
                  <span>OPEN</span>
                  <p>
                    <small>{ja ? "営業時間" : "BUSINESS HOURS"}</small>
                    <strong>9:00-17:00</strong>
                  </p>
                </div>
              </div>

              {/* <a
                className="call-button"
                href="tel:0476374948"
              >
                <Icon name="phone" />
                <span>
                  <small>{ja ? "電話でお問い合わせ" : "Call Us"}</small>
                  {ja ? "0476-37-4948" : "+81 476-37-4948"}
                </span>
                <ArrowIcon />
              </a> */}
            </aside>
          </div>
        </div>
      </section>

      <section className="section contact-map-section">
        <div className="container">
          <div className="split-heading">
            <SectionHeading
              eyebrow="LOCATION"
              title={ja ? "所在地・アクセス" : "Location & Access"}
            />
            <p>〒287-0211 千葉県成田市所1037-12</p>
          </div>

          <MapPlaceholder />
        </div>
      </section>
    </main>
  )
}

function CTA({
  lang,
  navigate,
  compact = false,
}: {
  lang: Lang
  navigate: (page: Page) => void
  compact?: boolean
}) {
  const ja = lang === "ja"
  return (
    <section className={`cta-section ${compact ? "compact" : ""}`}>
      <div className="cta-lines" aria-hidden="true" />
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">
            <span />
            CONTACT ALTAI
          </p>
          <h2>
            {compact ? (
              ja ? (
                "お問い合わせはこちら"
              ) : (
                "Contact ALTAI"
              )
            ) : ja ? (
              <>
                自動車・自動車部品について
                <br />
                お気軽にお問い合わせください。
              </>
            ) : (
              <>
                Looking for vehicles or automotive parts?
                <br />
                Contact ALTAI LLC.
              </>
            )}
          </h2>
        </div>
        <LinkButton href="/contact" onClick={() => navigate("contact")}>
          {copy[lang].contactCta}
        </LinkButton>
      </div>
    </section>
  )
}

function Footer({
  lang,
  navigate,
}: {
  lang: Lang
  navigate: (page: Page, hash?: string) => void
}) {
  const ja = lang === "ja"
  const c = copy[lang]
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo lang={lang} />
          <p>
            {ja
              ? "自動車・自動車部品の輸出を通じて、海外のお客様との円滑なビジネスをサポートします。"
              : "ALTAI LLC supports international customers through the export of vehicles and automotive parts."}
          </p>
        </div>
        <div className="footer-nav">
          <p>{ja ? "メニュー" : "NAVIGATION"}</p>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate("home")
            }}
          >
            {c.nav.home}
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault()
              navigate("about")
            }}
          >
            {c.nav.about}
          </a>
          <a
            href="/#faq"
            onClick={(e) => {
              e.preventDefault()
              navigate("home", "faq")
            }}
          >
            {c.nav.faq}
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              navigate("contact")
            }}
          >
            {c.nav.contact}
          </a>
        </div>
        <div className="footer-contact">
          <p>{ja ? "お問い合わせ先" : "CONTACT"}</p>
          <span>
            <Icon name="mail" />
            altaicar2022@gmail.com
          </span>
          <span>
            <Icon name="phone" />
            0476-37-4948
          </span>
          <span>
            <Icon name="pin" />
            〒287-0211 千葉県成田市所1037-12
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2022 ALTAI合同会社 / ALTAI LLC</p>
      </div>
    </footer>
  )
}

function getPage(): Page {
  if (window.location.pathname.startsWith("/about")) return "about"
  if (window.location.pathname.startsWith("/contact")) return "contact"
  return "home"
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(() =>
    localStorage.getItem("altai-language") === "en" ? "en" : "ja",
  )
  const [page, setPage] = useState<Page>(getPage)

  const setLang = (next: Lang) => {
    setLangState(next)
    localStorage.setItem("altai-language", next)
  }

  const navigate = (next: Page, hash?: string) => {
    const path = next === "home" ? "/" : `/${next}`
    window.history.pushState({}, "", hash ? `${path}#${hash}` : path)
    setPage(next)
    if (hash)
      window.setTimeout(
        () =>
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }),
        50,
      )
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const onPop = () => setPage(getPage())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => {
    const ja = lang === "ja"
    const titles = {
      home: ja
        ? "ALTAI合同会社｜自動車・自動車部品の輸出"
        : "ALTAI LLC | Vehicle & Automotive Parts Export",
      about: ja ? "会社情報｜ALTAI合同会社" : "About ALTAI | ALTAI LLC",
      contact: ja ? "お問い合わせ｜ALTAI合同会社" : "Contact Us | ALTAI LLC",
    }
    const description = ja
      ? "ALTAI合同会社は、自動車および自動車部品の輸出を行っています。海外のお客様からのお問い合わせを受け付けています。"
      : "ALTAI LLC exports vehicles and automotive parts to overseas customers. Contact us for vehicle, parts, and export inquiries."
    document.title = titles[page]
    document.documentElement.lang = lang
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement("meta")
      meta.setAttribute("name", "description")
      document.head.appendChild(meta)
    }
    meta.setAttribute("content", description)
  }, [lang, page])

  useEffect(() => {
    if (page === "home" && window.location.hash === "#faq") {
      window.setTimeout(
        () => document.getElementById("faq")?.scrollIntoView(),
        50,
      )
    }
  }, [page])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {lang === "ja" ? "本文へ移動" : "Skip to content"}
      </a>
      <Header lang={lang} setLang={setLang} navigate={navigate} page={page} />
      <div id="main-content">
        {page === "home" && <Home lang={lang} navigate={navigate} />}
        {page === "about" && <About lang={lang} navigate={navigate} />}
        {page === "contact" && <Contact lang={lang} />}
      </div>
      <Footer lang={lang} navigate={navigate} />
    </>
  )
}
