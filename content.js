/* ============================================================
   content.js: EVERYTHING on the site comes from this file.
   Edit text here, never in index.html.

   Structure:
   - SITE            : things that are the same in every view (name, links, education ...)
   - SITE.projects   : each project once, with different bullet lists per view
   - SITE.profiles   : the views (generic, se, ai, ml, ds): headline, skills, project order, CV file
   ============================================================ */
const SITE = {
  name: "Shristi Sinha",
  first: "Shristi",
  last: "Sinha",
  initials: "SS",
  location: "India",
  email: "shristisinha1611@gmail.com",
  linkedin: "https://www.linkedin.com/in/shristi-sinha-4a3a37345",
  github: "https://github.com/Shristi1611",
  portrait: "assets/portrait.jpg",

  /* Floating stickers in the hero. "$pill" and "$tag" are filled from the active view. */
  stickers: [
    { style: "pill", text: "$pill" },
    { style: "card", text: "GH Raisoni University", sub: "B.Tech CS · CGPA 9.18" },
    { style: "card", text: "India Runs 2026", sub: "Redrob AI × Hack2Skill" },
    { style: "outline", text: "$tag" },
    { style: "glass", text: "EN · हिन्दी" }
  ],

  /* Scrolling cards: education and highlights (same in every view) */
  highlights: [
    { year: "2023 →", title: "B.Tech Computer Science", org: "GH Raisoni International Skill Tech University · Nov 2023 – present", text: "CGPA 9.18 / 10." },
    { year: "2026", title: "India Runs Hackathon", org: "Redrob AI × Hack2Skill", text: "Submitted to Track 1 (Data & AI Challenge) and Track 2 (Ideathon). Built an AI candidate ranking system for it." },
    { year: "2026", title: "Kaggle: Biohub", org: "Cell Tracking During Development", text: "Applying machine learning to detect and track cells in 3D microscopy data." },
    { year: "NPTEL", title: "Certifications", org: "NPTEL", text: "Deep Learning; Programming in Java." },
    { year: "Open source", title: "Contributor", org: "GitHub", text: "Contributed Python code to open-source repositories through issues and pull requests." },
    { year: "2023", title: "Higher Secondary Certificate", org: "Kerala Public School, Jamshedpur", text: "Class XII, graduated 2023. Took part in inter-school public speaking competitions." }
  ],

  interests: ["Applied AI & LLM systems", "Machine learning", "Safe, reliable AI", "Backend & data", "Reading & writing", "Public speaking"],
  languages: [
    { name: "English", level: "Professional" },
    { name: "हिन्दी (Hindi)", level: "Native" }
  ],

  /* ---------------- Projects (written once, bullets differ per view) ----------------
     bullets.all   = used when a view has no specific list
     bullets.<key> = special wording for that view (se, ai, ml, ds, generic)
     github: true  = the resume lists a GitHub link; paste the real repo URL into `repo`.
  */
  projects: {
    pcod: {
      title: "HerBalance",
      subtitle: { all: "PMOS / PCOD Health Android App" },
      stack: ["Java", "Android", "Firebase", "Gemini API"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/HerBalance",
      result: "8 symptoms tracked · period, symptom and meal logs read together",
      bullets: {
        all: [
          "Android app (Java) for women with PMOS (formerly PCOS) or PCOD that brings period, symptom and meal logs together; built for the Startup Buildathon India 2026 (Google AI x Hack2Skill).",
          "Dashboard with the current cycle day and phase, a period log and cycle calendar, and a tracker for 8 symptoms; sign-in by phone, email or Google through Firebase Authentication.",
          "'Her AI' (Gemini) reads the last 3 period logs and last 3 meals, returns three insight cards, chats, and detects meals from free text. Its system instruction keeps replies brief and evidence-based and never diagnoses.",
          "Firebase Realtime Database with rules so each user can read and write only her own data; the API key is kept out of the repository."
        ]
      },
      flips: [
        ["What is it?", "An Android app that reads a woman's period, symptom and meal logs together for PMOS / PCOD."],
        ["What does the AI do?", "Her AI (Gemini) reads recent period and meal logs and gives three insight cards. It never diagnoses."],
        ["How is data kept private?", "Each user can read and write only her own Firebase node; the API key stays out of the repo."]
      ]
    },

    saralkanoon: {
      title: "SaralKanoon",
      subtitle: { all: "Multilingual AI Legal Assistant" },
      stack: ["n8n", "Qdrant", "Groq", "Ollama"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/SaralKanoon",
      result: "Indian-law answers in 5 languages from 200+ pages",
      bullets: {
        all: [
          "RAG system answering Indian-law questions in Hindi, Tamil, Bengali, Telugu and English from 6 legal documents (200+ pages), including the Consumer Protection and RTI Acts.",
          "Ingestion pipeline: PDF text extraction, 1000-character chunks with 200 overlap, Ollama nomic-embed-text embeddings, Qdrant Cloud storage, and an n8n AI-agent chat workflow.",
          "Plain-language answers from Groq (Llama 3.3 70B) behind a webhook-based API backend and an HTML, CSS and JavaScript chat UI using async Fetch calls."
        ],
        se: [
          "Built a RAG-based AI system answering Indian-law questions in Hindi, Tamil, Bengali, Telugu and English from 6 legal documents totalling 200+ pages.",
          "Used Qdrant for vector storage, Ollama for local embeddings, n8n for workflow automation, and Groq (Llama 3.3 70B) for low-latency inference.",
          "Designed a webhook-based API backend and a chat UI with HTML, CSS and JavaScript using async Fetch API calls."
        ],
        ml: [
          "RAG-based AI system answering Indian-law questions in multiple Indian languages and English over 6 legal documents (200+ pages).",
          "Qdrant for vector storage, Ollama for local embeddings, n8n for workflow automation, Groq (Llama 3.3 70B) for inference."
        ]
      },
      flips: [
        ["What is it?", "A RAG assistant that answers Indian-law questions from 6 legal documents (200+ pages)."],
        ["Which languages?", "Hindi, Tamil, Bengali, Telugu and English."],
        ["What powers it?", "Qdrant for vectors, Ollama embeddings, an n8n workflow and Groq (Llama 3.3 70B)."]
      ]
    },

    obliviate: {
      title: "Obliviate",
      subtitle: { all: "Machine Unlearning for Sepsis Risk Prediction", se: "Unlearning Service for Clinical ML", ds: "Machine Unlearning on Clinical Data" },
      stack: ["Python", "PyTorch", "TabNet", "FastAPI", "SQLite"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/Obliviate",
      result: "Rolls back only affected slices instead of full retraining",
      bullets: {
        all: [
          "Verifiable machine unlearning on PhysioNet sepsis ICU data, using SISA training with TabNet models in PyTorch.",
          "Deletion requests roll back only the affected slices instead of retraining the full model; also supports slice insertions and label updates.",
          "Benchmark against full retraining, an audit log of execution time, affected slices and accuracy for every operation, and a FastAPI + SQLite web dashboard."
        ],
        se: [
          "Built a FastAPI backend with SQLite storage (SQL schema) and a web dashboard to process record deletions, slice insertions and label updates on a TabNet sepsis-risk model.",
          "Implemented audit logging of execution time, affected slices and accuracy for every operation, plus a benchmark comparing SISA unlearning with full retraining."
        ],
        ds: [
          "Prepared PhysioNet sepsis ICU time-series data for TabNet-based risk prediction and benchmarked SISA unlearning against full retraining.",
          "Designed a SQL schema and audit table logging execution time, affected slices and accuracy for every deletion, with a dashboard for monitoring."
        ]
      },
      flips: [
        ["What is it?", "Machine unlearning for sepsis risk prediction on PhysioNet ICU data."],
        ["Why not just retrain?", "Deletions roll back only the affected SISA slices, not the whole model."],
        ["What gets logged?", "Execution time, affected slices and accuracy for every operation."]
      ]
    },

    systemone: {
      title: "SystemOne Testbed",
      subtitle: { all: "Security Testing for AI Decision Models", se: "Security Gateway & Test Suite", ds: "Evaluating AI Decision Models" },
      stack: ["Python", "FastAPI", "Ollama", "Embeddings"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/systemone-testbed",
      result: "Missed injections cut from 14 to 3 of 60 · 17 failure modes, none ended in an allow",
      bullets: {
        all: [
          "Security test environment for AI decision models (tested on Laya, an open Jev-compatible model) covering prompt injection, option-order sensitivity, tampered replies and long-input padding.",
          "Embedding classifier cut missed prompt injections on the deepset test split from 14 to 3 of 60; found the model silently ignores text beyond 474 tokens and added a windowed scan that recovers hidden attacks.",
          "Gateway combining rules, the classifier, validated scoring over two wordings and two option orders, canaries and allow / escalate / block zones, failing closed on any error. Tests cover 17 failure modes; none ended in an allow. A retrained v2 failed its pre-registered rules, so v1 stays; limits are reported openly."
        ],
        se: [
          "Built a gateway that checks AI decision-model replies with rules, an embedding classifier, validated scoring, windowed scanning of long inputs and known-answer canaries, and blocks on any error.",
          "Wrote a tamper proxy and test scripts covering 17 failure modes (timeouts, HTTP errors, malformed JSON) against a fake server; none ended in an allow.",
          "Documented a secure local setup (API key required, localhost-only test proxy, secrets kept out of git) and the known limits of each check."
        ],
        ds: [
          "Scored the deepset prompt-injection dataset under two option orders, then ran allow / escalate / block zone analysis and train-set error analysis.",
          "Compared train and test distributions, checked for shortcut features, and evaluated on a sealed 116-message split.",
          "An embedding classifier cut missed injections on the test split from 14 to 3 of 60, at the cost of flagging more harmless messages; limits reported openly."
        ],
        ml: [
          "Test environment for probability-returning decision models (Jev-compatible Laya) covering prompt injection, option-order sensitivity, tampered replies and long-input padding.",
          "Trained an embedding classifier that cut missed injections on the deepset test split from 14 to 3 of 60; found the model silently ignores text beyond 474 tokens and added a windowed scan that recovers hidden attacks."
        ]
      },
      flips: [
        ["What is it?", "A security test bed and gateway for AI decision models."],
        ["Key finding?", "The model silently ignores text beyond 474 tokens. A windowed scan recovers hidden attacks."],
        ["Result?", "Missed prompt injections fell from 14 to 3 of 60 on the test split."],
        ["Failure modes?", "17 tested (timeouts, HTTP errors, malformed JSON). None ended in an allow."]
      ]
    },

    fccl: {
      title: "FCCL",
      subtitle: { all: "Feedback-Controlled CDM Layer", ds: "Feedback-Controlled CDM Layer (real-data evaluation)" },
      stack: ["Python", "LLMLingua-2", "Groq", "pytest"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/feedback-controlled-cdm-layer",
      result: "Retry net: about 1 point lost at 67% of the tokens (200 fresh questions)",
      bullets: {
        all: [
          "Layer between users and a context-compression model that decides when and how hard to compress, with a guard that falls back to the original text and a retry that re-asks with the original when the model says 'unknown'.",
          "Measured on real SQuAD, DREAM and MultiWOZ data: keep rate 0.8 shows little or no loss, 0.6 costs about 8 points, 0.45 about 18 to 23. On 200 fresh pre-registered questions the retry net lost about 1 point at 67% of the tokens.",
          "Reports negative results too: per-user learning did not beat a single global rule on about 1,390 real PRISM users, and the context weight was not supported. 71 offline tests."
        ],
        ml: [
          "Compression layer with a guard and a retry-on-'unknown' net, evaluated on real SQuAD, DREAM and MultiWOZ data with a generative LLM answerer.",
          "On 200 fresh pre-registered questions the retry net lost about 1 point at 67% of the tokens; per-user learning was not supported on about 1,390 real PRISM users."
        ],
        ds: [
          "Designed real-data experiments (SQuAD, DREAM, MultiWOZ, PRISM) with paired analysis, a pre-registered replication and 95% intervals to measure what context compression costs in accuracy.",
          "Keep 0.8 showed little or no loss and 0.6 about 8 points; the retry net lost about 1 point at 67% of tokens on 200 fresh questions. Per-user learning did not beat a global rule on about 1,390 users."
        ]
      },
      flips: [
        ["What is it?", "A layer that decides how hard to compress context, with a guard and a retry when the model says unknown."],
        ["What did real data say?", "Keep 0.8 is nearly free, 0.6 costs about 8 points, 0.45 costs 18 to 23."],
        ["Retry net?", "About 1 point lost at 67% of the tokens on 200 fresh questions."],
        ["Negative results?", "Per-user learning did not beat a global rule on about 1,390 real users."]
      ]
    },

    maithili: {
      title: "Maithili Few-Shot Sentiment",
      subtitle: { all: "Sentiment Classification for a Low-Resource Language" },
      stack: ["Python", "Transformers", "PyTorch", "scikit-learn"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/maithili-fewshot-sentiment",
      result: "IndicBERT v2 66.5% with 100 examples; MuRIL unstable",
      bullets: {
        all: [
          "Code for a paper by Shristi Sinha testing whether multilingual models can learn Maithili sentiment from 10 to 100 labelled examples, comparing MuRIL (no Maithili in pre-training) with IndicBERT v2 (Maithili included).",
          "Dataset of 2,967 sentences translated from Sentiment140 into Maithili with Google Translate; three seeds per setting, a matched-schedule baseline ablation and qualitative error analysis.",
          "IndicBERT v2 reached 66.5% accuracy with 100 examples (80.6% on the full set) and none of its 12 runs collapsed; MuRIL had seed collapse at every few-shot size (62.1% ± 10.6 at 100 examples)."
        ]
      },
      flips: [
        ["What is it?", "A study of few-shot sentiment classification for Maithili, a low-resource Indian language."],
        ["Which models?", "MuRIL and IndicBERT v2, trained on 10 to 100 labelled examples."],
        ["Result?", "IndicBERT v2 hit 66.5% at 100 examples with no collapsed runs. MuRIL was unstable."]
      ]
    },

    mlscratch: {
      title: "ML Unwrapped",
      subtitle: { all: "ML Algorithms from Scratch" },
      stack: ["Python", "NumPy"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/ml-unwrapped",
      result: "97.4% Breast Cancer Wisconsin · 96.7% Iris",
      bullets: {
        all: [
          "Linear, logistic and softmax regression, Naive Bayes, KNN and decision trees implemented using only NumPy and vectorised matrix operations.",
          "Reached 97.4% on Breast Cancer Wisconsin and 96.7% on Iris; ongoing public 30-day series with 36 commits."
        ]
      },
      flips: [
        ["What is it?", "Classic ML algorithms implemented from scratch with only NumPy."],
        ["Accuracy?", "97.4% on Breast Cancer Wisconsin and 96.7% on Iris."],
        ["Public series?", "An ongoing 30-day series with 36 commits."]
      ]
    },

    ranking: {
      title: "Redrob Intelligent Ranker",
      subtitle: { all: "Career-History-First Candidate Ranking" },
      stack: ["Python", "Streamlit"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/redrob-intelligent-ranker",
      result: "Ranks 100,000 candidates in under 40 seconds, CPU only",
      bullets: {
        all: [
          "Candidate ranking system for Redrob's Intelligent Candidate Discovery and Ranking Challenge. Career history is the main signal; a listed skill only counts if the career history shows it was used.",
          "Weighted scoring across 5 dimensions: career history 40%, skills 25%, behavioural signals 20%, experience range 10%, profile quality 5%, with a career-fit gate on the final score.",
          "Honeypot detection for impossible profiles (an 'expert' skill with zero months of use; stated years that diverge from the career history), found by inspecting suspicious top-ranked candidates.",
          "Core ranker uses only the Python standard library, writes the top 100 to submission.csv and runs a verification suite; a Streamlit sandbox demo is hosted."
        ]
      },
      flips: [
        ["What is it?", "A candidate ranking system that treats career history as the main signal and skills as supporting evidence."],
        ["How does it score?", "Career history 40%, skills 25%, behavioural signals 20%, experience 10%, profile quality 5%."],
        ["How is it checked?", "Honeypot detection plus checks for row count, rank uniqueness and score monotonicity."]
      ]
    },

    tokenshield: {
      title: "TokenShield",
      subtitle: { all: "A Trust Boundary for LLM Agents" },
      stack: ["Python", "Bifrost", "Tavily", "Groq"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/tokenshield",
      result: "0% hijacked turns vs about 7% for a plain agent · about 52–54% fewer tokens",
      bullets: {
        all: [
          "Trust boundary for LLM agents: a cheap quarantined model reads untrusted text (READMEs, logs, web pages) and may return only typed, bounded fields, so the main model sees validated facts, never raw text. Standalone OpenAI-compatible gateway in front of Bifrost; built for the Geek Room Global AI Hackathon.",
          "On 13 real public READMEs with a planted attack, the shield kept 98% accuracy (summarize-first baseline 83%), had 0% hijacked turns against about 7% for a plain agent, and saved about 52–54% of tokens by quarantining each document once.",
          "Cross-check and Tavily freshness check: flagged 12 of 13 planted false licenses in the interim held-out run (2 sections), and caught 16 of 24 stale version claims without calling any stale claim current.",
          "Reports its limits openly: planted false facts are not stopped, a single question costs about 30% more tokens, and samples are small."
        ]
      },
      flips: [
        ["What is it?", "A trust boundary for LLM agents: untrusted text goes to a quarantined model that returns only typed facts."],
        ["Result?", "0% hijacked turns vs about 7% for a plain agent, and about 52–54% fewer tokens over multi-turn use (13 real READMEs)."],
        ["What can it not do?", "It cannot tell a lie from a fact. The cross-check only flags lies placed in a different section."],
        ["Caveat?", "Small samples. A single question costs about 30% more tokens; it pays for itself from the second question."]
      ]
    },

    syndicate: {
      title: "Syndicate",
      subtitle: { all: "Autonomous Agents that Negotiate Your Trip" },
      stack: ["Python", "FastAPI", "React", "SQLite"],
      year: "2026",
      github: true,
      repo: "https://github.com/Shristi1611/Syndicate",
      result: "LLMs negotiate, code enforces: every price validated by a Rules Guard",
      bullets: {
        all: [
          "Travel assistant where a traveller agent learns budget, dates and dealbreakers through chat, then negotiates live with supplier agents that hold hidden price floors, perks and cancellation rules. Built for the TBO Hackathon (Virtual Travel Agent track).",
          "LLMs negotiate, code enforces: every price and term passes a deterministic Rules Guard checked against inventory, and the guard re-checks prices at booking so a tampered request is rejected.",
          "Two-step booking, cancellation and disruption handling (agent proposes options, nothing changes until the traveller approves), safe to retry; FastAPI backend with SQLite, automated tests and a mock model. All data is synthetic; the frontend is still in progress."
        ]
      },
      flips: [
        ["What is it?", "Agents that negotiate a trip for you with supplier agents and return an itinerary with the savings won."],
        ["Who decides?", "LLMs negotiate; a deterministic Rules Guard validates every price and term."],
        ["Anything risky?", "Booking, cancelling and changing a trip each need explicit traveller approval, and a repeat never double-books."]
      ]
    }
  },

  /* ---------------- "More on GitHub": smaller repos shown as compact cards ----------------
     views: which views show the card (generic, se, ai, ml, ds). */
  more: [],


  /* ---------------- Views ---------------- */
  profiles: {
    generic: {
      label: "Generic",
      role: "Computer Science Student · Software × AI",
      pill: "Software × AI",
      tag: "PYTHON · ML · BACKEND",
      badge: "Open to opportunities",
      tagline: "B.Tech Computer Science · CGPA 9.18 · India",
      stripe: "Software × AI × Data · Python · ML · Backend ·",
      statement: { a: "Build it", em: "right", b: ".", out: "Then try to break it." },
      lead: "Computer science student building AI, ML and software systems end to end.",
      about: "I'm a Computer Science student at GH Raisoni International Skill Tech University (CGPA 9.18) who builds end to end: an Android health app, a multilingual legal assistant on a RAG pipeline, a machine unlearning service for clinical ML, and security tests for AI decision models. My projects come with benchmarks, audit logs and failure-mode tests. Alongside coursework I take part in hackathons and Kaggle competitions, contribute to open source, and enjoy public speaking, reading and writing.",
      summary: "Computer Science student (CGPA 9.18) building AI, ML and backend systems end to end, with benchmarks, audit logs and failure-mode tests.",
      facts: [
        { n: "9.18", label: "CGPA", value: "B.Tech Computer Science" },
        { n: "10", label: "Projects", value: "AI · ML · Android · Security · Agents" },
        { n: "02", label: "Languages", value: "English · हिन्दी" }
      ],
      stats: [
        { n: 10, label: "Featured projects" },
        { n: 9.18, dec: 2, label: "CGPA out of 10" },
        { n: 5, label: "Languages in SaralKanoon" },
        { n: 17, label: "Failure modes tested" }
      ],
      skills: [
        { group: "Programming", items: ["Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"] },
        { group: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning", "RAG", "LLM Integration", "Embeddings", "Semantic Search", "Vector Databases", "Prompt Engineering", "Machine Unlearning", "NLP", "Computer Vision", "OpenCV"] },
        { group: "Data & Evaluation", items: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "TabNet", "EDA", "Model Evaluation", "Ablation Studies", "Prompt-Injection Testing", "Failure-Mode Testing"] },
        { group: "Backend & Mobile", items: ["FastAPI", "REST APIs", "Webhooks", "Android SDK", "Firebase", "MySQL", "SQLite", "Database Design", "Audit Logging", "Fail-Closed Design"] },
        { group: "Tools & Platforms", items: ["Git", "GitHub", "n8n", "Qdrant", "Ollama", "Groq API", "Gemini API", "pytest"] },
        { group: "Soft skills", items: ["Public Speaking", "Communication", "Problem Solving", "Team Collaboration"] }
      ],
      projects: ["saralkanoon", "obliviate", "systemone", "tokenshield", "fccl", "pcod", "ranking", "maithili", "mlscratch", "syndicate"],
      resumeProjects: ["saralkanoon", "obliviate", "systemone", "fccl", "pcod", "ranking"],
      resumeBullets: 2,
      cv: "assets/Shristi_Sinha_Resume_Generic.pdf"
    },

    se: {
      label: "Software Engineering",
      role: "Software Engineering",
      pill: "Software Engineering",
      tag: "JAVA · PYTHON · FASTAPI",
      badge: "Open to software engineering roles",
      tagline: "B.Tech Computer Science · Backend & Mobile · India",
      stripe: "Software Engineering · Backend · Android · APIs ·",
      statement: { a: "Ship software that", em: "fails safely", b: ".", out: "Test every failure mode." },
      lead: "Computer science student building reliable backend and mobile software.",
      about: "I'm a Computer Science student (CGPA 9.18) focused on backend and mobile development. I build Android apps on Firebase, FastAPI services backed by SQL databases, and webhook-based workflows, and I test them for failure: my security gateway was checked against 17 failure modes, none of which ended in an allow.",
      summary: "Computer Science student (CGPA 9.18) focused on backend and mobile development: Android + Firebase, FastAPI + SQL, webhook workflows, and failure-mode testing.",
      facts: [
        { n: "9.18", label: "CGPA", value: "B.Tech Computer Science" },
        { n: "05", label: "Projects", value: "Android · RAG · Clinical ML · Security gateway · Agents" },
        { n: "17", label: "Failure modes", value: "Tested in the gateway, none ended in an allow" }
      ],
      stats: [
        { n: 5, label: "Projects built" },
        { n: 8, label: "Health parameters tracked" },
        { n: 17, label: "Failure modes tested" },
        { n: 5, label: "Languages in SaralKanoon" }
      ],
      skills: [
        { group: "Programming", items: ["Java", "Python", "JavaScript", "SQL", "HTML5", "CSS3"] },
        { group: "Frameworks & Libraries", items: ["FastAPI", "Uvicorn", "Pydantic", "Android SDK", "pytest", "REST APIs", "Webhooks", "Async Fetch API"] },
        { group: "Engineering Practices", items: ["Backend Development", "Mobile App Development", "Database Design", "API Integration", "Real-Time Data Sync", "Workflow Automation", "Failure-Mode Testing", "Input Validation", "Fail-Closed Design", "Audit Logging", "Version Control"] },
        { group: "Tools & Platforms", items: ["MySQL", "SQLite", "Firebase", "Git", "GitHub", "n8n", "Qdrant", "Ollama", "Groq API", "Gemini API"] },
        { group: "Soft skills", items: ["Public Speaking", "Communication", "Problem Solving", "Team Collaboration"] }
      ],
      projects: ["pcod", "saralkanoon", "obliviate", "systemone", "syndicate"],
      resumeProjects: ["pcod", "saralkanoon", "obliviate", "systemone"],
      resumeBullets: 3,
      cv: "assets/Shristi_Sinha_Resume_SoftwareEngineering.pdf"
    },

    ai: {
      label: "AI",
      role: "AI & LLM Systems",
      pill: "Applied AI",
      tag: "RAG · LLMS · AI SAFETY",
      badge: "Open to AI roles",
      tagline: "B.Tech Computer Science · Applied AI · India",
      stripe: "Applied AI · RAG · LLM Systems · AI Safety ·",
      statement: { a: "Build AI you can", em: "trust", b: ".", out: "Then try to break it." },
      lead: "Computer science student building and stress-testing applied AI systems.",
      about: "I'm a Computer Science student (CGPA 9.18) building applied AI systems: a multilingual RAG assistant for Indian law, a security test bed for AI decision models, and a feedback-controlled context compression layer. I care about whether AI fails safely, so I test for prompt injection, tampered replies and long-input attacks, and I report the limits openly.",
      summary: "Computer Science student (CGPA 9.18) building applied AI: multilingual RAG, LLM integration, AI safety testing and real-data evaluation of context compression.",
      facts: [
        { n: "9.18", label: "CGPA", value: "B.Tech Computer Science" },
        { n: "06", label: "AI projects", value: "RAG · AI security · Agent control · Agents · Context compression" },
        { n: "05", label: "Languages", value: "Answered by SaralKanoon" }
      ],
      stats: [
        { n: 200, suf: "+", label: "Pages of law indexed" },
        { n: 3, label: "Missed injections of 60 (down from 14)" },
        { n: 67, suf: "%", label: "Tokens kept by FCCL retry net (about 1 point lost)" },
        { n: 17, label: "Failure modes tested" }
      ],
      skills: [
        { group: "Programming", items: ["Python", "SQL", "JavaScript", "Java"] },
        { group: "Frameworks & Libraries", items: ["LangChain", "FastAPI", "PyTorch", "Scikit-learn", "Hugging Face Datasets", "NumPy", "Pandas", "Pydantic", "Matplotlib"] },
        { group: "AI / ML", items: ["Generative AI", "LLM Integration", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "AI Agent Design", "Multilingual NLP", "Semantic Search", "Vector Databases", "Embeddings", "Laya / Jev-compatible decision models", "Machine Learning"] },
        { group: "AI Safety & Evaluation", items: ["Prompt-Injection Testing", "Adversarial Testing", "Canary Testing", "Model Evaluation", "Error Analysis", "Context Compression", "Token Optimization", "Feedback Control", "Simulation", "Ablation Studies"] },
        { group: "Tools & Platforms", items: ["n8n", "Qdrant", "Ollama (nomic-embed-text)", "Groq API (Llama 3.3 70B)", "Gemini API", "MySQL", "SQLite", "pytest", "Workflow Automation", "Git", "GitHub"] }
      ],
      projects: ["saralkanoon", "systemone", "tokenshield", "syndicate", "fccl", "maithili"],
      resumeProjects: ["saralkanoon", "systemone", "tokenshield", "fccl"],
      resumeBullets: 4,
      cv: "assets/Shristi_Sinha_Resume_AI.pdf"
    },

    ml: {
      label: "Machine Learning",
      role: "Machine Learning",
      pill: "Machine Learning",
      tag: "PYTORCH · NUMPY · TABNET",
      badge: "Open to ML roles",
      tagline: "B.Tech Computer Science · Machine Learning · India",
      stripe: "Machine Learning · Deep Learning · Unlearning · From Scratch ·",
      statement: { a: "Learn it from", em: "scratch", b: ".", out: "Then benchmark it." },
      lead: "Computer science student working on machine learning, from NumPy to clinical data.",
      about: "I'm a Computer Science student (CGPA 9.18) focused on machine learning. I built a verifiable machine unlearning system for sepsis risk prediction, implemented core ML algorithms from scratch in NumPy (97.4% on Breast Cancer Wisconsin), and benchmark my work against sensible baselines. On Kaggle I'm applying ML to cell tracking in 3D microscopy data.",
      summary: "Computer Science student (CGPA 9.18) focused on machine learning: machine unlearning, ML algorithms from scratch, robustness and adversarial testing.",
      facts: [
        { n: "9.18", label: "CGPA", value: "B.Tech Computer Science" },
        { n: "07", label: "ML projects", value: "Unlearning · From scratch · AI security · RAG" },
        { n: "97.4", label: "Percent", value: "Breast Cancer Wisconsin, NumPy only" }
      ],
      stats: [
        { n: 97.4, dec: 1, suf: "%", label: "Breast Cancer Wisconsin" },
        { n: 96.7, dec: 1, suf: "%", label: "Iris" },
        { n: 6, label: "Algorithms from scratch" },
        { n: 36, label: "Commits in the 30-day series" }
      ],
      skills: [
        { group: "Programming", items: ["Python", "SQL", "Java", "JavaScript"] },
        { group: "Frameworks & Libraries", items: ["PyTorch", "TensorFlow (Fundamentals)", "Scikit-learn", "NumPy", "Pandas", "OpenCV", "LangChain"] },
        { group: "AI / ML", items: ["Machine Learning", "Deep Learning", "Neural Networks", "Classification", "Regression", "Logistic Regression", "Naive Bayes", "KNN", "Decision Trees", "Machine Unlearning", "SISA Training", "Computer Vision", "Embeddings", "RAG", "LLM Integration"] },
        { group: "Evaluation", items: ["Robustness Testing", "Adversarial Testing", "Benchmarking", "Ablation Studies", "Data Privacy"] },
        { group: "Tools & Platforms", items: ["TabNet", "FastAPI", "Ollama", "Qdrant", "Groq API", "n8n", "SQLite", "Git", "GitHub"] }
      ],
      projects: ["obliviate", "mlscratch", "maithili", "systemone", "tokenshield", "fccl", "saralkanoon"],
      resumeBullets: 3,
      cv: "assets/Shristi_Sinha_Resume_ML.pdf"
    },

    ds: {
      label: "Data Science",
      role: "Data Science & Analysis",
      pill: "Data Science",
      tag: "PANDAS · EDA · SQL",
      badge: "Open to data science roles",
      tagline: "B.Tech Computer Science · Data Science · India",
      stripe: "Data Science · EDA · Experiments · Evaluation ·",
      statement: { a: "Let the data", em: "speak", b: ".", out: "Check it twice." },
      lead: "Computer science student turning messy data into measurable decisions.",
      about: "I'm a Computer Science student (CGPA 9.18) who likes turning messy data into measurable decisions. I built a weighted candidate ranking pipeline for the India Runs Hackathon, prepared PhysioNet ICU time-series data for risk prediction, and designed real-data experiments with paired analysis and confidence intervals, reporting limits openly.",
      summary: "Computer Science student (CGPA 9.18) in data analysis and ML evaluation: EDA, weighted scoring, time-series preparation, experiment design and error analysis.",
      facts: [
        { n: "9.18", label: "CGPA", value: "B.Tech Computer Science" },
        { n: "06", label: "Data projects", value: "Ranking · Evaluation · Compression study · Clinical data" },
        { n: "05", label: "Scoring dimensions", value: "In the candidate ranking engine" }
      ],
      stats: [
        { n: 5, label: "Scoring dimensions" },
        { n: 116, label: "Messages in the sealed test split" },
        { n: 200, label: "Fresh questions in the FCCL replication" },
        { n: 1389, label: "Real users in the PRISM test" }
      ],
      skills: [
        { group: "Programming", items: ["Python", "SQL", "Java", "JavaScript"] },
        { group: "Frameworks & Libraries", items: ["Pandas", "NumPy", "SciPy", "Matplotlib", "Scikit-learn", "Hugging Face Datasets", "OpenCV"] },
        { group: "Data Analysis", items: ["Exploratory Data Analysis (EDA)", "Data Cleaning", "Data Validation", "Feature Scoring", "Weighted Scoring Models", "Ranking Systems", "Anomaly Detection", "Error Analysis", "Distribution Analysis", "Threshold Analysis", "Experiment Design", "Model Evaluation", "Time-Series Data", "NLP"] },
        { group: "Machine Learning", items: ["Regression", "Classification", "Logistic Regression", "Naive Bayes", "KNN", "Decision Trees", "TabNet"] },
        { group: "Tools & Databases", items: ["SQL", "MySQL", "SQLite", "Database Design", "Firebase", "Git", "GitHub", "n8n"] }
      ],
      projects: ["ranking", "systemone", "tokenshield", "fccl", "obliviate", "maithili"],
      resumeBullets: 4,
      cv: "assets/Shristi_Sinha_Resume_DataScience.pdf"
    }
  }
};
