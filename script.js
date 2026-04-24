const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const startQuizBtn = document.getElementById("startQuizBtn");
const startFromHeroBtn = document.getElementById("startFromHeroBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const learnMoreBtn = document.getElementById("learnMoreBtn");
const scrollToSectionsBtn = document.getElementById("scrollToSectionsBtn");
const sectionsPreview = document.getElementById("sectionsPreview");

const sectionLabels = {
  mental: "مستوى الوعي الذاتي الصحي",
  social: "مستوى الوعي الذاتي الاجتماعي",
  religious: "مستوى التفقه الديني"
};

const scores = {
  mental: 0,
  social: 0,
  religious: 0
};

let userName = "";
let currentStep = 0;

const questions = [
  // القسم الأول
  {
    section: "mental",
    text: "عندما تشعر بتوتر مفاجئ، ما أول ما تفعله؟",
    options: [
      { label: "أحاول فهم سبب التوتر", sub: "أبدأ بملاحظة ما يجري داخلي.", weight: { mental: 4 } },
      { label: "أشغل نفسي بأي شيء لتجاهله", sub: "أحاول صرف انتباهي عنه.", weight: { mental: 3 } },
      { label: "أتركه يمر دون تفكير", sub: "لا أتوقف كثيرًا عنده.", weight: { mental: 2 } },
      { label: "أتوتر أكثر ولا أعرف كيف أتصرف", sub: "أفقد السيطرة بسرعة.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "إذا مررت بموقف أزعجك كثيرًا، كيف تتعامل معه؟",
    options: [
      { label: "أفكر فيه بهدوء وأحاول فهمه", sub: "أميل للتحليل الهادئ.", weight: { mental: 4 } },
      { label: "أتحدث مع شخص قريب مني", sub: "أفضل المساندة والمشاركة.", weight: { mental: 3 } },
      { label: "أتجنبه تمامًا وأحاول نسيانه", sub: "أميل إلى التجنب أحيانًا.", weight: { mental: 2 } },
      { label: "أبقى منزعجًا دون تصرف واضح", sub: "يصعب علي التعامل معه.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "عندما تخطئ، كيف يكون رد فعلك غالبًا؟",
    options: [
      { label: "أعترف بالخطأ فورًا وأحاول إصلاحه", sub: "أميل للمواجهة والتصحيح.", weight: { mental: 4 } },
      { label: "أعترف بعد بعض الوقت", sub: "أحتاج وقتًا قبل الإقرار.", weight: { mental: 3 } },
      { label: "أبرر لنفسي ما حدث", sub: "أبحث عن مخرج داخلي.", weight: { mental: 2 } },
      { label: "أنكر أو أنزعج من المواجهة", sub: "أجد صعوبة في التقبل.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "عندما تكون تحت ضغط، كيف تتصرف؟",
    options: [
      { label: "أنظم وقتي وأحاول تهدئة نفسي", sub: "أتعامل بخطوات واضحة.", weight: { mental: 4 } },
      { label: "أستمر في العمل رغم التوتر", sub: "أكمل لكن دون راحة كافية.", weight: { mental: 3 } },
      { label: "أهرب من المسؤولية مؤقتًا", sub: "أحتاج للابتعاد أحيانًا.", weight: { mental: 2 } },
      { label: "أشعر بالارتباك ولا أستطيع التصرف", sub: "يضيع مني الاتجاه.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "كيف ترى نفسك بشكل عام؟",
    options: [
      { label: "أفهم نفسي بشكل واضح", sub: "لدي صورة جيدة عن ذاتي.", weight: { mental: 4 } },
      { label: "أفهم نفسي في بعض الجوانب", sub: "بعض الأمور واضحة وبعضها لا.", weight: { mental: 3 } },
      { label: "أشعر أنني بحاجة لفهم نفسي أكثر", sub: "لا تزال الصورة ناقصة.", weight: { mental: 2 } },
      { label: "لا أفهم نفسي بشكل جيد", sub: "أجد صعوبة في معرفة ذاتي.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "عندما تشعر بمشاعر متضاربة، ماذا تفعل؟",
    options: [
      { label: "أحاول فهم كل شعور على حدة", sub: "أحلل ما أشعر به.", weight: { mental: 4 } },
      { label: "أتجاهل الأمر", sub: "أفضل عدم الدخول في التفاصيل.", weight: { mental: 3 } },
      { label: "أشعر بالحيرة", sub: "يصعب علي ترتيب ما أشعر به.", weight: { mental: 2 } },
      { label: "أترك نفسي للمشاعر دون ضبط", sub: "أستسلم لما يحدث داخلي.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "إذا وجه لك أحدهم نقدًا، كيف تتعامل معه؟",
    options: [
      { label: "أفكر في كلامه وأقيّمه", sub: "أزن النقد بهدوء.", weight: { mental: 4 } },
      { label: "أنزعج قليلًا ثم أراجعه", sub: "أحتاج وقتًا قبل التقبل.", weight: { mental: 3 } },
      { label: "أرفضه مباشرة", sub: "أميل للدفاع السريع عن نفسي.", weight: { mental: 2 } },
      { label: "أتضايق بشدة ولا أتقبله", sub: "أشعر بصعوبة في استقباله.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "عندما تشعر بالحزن أو القلق، كيف تتعامل؟",
    options: [
      { label: "أواجه مشاعري وأحاول فهمها", sub: "أتعامل معها بوعي.", weight: { mental: 4 } },
      { label: "أتجاهلها وأستمر", sub: "أؤجل الالتفات لها.", weight: { mental: 3 } },
      { label: "أشتكي دون حل", sub: "أعبر لكن دون خطوات واضحة.", weight: { mental: 2 } },
      { label: "أتركها تتفاقم", sub: "لا أعرف كيف أوقفها.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "هل لديك طريقة واضحة لاستعادة توازنك النفسي؟",
    options: [
      { label: "نعم، لدي طريقة واضحة", sub: "أعرف ما يفيدني غالبًا.", weight: { mental: 4 } },
      { label: "لدي بعض المحاولات", sub: "أملك بدايات لكنها غير ثابتة.", weight: { mental: 3 } },
      { label: "أجرب طرقًا مختلفة كل مرة", sub: "لا يوجد أسلوب محدد.", weight: { mental: 2 } },
      { label: "لا توجد طريقة لدي", sub: "أحتاج لاكتشاف ما يناسبني.", weight: { mental: 1 } }
    ]
  },
  {
    section: "mental",
    text: "كيف تصف علاقتك بنفسك؟",
    options: [
      { label: "متوازنة ومريحة", sub: "أشعر بانسجام داخلي جيد.", weight: { mental: 4 } },
      { label: "جيدة لكنها غير ثابتة", sub: "فيها جوانب جيدة وتقلبات.", weight: { mental: 3 } },
      { label: "مضطربة نوعًا ما", sub: "أحتاج توازنًا أكبر.", weight: { mental: 2 } },
      { label: "مرهقة وصعبة", sub: "أعاني في علاقتي بذاتي.", weight: { mental: 1 } }
    ]
  },

  // القسم الثاني
  {
    section: "social",
    text: "عند الحديث مع الآخرين، على ماذا تركز أكثر؟",
    options: [
      { label: "أفهم كلامهم ومشاعرهم", sub: "أركز على المعنى والإحساس.", weight: { social: 4 } },
      { label: "أفكر في ردي", sub: "أهتم بما سأقوله بعد قليل.", weight: { social: 3 } },
      { label: "أركز على رأيي فقط", sub: "الأهم عندي ما أراه أنا.", weight: { social: 2 } },
      { label: "لا أركز كثيرًا", sub: "ينصرف انتباهي بسهولة.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "إذا كان شخص يشاركك مشكلة، كيف تتصرف؟",
    options: [
      { label: "أستمع جيدًا أولًا", sub: "أمنحه مساحة للكلام.", weight: { social: 4 } },
      { label: "أقدم نصيحة مباشرة", sub: "أميل للحلول السريعة.", weight: { social: 3 } },
      { label: "أغير الموضوع", sub: "أشعر بعدم الارتياح للموقف.", weight: { social: 2 } },
      { label: "لا أهتم كثيرًا", sub: "لا أتفاعل بالشكل الكافي.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "إذا شعرت أن شخصًا أزعجك، ماذا تفعل؟",
    options: [
      { label: "أتحدث معه بهدوء", sub: "أفضل المواجهة المحترمة.", weight: { social: 4 } },
      { label: "أزعل وأصمت", sub: "أحتفظ بما أشعر به داخليًا.", weight: { social: 3 } },
      { label: "أبتعد عنه", sub: "أفضل الانسحاب من الموقف.", weight: { social: 2 } },
      { label: "أتصرف بعصبية", sub: "أنفعل سريعًا عند الضيق.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "عند الاختلاف مع شخص، كيف تتصرف؟",
    options: [
      { label: "أناقش باحترام", sub: "أحاول الحفاظ على الهدوء.", weight: { social: 4 } },
      { label: "أتمسك برأيي", sub: "أدافع عن موقفي بقوة.", weight: { social: 3 } },
      { label: "أتجنب النقاش", sub: "أفضل عدم الدخول في الخلاف.", weight: { social: 2 } },
      { label: "يتحول الأمر إلى شجار", sub: "يصعب علي ضبط الموقف.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "كيف هي حدودك مع الآخرين؟",
    options: [
      { label: "واضحة جدًا", sub: "أعرف ما أقبله وما لا أقبله.", weight: { social: 4 } },
      { label: "واضحة أحيانًا", sub: "لكن ليس في كل المواقف.", weight: { social: 3 } },
      { label: "غير واضحة", sub: "أرتبك أحيانًا في التعبير عنها.", weight: { social: 2 } },
      { label: "لا أضع حدودًا", sub: "أترك الأمور تسير دون ضبط.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "إذا أخطأت في حق أحد، ماذا تفعل؟",
    options: [
      { label: "أبادر بالإصلاح فورًا", sub: "أرى الاعتذار والتصحيح مهمين.", weight: { social: 4 } },
      { label: "أصلح بعد فترة", sub: "أحتاج وقتًا قبل المبادرة.", weight: { social: 3 } },
      { label: "أتجاهل الأمر", sub: "أميل لتركه دون مواجهة.", weight: { social: 2 } },
      { label: "أتركه دون حل", sub: "لا أتحرك عادة لإصلاحه.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "كيف تفهم مشاعر الآخرين؟",
    options: [
      { label: "بسهولة", sub: "ألتقط الإشارات بسرعة.", weight: { social: 4 } },
      { label: "أحيانًا", sub: "أفهم في بعض المواقف فقط.", weight: { social: 3 } },
      { label: "بصعوبة", sub: "أحتاج انتباهًا أكبر.", weight: { social: 2 } },
      { label: "لا أفهمها غالبًا", sub: "يصعب علي قراءة المشاعر.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "هل تغير أسلوبك حسب الشخص الذي تتعامل معه؟",
    options: [
      { label: "نعم بشكل واضح", sub: "أراعي الفروق بين الناس.", weight: { social: 4 } },
      { label: "أحيانًا", sub: "أفعل ذلك في بعض العلاقات.", weight: { social: 3 } },
      { label: "نادرًا", sub: "لا أغير أسلوبي كثيرًا.", weight: { social: 2 } },
      { label: "لا، أتعامل بنفس الطريقة", sub: "أستخدم أسلوبًا واحدًا غالبًا.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "إذا تم انتقادك، كيف يكون ردك؟",
    options: [
      { label: "أستمع وأفكر", sub: "أراجع الموقف بهدوء.", weight: { social: 4 } },
      { label: "أنزعج قليلًا", sub: "أتأثر لكن أهدأ لاحقًا.", weight: { social: 3 } },
      { label: "أرفض النقد", sub: "لا أتقبله بسهولة.", weight: { social: 2 } },
      { label: "أهاجم الطرف الآخر", sub: "أرد بانفعال واضح.", weight: { social: 1 } }
    ]
  },
  {
    section: "social",
    text: "كيف تصف علاقاتك بشكل عام؟",
    options: [
      { label: "متوازنة", sub: "أشعر باستقرار جيد في علاقاتي.", weight: { social: 4 } },
      { label: "جيدة", sub: "فيها جوانب إيجابية واضحة.", weight: { social: 3 } },
      { label: "غير مستقرة", sub: "فيها تقلبات ملحوظة.", weight: { social: 2 } },
      { label: "مرهقة", sub: "أجدها مستنزفة أو معقدة.", weight: { social: 1 } }
    ]
  },

  // القسم الثالث
  {
section: "religious",
text: "عندما أؤجل عبادة مهمة (مثل الصلاة):",
options: [
{ label: "لا أشعر بمشكلة", sub: "", weight: { religious: 1 } },
{ label: "أشعر بالذنب لكن أستمر", sub: "", weight: { religious: 2 } },
{ label: "أحاول الالتزام أحيانًا", sub: "", weight: { religious: 3 } },
{ label: "أبحث عن سبب التأجيل وأعالجه", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "عندما أرتكب ذنبًا متكررًا:",
options: [
{ label: "أعتبره جزءًا مني", sub: "", weight: { religious: 1 } },
{ label: "أندم لكن دون تغيير", sub: "", weight: { religious: 2 } },
{ label: "أحاول التقليل", sub: "", weight: { religious: 3 } },
{ label: "أدرس أسبابه وأغير سلوكي", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "أكثر ما يؤثر على قراراتي:",
options: [
{ label: "راحتي ورغباتي", sub: "", weight: { religious: 1 } },
{ label: "نظرة الناس", sub: "", weight: { religious: 2 } },
{ label: "قناعاتي الشخصية", sub: "", weight: { religious: 3 } },
{ label: "ما يرضي الله", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "عندما أشعر بفتور ديني:",
options: [
{ label: "أستسلم له", sub: "", weight: { religious: 1 } },
{ label: "أؤدي الحد الأدنى", sub: "", weight: { religious: 2 } },
{ label: "أحاول التحسن أحيانًا", sub: "", weight: { religious: 3 } },
{ label: "أبحث عن أسبابه", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "هل أميز بين ما أريده وما يصلح لي؟",
options: [
{ label: "لا أفكر في ذلك", sub: "", weight: { religious: 1 } },
{ label: "أخلط بينهما غالبًا", sub: "", weight: { religious: 2 } },
{ label: "أميز أحيانًا", sub: "", weight: { religious: 3 } },
{ label: "أراجع نفسي قبل القرار", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "عندما أقع في نفس الخطأ رغم توبتي:",
options: [
{ label: "أستسلم", sub: "", weight: { religious: 1 } },
{ label: "أكرر التوبة", sub: "", weight: { religious: 2 } },
{ label: "أحاول بطرق مختلفة", sub: "", weight: { religious: 3 } },
{ label: "أغير الأسباب جذريًا", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "كيف أتعامل مع وقتي؟",
options: [
{ label: "أضيّعه دون وعي", sub: "", weight: { religious: 1 } },
{ label: "أنتبه أحيانًا", sub: "", weight: { religious: 2 } },
{ label: "أحاول تنظيمه", sub: "", weight: { religious: 3 } },
{ label: "أراقبه كمسؤولية", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "هل أربط أخطائي بضعف علاقتي بالله؟",
options: [
{ label: "لا أربط", sub: "", weight: { religious: 1 } },
{ label: "نادرًا", sub: "", weight: { religious: 2 } },
{ label: "أحيانًا", sub: "", weight: { religious: 3 } },
{ label: "غالبًا", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "عندما أنجح في عمل صالح:",
options: [
{ label: "أشعر أني أفضل من غيري", sub: "", weight: { religious: 1 } },
{ label: "أفرح بنفسي", sub: "", weight: { religious: 2 } },
{ label: "أحمد الله أحيانًا", sub: "", weight: { religious: 3 } },
{ label: "أخاف من الغرور وأجدد نيتي", sub: "", weight: { religious: 4 } }
]
},
{
section: "religious",
text: "هل أفهم أسباب تقصيري؟",
options: [
{ label: "لا أفكر فيها", sub: "", weight: { religious: 1 } },
{ label: "أفكر بشكل سطحي", sub: "", weight: { religious: 2 } },
{ label: "أفهم بعضها", sub: "", weight: { religious: 3 } },
{ label: "أحللها بعمق", sub: "", weight: { religious: 4 } }
]
}

];

const sectionStartIndexes = {
  0: "القسم الأول: مستوى الوعي الذاتي الصحي",
  10: "القسم الثاني: مستوى الوعي الذاتي الاجتماعي",
  20: "القسم الثالث: مستوى التفقه الديني"
};

const introStep = {
  type: "intro",
  text: "مرحبًا بك 🌷 قبل أن نبدأ، ما الاسم الذي تحب أن يظهر في النتيجة؟"
};

const chatBody = document.getElementById("chatBody");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const statQuestions = document.getElementById("statQuestions");

statQuestions.textContent = `${questions.length} سؤال`;

function showQuizPage() {
  homePage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (currentStep === 0 && !userName) {
    renderIntro();
  }
}

function showHomePage() {
  quizPage.classList.add("hidden");
  homePage.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startQuizBtn.addEventListener("click", showQuizPage);
startFromHeroBtn.addEventListener("click", showQuizPage);
backHomeBtn.addEventListener("click", showHomePage);

learnMoreBtn.addEventListener("click", () => {
  sectionsPreview.scrollIntoView({ behavior: "smooth", block: "start" });
});

scrollToSectionsBtn.addEventListener("click", () => {
  sectionsPreview.scrollIntoView({ behavior: "smooth", block: "start" });
});

function appendMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = `<div class="bubble">${text}</div>`;
  chatBody.appendChild(msg);
}

function appendSectionBanner(text) {
  const wrap = document.createElement("div");
  wrap.className = "section-banner";
  wrap.innerHTML = `
    <div class="section-banner-badge">عنوان القسم</div>
    <h3>${text}</h3>
    <p>أجب بهدوء واختر الإجابة الأقرب إليك من الخيارات التالية.</p>
  `;
  chatBody.appendChild(wrap);
}

function updateProgress() {
  const total = questions.length + 1;
  const shown = Math.min(currentStep + 1, total);
  progressText.textContent = `${shown} / ${total}`;
  const pct = (currentStep / total) * 100;
  progressFill.style.width = `${pct}%`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[m];
  });
}

function renderIntro() {
  chatBody.innerHTML = "";
  appendMessage(introStep.text, "bot");

  const wrap = document.createElement("div");
  wrap.className = "choices";
  wrap.style.gridTemplateColumns = "1fr";

  const card = document.createElement("div");
  card.className = "choice";
  card.innerHTML = `
    <strong>اكتب اسمك للبدء</strong>
    <span>سيظهر الاسم في النتيجة النهائية فقط</span>
    <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
      <input id="nameInput" type="text" placeholder="مثال: محمد" style="flex:1;min-width:220px;padding:14px;border:1px solid rgba(79,23,35,.15);border-radius:14px;font:inherit;outline:none;background:#fff;">
      <button id="startBtn" style="border:none;border-radius:14px;padding:14px 20px;background:linear-gradient(135deg,#6e2132,#4f1723);color:#fff;font:inherit;font-weight:700;cursor:pointer;">ابدأ</button>
    </div>
  `;
  wrap.appendChild(card);
  chatBody.appendChild(wrap);

  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("nameInput");

  startBtn.addEventListener("click", () => {
    const value = nameInput.value.trim();
    if (!value) {
      nameInput.focus();
      nameInput.style.borderColor = "crimson";
      return;
    }
    userName = value;
    currentStep = 1;
    renderQuestion();
  });

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") startBtn.click();
  });

  updateProgress();
}

function renderQuestion() {
  chatBody.innerHTML = "";
  appendMessage(`أهلًا ${escapeHtml(userName)} 🌷 سنبدأ الآن الاستبيان. اختر إجابة واحدة فقط في كل سؤال.`, "bot");

  for (let i = 0; i < currentStep - 1; i++) {
    if (sectionStartIndexes[i]) {
      appendSectionBanner(sectionStartIndexes[i]);
    }
    appendMessage(questions[i].text, "bot");
    appendMessage(questions[i].selectedLabel, "user");
  }

  if (currentStep - 1 >= questions.length) {
    showResult();
    progressText.textContent = `${questions.length + 1} / ${questions.length + 1}`;
    progressFill.style.width = "100%";
    requestAnimationFrame(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    });
    return;
  }

  const qIndex = currentStep - 1;
  const q = questions[qIndex];

  if (sectionStartIndexes[qIndex]) {
    appendSectionBanner(sectionStartIndexes[qIndex]);
  }

  appendMessage(q.text, "bot");

  const choices = document.createElement("div");
  choices.className = "choices";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.innerHTML = `<strong>${option.label}</strong><span>${option.sub}</span>`;
    btn.addEventListener("click", () => selectAnswer(option, btn), { passive: true });
    choices.appendChild(btn);
  });

  chatBody.appendChild(choices);
  updateProgress();

  requestAnimationFrame(() => {
    chatBody.scrollTop = chatBody.scrollHeight;
  });
}

function selectAnswer(option, button) {
  const questionIndex = currentStep - 1;
  if (questions[questionIndex].selectedLabel) return;

  const siblings = button.parentElement.querySelectorAll(".choice");
  siblings.forEach((btn) => {
    btn.classList.remove("selected");
    btn.disabled = true;
  });

  button.classList.add("selected");
  questions[questionIndex].selectedLabel = option.label;

  Object.entries(option.weight).forEach(([dimension, value]) => {
    scores[dimension] += value;
  });

  setTimeout(() => {
    currentStep += 1;
    renderQuestion();
  }, 180);
}

function getSectionPercentage(key) {
  const maxScore = 40;
  return Math.round((scores[key] / maxScore) * 100);
}

function getSectionLevel(percentage) {
  if (percentage >= 80) return "مرتفع";
  if (percentage >= 60) return "جيد";
  if (percentage >= 40) return "متوسط";
  return "يحتاج إلى دعم";
}

function getSectionAdvice(key, level) {
  const adviceMap = {
    mental: {
      "مرتفع": "لديك درجة جيدة من الوعي الذاتي الصحي، ويظهر ذلك في فهمك لمشاعرك وقدرتك على التعامل مع الضغط بصورة متوازنة.",
      "جيد": "لديك أساس جيد، وقد تستفيد أكثر من الثبات على المراجعة الذاتية والاهتمام باستعادة توازنك النفسي في الأوقات الضاغطة.",
      "متوسط": "هناك وعي موجود، لكنه يحتاج إلى مزيد من التنظيم والانتباه لمشاعرك وطرق التعامل معها في المواقف الصعبة.",
      "يحتاج إلى دعم": "قد يكون من المفيد أن تبدأ بخطوات بسيطة مثل ملاحظة مشاعرك، وتحديد ما يرهقك، والبحث عن وسائل ثابتة تساعدك على التوازن."
    },
    social: {
      "مرتفع": "يبدو أنك واعٍ بذاتك في الجانب الاجتماعي، وتعرف كيف تتعامل مع الناس بصورة متوازنة ومحترمة.",
      "جيد": "لديك مستوى جيد اجتماعيًا، وقد يفيدك تطوير بعض الجوانب مثل التعبير عن الحدود أو إدارة الخلاف بهدوء أكبر.",
      "متوسط": "لديك بدايات جيدة، لكن الجانب الاجتماعي يحتاج إلى مزيد من الوعي في الاستماع وفهم الآخرين وتنظيم ردود الفعل.",
      "يحتاج إلى دعم": "قد يساعدك أن تبدأ بالتركيز على مهارتين أساسيتين: الاستماع الجيد، والتعبير الواضح عن مشاعرك وحدودك."
    },
    religious: {
      "مرتفع": "لديك مستوى جيد من التفقه الديني فيما يلزمك، ويظهر عندك الاهتمام بالتعلم والتثبت وربط المعرفة بالسلوك.",
      "جيد": "لديك أرضية طيبة، وما تحتاجه غالبًا هو مزيد من الانتظام في التعلم والعودة إلى المصادر الموثوقة بصورة أوضح.",
      "متوسط": "هناك اهتمام موجود، لكنه يحتاج إلى ترتيب أكبر وخطة أبسط في تعلم ما يلزمك من أمور الدين.",
      "يحتاج إلى دعم": "البداية المناسبة هنا هي التدرج: تعلم الأساسيات أولًا، واسأل من تثق بعلمه، وابتعد عن التلقي العشوائي."
    }
  };

  return adviceMap[key][level];
}

function buildSectionCard(key) {
  const percentage = getSectionPercentage(key);
  const level = getSectionLevel(percentage);

  return `
    <div class="result-card section-result-card">
      <h4>${sectionLabels[key]}</h4>
      <p><strong>المستوى:</strong> ${level}</p>
      <div class="result-meter">
        <div class="result-meter-fill" style="width:${percentage}%"></div>
      </div>
      <p><strong>النسبة التقريبية:</strong> ${percentage}%</p>
      <p>${getSectionAdvice(key, level)}</p>
    </div>
  `;
}

function getOverallSummary() {
  const mentalLevel = getSectionLevel(getSectionPercentage("mental"));
  const socialLevel = getSectionLevel(getSectionPercentage("social"));
  const religiousLevel = getSectionLevel(getSectionPercentage("religious"));

  return `
    النتيجة العامة توضّح مستواك الحالي في ثلاثة محاور أساسية:
    <br>• الوعي الذاتي الصحي: <strong>${mentalLevel}</strong>
    <br>• الوعي الذاتي الاجتماعي: <strong>${socialLevel}</strong>
    <br>• التفقه الديني: <strong>${religiousLevel}</strong>
    <br><br>
    هذه القراءة عامة، وهدفها مساعدتك على ملاحظة الجوانب الأقوى والجوانب التي تحتاج إلى مزيد من العناية.
  `;
}

function showResult() {
  appendMessage(`شكرًا لك يا ${escapeHtml(userName)}، لقد أنهيت الاستبيان بنجاح ✅`, "bot");

  const resultBox = document.createElement("div");
  resultBox.className = "message bot";
  resultBox.innerHTML = `
    <div class="bubble">
      <div class="result-header">النتيجة النهائية</div>
      <div>${getOverallSummary()}</div>

      <div class="result-grid">
        ${buildSectionCard("mental")}
        ${buildSectionCard("social")}
        ${buildSectionCard("religious")}
        <div class="result-card">
          <h4>ملاحظة مهمة</h4>
          <p>
            هذه النتيجة قراءة عامة مبنية على اختياراتك داخل الاستبيان،
            وهي وسيلة للتأمل والمراجعة وليست حكمًا نهائيًا على شخصيتك أو مستواك.
          </p>
        </div>
      </div>
    </div>
  `;
  chatBody.appendChild(resultBox);
  const weakest = ["mental","social","religious"]
.map(k => ({k, v: getSectionPercentage(k)}))
.sort((a,b)=>a.v-b.v)[0].k;

const adviceMap = {
mental: `.
إذا كانت نتيجتك منخفضة في هذا القسم، فهذا يعني أنك: 👉 تشعرين بمشاعرك لكن لا تفهمينها جيدًا
👉 أو تهربين منها بدل التعامل معها
✨ النصائح:
1. لا تهربي من مشاعرك… افهميها
بدل ما تقولين "أنا متضايقة"، اسألي:
لماذا؟
ماذا حدث قبلها؟
2. اكتبي مشاعرك يوميًا (حتى لو سطرين)
مثال:
"اليوم توترت لأن..."
هذا يساعدك تفهمين نفسك بدل ما تضيع المشاعر داخلك
3. فرّقي بين الشعور والتصرف
الشعور: طبيعي
لكن التصرف: هو اختيارك
👉 ممكن تغضبين، لكن تختارين الهدوء
4. أعطي نفسك وقت قبل أي رد فعل
إذا انزعجتِ:
⏳ انتظري 5 دقائق
ثم قرري ماذا تفعلين
5. اسألي نفسك دائمًا:
"هل أنا أفهم نفسي… أم فقط أعيش بدون وعي؟"
6. لا تحاولي تكوني مثالية
هدفك ليس أن تكوني بلا مشاعر
بل أن تفهميها وتديريها`,
social: `
إذا كانت نتيجتك منخفضة هنا، فهذا يعني: 👉 صعوبة في فهم الآخرين
👉 أو مشاكل في التواصل والتعامل
✨ النصائح:
1. استمعي أكثر مما تتكلمين
حاولي عندما يتكلم شخص:
لا تفكري في ردك
بل افهمي شعوره أولًا
2. اسألي بدل أن تفترضي
بدل: "هو يقصد يزعجني"
قولي: "هل ممكن توضّح لي قصدك؟"
3. ليس كل شيء هجوم عليك
بعض التصرفات:
سوء فهم
أو تعب من الطرف الآخر
4. تعلمي التعبير بهدوء
بدل العصبية:
"أنا انزعجت لما حصل كذا"
5. ضعي حدودًا بسيطة
مثال:
إذا شخص أزعجك → لا تضحكين وتسكتي
قولي بهدوء: "هذا ما يناسبني"
6. العلاقات تحتاج توازن
لا:
تذوبين في الناس
ولا:
تنعزلين تمامًا`,
religious: `.
1. لا تبدأي بالتغيير… ابدئي بالفهم
أغلب الفشل سببه أنك تحاولين إصلاح شيء لا تفهمينه.
2. اسألي دائمًا: ما الدافع؟
كل سلوك وراءه:
رغبة
خوف
هروب
عادة
إذا لم يُفهم → لن يتغير
3. فرّقي بين:
ما تشعرين به
وما يجب أن تفعلينه
النفس تقود… لكن لا يجب أن تُتبع دائمًا
4. التوبة ليست شعور… بل تغيير سبب
إذا لم يتغير السبب → سيعود الذنب
5. راقبي نفسك بوعي لا بجلد
المطلوب:
فهم
تحليل
توجيه
ليس:
لوم فقط
6. أصل التزكية = علاقة مع الله
أي تطوير بدون هذا: → سيكون مؤقتًا أو هشًا`
};

appendMessage(`💡 نصيحة لك:
${adviceMap[weakest]}`, "bot");
appendMessage(`لافتة مهمة:
توقّفي لحظة…
وفكّري بهدوء:
هل تعيشين حياتك بوعي؟
أم أن الأيام تمضي… وأنتِ فقط تتأثرين بكل ما حولك دون أن تنتبهي؟
نحن اليوم نعيش في عالم مليء بـ:
آراء الناس
المقارنات
المؤثرات
التوقعات
وعالم عولمي
وهذه الأشياء، مع الوقت…
تشكّلنا من الداخل
دون أن نشعر.
قد تظنين أن:
هذا طبعك
هذا أسلوبك
هذه شخصيتك
لكن الحقيقة أحيانًا:
👉 أن كثيرًا مما بداخلك… ليس اختيارك أصلًا
بل:
تأثر
تقليد
أو هروب من مواجهة نفسك
الوعي الحقيقي ليس أن: تعرفي معلومات عن نفسك فقط
بل أن: 👉 تفهمي لماذا تفكرين وتشعرين وتتصرفين بهذه الطريقة
ليس كل شعور يجب أن يُتبع
وليس كل فكرة صحيحة
وليس كل ما تعتادين عليه… مناسب لك
هناك فرق كبير بين:
أن تعيشي حياتك
وبين أن تُقاد حياتك دون أن تشعري
كل موقف مررتِ به
كل شعور تجاهلتِه
كل مرة قلتي فيها "عادي"
هي في الحقيقة: 👉 جزء من تكوينك… الذي يتشكل الآن.
قد لا تختارين كل ما حولك…
لكن يمكنك أن تختاري:
هل تفهمينه وتتعاملين معه بوعي… أم تتركينه يشكّلك دون أن تشعري؟
ابدئي من الآن…
ليس بتغيير كل شيء
بل بشيء واحد فقط:
✨ أن تكوني واعية
واعية بمشاعرك
واعية بتصرفاتك
واعية بما يدخل إلى عقلك وقلبك
لأن: الشخص الذي يفهم نفسه…
يستطيع أن يغيّرها
أما الذي لا يفهمها…
فسيبقى يدور في نفس الدائرة
🌱 تذكّري دائمًا:
أنتِ في مرحلة تتشكل فيها شخصيتك
وكل وعي تكتسبينه اليوم…
سيصنع فرقًا كبيرًا في مستقبلك`, "bot");


  const restart = document.createElement("div");
  restart.className = "restart-wrap";
  restart.innerHTML = `<button class="restart-btn" type="button">إعادة الاستبيان</button>`;
  restart.querySelector("button").addEventListener("click", restartQuiz);
  chatBody.appendChild(restart);
}

function restartQuiz() {
  userName = "";
  currentStep = 0;
  scores.mental = 0;
  scores.social = 0;
  scores.religious = 0;
  questions.forEach((q) => delete q.selectedLabel);
  renderIntro();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

showHomePage();
