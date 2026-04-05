const dimensions = ["social", "structured", "decisive", "creative", "empathetic", "calm", "ambitious"];

const dimensionLabels = {
  social: "التواصل",
  structured: "المنهجية",
  decisive: "الحسم",
  creative: "الإبداع",
  empathetic: "التعاطف",
  calm: "الهدوء",
  ambitious: "الطموح"
};

const scores = {
  social: 0,
  structured: 0,
  decisive: 0,
  creative: 0,
  empathetic: 0,
  calm: 0,
  ambitious: 0
};

let userName = "";
let currentStep = 0;

const questions = [
  {
    text: "ما الذي يعبر عنك أكثر على السوشيال ميديا؟",
    options: [
      { label: "أتابع محتوى مفيد وتحليلي", sub: "أحب القيمة والوضوح.", weight: { structured: 2, calm: 1 } },
      { label: "أتابع قصص نجاح وتطوير ذات", sub: "أحب التحفيز والطموح.", weight: { ambitious: 2, decisive: 1 } },
      { label: "أتابع محتوى إبداعي وأفكار", sub: "أميل للجديد والابتكار.", weight: { creative: 2 } },
      { label: "أتابع محتوى اجتماعي وتجارب ناس", sub: "أهتم بالناس والمشاعر.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "في يومك العادي، متى تكون أفضل نسخة منك؟",
    options: [
      { label: "عندما يكون يومي مرتبًا وواضحًا", sub: "الوضوح يريحني.", weight: { structured: 2, calm: 1 } },
      { label: "عندما أنجز أشياء كثيرة", sub: "الإنجاز يعطيني طاقة.", weight: { ambitious: 2, decisive: 1 } },
      { label: "عندما أعمل على شيء جديد", sub: "التجديد ينعشني.", weight: { creative: 2 } },
      { label: "عندما أكون وسط ناس قريبين", sub: "العلاقات مهمة لي.", weight: { social: 2, empathetic: 1 } }
    ]
  },
  {
    text: "إذا كنت في جلسة مع أشخاص جدد، غالبًا أنت...",
    options: [
      { label: "تراقب في البداية ثم تدخل", sub: "أفضل فهم الجو أولًا.", weight: { calm: 2, structured: 1 } },
      { label: "تبادر بالكلام والتعارف", sub: "أحب كسر الحاجز بسرعة.", weight: { social: 2, decisive: 1 } },
      { label: "تطرح موضوعًا مختلفًا", sub: "أحب ترك لمسة خاصة.", weight: { creative: 2 } },
      { label: "تحاول جعل الكل مرتاح", sub: "راحة الموجودين مهمة.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "عندما تستيقظ صباحًا، ما أول شيء يشغل بالك عادة؟",
    options: [
      { label: "ماذا سأفعل اليوم بالتحديد", sub: "أفكر في الخطة.", weight: { structured: 2 } },
      { label: "ما أهم هدف أريد تحقيقه", sub: "أركز على الإنجاز.", weight: { ambitious: 2, decisive: 1 } },
      { label: "هل لدي مساحة لشيء مختلف اليوم", sub: "أحب وجود مساحة للتجديد.", weight: { creative: 2 } },
      { label: "مع من سأتواصل أو ألتقي", sub: "البعد الاجتماعي حاضر دائمًا.", weight: { social: 2 } }
    ]
  },
  {
    text: "أقرب وصف لطريقتك في اتخاذ القرار هو...",
    options: [
      { label: "أجمع المعلومات أولًا", sub: "أحتاج وضوحًا قبل الحسم.", weight: { structured: 2, calm: 1 } },
      { label: "أحسم بسرعة إذا شعرت أنه مناسب", sub: "أفضل الحركة على التردد.", weight: { decisive: 2 } },
      { label: "أتبع إحساسي وحدسي", sub: "أثق في الإلهام أحيانًا.", weight: { creative: 1, calm: 1 } },
      { label: "أفكر في أثر القرار على الناس", sub: "أراعي الآخرين.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "عندما تتعرض لضغط مفاجئ، كيف يكون رد فعلك؟",
    options: [
      { label: "أرتب ما يحدث في ذهني", sub: "أحتاج أستعيد النظام.", weight: { calm: 2, structured: 1 } },
      { label: "أتحرك بسرعة لحل الوضع", sub: "لا أحب الجمود وقت الضغط.", weight: { decisive: 2, ambitious: 1 } },
      { label: "أبحث عن حل غير تقليدي", sub: "أميل للمرونة والذكاء.", weight: { creative: 2 } },
      { label: "أهتم أولًا بحالة من حولي", sub: "الناس لا تقل أهمية عن المشكلة.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "في العمل أو الدراسة، ما الذي يحفزك أكثر؟",
    options: [
      { label: "النظام والوضوح", sub: "أحب أن أعرف ما المطلوب.", weight: { structured: 2 } },
      { label: "النجاح والتقدم", sub: "أتحفز بالنتائج والطموح.", weight: { ambitious: 2, decisive: 1 } },
      { label: "المساحة للتجريب", sub: "أحتاج مساحة للتعبير.", weight: { creative: 2 } },
      { label: "العمل مع ناس متفاهمين", sub: "الجو الإنساني مهم.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "أي نوع من الأصدقاء يميل لك أكثر؟",
    options: [
      { label: "الملتزم والواضح", sub: "أرتاح للشخص المنظم.", weight: { structured: 2 } },
      { label: "القوي والطموح", sub: "يعجبني الحضور الواثق.", weight: { ambitious: 2, decisive: 1 } },
      { label: "المرح والمختلف", sub: "أحب الشخصيات الملهمة.", weight: { creative: 2, social: 1 } },
      { label: "الحنون والمتفهم", sub: "القرب الإنساني يهمني.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "كيف تتعامل مع رسالة متأخرة أو تجاهل من شخص مهم لك؟",
    options: [
      { label: "أحلل السبب بهدوء", sub: "أفضل عدم التسرع.", weight: { calm: 2, structured: 1 } },
      { label: "أواجه الأمر مباشرة", sub: "أحب الوضوح السريع.", weight: { decisive: 2 } },
      { label: "أشغل نفسي بشيء آخر", sub: "أتجاوز بالتغيير.", weight: { creative: 1, calm: 1 } },
      { label: "أفكر هل الشخص يمر بشيء صعب", sub: "أميل للتفهم أولًا.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "أنت في الغالب تميل إلى...",
    options: [
      { label: "الاستقرار والوضوح", sub: "أفضل الأشياء المرتبة.", weight: { structured: 2, calm: 1 } },
      { label: "التحدي والتقدم", sub: "أحب الشعور بالنمو.", weight: { ambitious: 2 } },
      { label: "التجديد والاختلاف", sub: "أمل من التكرار سريعًا.", weight: { creative: 2 } },
      { label: "الدفء الإنساني والقرب", sub: "أحب العلاقات العميقة.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "إذا كان لديك وقت فراغ، ماذا تميل أن تفعل؟",
    options: [
      { label: "أرتب أموري أو أخطط", sub: "الترتيب يريحني.", weight: { structured: 2 } },
      { label: "أعمل على هدف مؤجل", sub: "أحب استغلال الوقت.", weight: { ambitious: 2, decisive: 1 } },
      { label: "أجرب فكرة جديدة", sub: "أحتاج كسر الروتين.", weight: { creative: 2 } },
      { label: "أتواصل مع شخص قريب", sub: "الناس جزء مهم من راحتي.", weight: { social: 2, empathetic: 1 } }
    ]
  },
  {
    text: "كيف يراك الآخرون غالبًا في أول انطباع؟",
    options: [
      { label: "هادئ ومرتب", sub: "تعطي إحساسًا بالثبات.", weight: { calm: 2, structured: 1 } },
      { label: "واثق وواضح", sub: "حضورك مباشر.", weight: { decisive: 2, ambitious: 1 } },
      { label: "مختلف ولافت", sub: "فيك شيء غير تقليدي.", weight: { creative: 2 } },
      { label: "لطيف ومريح", sub: "وجودك يبعث راحة.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "عندما تخطط لشيء مهم، ما أول ما تفكر فيه؟",
    options: [
      { label: "الخطوات", sub: "أحتاج ترتيب التنفيذ.", weight: { structured: 2 } },
      { label: "النتيجة", sub: "يهمني الوصول بسرعة.", weight: { ambitious: 2, decisive: 1 } },
      { label: "اللمسة المختلفة", sub: "أحب أن يكون الشيء مميزًا.", weight: { creative: 2 } },
      { label: "تأثيره على الناس", sub: "أهتم بردود الفعل والانطباع.", weight: { empathetic: 2, social: 1 } }
    ]
  },
  {
    text: "في نقاش حاد، ماذا تفعل غالبًا؟",
    options: [
      { label: "أهدأ وأرتب الكلام", sub: "أفضل ألا أنفعل.", weight: { calm: 2, structured: 1 } },
      { label: "أقول موقفي بوضوح", sub: "لا أحب الدوران.", weight: { decisive: 2 } },
      { label: "أغير زاوية الحديث", sub: "أبحث عن مدخل مختلف.", weight: { creative: 2 } },
      { label: "أحاول تخفيف التوتر", sub: "أهتم بالمناخ العام.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "أي بيئة تناسبك أكثر؟",
    options: [
      { label: "بيئة واضحة القواعد", sub: "أفضل الوضوح.", weight: { structured: 2 } },
      { label: "بيئة فيها تحديات وسرعة", sub: "أحب الإيقاع العالي.", weight: { decisive: 2, ambitious: 1 } },
      { label: "بيئة مرنة ومبدعة", sub: "التنوع يخرج أفضل ما عندي.", weight: { creative: 2 } },
      { label: "بيئة إنسانية ومتعاونة", sub: "أحب الجو المريح.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "ما الذي يضايقك أكثر؟",
    options: [
      { label: "العشوائية", sub: "أحتاج وضوحًا.", weight: { structured: 2 } },
      { label: "البطء الشديد", sub: "أفضل الحسم.", weight: { decisive: 2, ambitious: 1 } },
      { label: "التكرار الممل", sub: "أحتاج تجديدًا.", weight: { creative: 2 } },
      { label: "سوء المعاملة", sub: "الأذى الإنساني يزعجني.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "عندما تنجح في شيء مهم، ما أكثر شيء يسعدك؟",
    options: [
      { label: "أن كل شيء سار كما خططت", sub: "نجاح النظام يرضيني.", weight: { structured: 2 } },
      { label: "أنني وصلت لهدفي", sub: "الإنجاز نفسه يفرحني.", weight: { ambitious: 2, decisive: 1 } },
      { label: "أن النتيجة كانت مختلفة", sub: "أحب التميز.", weight: { creative: 2 } },
      { label: "أن الناس قدرت ما فعلته", sub: "الأثر الإنساني مهم.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "أي عبارة أقرب لك؟",
    options: [
      { label: "أحب أن أفهم قبل أن أتحرك", sub: "الفهم يسبق القرار.", weight: { structured: 2, calm: 1 } },
      { label: "أحب أن أتحرك قبل أن تضيع الفرصة", sub: "الحركة أفضل من الانتظار.", weight: { decisive: 2, ambitious: 1 } },
      { label: "أحب أن أرى الاحتمالات المختلفة", sub: "أفكر خارج الشكل التقليدي.", weight: { creative: 2 } },
      { label: "أحب أن أبقي الأمور لطيفة ومتزنة", sub: "الهدوء مهم عندي.", weight: { empathetic: 2, calm: 1 } }
    ]
  },
  {
    text: "كيف تتعامل مع يوم سيئ؟",
    options: [
      { label: "أرجع للنظام والروتين", sub: "الترتيب يهدئني.", weight: { calm: 2, structured: 1 } },
      { label: "أحاول إصلاحه بسرعة", sub: "لا أحب أن يضيع اليوم.", weight: { decisive: 2, ambitious: 1 } },
      { label: "أكسر الجو بشيء جديد", sub: "أغير المود بالفعل المختلف.", weight: { creative: 2 } },
      { label: "ألجأ لشخص أثق به", sub: "الدعم الإنساني يفرق معي.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "ماذا يعجبك في الناس أكثر؟",
    options: [
      { label: "الالتزام", sub: "أحترم الوضوح والمسؤولية.", weight: { structured: 2 } },
      { label: "القوة والطموح", sub: "أحب الشخص المتحرك للأمام.", weight: { ambitious: 2, decisive: 1 } },
      { label: "الذكاء والاختلاف", sub: "أميل للمميز.", weight: { creative: 2 } },
      { label: "الطيبة والاحتواء", sub: "أحب القلب الهادئ.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "في العلاقات، ما الذي تحتاجه أكثر؟",
    options: [
      { label: "الوضوح والاستقرار", sub: "أحتاج شيئًا مفهومًا.", weight: { structured: 2, calm: 1 } },
      { label: "الاحترام والدعم", sub: "أحب علاقة تدفعني للأمام.", weight: { ambitious: 2, decisive: 1 } },
      { label: "التجدد والاهتمام", sub: "أحب الحيوية والتفاصيل.", weight: { creative: 2, social: 1 } },
      { label: "الأمان والاحتواء", sub: "أحتاج قربًا صادقًا.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "إذا أخطأ شخص في حقك، ما الأقرب لك؟",
    options: [
      { label: "أفكر بهدوء قبل الرد", sub: "لا أحب التسرع.", weight: { calm: 2 } },
      { label: "أوضح الخطأ مباشرة", sub: "أفضل الوضوح.", weight: { decisive: 2 } },
      { label: "أحاول فهم السياق أولًا", sub: "أميل لرؤية الصورة كاملة.", weight: { creative: 1, empathetic: 1 } },
      { label: "أهتم إذا كان ذلك مقصودًا أم لا", sub: "نية الشخص تهمني.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "أي دور تميل له داخل المجموعة؟",
    options: [
      { label: "المنظم", sub: "أرتاح في الترتيب.", weight: { structured: 2 } },
      { label: "القائد", sub: "أحب التوجيه.", weight: { decisive: 2, ambitious: 1 } },
      { label: "صاحب الفكرة", sub: "أميل للابتكار.", weight: { creative: 2 } },
      { label: "المهدئ والداعم", sub: "أهتم بتوازن الناس.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "لو عندك هدف كبير، كيف تتعامل معه؟",
    options: [
      { label: "أحوله لخطة مراحل", sub: "أفضل التدرج.", weight: { structured: 2 } },
      { label: "أطارد النتيجة بقوة", sub: "الطموح يحركني.", weight: { ambitious: 2, decisive: 1 } },
      { label: "أبحث عن طريق مختلف لتحقيقه", sub: "أحب الحلول الجديدة.", weight: { creative: 2 } },
      { label: "أحب وجود من يشجعني فيه", sub: "الدعم الإنساني مهم.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "كيف تقضي وقتك على الهاتف غالبًا؟",
    options: [
      { label: "تنظيم، قراءة، متابعة أشياء مفيدة", sub: "أبحث عن قيمة واضحة.", weight: { structured: 2 } },
      { label: "متابعة أهداف وأخبار وتقدم", sub: "أميل للحركة والتقدم.", weight: { ambitious: 2 } },
      { label: "إلهام، أفكار، محتوى مختلف", sub: "أحب المحتوى الذي يفتح آفاقًا.", weight: { creative: 2 } },
      { label: "محادثات وتواصل وعلاقات", sub: "التواصل جزء أساسي عندي.", weight: { social: 2, empathetic: 1 } }
    ]
  },
  {
    text: "عندما تفكر في نفسك، ما أكثر شيء تلاحظه؟",
    options: [
      { label: "أني أحب النظام والوضوح", sub: "أرتاح للهيكلة.", weight: { structured: 2 } },
      { label: "أني أريد أن أتقدم دائمًا", sub: "الطموح حاضر بقوة.", weight: { ambitious: 2 } },
      { label: "أني أمل بسرعة من التكرار", sub: "أحتاج مساحة إبداع.", weight: { creative: 2 } },
      { label: "أني أتأثر بالمواقف الإنسانية", sub: "قلبي حاضر في قراراتي.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "أي نوع من القرارات أصعب عليك؟",
    options: [
      { label: "قرار غير واضح التفاصيل", sub: "الغموض يربكني.", weight: { structured: 2 } },
      { label: "قرار يؤخر هدفي", sub: "أكره التعطل.", weight: { ambitious: 2, decisive: 1 } },
      { label: "قرار يغلق بابًا جديدًا", sub: "لا أحب فقدان الاحتمالات.", weight: { creative: 2 } },
      { label: "قرار قد يجرح أحدًا", sub: "أراعي الأثر على الناس.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "عندما تتخيل مستقبلك، ما الصورة الأقرب؟",
    options: [
      { label: "حياة مستقرة وواضحة", sub: "الهدوء والاتزان يهماني.", weight: { calm: 2, structured: 1 } },
      { label: "إنجازات ومكانة قوية", sub: "أحب الوصول والتأثير.", weight: { ambitious: 2, decisive: 1 } },
      { label: "حياة فيها حرية وتجارب", sub: "أميل للتنوع والاكتشاف.", weight: { creative: 2 } },
      { label: "حياة فيها قرب وعلاقات صادقة", sub: "الدفء الإنساني أساسي.", weight: { social: 1, empathetic: 2 } }
    ]
  },
  {
    text: "إذا قال عنك أحدهم إنك...",
    options: [
      { label: "منظم جدًا", sub: "ستعتبرها صفة جيدة.", weight: { structured: 2 } },
      { label: "طموح جدًا", sub: "ستشعر أنها تعبر عنك.", weight: { ambitious: 2 } },
      { label: "مختلف جدًا", sub: "ستحب هذا الوصف.", weight: { creative: 2 } },
      { label: "حنون جدًا", sub: "ستراه قريبًا منك.", weight: { empathetic: 2 } }
    ]
  },
  {
    text: "ما الذي يمثل لك الراحة أكثر؟",
    options: [
      { label: "أن أعرف ما الذي سيحدث", sub: "الوضوح راحة بالنسبة لي.", weight: { calm: 2, structured: 1 } },
      { label: "أن أشعر أني أتقدم", sub: "التقدم يعطيني طمأنينة.", weight: { ambitious: 2 } },
      { label: "أن أكون على طبيعتي", sub: "الحرية والإبداع يريحانني.", weight: { creative: 2 } },
      { label: "أن أكون مع أشخاص آمنين", sub: "الراحة عندي مرتبطة بالعلاقات.", weight: { social: 1, empathetic: 2 } }
    ]
  }
];

const introStep = {
  type: "intro",
  text: "مرحبًا بك 🌿 قبل أن نبدأ، ما الاسم الذي تحب أن يظهر في النتيجة؟"
};

const chatBody = document.getElementById("chatBody");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const statQuestions = document.getElementById("statQuestions");

statQuestions.textContent = `${questions.length} سؤال`;

function appendMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = `<div class="bubble">${text}</div>`;
  chatBody.appendChild(msg);
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
      <input id="nameInput" type="text" placeholder="مثال: محمد" style="flex:1;min-width:220px;padding:14px;border:1px solid rgba(20,107,73,.15);border-radius:14px;font:inherit;outline:none;">
      <button id="startBtn" style="border:none;border-radius:14px;padding:14px 20px;background:linear-gradient(135deg,#198754,#0f4d35);color:#fff;font:inherit;font-weight:700;cursor:pointer;">ابدأ</button>
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
  appendMessage(`أهلًا ${escapeHtml(userName)} 🌿 سنبدأ الآن الاستبيان. اختر إجابة واحدة فقط في كل سؤال.`, "bot");

  for (let i = 0; i < currentStep - 1; i++) {
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

  const q = questions[currentStep - 1];
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
  }, 160);
}

function getTopDimensions() {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

function pickArchetype(sortedDims) {
  const top = sortedDims[0][0];
  const second = sortedDims[1][0];
  const diff = sortedDims[0][1] - sortedDims[1][1];

  if (diff <= 1) return "balanced";
  if (top === "structured" || top === "calm") return "analyst";
  if (top === "ambitious" || top === "decisive") return "driver";
  if (top === "creative") return "creator";
  if (top === "empathetic" || top === "social") return "connector";
  return "balanced";
}

const archetypes = {
  analyst: {
    title: "الشخصية الهادئة التحليلية",
    summary: "تميل إلى الوضوح والترتيب والتفكير قبل التحرك. لديك ميل طبيعي لفهم الصورة بهدوء وبناء قراراتك على أساس منطقي ومتزن.",
    style: "تبدو أفضل عندما يكون لديك مسار واضح وخطوات مفهومة، وتميل إلى الجودة والثبات أكثر من الاندفاع السريع.",
    strengths: ["الهدوء", "التفكير المنظم", "ملاحظة التفاصيل", "التصرف المتزن"],
    watchouts: ["قد تؤجل بعض القرارات انتظارًا لوضوح أكبر", "قد تتوتر من الفوضى أو التغيير المفاجئ"],
    advice: "اسمح لنفسك أحيانًا بخطوة أسرع حتى لو لم تكن كل التفاصيل مكتملة."
  },
  driver: {
    title: "الشخصية الطموحة الحاسمة",
    summary: "لديك طاقة واضحة نحو التقدم والإنجاز، وتميل إلى الحسم عندما ترى هدفًا أمامك. حضورك يحمل رغبة في الحركة والتأثير.",
    style: "تناسبك البيئات التي فيها تحدٍّ ونتائج وفرص تقدم، وتظهر أفضل صفاتك عندما يكون هناك شيء يستحق السعي.",
    strengths: ["الطموح", "الحسم", "القدرة على الدفع للأمام", "حب الإنجاز"],
    watchouts: ["قد تضيق من البطء أو التردد الطويل", "قد تبدو مباشرًا أكثر من اللازم في بعض اللحظات"],
    advice: "كلما جمعت بين سرعتك والإنصات، أصبحت أكثر تأثيرًا واستقرارًا."
  },
  creator: {
    title: "الشخصية الإبداعية المرنة",
    summary: "تميل إلى التجديد واكتشاف الزوايا المختلفة في الأشياء. لديك رغبة داخلية في التميز وكسر النمط المعتاد.",
    style: "تبدع أكثر في البيئات التي تمنحك مساحة للحركة والتفكير المختلف، وتضع بصمتك عندما يُسمح لك بالتعبير الحقيقي.",
    strengths: ["الابتكار", "المرونة", "الحس المختلف", "القدرة على رؤية احتمالات جديدة"],
    watchouts: ["قد تمل من الروتين سريعًا", "قد تحتاج أحيانًا إلى تثبيت أفكارك بخطة أوضح"],
    advice: "اربط أفكارك الجميلة بخطوات تنفيذ صغيرة حتى تخرج بأفضل صورة ممكنة."
  },
  connector: {
    title: "الشخصية الإنسانية الاجتماعية",
    summary: "أنت تميل إلى فهم الناس وبناء القرب والراحة في العلاقات. حضورك يميل لأن يكون لطيفًا، متفهمًا، ومطمئنًا لمن حولك.",
    style: "تتألق في الأجواء التي فيها تعاون وتواصل وإنسانية، وتُظهر أفضل ما فيك عندما يكون المناخ النفسي جيدًا.",
    strengths: ["الاحتواء", "التواصل", "الاستماع", "بناء الثقة"],
    watchouts: ["قد تحمل مشاعر الآخرين أكثر من اللازم", "قد تتردد أحيانًا حتى لا تزعج أحدًا"],
    advice: "قلبك نقطة قوة، لكن قوته تزيد أكثر عندما تضع حدودك بوضوح."
  },
  balanced: {
    title: "الشخصية المتوازنة",
    summary: "إجاباتك تُظهر توازنًا بين أكثر من جانب، وهذا يعني أنك لست أسير نمط واحد. لديك مرونة جيدة وقدرة على التكيف مع مواقف مختلفة.",
    style: "يناسبك التنوع، وتستطيع التحرك بين الهدوء والحسم، وبين العقل والعلاقة، حسب ما تتطلبه اللحظة.",
    strengths: ["المرونة", "التكيف", "الرؤية المتزنة", "فهم أكثر من زاوية"],
    watchouts: ["قد تحتار أحيانًا بين عدة اتجاهات جيدة", "قد تحتاج في بعض المواقف إلى تحديد أولوياتك بشكل أسرع"],
    advice: "قوتك في التوازن، لكن الأفضل أن تحدد ما هو الأهم لك أولًا ثم تتحرك بثبات."
  }
};

function buildDimensionPills(sortedDims) {
  return sortedDims.slice(0, 4).map(([key, val]) => {
    return `<span class="result-pill">${dimensionLabels[key]}: ${val}</span>`;
  }).join("");
}

function showResult() {
  const sortedDims = getTopDimensions();
  const archetypeKey = pickArchetype(sortedDims);
  const result = archetypes[archetypeKey];

  appendMessage(`شكرًا يا ${escapeHtml(userName)}، تم الانتهاء من الاستبيان ✅`, "bot");

  const resultBox = document.createElement("div");
  resultBox.className = "message bot";
  resultBox.innerHTML = `
    <div class="bubble">
      <div class="result-header">${result.title}</div>
      <div>${result.summary}</div>
      <div class="result-pills">${buildDimensionPills(sortedDims)}</div>

      <div class="result-grid">
        <div class="result-card">
          <h4>ملامح شخصيتك</h4>
          <p>${result.style}</p>
        </div>
        <div class="result-card">
          <h4>نصيحة مناسبة لك</h4>
          <p>${result.advice}</p>
        </div>
        <div class="result-card">
          <h4>أبرز نقاط القوة</h4>
          <ul>${result.strengths.map(item => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div class="result-card">
          <h4>أمور تحتاج انتباهًا</h4>
          <ul>${result.watchouts.map(item => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  `;
  chatBody.appendChild(resultBox);

  const restart = document.createElement("div");
  restart.className = "restart-wrap";
  restart.innerHTML = `<button class="restart-btn" type="button">إعادة الاستبيان</button>`;
  restart.querySelector("button").addEventListener("click", restartQuiz);
  chatBody.appendChild(restart);
}

function restartQuiz() {
  userName = "";
  currentStep = 0;
  dimensions.forEach((d) => scores[d] = 0);
  questions.forEach((q) => delete q.selectedLabel);
  renderIntro();
}

renderIntro();