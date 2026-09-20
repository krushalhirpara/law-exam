"use strict";(()=>{var e={};e.id=4761,e.ids=[4761],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},28584:(e,t,i)=>{i.r(t),i.d(t,{originalPathname:()=>g,patchFetch:()=>S,requestAsyncStorage:()=>m,routeModule:()=>f,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var r={};i.r(r),i.d(r,{POST:()=>p});var a=i(53995),s=i(41673),n=i(20442),o=i(32255),l=i(76458),u=i(78606);i(72220);var c=i(27341),d=i(17636);async function p(e){try{let t=e.headers.get("x-forwarded-for")?.split(",")[0].trim()||"client-nyaya-ai",i=(0,c.D)(`nyaya-chat-${t}`,30,6e4);if(!i.allowed)return o.NextResponse.json({success:!1,error:"Rate limit exceeded. Please wait a moment before sending more queries.",retryAfterMs:i.resetMs},{status:429});let{query:r,language:a="english",depth:s="detailed",mode:n="ask",studentContext:p={},historyCount:f=0}=await e.json().catch(()=>({}));if(!r||"string"!=typeof r||!r.trim())return o.NextResponse.json({success:!1,message:"Non-empty query is required"},{status:400});if(!(0,d.Po)(r).isSafe)return o.NextResponse.json({success:!1,message:"Query contains prohibited prompt manipulation patterns."},{status:400});let m=(0,d.N1)(r.trim().slice(0,1e3),{maxLength:1e3}),h=function(e,t){let i=e.toLowerCase(),r=[],a=u.Iv.filter(e=>i.includes(e.ipc.toLowerCase())||i.includes(e.bns.toLowerCase())||i.includes(e.ipcTitle.toLowerCase()));a.length>0&&r.push({type:"STATUTE_TRANSITION",title:"BNS 2023 vs IPC 1860 Transition Mapping",data:a.map(e=>`${e.ipc} (${e.ipcTitle}) ➔ ${e.bns}: ${e.bnsTitle} | Punishment: ${e.bnsPunishment}`)});let s=u.qJ.filter(e=>i.includes(e.title.toLowerCase())||i.includes(e.subject.toLowerCase())||e.ratio.toLowerCase().includes(i)||e.keyPrinciple.toLowerCase().includes(i));s.length>0&&r.push({type:"LANDMARK_CASES",title:"Verified Judicial Precedents",data:s.map(e=>`${e.title} (${e.citation}, ${e.bench}) — Ratio: ${e.ratio} | Principle: ${e.keyPrinciple}`)});let n=t?.universityId||"gu";t?.semesterId;let o=t?.syllabusVersion||"new",c=l.Ph.filter(e=>(e.universityId===n||!n)&&e.syllabusVersion===o),d=[];return c.forEach(e=>{e.units.forEach(t=>{t.topics.forEach(r=>{(i.includes(r.title.toLowerCase())||r.description&&r.description.toLowerCase().includes(i))&&d.push({subjectTitle:e.title,subjectCode:e.shortCode,unitTitle:t.title,topicTitle:r.title,notes:r.notes})})})}),d.length>0&&r.push({type:"SYLLABUS_NOTES",title:"Verified Gujarat University Syllabus Content",data:d.slice(0,3)}),r}(m,p),y=function({query:e,language:t,depth:i,mode:r,studentContext:a,retrievedSources:s,historyCount:n}){let o=e.toLowerCase(),l="",u=!1,c="gujarat"===t||/[\u0A80-\u0AFF]/.test(e)||o.includes("gujarati")||o.includes("ગુજરાતી");"hinglish"===t||o.includes("hinglish"),a?.subjectTitle&&!o.includes(a.subjectTitle.toLowerCase())&&(o.includes("tax")||o.includes("patent")||o.includes("cyber"))&&(u=!0),l=o.includes("bns 103")||o.includes("302")||o.includes("murder")||o.includes("હત્યા")?c?`### ⚖️ ભારતીય ન્યાય સંહિતા (BNS 2023) - સેક્શન 103: ખુન (Murder)

**જૂના કાયદા સાથે સરખામણી:** આ જોગવાઈ અગાઉ **IPC Section 302** હતી.

1. **વ્યાખ્યા અને સજા:** BNS સેક્શન 103 મુજબ જે કોઈ વ્યક્તિ ખુન (Murder) કરે છે, તેને **આજીવન કેદ અથવા ફાંસીની સજા (Death Penalty)** અને દંડ થશે.
2. **Mob Lynching (ટોળાશાહીથી ખુન - Sec 103(2)):** જો ૫ કે તેથી વધુ વ્યક્તિઓનું ટોળું જ્ઞાતિ, ધર્મ, જન્મસ્થળ અથવા ભાષાના આધારે કોઈનું ખુન કરે, તો દરેક સભ્યને ફાંસી અથવા આજીવન કેદની સજા થશે.
3. **અગત્યનો કેસ લૉ:** *Bachan Singh v. State of Punjab* — ફાંસીની સજા ફક્ત "Rarest of Rare Cases" માં જ આપી શકાય.

💡 **પરીક્ષા ટીપ:** યુનિવર્સિટી પરીક્ષામાં BNS 103(1) અને Mob Lynching વાળા BNS 103(2) વચ્ચેનો તફાવત ખાસ લખવો.`:`### ⚖️ Section 103, Bharatiya Nyaya Sanhita (BNS 2023) — Offences Affecting Life

**Statutory Transition:** Replaces **IPC Section 302**.

#### 1. Statutory Provision & Penalty
Under **BNS Section 103(1)**, whoever commits murder shall be punished with **death or imprisonment for life**, and shall also be liable to fine.

#### 2. Mob Lynching Provision (Section 103(2))
When a group of 5 or more persons acting in concert commits murder on grounds of race, caste, community, sex, place of birth, language, or personal belief, each member shall be punished with death or life imprisonment.

#### 3. Essential Ingredients for Exam Answer
* **Actus Reus:** Causing death of a human being by an unlawful act.
* **Mens Rea:** Intention to cause death OR intention to cause bodily injury likely to cause death.

#### 4. Landmark Judicial Ratio
* **Bachan Singh v. State of Punjab (1980):** Established the "Rarest of Rare" doctrine for capital punishment, which continues to apply under BNS Section 103.

---
**Verified Official Source:** Bharatiya Nyaya Sanhita (Act No. 45 of 2023), Section 103 | India Code`:o.includes("kesavananda")||o.includes("basic structure")||o.includes("મૂળભૂત માળખું")?c?`### 🏛️ કેશવાનંદ ભારતી v. સ્ટેટ ઓફ કેરળ (1973) 4 SCC 225

* **પીઠ (Bench):** ૧૩ જજોની બંધારણીય બેંચ (૭:૬ બહુમતી)
* **મુખ્ય સિદ્ધાંત:** **Basic Structure Doctrine (મૂળભૂત માળખાનો સિદ્ધાંત)**
* **ચુકાદાનો સાર (Ratio Decidendi):** સંસદ બંધારણના અનુચ્છેદ 368 હેઠળ બંધારણમાં સુધારો કરી શકે છે, પરંતુ તે બંધારણના **મૂળભૂત માળખા (Basic Structure)** જેમ કે ન્યાયિક સમીક્ષા, ધર્મનિરપેક્ષતા, અને લોકશાહીને નષ્ટ કરી શકતી નથી.`:`### 🏛️ Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225

#### Case Summary & Exam Outline
* **Bench Strength:** 13 Supreme Court Judges (Largest in Indian History)
* **Verdict Ratio:** 7 : 6 Majority
* **Core Legal Doctrine:** **Basic Structure Doctrine**

#### Ratio Decidendi
1. Parliament has wide powers to amend any part of the Constitution under **Article 368**.
2. However, Article 368 does **not** enable Parliament to alter, damage, or destroy the **Basic Structure** of the Constitution.

#### Elements of Basic Structure
* Supremacy of the Constitution
* Rule of Law & Judicial Review (Article 32 & 226)
* Republican and Democratic form of Government
* Separation of Powers between Legislature, Executive, and Judiciary

---
**Verified Official Source:** Supreme Court of India Reports (1973) 4 SCC 225`:o.includes("article 14")||o.includes("equality")||o.includes("સમાનતા")?`### ⚖️ Article 14, Constitution of India — Right to Equality

#### 1. Dual Concepts
Article 14 contains two distinct expressions:
1. **Equality Before Law:** Borrowed from English Common Law (Dicey's Rule of Law). Negative concept — no person is above law.
2. **Equal Protection of the Laws:** Borrowed from US Constitution (14th Amendment). Positive concept — equal treatment among equals.

#### 2. Test of Reasonable Classification
Classification is permissible under Article 14 provided two conditions are fulfilled:
* **Intelligible Differentia:** Clear distinction separating grouped persons from others.
* **Rational Nexus:** The differentia must have a reasonable relation to the object sought to be achieved by the statute.

#### 3. Doctrine of Non-Arbitrariness
* **E.P. Royappa v. State of Tamil Nadu (1974):** Justice Bhagwati held that equality is antithetical to arbitrariness. Arbitrary state action violates Article 14.`:o.includes("consideration")||o.includes("contract")||o.includes("કરાર")?`### 📜 Section 2(d), Indian Contract Act, 1872 — Consideration

#### Definition (Section 2(d))
When at the desire of the promisor, the promisee or any other person has done or abstained from doing, such act or abstinence is called a **Consideration** for the promise (*Quid Pro Quo*).

#### Essential Rules for Exam
1. **Desire of Promisor:** Consideration must move at the desire of the promisor (*Durga Prasad v. Baldeo*).
2. **May Move from Promisee or Stranger:** Consideration can move from a third party (*Chinnaya v. Ramayya*).
3. **Need Not be Adequate:** Consideration must be lawful and real, but need not be equal in market value.`:`### 📘 Legal & Educational Analysis: "${e}"

#### 1. Statutory Context & Applicable Law
Under the legal framework applicable to **${a?.universityName||"Gujarat Law Universities"} (${a?.syllabusVersion==="new"?"New BNS 2023 Syllabus":"Old Law Syllabus"})**, this query is governed by standard Indian statutory provisions and judicial precedents.

#### 2. Key Conceptual Breakdown
* **Legal Definition:** The provision establishes statutory duties, compliance standards, and civil/criminal liabilities.
* **Judicial Outlook:** Supreme Court rulings dictate that administrative actions must adhere to natural justice and reasonable classification.

#### 3. Exam Preparation Guidance
* Always cite the corresponding statutory section number.
* Include at least one Supreme Court precedent ratio in long answer responses.`,u&&(l+=`

> ⚠️ **Syllabus Notice:** *This topic is outside your currently selected ${a?.universityName||"Gujarat University"} Semester ${a?.semesterNum||"1"} syllabus.*`);let d=null;return(n>=3||o.includes("quiz")||o.includes("test")||o.includes("mcq")||o.includes("example"))&&(d={title:`Quick 5-Question Check: ${a?.subjectTitle||"Legal Principles"}`,subjectId:a?.subjectId||"gu-sem1-new-const-1",questionCount:5,difficulty:"Medium"}),{text:l,isOutsideSyllabus:u,quizRecommendation:d}}({query:m,language:a,depth:s,mode:n,studentContext:p,retrievedSources:h,historyCount:f});return o.NextResponse.json({success:!0,sender:"ai",text:y.text,retrievedSources:h,isOutsideSyllabus:y.isOutsideSyllabus,quizRecommendation:y.quizRecommendation,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})}catch(e){return o.NextResponse.json({success:!1,error:e.message},{status:500})}}let f=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/nyayaai/chat/route",pathname:"/api/nyayaai/chat",filename:"route",bundlePath:"app/api/nyayaai/chat/route"},resolvedPagePath:"C:\\Users\\VICTUS\\Downloads\\Law Exam\\src\\app\\api\\nyayaai\\chat\\route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:m,staticGenerationAsyncStorage:h,serverHooks:y}=f,g="/api/nyayaai/chat/route";function S(){return(0,n.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:h})}},27341:(e,t,i)=>{i.d(t,{D:()=>a});let r=new Map;function a(e="anonymous",t=30,i=6e4){let a=Date.now(),s=r.get(e)||[],n=a-i,o=s.filter(e=>e>n);return o.length>=t?{allowed:!1,remaining:0,resetMs:Math.max(0,o[0]+i-a),limit:t}:(o.push(a),r.set(e,o),{allowed:!0,remaining:t-o.length,resetMs:i,limit:t})}"undefined"!=typeof setInterval&&setInterval(()=>{let e=Date.now();for(let[t,i]of r.entries()){let a=i.filter(t=>e-t<6e4);0===a.length?r.delete(t):r.set(t,a)}},3e5)},17636:(e,t,i)=>{i.d(t,{Gv:()=>o,N1:()=>d,O0:()=>function e(t){if(null===t||"object"!=typeof t)return t;if(Array.isArray(t))return t.map(t=>e(t));let i={};for(let[r,a]of Object.entries(t))"string"==typeof a?i[r]=d(a):"object"==typeof a&&null!==a?i[r]=e(a):i[r]=a;return i},Po:()=>p,RA:()=>c,kt:()=>l,mR:()=>f,v6:()=>u});var r=i(84770),a=i.n(r);let s=process.env.SESSION_SECRET||"lowstudy-super-secret-hmac-key-2026-law-exam",n=process.env.ADMIN_SECRET||process.env.ADMIN_API_KEY||"lowstudy-admin-key-2026";function o(e,t,i){if(!e||!t||!i)return!1;try{let r=a().pbkdf2Sync(e,i,1e5,64,"sha512").toString("hex"),s=Buffer.from(r,"hex"),n=Buffer.from(t,"hex");if(s.length!==n.length)return!1;return a().timingSafeEqual(s,n)}catch(e){return console.error("Password verification error:",e.message),!1}}function l(e,t=604800){let i=Math.floor(Date.now()/1e3),r={...e,iat:i,exp:i+t},n=Buffer.from(JSON.stringify(r)).toString("base64url"),o=a().createHmac("sha256",s).update(n).digest("base64url");return`${n}.${o}`}function u(e){try{let t=e.headers.get("cookie")||"",i=Object.fromEntries(t.split(";").map(e=>{let[t,...i]=e.trim().split("=");return[t,i.join("=")]})).lowstudy_session;if(!i){let t=e.headers.get("authorization");t&&t.startsWith("Bearer ")&&(i=t.slice(7).trim())}if(!i)return{user:null,error:"No session token found"};let{valid:r,payload:n,error:o}=function(e){if(!e||"string"!=typeof e)return{valid:!1,error:"Token missing or invalid format"};let t=e.split(".");if(2!==t.length)return{valid:!1,error:"Malformed token structure"};let[i,r]=t;try{let e=a().createHmac("sha256",s).update(i).digest("base64url"),t=Buffer.from(r,"utf8"),n=Buffer.from(e,"utf8");if(t.length!==n.length||!a().timingSafeEqual(t,n))return{valid:!1,error:"Invalid token signature"};let o=Buffer.from(i,"base64url").toString("utf8"),l=JSON.parse(o),u=Math.floor(Date.now()/1e3);if(l.exp&&l.exp<u)return{valid:!1,error:"Session token has expired"};return{valid:!0,payload:l}}catch(e){return{valid:!1,error:"Token decoding failed: "+e.message}}}(i);if(!r)return{user:null,error:o};return{user:n,error:null}}catch(e){return{user:null,error:e.message}}}function c(e,t=["ADMIN"]){let i=e.headers.get("authorization"),r=e.headers.get("x-admin-key"),a=i?.startsWith("Bearer ")?i.slice(7).trim():null;if(n&&(a===n||r===n))return{authorized:!0,user:{id:"usr-admin-system",role:"ADMIN",fullName:"System Admin (API Key)",isSystemKey:!0}};let{user:s,error:o}=u(e);if(!s)return{authorized:!1,status:401,error:o||"Authentication required"};let l=(s.role||"STUDENT").toUpperCase();return t.map(e=>e.toUpperCase()).includes(l)?{authorized:!0,user:s}:{authorized:!1,status:403,error:`Forbidden: User role '${l}' is not authorized. Required: ${t.join(", ")}`}}function d(e,{maxLength:t=5e3,stripHtml:i=!0}={}){if("string"!=typeof e)return"";let r=e.replace(/\0/g,"").trim();return i&&(r=r.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,"").replace(/<[^>]+>/g,"")),(r=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")).length>t&&(r=r.slice(0,t)),r}function p(e){if("string"!=typeof e)return{isSafe:!0};let t=e.toLowerCase();for(let e of[/ignore\s+all\s+(previous|above)\s+instructions/i,/disregard\s+(all\s+)?(previous|system)\s+prompts/i,/you\s+are\s+now\s+an\s+unrestricted/i,/bypass\s+all\s+safety/i,/jailbreak/i,/dan\s+mode/i,/system\s+override/i,/reveal\s+(the\s+)?system\s+prompt/i,/output\s+initial\s+instructions/i,/print\s+api\s+key/i,/<\|im_start\|>/i,/<\|im_end\|>/i])if(e.test(t))return{isSafe:!1,riskFlag:`Prompt injection pattern detected: ${e.toString()}`};return{isSafe:!0}}function f(e){if(!e||"string"!=typeof e)return{valid:!1,error:"URL must be a non-empty string"};let t=e.trim();if(t.startsWith("/")&&!t.startsWith("//"))return{valid:!0};try{let e=new URL(t);if("http:"!==e.protocol&&"https:"!==e.protocol)return{valid:!1,error:`Disallowed protocol: ${e.protocol}. Only HTTP/HTTPS allowed.`};let i=e.hostname.toLowerCase();if("localhost"===i||"127.0.0.1"===i||"::1"===i||"0.0.0.0"===i)return{valid:!1,error:"Access to loopback addresses is prohibited (SSRF protection)."};if(i.startsWith("169.254.")||i.includes("metadata.google.internal"))return{valid:!1,error:"Access to cloud metadata services is strictly prohibited."};let r=i.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);if(r){let e=parseInt(r[1],10),t=parseInt(r[2],10);if(10===e)return{valid:!1,error:"Private IP 10.0.0.0/8 disallowed."};if(172===e&&t>=16&&t<=31)return{valid:!1,error:"Private IP 172.16.0.0/12 disallowed."};if(192===e&&168===t)return{valid:!1,error:"Private IP 192.168.0.0/16 disallowed."}}return{valid:!0}}catch(e){return{valid:!1,error:"Invalid URL format: "+e.message}}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),r=t.X(0,[3284,5751,6458,8606],()=>i(28584));module.exports=r})();