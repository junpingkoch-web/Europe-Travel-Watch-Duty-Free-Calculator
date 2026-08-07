(function () {
  var COUNTRY_FACTS = [
    { id: "fr",   currency: "EUR", vat: 20,  refund: 12 },
    { id: "it",   currency: "EUR", vat: 22,  refund: 13 },
    { id: "deu",  currency: "EUR", vat: 19,  refund: 11 },
    { id: "ch",   currency: "CHF", vat: 8.1, refund: 6  },
    { id: "es",   currency: "EUR", vat: 21,  refund: 12 },
    { id: "uk",   currency: "GBP", vat: 20,  refund: 0  },
    { id: "custom", currency: "EUR", vat: 20, refund: 12 }
  ];

  var I18N = {
    zh: {
      locale: "zh-CN",
      kicker: "欧洲 · 购表指南",
      title: "欧洲旅行手表免税计算器",
      topNote: "按各国官方增值税率与常见实退比例估算，实际以退税公司（Global Blue / Planet 等）核算单为准。",
      leftTitle: "购买信息",
      leftSub: "选择购表国家，自动带入税率与预估实退比例",
      labelCountry: "购买国家 / 地区",
      labelVat: "增值税率 VAT",
      labelRefund: "预估实退比例",
      labelPrice: "手表标价（含税）",
      pricePlaceholder: "例如 8500",
      rightTitle: "退税结果",
      rightSub: "离境海关盖章、办理退税后的到手成本",
      gaugeCaption: "省下",
      netLabel: "退税后到手价",
      liTag: "含税标价",
      liVat: "其中增值税额",
      liRefund: "预计退税到手",
      belowTitle: "与本国价格对比",
      belowSub: "填写本国零售价与汇率，估算此行到底省了多少",
      labelHomePrice: "本国零售价",
      labelFx: "汇率（1 外币 = ? 本国货币）",
      fxPlaceholder: "例如 7.85",
      fxHint: "汇率需手动输入当日实时价，本工具不联网取汇率",
      customsSummary: "入境关税提醒（需自行确认最新政策）",
      customsIntro: "多数国家对旅客都设有免税额度，超出部分可能需要按当地规定缴税。具体额度、税率请以入境国海关最新规定为准，可在下方按你查到的规则手动估算：",
      labelAllowance: "个人免税额度",
      allowancePlaceholder: "例如 800",
      labelDutyRate: "超出部分税率",
      dutyRatePlaceholder: "例如 25",
      customsNote: "此处仅做算术估算，不构成报关或纳税建议；实际以随身行李申报及海关现场核定为准。",
      footer1: "退税比例受商品类别、退税公司手续费、支付方式（现金 / 信用卡）影响，实际到手金额以退税单据为准。",
      footer2: "本工具仅供行程预算参考，不构成税务或法律建议。",
      adLabel: "广告位",
      homeCurrencyDefault: "CNY",
      homePricePlaceholder: "例如 78000",
      countryNames: { fr: "法国", it: "意大利", deu: "德国", ch: "瑞士", es: "西班牙", uk: "英国（已取消离境退税）", custom: "自定义" },
      thresholds: {
        fr: "最低退税门槛：约 100.01 欧元",
        it: "最低退税门槛：约 70.01 欧元",
        deu: "最低退税门槛：约 50 欧元",
        ch: "最低退税门槛：约 300 瑞士法郎",
        es: "最低退税门槛：无最低金额",
        uk: "2021 年起英国已取消对游客的离境退税",
        custom: "请自行填写门槛"
      },
      compareCheaper: function (net, amt, pct) { return "换算约 " + net + "，比本国零售价省 <b>" + amt + "（" + pct + "%）</b>"; },
      comparePricier: function (net, amt, pct) { return "换算约 " + net + "，比本国零售价贵 <b>" + amt + "（" + pct + "%）</b>"; },
      customsWithin: function (net) { return "换算约 " + net + "，未超出你填写的免税额度。"; },
      customsOver: function (net, taxable, rate, duty) { return "换算约 " + net + "，超出免税额度 <b>" + taxable + "</b>，按 " + rate + "% 估算需缴 <b>" + duty + "</b>。"; },
      explainTitle: "欧洲免税退税是怎么运作的？",
      explainP1: "在多数欧盟国家，非欧盟居民在参与「退税」（Tax Free）计划的商店购物达到最低金额后，可以在离开整个申根/欧盟关境（而不只是离开某一国）时申请退还已支付的增值税。购物时需出示护照，商店会开具一张退税单（Tax Free Form）。",
      explainP2: "离境时，需要在机场或边境的海关窗口，将退税单、护照、登机牌以及未拆封、未使用的手表原件一并出示给海关盖章确认——很多机场要求在办理托运行李前完成这一步，因为海关有权要求开箱查验商品。盖章后的退税单可以在机场退税代理柜台（如 Global Blue、Planet）直接办理现金或信用卡退款，也可以邮寄回退税公司处理，信用卡退款通常要等几周。",
      explainP3: "退税公司会从应退的增值税中扣除一笔服务费，所以实际到手的「现金退税比例」通常低于商品标价中包含的增值税全额——这也是为什么本工具区分「增值税率」和「预估实退比例」两个数字。瑞士不属于欧盟，退税流程和门槛不同（通常门槛更低、操作也更简单），但同样需要在离境时办理海关手续。",
      exampleTitle: "算一笔具体的账",
      exampleSteps: [
        "举个例子：假设你在巴黎一家精品店看中一块标价 <b>€8,500</b> 的手表（含20%法国增值税），这家店支持退税，预估现金退税比例约 <b>12%</b>。",
        "含税标价中的增值税额：€8,500 − €8,500 ÷ 1.20 ≈ <b>€1,417</b>",
        "预计现金退税：€8,500 × 12% ≈ <b>€1,020</b>",
        "退税后到手价：约 <b>€7,480</b>"
      ],
      exampleNote: "假设你所在地的零售价约为 CNY 78,000，按当日汇率 1 EUR ≈ 7.85 CNY 折算，€7,480 ≈ CNY 58,720——比本国零售价省下将近 CNY 19,280（约25%）。但如果你带着这块表回国，价值超过个人免税额度的部分，可能还需要缴纳本国的进口关税——省下的退税金额，不等于你最终实际到手的净节省，这也是为什么本工具专门加了「本国关税提醒」这一步。",
      faqTitle: "常见问题",
      faq: [
        { q: "退税单必须在机场盖章吗？可以邮寄办理吗？", a: "原则上必须在离开欧盟前，由海关在退税单上盖章确认（部分机场也提供数字化验证），这是退税生效的前提。之后才能选择现金、信用卡或邮寄退税单的方式领取退款。" },
        { q: "为什么计算器里的「预估实退比例」比增值税率低很多？", a: "因为退税公司（如 Global Blue、Planet）会从应退税额中扣除服务费，实际到手金额低于商品标价中包含的增值税全额。不同国家、不同退税公司、不同支付方式的实退比例都会有差异，本工具的默认值只是常见区间的粗略参考。" },
        { q: "在瑞士买表退税和在欧盟国家一样吗？", a: "不一样。瑞士不属于欧盟，有自己独立的增值税退税体系，门槛通常更低、流程也相对简单，但同样需要在离境时办理海关确认手续，具体以瑞士海关和退税代理商当时的规定为准。" },
        { q: "工具里的「本国关税提醒」是什么意思？", a: "指你把手表带回自己所在国家/地区时，海关可能对超出个人免税额度的部分征收进口税或增值税。每个国家的免税额度和税率都不同，本工具只做粗略的算术估算。" },
        { q: "这个计算器的结果可以当作最终成交价的依据吗？", a: "不可以。这里的数字只是基于官方增值税率和常见退税比例做的粗略估算，实际退税金额以退税公司出具的结算单为准，实际关税以海关现场核定为准，不构成税务或法律建议。" },
        { q: "这个工具会保存我输入的价格或个人信息吗？", a: "不会。所有计算都在你的浏览器本地完成，不会发送到任何服务器，也不需要注册或登录。" }
      ]
    },
    en: {
      locale: "en-US",
      kicker: "EUROPE · WATCH PURCHASE",
      title: "Europe Travel Watch Duty-Free Calculator",
      topNote: "Estimated from each country's official VAT rate and typical cash-refund share; your actual payout depends on the refund operator's (Global Blue, Planet, etc.) settlement slip.",
      leftTitle: "Purchase Details",
      leftSub: "Pick the country of purchase to auto-fill the VAT and estimated refund rate",
      labelCountry: "Country of purchase",
      labelVat: "VAT rate",
      labelRefund: "Estimated cash-refund rate",
      labelPrice: "Watch tag price (VAT included)",
      pricePlaceholder: "e.g. 8,500",
      rightTitle: "Refund Result",
      rightSub: "Net cost after the customs stamp and refund processing",
      gaugeCaption: "Saved",
      netLabel: "Net price after refund",
      liTag: "Tag price (incl. VAT)",
      liVat: "VAT included",
      liRefund: "Estimated cash refund",
      belowTitle: "Compare with Home-Country Price",
      belowSub: "Enter the home retail price and exchange rate to see the real savings",
      labelHomePrice: "Home retail price",
      labelFx: "Exchange rate (1 foreign unit = ? home currency)",
      fxPlaceholder: "e.g. 1.08",
      fxHint: "Enter today's live rate manually — this tool doesn't fetch rates online",
      customsSummary: "Home-country customs reminder (verify current rules yourself)",
      customsIntro: "Most countries grant travelers a duty-free allowance; amounts above it may be taxable under local rules. Check your customs authority for the current threshold and rate, then estimate below:",
      labelAllowance: "Personal duty-free allowance",
      allowancePlaceholder: "e.g. 800",
      labelDutyRate: "Duty rate above allowance",
      dutyRatePlaceholder: "e.g. 25",
      customsNote: "This is a rough arithmetic estimate only, not customs or tax advice; the actual amount is determined by your declaration and customs officers on site.",
      footer1: "Refund share varies by product category, the refund operator's fee, and payment method (cash vs. card); the actual amount follows your refund slip.",
      footer2: "For trip-budgeting reference only — not tax or legal advice.",
      adLabel: "Advertisement",
      homeCurrencyDefault: "USD",
      homePricePlaceholder: "e.g. 11,000",
      countryNames: { fr: "France", it: "Italy", deu: "Germany", ch: "Switzerland", es: "Spain", uk: "United Kingdom (tourist refund abolished)", custom: "Custom" },
      thresholds: {
        fr: "Minimum refund threshold: approx. EUR 100.01",
        it: "Minimum refund threshold: approx. EUR 70.01",
        deu: "Minimum refund threshold: approx. EUR 50",
        ch: "Minimum refund threshold: approx. CHF 300",
        es: "Minimum refund threshold: none",
        uk: "Tourist tax-free shopping ended in the UK in 2021",
        custom: "Enter your own threshold"
      },
      compareCheaper: function (net, amt, pct) { return "&asymp; " + net + " &mdash; <b>" + amt + " (" + pct + "%)</b> cheaper than the home retail price"; },
      comparePricier: function (net, amt, pct) { return "&asymp; " + net + " &mdash; <b>" + amt + " (" + pct + "%)</b> more expensive than the home retail price"; },
      customsWithin: function (net) { return "&asymp; " + net + " &mdash; within the duty-free allowance you entered."; },
      customsOver: function (net, taxable, rate, duty) { return "&asymp; " + net + " &mdash; exceeds your allowance by <b>" + taxable + "</b>; at " + rate + "% that's an estimated <b>" + duty + "</b> in duty."; },
      explainTitle: "How does European tax-free shopping actually work?",
      explainP1: "In most EU countries, non-EU residents shopping at participating \"Tax Free\" stores can reclaim the VAT they paid once they leave the EU (not just the country of purchase, but the entire Schengen/EU customs area) — provided they hit the minimum purchase amount. You show your passport at checkout, and the store issues a Tax Free Form.",
      explainP2: "When you leave, you need to get that form stamped by customs at the airport or border — along with your passport, boarding pass, and the watch itself, unworn and in its original packaging, since customs can ask to inspect it. Many airports require this before you check in your luggage. Once stamped, you can claim your refund in cash or to a credit card at an on-site refund counter (Global Blue, Planet, etc.), or mail the form back to the operator — card refunds typically take a few weeks.",
      explainP3: "The refund operator deducts a service fee from the VAT owed, so the actual cash-refund percentage you receive is usually lower than the full VAT rate baked into the sticker price — which is why this tool separates \"VAT rate\" from \"estimated cash-refund rate.\" Switzerland isn't in the EU, so its refund process and thresholds differ (generally a lower minimum and a simpler process), but it still requires a customs stop before you leave the country.",
      exampleTitle: "A worked example",
      exampleSteps: [
        "Say you spot a watch tagged at <b>€8,500</b> at a boutique in Paris (including 20% French VAT), and the store participates in tax-free shopping with an estimated cash-refund rate of about <b>12%</b>.",
        "VAT included in the tag price: €8,500 − €8,500 ÷ 1.20 ≈ <b>€1,417</b>",
        "Estimated cash refund: €8,500 × 12% ≈ <b>€1,020</b>",
        "Net price after refund: about <b>€7,480</b>"
      ],
      exampleNote: "If the retail price back home is roughly $11,000, and today's rate is about 1 EUR ≈ 1.08 USD, €7,480 ≈ $8,078 — around $2,922 (roughly 27%) cheaper than buying at home. But if you bring the watch home and its value exceeds your personal duty-free allowance, you may still owe import duty on the difference — the refund you got in Europe isn't automatically your final net savings, which is exactly why this tool has a separate \"home-country customs reminder\" step.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Does the Tax Free form have to be stamped at the airport? Can I mail it in instead?", a: "In principle, yes — customs has to stamp (or digitally validate, at airports offering that option) the form before you leave the EU; that stamp is what makes the refund valid. Only after that step can you choose to collect the refund in cash, to a credit card, or by mailing the stamped form back to the refund operator." },
        { q: "Why is the estimated cash-refund rate so much lower than the VAT rate?", a: "Because refund operators (Global Blue, Planet, etc.) deduct a service fee from the VAT owed, so the amount you actually receive is lower than the full VAT included in the sticker price. The exact rate varies by country, operator, and payment method (cash vs. card) — the defaults here are just a rough reference for common ranges." },
        { q: "Is buying a watch duty-free in Switzerland the same as in an EU country?", a: "No. Switzerland isn't in the EU and runs its own separate VAT refund scheme — usually with a lower minimum purchase amount and a simpler process — but it still requires a customs check when you leave the country (at the border or airport). Check current rules with Swiss customs and the refund operator directly." },
        { q: "What does the home-country customs reminder section mean?", a: "It refers to the fact that when you bring the watch back to your home country, customs may charge import duty or VAT on the portion of its value above your personal duty-free allowance. Allowances and rates vary by country — this tool only does a rough arithmetic estimate; check your own customs authority for the current rules." },
        { q: "Can I treat this calculator's result as the final price I'll actually pay or receive?", a: "No. These figures are a rough estimate based on official VAT rates and typical refund percentages. The actual refund amount is determined by the refund operator's settlement slip, and any home-country duty is determined by customs on the spot. The tool is meant to help you gauge, while planning a trip, whether buying locally is worth it — it's not tax or legal advice." },
        { q: "Does this tool save the prices or personal info I enter?", a: "No. All calculations run entirely in your browser and are never sent to a server; no sign-up or login is required. Nothing you type is retained after you close the page, aside from your language preference, which is stored locally on your device only." }
      ]
    },
    de: {
      locale: "de-DE",
      kicker: "EUROPA · UHRENKAUF",
      title: "Europa-Reise Uhren-Steuerfrei-Rechner",
      topNote: "Geschätzt anhand des offiziellen Mehrwertsteuersatzes und der üblichen Bar-Erstattungsquote; der tatsächliche Betrag hängt von der Abrechnung des Anbieters (Global Blue, Planet usw.) ab.",
      leftTitle: "Kaufdetails",
      leftSub: "Kaufland auswählen, um MwSt.-Satz und Erstattungsquote automatisch zu übernehmen",
      labelCountry: "Kaufland",
      labelVat: "MwSt.-Satz",
      labelRefund: "Geschätzte Bar-Erstattungsquote",
      labelPrice: "Ausgezeichneter Preis der Uhr (inkl. MwSt.)",
      pricePlaceholder: "z. B. 8500",
      rightTitle: "Erstattungsergebnis",
      rightSub: "Nettokosten nach Zollstempel und Erstattung",
      gaugeCaption: "Gespart",
      netLabel: "Endpreis nach Erstattung",
      liTag: "Ausgezeichneter Preis (inkl. MwSt.)",
      liVat: "Enthaltene MwSt.",
      liRefund: "Geschätzte Bar-Erstattung",
      belowTitle: "Vergleich mit Preis im Heimatland",
      belowSub: "Heimatpreis und Wechselkurs eingeben, um die tatsächliche Ersparnis zu sehen",
      labelHomePrice: "Ladenpreis im Heimatland",
      labelFx: "Wechselkurs (1 Fremdwährung = ? Heimatwährung)",
      fxPlaceholder: "z. B. 0,95",
      fxHint: "Bitte den aktuellen Kurs manuell eingeben – dieses Tool ruft keine Kurse online ab",
      customsSummary: "Zollhinweis bei der Einreise (aktuelle Vorschriften bitte selbst prüfen)",
      customsIntro: "Die meisten Länder gewähren Reisenden eine zollfreie Freimenge; darüber hinausgehende Beträge können nach den örtlichen Vorschriften steuerpflichtig sein. Bitte aktuelle Schwellenwerte und Sätze beim Zoll prüfen und unten schätzen:",
      labelAllowance: "Persönliche zollfreie Freimenge",
      allowancePlaceholder: "z. B. 430",
      labelDutyRate: "Zollsatz über der Freimenge",
      dutyRatePlaceholder: "z. B. 19",
      customsNote: "Dies ist nur eine grobe rechnerische Schätzung, keine Zoll- oder Steuerberatung; maßgeblich ist die Anmeldung und Prüfung durch den Zoll vor Ort.",
      footer1: "Die Erstattungsquote hängt von der Warenkategorie, der Gebühr des Anbieters und der Zahlungsart (Bar/Karte) ab; maßgeblich ist der Erstattungsbeleg.",
      footer2: "Dient nur zur Reisebudget-Orientierung und ist keine Steuer- oder Rechtsberatung.",
      adLabel: "Anzeige",
      homeCurrencyDefault: "EUR",
      homePricePlaceholder: "z. B. 9500",
      countryNames: { fr: "Frankreich", it: "Italien", deu: "Deutschland", ch: "Schweiz", es: "Spanien", uk: "Vereinigtes Königreich (Erstattung abgeschafft)", custom: "Benutzerdefiniert" },
      thresholds: {
        fr: "Mindestbetrag für Erstattung: ca. 100,01 EUR",
        it: "Mindestbetrag für Erstattung: ca. 70,01 EUR",
        deu: "Mindestbetrag für Erstattung: ca. 50 EUR",
        ch: "Mindestbetrag für Erstattung: ca. 300 CHF",
        es: "Mindestbetrag für Erstattung: keiner",
        uk: "Tax-Free-Shopping für Touristen in Großbritannien seit 2021 abgeschafft",
        custom: "Eigenen Schwellenwert eingeben"
      },
      compareCheaper: function (net, amt, pct) { return "&asymp; " + net + " &mdash; <b>" + amt + " (" + pct + "%)</b> günstiger als der Ladenpreis im Heimatland"; },
      comparePricier: function (net, amt, pct) { return "&asymp; " + net + " &mdash; <b>" + amt + " (" + pct + "%)</b> teurer als der Ladenpreis im Heimatland"; },
      customsWithin: function (net) { return "&asymp; " + net + " &mdash; innerhalb der eingegebenen zollfreien Freimenge."; },
      customsOver: function (net, taxable, rate, duty) { return "&asymp; " + net + " &mdash; überschreitet die Freimenge um <b>" + taxable + "</b>; bei " + rate + "% ergibt das geschätzt <b>" + duty + "</b> Zoll."; },
      explainTitle: "Wie funktioniert Tax-Free-Shopping in Europa eigentlich?",
      explainP1: "In den meisten EU-Ländern können Reisende ohne EU-Wohnsitz beim Einkauf in teilnehmenden „Tax Free\"-Geschäften die gezahlte Mehrwertsteuer zurückfordern, sobald sie die EU verlassen — nicht nur das Kaufland, sondern den gesamten Schengen-/EU-Zollraum — vorausgesetzt, der Mindestkaufbetrag wird erreicht. An der Kasse wird der Reisepass gezeigt, das Geschäft stellt ein Tax-Free-Formular aus.",
      explainP2: "Bei der Ausreise muss dieses Formular am Flughafen oder an der Grenze vom Zoll abgestempelt werden — zusammen mit Reisepass, Bordkarte und der Uhr selbst, ungetragen und original verpackt, da der Zoll das Recht hat, die Ware zu kontrollieren. An vielen Flughäfen muss das vor der Gepäckaufgabe erledigt werden. Nach dem Stempel kann die Erstattung direkt am Rückerstattungsschalter (Global Blue, Planet usw.) bar oder auf Kreditkarte ausgezahlt werden, oder das Formular wird per Post an den Anbieter zurückgeschickt — Kartenerstattungen dauern meist einige Wochen.",
      explainP3: "Der Rückerstattungsanbieter zieht von der geschuldeten Mehrwertsteuer eine Bearbeitungsgebühr ab, weshalb die tatsächliche Bar-Erstattungsquote meist niedriger ausfällt als der volle im Ladenpreis enthaltene MwSt.-Satz — deshalb unterscheidet dieses Tool zwischen „MwSt.-Satz\" und „geschätzter Bar-Erstattungsquote\". Die Schweiz gehört nicht zur EU, daher unterscheiden sich Ablauf und Schwellenwerte (meist niedrigerer Mindestbetrag, einfacherer Ablauf), aber auch hier ist bei der Ausreise ein Zollschritt nötig.",
      exampleTitle: "Ein Rechenbeispiel",
      exampleSteps: [
        "Angenommen, du entdeckst in einer Boutique in Paris eine Uhr mit einem Preisschild von <b>8.500 €</b> (inklusive 20% französischer MwSt.), und das Geschäft nimmt am Tax-Free-Programm teil, mit einer geschätzten Bar-Erstattungsquote von etwa <b>12%</b>.",
        "Im Preis enthaltene MwSt.: 8.500 € − 8.500 € ÷ 1,20 ≈ <b>1.417 €</b>",
        "Geschätzte Bar-Erstattung: 8.500 € × 12% ≈ <b>1.020 €</b>",
        "Endpreis nach Erstattung: etwa <b>7.480 €</b>"
      ],
      exampleNote: "Angenommen, der Ladenpreis zu Hause liegt bei rund 9.500 CHF, und der aktuelle Kurs beträgt etwa 1 EUR ≈ 0,95 CHF, dann entspricht 7.480 € rund 7.106 CHF — etwa 2.394 CHF (rund 25%) günstiger als der Kauf zu Hause. Bringst du die Uhr aber mit nach Hause und ihr Wert übersteigt deine persönliche zollfreie Freimenge, kann trotzdem Einfuhrzoll auf die Differenz anfallen — die in Europa erhaltene Erstattung ist nicht automatisch deine tatsächliche Nettoersparnis. Genau deshalb gibt es in diesem Tool den separaten Schritt „Zollhinweis bei der Einreise\".",
      faqTitle: "Häufig gestellte Fragen",
      faq: [
        { q: "Muss das Tax-Free-Formular am Flughafen gestempelt werden? Geht das auch per Post?", a: "Grundsätzlich ja — der Zoll muss das Formular vor der Ausreise aus der EU abstempeln (an manchen Flughäfen auch digital validieren); erst dieser Stempel macht die Erstattung gültig. Danach kann die Erstattung bar, per Kreditkarte oder durch Rücksendung des gestempelten Formulars an den Anbieter erfolgen." },
        { q: "Warum ist die „geschätzte Bar-Erstattungsquote\" viel niedriger als der MwSt.-Satz?", a: "Weil Rückerstattungsanbieter (Global Blue, Planet usw.) von der geschuldeten Mehrwertsteuer eine Bearbeitungsgebühr abziehen. Der tatsächlich ausgezahlte Betrag liegt daher unter der vollen im Ladenpreis enthaltenen MwSt. Die genaue Quote hängt von Land, Anbieter und Zahlungsart ab." },
        { q: "Ist der zollfreie Uhrenkauf in der Schweiz dasselbe wie in einem EU-Land?", a: "Nein. Die Schweiz gehört nicht zur EU und hat ein eigenes MwSt.-Rückerstattungssystem — meist mit niedrigerem Mindestbetrag und einfacherem Ablauf —, erfordert aber ebenfalls eine Zollkontrolle bei der Ausreise. Aktuelle Regeln bitte direkt beim Schweizer Zoll und dem Rückerstattungsanbieter prüfen." },
        { q: "Was bedeutet der Abschnitt „Zollhinweis bei der Einreise\"?", a: "Damit ist gemeint, dass der Zoll beim Wiedereinreisen ins Heimatland auf den Wertanteil oberhalb der persönlichen zollfreien Freimenge Einfuhrabgaben oder MwSt. erheben kann. Freimengen und Sätze unterscheiden sich je nach Land — dieses Tool liefert nur eine grobe rechnerische Schätzung." },
        { q: "Kann ich das Ergebnis dieses Rechners als verbindlichen Endpreis ansehen?", a: "Nein. Die Zahlen sind eine grobe Schätzung auf Basis offizieller MwSt.-Sätze und üblicher Erstattungsquoten. Der tatsächliche Erstattungsbetrag ergibt sich aus der Abrechnung des Anbieters, die tatsächliche Zollabgabe wird vor Ort vom Zoll festgelegt — keine Steuer- oder Rechtsberatung." },
        { q: "Speichert dieses Tool die eingegebenen Preise oder persönliche Daten?", a: "Nein. Alle Berechnungen laufen vollständig in deinem Browser ab und werden nie an einen Server gesendet; es ist keine Anmeldung nötig." }
      ]
    }
  };

  var STATIC_MAP = {
    "txt-kicker": "kicker", "txt-title": "title", "txt-topnote": "topNote",
    "txt-leftTitle": "leftTitle", "txt-leftSub": "leftSub",
    "txt-labelCountry": "labelCountry", "txt-labelVat": "labelVat", "txt-labelRefund": "labelRefund",
    "txt-labelPrice": "labelPrice", "txt-rightTitle": "rightTitle", "txt-rightSub": "rightSub",
    "txt-gaugeCaption": "gaugeCaption", "txt-netLabel": "netLabel",
    "txt-liTag": "liTag", "txt-liVat": "liVat", "txt-liRefund": "liRefund",
    "txt-belowTitle": "belowTitle", "txt-belowSub": "belowSub",
    "txt-labelHomePrice": "labelHomePrice", "txt-labelFx": "labelFx", "txt-fxHint": "fxHint",
    "txt-customsSummary": "customsSummary", "txt-customsIntro": "customsIntro",
    "txt-labelAllowance": "labelAllowance", "txt-labelDutyRate": "labelDutyRate",
    "txt-customsNote": "customsNote", "txt-footer1": "footer1", "txt-footer2": "footer2",
    "txt-ad-top": "adLabel", "txt-ad-in": "adLabel", "txt-ad-bottom": "adLabel",
    "txt-explainTitle": "explainTitle", "txt-explainP1": "explainP1",
    "txt-explainP2": "explainP2", "txt-explainP3": "explainP3", "txt-faqTitle": "faqTitle",
    "txt-exampleTitle": "exampleTitle", "txt-exampleNote": "exampleNote"
  };

  var exampleStepsEl = document.getElementById("exampleSteps");

  function renderExample() {
    if (!exampleStepsEl) return;
    var steps = I18N[currentLang].exampleSteps || [];
    exampleStepsEl.innerHTML = "";
    steps.forEach(function (step) {
      var li = document.createElement("li");
      li.innerHTML = step;
      exampleStepsEl.appendChild(li);
    });
  }

  var faqListEl = document.getElementById("faqList");

  function renderFAQ() {
    if (!faqListEl) return;
    var t = I18N[currentLang];
    faqListEl.innerHTML = "";
    (t.faq || []).forEach(function (item) {
      var details = document.createElement("details");
      details.className = "faq-item";
      var summary = document.createElement("summary");
      summary.innerHTML = '<span class="chev">▶</span> <span>' + item.q + "</span>";
      var body = document.createElement("div");
      body.className = "faq-a";
      body.textContent = item.a;
      details.appendChild(summary);
      details.appendChild(body);
      faqListEl.appendChild(details);
    });
  }

  var countrySel = document.getElementById("country");
  var vatRateEl = document.getElementById("vatRate");
  var refundRateEl = document.getElementById("refundRate");
  var priceEl = document.getElementById("price");
  var currencyLabel = document.getElementById("currencyLabel");
  var thresholdHint = document.getElementById("thresholdHint");

  var outTag = document.getElementById("outTag");
  var outVat = document.getElementById("outVat");
  var outRefund = document.getElementById("outRefund");
  var netPrice = document.getElementById("netPrice");
  var gaugeValue = document.getElementById("gaugeValue");
  var gaugePct = document.getElementById("gaugePct");

  var homePriceEl = document.getElementById("homePrice");
  var homeCurrencyEl = document.getElementById("homeCurrency");
  var fxRateEl = document.getElementById("fxRate");
  var compareResult = document.getElementById("compareResult");
  var compareBanner = document.getElementById("compareBanner");
  var compareText = document.getElementById("compareText");

  var dutyFreeAllowanceEl = document.getElementById("dutyFreeAllowance");
  var dutyRateEl = document.getElementById("dutyRate");
  var customsOut = document.getElementById("customsOut");
  var dynCurrencySpans = document.querySelectorAll(".dyn-currency");

  var titleEl = document.getElementById("txt-title");
  var titleWrapEl = document.getElementById("titleWrap");

  var CIRC = 2 * Math.PI * 42;
  var currentLang = "en";
  var langInitialized = { zh: false, en: false, de: false };

  function fmt(n, curr) {
    if (!isFinite(n)) return "—";
    var s = n.toLocaleString(I18N[currentLang].locale, { maximumFractionDigits: 0 });
    return curr ? s + " " + curr : s;
  }

  function populateCountries(preserveIndex) {
    var t = I18N[currentLang];
    var idx = preserveIndex != null ? preserveIndex : (countrySel.selectedIndex >= 0 ? countrySel.selectedIndex : 0);
    countrySel.innerHTML = "";
    COUNTRY_FACTS.forEach(function (c, i) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.textContent = t.countryNames[c.id];
      countrySel.appendChild(opt);
    });
    countrySel.selectedIndex = idx;
  }

  function applyStaticText() {
    var t = I18N[currentLang];
    Object.keys(STATIC_MAP).forEach(function (elId) {
      var el = document.getElementById(elId);
      if (el) el.textContent = t[STATIC_MAP[elId]];
    });
    priceEl.placeholder = t.pricePlaceholder;
    fxRateEl.placeholder = t.fxPlaceholder;
    homePriceEl.placeholder = t.homePricePlaceholder;
    dutyFreeAllowanceEl.placeholder = t.allowancePlaceholder;
    dutyRateEl.placeholder = t.dutyRatePlaceholder;
    document.documentElement.lang = currentLang;

    if (!langInitialized[currentLang] && !homeCurrencyEl.dataset.touched) {
      homeCurrencyEl.value = t.homeCurrencyDefault;
    }
    langInitialized[currentLang] = true;
    renderExample();
    renderFAQ();
    fitTitleFont();
  }

  var TITLE_MIN_PX = 15;
  var TITLE_MAX_PX = 42;
  var TITLE_PROBE_PX = 20;

  function fitTitleFont() {
    if (!titleEl || !titleWrapEl) return;
    titleEl.style.fontSize = TITLE_PROBE_PX + "px";
    var wrapWidth = titleWrapEl.clientWidth;
    var textWidth = titleEl.scrollWidth;
    if (!wrapWidth || !textWidth) return;
    var size = (wrapWidth / textWidth) * TITLE_PROBE_PX;
    size = Math.max(TITLE_MIN_PX, Math.min(TITLE_MAX_PX, size));
    titleEl.style.fontSize = size + "px";
  }

  var fitTitleRaf = null;
  window.addEventListener("resize", function () {
    if (fitTitleRaf) cancelAnimationFrame(fitTitleRaf);
    fitTitleRaf = requestAnimationFrame(fitTitleFont);
  });

  function applyThreshold() {
    var t = I18N[currentLang];
    var fact = COUNTRY_FACTS[countrySel.value];
    thresholdHint.textContent = t.thresholds[fact.id];
  }

  function updateDynCurrency() {
    var code = (homeCurrencyEl.value || "").toUpperCase() || I18N[currentLang].homeCurrencyDefault;
    dynCurrencySpans.forEach(function (span) { span.textContent = code; });
  }

  function applyCountryFacts() {
    var fact = COUNTRY_FACTS[countrySel.value];
    vatRateEl.value = fact.vat;
    refundRateEl.value = fact.refund;
    currencyLabel.textContent = fact.currency;
    applyThreshold();
  }

  function calc() {
    var price = parseFloat(priceEl.value) || 0;
    var vatRate = parseFloat(vatRateEl.value) || 0;
    var refundRate = parseFloat(refundRateEl.value) || 0;
    var curr = currencyLabel.textContent;

    var vatAmount = price - price / (1 + vatRate / 100);
    var refundAmount = price * (refundRate / 100);
    var net = price - refundAmount;
    var savingsPct = price > 0 ? (refundAmount / price) * 100 : 0;

    outTag.textContent = fmt(price, curr);
    outVat.textContent = fmt(vatAmount, curr);
    outRefund.textContent = fmt(refundAmount, curr);
    netPrice.textContent = fmt(net, curr);

    var dash = (Math.max(0, Math.min(savingsPct, 100)) / 100) * CIRC;
    gaugeValue.setAttribute("stroke-dasharray", dash.toFixed(1) + " " + CIRC.toFixed(1));
    gaugePct.textContent = savingsPct.toFixed(0) + "%";

    calcCompare(net);
    calcCustoms(net);
  }

  function calcCompare(net) {
    var t = I18N[currentLang];
    var home = parseFloat(homePriceEl.value);
    var fx = parseFloat(fxRateEl.value);
    var homeCurr = (homeCurrencyEl.value || "").toUpperCase() || t.homeCurrencyDefault;
    if (!home || !fx) {
      compareResult.classList.remove("show");
      return;
    }
    compareResult.classList.add("show");
    var netInHome = net * fx;
    var diff = home - netInHome;
    var pct = home > 0 ? (diff / home) * 100 : 0;
    var netStr = fmt(netInHome, homeCurr);

    if (diff >= 0) {
      compareBanner.classList.remove("negative");
      compareText.innerHTML = t.compareCheaper(netStr, fmt(diff, homeCurr), pct.toFixed(1));
    } else {
      compareBanner.classList.add("negative");
      compareText.innerHTML = t.comparePricier(netStr, fmt(-diff, homeCurr), Math.abs(pct).toFixed(1));
    }
  }

  function calcCustoms(net) {
    var t = I18N[currentLang];
    var fx = parseFloat(fxRateEl.value);
    var allowance = parseFloat(dutyFreeAllowanceEl.value);
    var dutyRate = parseFloat(dutyRateEl.value);
    var homeCurr = (homeCurrencyEl.value || "").toUpperCase() || t.homeCurrencyDefault;
    if (!fx || isNaN(allowance) || isNaN(dutyRate)) {
      customsOut.innerHTML = "";
      return;
    }
    var netInHome = net * fx;
    var taxable = Math.max(0, netInHome - allowance);
    var duty = taxable * (dutyRate / 100);
    var netStr = fmt(netInHome, homeCurr);
    if (taxable <= 0) {
      customsOut.innerHTML = t.customsWithin(netStr);
    } else {
      customsOut.innerHTML = t.customsOver(netStr, fmt(taxable, homeCurr), dutyRate, fmt(duty, homeCurr));
    }
  }

  function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    populateCountries();
    applyStaticText();
    applyThreshold();
    updateDynCurrency();
    calc();
    try { localStorage.setItem("eu-watch-calc-lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.dataset.lang); });
  });

  [priceEl, vatRateEl, refundRateEl, fxRateEl, dutyFreeAllowanceEl, dutyRateEl].forEach(function (el) {
    el.addEventListener("input", calc);
  });
  homePriceEl.addEventListener("input", calc);
  homeCurrencyEl.addEventListener("input", function () {
    homeCurrencyEl.dataset.touched = "1";
    updateDynCurrency();
    calc();
  });
  countrySel.addEventListener("change", function () {
    applyCountryFacts();
    calc();
  });

  var initialLang = "en";
  try {
    var saved = localStorage.getItem("eu-watch-calc-lang");
    if (saved && I18N[saved]) {
      initialLang = saved;
    } else {
      var nav = (navigator.language || "en").toLowerCase();
      if (nav.indexOf("zh") === 0) initialLang = "zh";
      else if (nav.indexOf("de") === 0) initialLang = "de";
    }
  } catch (e) {}

  populateCountries(0);
  applyCountryFacts();
  setLang(initialLang);
})();
