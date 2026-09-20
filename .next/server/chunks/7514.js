"use strict";exports.id=7514,exports.ids=[7514],exports.modules={33971:(e,t,i)=>{i.d(t,{Z:()=>s});var a=i(70981);let n=globalThis,s=new Proxy({},{get(e,t){let i=function(){if(!n.prisma){if(!process.env.DATABASE_URL){let e=Error("DATABASE_URL environment variable is not configured.");throw e.code="DATABASE_UNAVAILABLE",e}n.prisma=new a.PrismaClient({log:["error"]})}return n.prisma}(),s=i[t];return"function"==typeof s?s.bind(i):s}})},67514:(e,t,i)=>{i.d(t,{SD:()=>n,wY:()=>r,zw:()=>s});var a=i(33971);let n={EXPLAIN_SIMPLE:"EXPLAIN_SIMPLE",EXPLAIN_GUJARATI:"EXPLAIN_GUJARATI",EXPLAIN_ENGLISH:"EXPLAIN_ENGLISH",GENERATE_PRACTICE_QUESTIONS:"GENERATE_PRACTICE_QUESTIONS",GENERATE_MCQS:"GENERATE_MCQS",EXPLAIN_LEGAL_SECTION:"EXPLAIN_LEGAL_SECTION",EXPLAIN_CASE_LAW:"EXPLAIN_CASE_LAW",SUMMARIZE_TOPIC:"SUMMARIZE_TOPIC",QUICK_REVISION_NOTES:"QUICK_REVISION_NOTES",STRUCTURE_EXAM_ANSWER:"STRUCTURE_EXAM_ANSWER",EXPLAIN_MCQ_ANSWER:"EXPLAIN_MCQ_ANSWER",CREATE_STUDY_PLAN:"CREATE_STUDY_PLAN"};async function s(e="usr-student-01"){let t=await a.Z.user.findUnique({where:{id:e},include:{university:!0,course:!0,semester:!0}}),i=t?.university?.name||"Saurashtra University",n=t?.course?.name||"LL.B. 3 Years",s=t?.semester?.title||"Semester 3",o=t?.semesterId||"su-llb-3yr-sem3",r=await a.Z.subject.findMany({where:{semesterId:o,isActive:!0},select:{id:!0,title:!0,shortCode:!0}}),c=await a.Z.topic.count({where:{unit:{subject:{semesterId:o}}}}),l=await a.Z.studyProgress.count({where:{userId:e,isCompleted:!0}}),u=await a.Z.studyProgress.findMany({where:{userId:e,confidenceLevel:"LOW"},select:{topic:{select:{id:!0,title:!0,unit:{select:{subject:{select:{shortCode:!0}}}}}}}}),d=await a.Z.testAttempt.findMany({where:{userId:e},select:{topicPerformance:!0},orderBy:{completedAt:"desc"},take:5}),p=new Map;for(let e of u)e.topic&&p.set(e.topic.id,{id:e.topic.id,title:e.topic.title,subjectCode:e.topic.unit?.subject?.shortCode||"LAW",reason:"Marked low confidence in study progress"});for(let e of d)if(e.topicPerformance)try{let t=JSON.parse(e.topicPerformance);if(Array.isArray(t))for(let e of t)(e.needsRevision||e.total>0&&e.correct/e.total<.6)&&e.topicId&&"general-topic"!==e.topicId&&!p.has(e.topicId)&&p.set(e.topicId,{id:e.topicId,title:e.topicTitle,subjectCode:e.subjectCode||"LAW",reason:`Test accuracy ${e.accuracy||0}%`})}catch(e){}let m=await a.Z.wrongAnswer.findMany({where:{userId:e,isResolved:!1},take:10,include:{mcq:{include:{topic:{select:{id:!0,title:!0}},subject:{select:{shortCode:!0}}}}}});return{userId:e,university:i,course:n,semester:s,semesterId:o,subjects:r,totalTopics:c,completedTopics:l,progressPercentage:c>0?Math.round(l/c*100):0,weakTopics:Array.from(p.values()),totalWeakTopics:p.size,totalMistakes:m.length,recentMistakes:m.map(e=>({id:e.id,questionText:e.mcq?.questionText,topicTitle:e.mcq?.topic?.title||"General Law",subjectCode:e.mcq?.subject?.shortCode||"LAW"}))}}async function o({query:e,topicId:t=null,subjectId:i=null}){let n=e.trim(),s=n.toLowerCase(),o=null;if(t&&(o=await a.Z.topic.findUnique({where:{id:t},include:{unit:{include:{subject:!0}},notes:{take:2},legalSections:{take:5},caseLaws:{take:5},questions:{take:5},mcqs:{take:5,include:{options:!0}}}})),o||(o=await a.Z.topic.findFirst({where:{OR:[{title:{contains:n}},{description:{contains:n}}],...i?{unit:{subjectId:i}}:{}},include:{unit:{include:{subject:!0}},notes:{take:2},legalSections:{take:5},caseLaws:{take:5},questions:{take:5},mcqs:{take:5,include:{options:!0}}}})),!o){for(let e of["workman","industry","strike","lock-out","constitution","taxation","banking","cyber","preamble"])if(s.includes(e)&&(o=await a.Z.topic.findFirst({where:{title:{contains:e}},include:{unit:{include:{subject:!0}},notes:{take:2},legalSections:{take:5},caseLaws:{take:5},questions:{take:5},mcqs:{take:5,include:{options:!0}}}})))break}return o||(o=await a.Z.topic.findFirst({where:{status:"PUBLISHED"},include:{unit:{include:{subject:!0}},notes:{take:2},legalSections:{take:5},caseLaws:{take:5},questions:{take:5},mcqs:{take:5,include:{options:!0}}}})),{targetTopic:o,matchedSections:await a.Z.legalSection.findMany({where:{OR:[{sectionNumber:{contains:n}},{title:{contains:n}},{actName:{contains:n}},{oldLawSection:{contains:n}}]},take:3,include:{topic:{include:{unit:{include:{subject:!0}}}}}}),matchedCases:await a.Z.caseLaw.findMany({where:{OR:[{title:{contains:n}},{citation:{contains:n}},{keyPrinciple:{contains:n}}]},take:3,include:{topic:{include:{unit:{include:{subject:!0}}}}}})}}async function r({query:e,capability:t=n.EXPLAIN_SIMPLE,userId:i="usr-student-01",topicId:r=null,subjectId:c=null,mcqId:l=null}){if(!e||"string"!=typeof e||!e.trim())throw Error("A valid query or instruction is required.");let[u,d]=await Promise.all([s(i),o({query:e,topicId:r,subjectId:c})]),{targetTopic:p,matchedSections:m,matchedCases:y}=d,h=[];p&&h.push({type:"CURRICULUM_TOPIC",title:`${p.unit.subject.shortCode} • Unit ${p.unit.unitNumber}: ${p.title}`,id:p.id,url:`/academic/saurashtra-university/llb/semester-3/subjects/${p.unit.subject.shortCode.toLowerCase()}/units/${p.unit.unitNumber}/topics/${p.id}`}),m.length>0&&m.forEach(e=>{h.push({type:"BARE_ACT_SECTION",title:`${e.actName} — Section ${e.sectionNumber}: ${e.title}`,id:e.id})}),y.length>0&&y.forEach(e=>{h.push({type:"LANDMARK_CASE_LAW",title:`${e.title} (${e.year||"SC"}) — ${e.court}`,id:e.id})});let g="",f=null,A=e.toLowerCase();switch((A.includes("vs")||A.includes("v."))&&0===y.length&&(!p?.caseLaws||0===p.caseLaws.length)&&(f="This specific case law does not appear in verified Lowstudy curriculum records. To prevent hallucination in law exams, always verify citations against official law reporters (AIR/SCC)."),t){case n.EXPLAIN_SIMPLE:{let e=p?.notes?.[0],t=p?.legalSections?.[0]||m[0],i=p?.caseLaws?.[0]||y[0];g=`### 💡 ${p?p.title:"Legal Concept Breakdown"} (Simple Explanation)

#### Plain-English Concept
${e?e.simpleNotes:p?.description||"This legal doctrine establishes foundational statutory rights and obligations."}

#### Everyday Analogy
Imagine a workplace contract: the law acts as a referee ensuring neither party exercises unfair bargaining dominance. If either party breaks the agreed statutory code, the law provides peaceful adjudication rather than private conflict.

${t?`#### Key Statutory Provision
* **${t.actName} - Section ${t.sectionNumber}:** ${t.title}
* **Statutory Principle:** ${t.content.slice(0,200)}...`:""}

${i?`#### Landmark Precedent
* **${i.title} (${i.year||"SC"}):** Held that *${i.keyPrinciple}*`:""}

💡 **Quick Exam Takeaway:** When this concept is asked in your examination, always define the statutory scope first, state the essential ingredients, and cite the landmark ruling.`;break}case n.EXPLAIN_GUJARATI:{let e=p?.legalSections?.[0]||m[0],t=p?.caseLaws?.[0]||y[0];g=`### 🏛️ ${p?p.title:"કાયદાકીય સમજૂતી"} (સરળ ગુજરાતી સમજૂતી)

#### ૧. મૂળભૂત કાયદાકીય ખ્યાલ
${p?.description?`${p.title} એ કાયદાનો એક અગત્યનો સિદ્ધાંત છે જે સંબંધીઓના અધિકારો અને ફરજોનું રક્ષણ કરે છે.`:"આ કાનૂની જોગવાઈ યુનિવર્સિટી પરીક્ષા માટે અત્યંત મહત્વપૂર્ણ છે."}

#### ૨. કાયદાકીય જોગવાઈ (Legal Provision)
${e?`* **કાયદો:** ${e.actName}
* **કલમ (Section):** સેક્શન ${e.sectionNumber} (${e.titleGu||e.title})
* **સારાંશ:** ${e.contentGu||e.content.slice(0,180)}...
${e.punishment?`* **સજાની જોગવાઈ:** ${e.punishmentGu||e.punishment}`:""}`:"* અધિકૃત કાયદાકીય જોગવાઈઓ સિલેબસ મુજબ લાગુ પડે છે."}

#### ૩. અગત્યનો કેસ લૉ (Judicial Precedent)
${t?`* **કેસનું નામ:** *${t.title}* (${t.year||"સુપ્રીમ કોર્ટ"})
* **મુખ્ય સિદ્ધાંત:** ${t.keyPrincipleGu||t.keyPrinciple}`:"* સર્વોચ્ચ અદાલતના ચુકાદા અનુસાર કાયદાનું પાલન અનિવાર્ય છે."}

#### ૪. પરીક્ષા માર્ગદર્શન (Exam Tip)
યુનિવર્સિટી પરીક્ષામાં ઉત્તર લખતી વખતે: પ્રસ્તાવના ➔ કલમની વ્યાખ્યા ➔ જરૂરી તત્વો ➔ કેસ લૉ ➔ નિષ્કર્ષ સ્વરૂપે લખવું.`;break}case n.EXPLAIN_ENGLISH:{let e=p?.notes?.[0],t=p?.legalSections?.[0]||m[0],i=p?.caseLaws?.[0]||y[0];g=`### 📖 Academic Analysis: ${p?p.title:"Legal Doctrine"}

#### 1. Statutory Scope and Theoretical Foundations
${e?e.detailedNotes:p?.description||"The subject matter constitutes a core statutory discipline governing legal rights, adjudicatory mechanisms, and enforceable duties."}

#### 2. Statutory Architecture
${t?`* **Act & Section:** ${t.actName}, Section ${t.sectionNumber}
* **Marginal Note:** "${t.title}"
* **Textual Ratio:** ${t.content}
${t.oldLawSection?`* **Preceding Law Transition:** Corresponds to former ${t.oldLawSection}`:""}`:"Statutory provisions must be strictly construed in accordance with the legislative purpose."}

#### 3. Judicial Interpretation & Jurisprudence
${i?`* **Ruling Authority:** *${i.title}* (${i.court}, ${i.year||"SC"})
* **Ratio Decidendi:** ${i.ratioDecidendi}
* **Key Holding:** ${i.keyPrinciple}`:"Judicial precedents consistently mandate harmonious construction."}

#### 4. Critical Exam Notes
Be sure to highlight the statutory exceptions and the test of reasonableness established under constitutional principles.`;break}case n.GENERATE_PRACTICE_QUESTIONS:{let e=p?.questions||[];g=`### 📝 Verified Practice Questions for ${p?p.title:"University Exam"}
*(Modeled on Saurashtra University LL.B. Examination Standards)*

#### Part I: Short Answer Questions (2 - 5 Marks)
1. **Define the statutory scope of ${p?p.title:"this topic"} under relevant provisions.** [2 Marks]
2. **State two essential ingredients necessary to establish liability or right under this section.** [5 Marks]
${e[0]?`3. **Original Exam PYQ:** ${e[0].questionText} [${e[0].marks} Marks]`:""}

#### Part II: Long Analytical & Essay Questions (10 - 14 Marks)
1. **"Examine in detail the scope, objects, and judicial evolution of ${p?p.title:"the doctrine"}." Refer to landmark cases.** [14 Marks]
2. **Critically analyze the statutory remedies available under the Act. Does the modern statutory framework adequately safeguard rights? Discuss.** [10 Marks]
${e[1]?`3. **University Previous Question:** ${e[1].questionText} [${e[1].marks} Marks]`:""}

💡 **Practice Tip:** Always allocate 1.5 minutes per mark in your university exam.`;break}case n.GENERATE_MCQS:{let e=p?.mcqs||[];if(e.length>0){let t=e[0],i=t.options.find(e=>e.isCorrect);g=`### 🎯 Practice MCQs: ${p?p.title:"Legal Knowledge"}

#### Question 1
**${t.questionText}**
${t.options.map(e=>`* **(${e.optionKey})** ${e.optionText}`).join("\n")}

<details>
<summary><strong>👉 Reveal Correct Answer & Explanation</strong></summary>

* **Correct Answer:** Option **(${i?.optionKey||"A"})** — ${i?.optionText||""}
* **Explanation:** ${t.explanation}
* **Verified Subject:** ${p?.unit?.subject?.shortCode||"LAW"}
</details>

#### Question 2
**Under which statutory Act is '${p?p.title:"this provision"}' primarily codified?**
* **(A)** Code of Civil Procedure, 1908
* **(B)** ${p?.unit?.subject?.title||"Labour and Industrial Law Act"}
* **(C)** Indian Contract Act, 1872
* **(D)** Specific Relief Act, 1963

<details>
<summary><strong>👉 Reveal Correct Answer & Explanation</strong></summary>

* **Correct Answer:** Option **(B)**
* **Explanation:** Directly governed under the verified syllabus provisions for ${p?.unit?.subject?.title}.
</details>`}else g=`### 🎯 Practice MCQs: ${p?p.title:"Legal Knowledge"}

#### Question 1
**What is the primary statutory objective of ${p?p.title:"this legal provision"}?**
* **(A)** Administrative deregulation
* **(B)** Establishing statutory rights, dispute adjudication, and legal certainty
* **(C)** Purely discretionary private mediation
* **(D)** None of the above

* **Correct Answer:** Option **(B)**
* **Explanation:** Grounded in verified curriculum guidelines for ${p?.unit?.subject?.title||"LL.B. Semester 3"}.`;break}case n.EXPLAIN_LEGAL_SECTION:{let e=m[0]||p?.legalSections?.[0];g=e?`### ⚖️ Bare Act Analysis: ${e.actName} — Section ${e.sectionNumber}

#### 1. Official Marginal Title
**"${e.title}"**

#### 2. Statutory Bare Act Content
\`\`\`
${e.content}
\`\`\`

#### 3. Statutory Classification
* **Act:** ${e.actName}
${e.punishment?`* **Punishment:** ${e.punishment}`:""}
${e.cognizableStatus?`* **Cognizability:** ${e.cognizableStatus}`:""}
${e.bailableStatus?`* **Bailability:** ${e.bailableStatus}`:""}
${e.oldLawSection?`* **Old Law Reference:** Replaces / corresponds to former ${e.oldLawSection}`:""}

#### 4. Judicial Interpretation
Courts interpret Section ${e.sectionNumber} purposively to give effect to the legislative mandate. In case of ambiguous wording, harmonious construction with constitutional directives applies.`:`### ⚖️ Statutory Section Analysis
The query did not match an exact Bare Act section in our verified database.

⚠️ **Uncertainty Alert:** Never invent section numbers in examination answers. If unsure of an exact section number, state: *"Under the relevant provisions of the Act..."* rather than citing an incorrect section.`;break}case n.EXPLAIN_CASE_LAW:{let e=y[0]||p?.caseLaws?.[0];g=e?`### 🏛️ Landmark Case Law: ${e.title}

#### Case Citation & Bench
* **Court:** ${e.court}
* **Citation:** ${e.citation||"Official Supreme Court Reports"}
* **Year of Decision:** ${e.year||"Landmark Decision"}
* **Importance Level:** ${e.importance||"LANDMARK PRECEDENT"}

#### 1. Material Facts of the Case
${e.facts||"The appellant challenged the constitutional and statutory validity of executive and legislative actions affecting guaranteed fundamental rights."}

#### 2. Core Legal Issue
Whether the statutory action conformed to natural justice, constitutional reasonableness, and relevant statutory provisions.

#### 3. Ratio Decidendi (The Legal Principle)
**"${e.ratioDecidendi}"**

#### 4. Key Takeaway for University Examinations
* **Key Holding:** ${e.keyPrinciple}
* **Exam Application:** Cite this authority whenever discussing ${p?p.title:"this legal subject"} to secure full judicial reasoning marks.`:`### 🏛️ Judicial Precedent Search
No exact landmark case law matched this query in the verified repository.

⚠️ **Uncertainty Alert:** Never fabricate case citations (e.g. inventing parties or journal citations). If you remember the principle but not the name, state: *"In a landmark Supreme Court ruling on this point, it was held that..."*`;break}case n.SUMMARIZE_TOPIC:{let e=p?.notes?.[0];g=`### 📋 5-Minute Executive Summary: ${p?p.title:"Topic"}

#### Core Concept in Brief
${p?.description||"Foundational legal doctrine balancing statutory protections, constitutional directives, and practical administrative mechanisms."}

#### Key Pillars
1. **Statutory Origin:** Codified under ${p?.unit?.subject?.title||"the relevant Act"}.
2. **Scope of Application:** Governs rights, definitions, and enforcement procedures.
3. **Essential Requirement:** Satisfying statutory prerequisites before initiating legal action.
4. **Exceptions:** Well-defined statutory exclusions established by legislature and judiciary.

#### Summary Bullet Points
${e?e.simpleNotes.slice(0,300)+"...":"* Establishes enforceable statutory rights.\n* Prevents arbitrary unilateral actions.\n* Subject to constitutional review under Articles 14 and 21."}

💡 **Retain This:** This topic accounts for regular representation across past examination sessions.`;break}case n.QUICK_REVISION_NOTES:{let e=p?.notes?.[0],t=[];try{e?.keyPoints&&(t=JSON.parse(e.keyPoints))}catch(e){}g=`### ⚡ Quick Revision Cheat-Sheet: ${p?p.title:"Exam Revision"}

#### 🎯 High-Yield Key Points
${t.length>0?t.map(e=>`* ${e}`).join("\n"):`* **Definition:** Core statutory definition under verified syllabus.
* **Essential Elements:** 1) Competent parties, 2) Lawful object, 3) Statutory compliance.
* **Remedies:** Administrative dispute resolution, statutory compensation, or judicial review.`}

#### ⚖️ Relevant Sections Checklist
${p?.legalSections?.map(e=>`* [x] **Section ${e.sectionNumber}:** ${e.title}`).join("\n")||"* [x] Primary statutory section under the Act."}

#### 🏛️ Key Case Law to Memorize
* **${p?.caseLaws?.[0]?.title||"Leading Supreme Court Authority"}** — Holds that statutory principles must be applied equitably.

#### 🧠 Mnemonic Device
**R-A-T-I-O:** **R**ights • **A**uthority • **T**ext • **I**ntent • **O**bligation`;break}case n.STRUCTURE_EXAM_ANSWER:g=`### ✍️ Model Exam Answer Structure (Saurashtra University Pattern)
*Topic: ${p?p.title:"University Law Exam"} [10 - 14 Marks]*

---

#### 1. Introduction (1 Mark)
* Introduce the Act, legislative intent, and constitutional foundation (e.g. Directive Principles under Part IV).
* Mention the statutory context in 2-3 concise sentences.

#### 2. Statutory Definition & Key Provision (2 Marks)
* Cite the exact bare act section (e.g. Section 2(s), Section 2(q)).
* State the statutory definition in precise legal terminology.

#### 3. Essential Ingredients / Elements (3 Marks)
* Enumerate the mandatory elements with bullet points:
  - Element (a): Statutory qualification.
  - Element (b): Exclusions or thresholds.
  - Element (c): Context of operation.

#### 4. Detailed Legal Explanation (3 Marks)
* Explain how the ingredients operate in practice.
* Discuss legislative intent and public policy rationale.

#### 5. Landmark Judicial Precedents (3 Marks)
* Cite at least 1-2 Supreme Court cases:
  - *Case Name (Year)*: State the material facts briefly and underline the **Ratio Decidendi**.

#### 6. Practical Illustration / Problem Application (1 Mark)
* Give a clear hypothetical problem demonstrating how the doctrine applies.

#### 7. Conclusion (1 Mark)
* Synthesize the modern legal position and recent statutory developments.`;break;case n.EXPLAIN_MCQ_ANSWER:{let e=null;if(l&&(e=await a.Z.mcq.findUnique({where:{id:l},include:{options:!0,topic:!0}})),!e&&p?.mcqs?.[0]&&(e=p.mcqs[0]),e){let t=e.options.find(e=>e.isCorrect),i=e.options.filter(e=>!e.isCorrect);g=`### 🧩 MCQ Answer Breakdown

**Question:** ${e.questionText}

#### ✅ Why Option (${t?.optionKey||"A"}) is Correct:
**"${t?.optionText}"**
* **Statutory Grounding:** ${e.explanation}
* **Legal Ratio:** Directly aligns with the verified statutory definition in ${p?.title||"the curriculum"}.

#### ❌ Why Other Options are Distractors:
${i.map(e=>`* **Option (${e.optionKey}) "${e.optionText}":** Incorrect because it either cites an inapplicable statutory threshold or misrepresents the legal test.`).join("\n")}

💡 **Elimination Strategy:** Look for absolute words like "always" or "never" which frequently signal false legal statements in university MCQs.`}else g=`### 🧩 MCQ Answer Explanation Strategy
1. **Identify the Core Statutory Term:** Locate the governing legal act and section.
2. **Rule Out Irrelevant Acts:** Distinguish procedural rules (CrPC/CPC) from substantive provisions (BNS/Contract).
3. **Verify the Correct Option:** Verify whether the correct option mirrors statutory language verbatim.`;break}case n.CREATE_STUDY_PLAN:{let e=u.weakTopics,t=u.subjects;g=`### 📅 Personalized Legal Study Plan for ${u.university}
*Curriculum: ${u.course} (${u.semester}) • Overall Completion: ${u.progressPercentage}%*

---

#### 🚨 Phase 1: High-Priority Remediation (Weak Topics & Mistakes)
Focus your next 3 days on closing gaps in verified topics where errors were detected:
${e.length>0?e.slice(0,4).map((e,t)=>`* **Day ${t+1}:** Focus on **${e.title}** (${e.subjectCode}) — *Reason: ${e.reason}*`).join("\n"):`* **Day 1:** Review unresolved mistakes in Mistake Notebook (${u.totalMistakes} pending).
* **Day 2:** Practice high-priority PYQ descriptive questions.
* **Day 3:** Take a diagnostic timed unit mock test.`}

#### 📚 Phase 2: Subject Mastery Schedule
Divide study blocks proportionally across your active semester subjects:
${t.map((e,t)=>`* **Block ${t+1} (${e.shortCode}):** ${e.title} — Review 2 units + 1 landmark case law per session.`).join("\n")}

#### ⏱️ Recommended Daily Study Routine (3 Hours)
* **Hour 1:** Bare Act Reading & Section Memorization (BNS / Industrial Disputes / Taxation).
* **Hour 2:** Model Exam Answer Writing (Practice 1 full 14-mark question).
* **Hour 3:** Active MCQ Practice & Spaced Revision Session.

💡 **Retain This:** Lowstudy Spaced Repetition moves an item from Need Revision to Mastered only after 3 consecutive correct reviews.`;break}default:g=`### 🎓 Lowstudy Legal Intelligence
Your query regarding **"${e}"** has been grounded in verified curriculum records for ${u.university}.`}return{success:!0,capability:t,query:e,content:g,uncertaintyWarning:f,verifiedSources:h,studentContext:{university:u.university,course:u.course,semester:u.semester,progressPercentage:u.progressPercentage,totalWeakTopics:u.totalWeakTopics,totalMistakes:u.totalMistakes},disclaimer:"Lowstudy AI Study Assistant responses are grounded primarily in verified academic curriculum materials. Never fabricate legal sections or judicial citations in university examinations."}}}};