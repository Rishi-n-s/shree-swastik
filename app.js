// SHREE SWASTIK ENTERPRISE — PRODUCTION JAVASCRIPT ENGINE
// Dr. Ambedkar Garden, Veraval — Staff Recruitment 2026
// Features:
// - First-Visit Cinematic Intro Video Experience (swastik.mp4)
// - Complete Bilingual Localization (English / Gujarati)
// - Mobile Navigation Drawer & Outside-Click Dismiss
// - Real-time Form Validation & DOB to Age Calculation (18+ enforcement)
// - Base64 Photo Upload & Live Physical A4 Print Sheet Synchronization
// - Confetti Celebration & Application Reference Generator

// Supabase Configuration
const SUPABASE_URL = "https://kkzbpunwplmlxqajvxhe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtremJwdW53cGxtbHhxYWp2eGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDIyNTIsImV4cCI6MjEwNjQxODI1Mn0.Ro2EFbffFlJLibPBQd2LEzBNDQmrr6wfRSRHy4wMRiA";
let _supabaseClient = null;
function getSupabase() {
  if (_supabaseClient) return _supabaseClient;
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  } catch (err) {
    console.warn('Supabase init failed:', err);
  }
  return _supabaseClient;
}

let isSubmitting = false;

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function showFormNotice(message) {
  const box = document.getElementById('formNotice');
  if (!box) return;
  box.textContent = message;
  box.hidden = false;
}

function hideFormNotice() {
  const box = document.getElementById('formNotice');
  if (box) { box.hidden = true; box.textContent = ''; }
}

function formatDobDisplay(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : (iso || '__/__/____');
}

function generateAppId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296).toString(36).toUpperCase().padStart(2, '0');
  return `AP-2026-${stamp}${rand}`;
}


let currentLanguage = 'en';
let uploadedPhotoBase64 = null;

// Comprehensive Bilingual Translation Dictionary
const i18n = {
  en: {
    // Brand & Header
    brandMainTitle: "SHREE SWASTIK ENTERPRISE",
    brandSubCivic: "Dr. Ambedkar Garden, Veraval",
    companyTag: "SHREE SWASTIK ENTERPRISE GROUP",
    tabApply: "Application Portal",
    tabFlyer: "Recruitment Notice",
    tabPrint: "Official A4 Sheet",
    navCta: "Apply Now",
    dockApply: "Apply",
    dockFlyer: "Flyer",
    dockPrint: "A4 Doc",

    // Hero Section
    heroBadgeText: "Official Staff Recruitment 2026",
    heroHeadLine1: "Excellence in",
    heroHeadLine2: "Civic Operations",
    heroHeadLine3: "& Public Stewardship.",
    heroLeadDesc: "Shree Swastik Enterprise oversees operations and visitor safety at Dr. Ambedkar Garden, Veraval under Veraval-Patan Joint Municipality. Join our dedicated team for official CCTV observation and park management roles.",
    heroBtnApply: "Start Job Application",
    heroBtnFlyer: "View Official Circular",
    statAge: "Age Eligibility",
    statRoles: "Key Positions",
    statPayHighlight: "Direct",
    statPayLabel: "Timely Remuneration",
    chipCivicTitle: "Civic Partner",
    chipCivicSub: "Veraval-Patan Municipality",
    chipActiveTitle: "CCTV & Security Role",
    chipActiveSub: "Control Room Observation",

    // Section 01 Narrative
    sec01Category: "ENTERPRISE OVERVIEW",
    sec01Heading: "Built on Reliability & Precision.",
    sec01Lead: "Shree Swastik Enterprise is the authorized operational body managing Dr. Ambedkar Garden in Veraval. We maintain public safety, surveillance integrity, and smooth day-to-day services for thousands of citizens and families.",
    sec01Body: "Our 2026 recruitment drive invites responsible individuals to join our team in maintaining the park's surveillance room and visitor ticketing facilities. We offer competitive remuneration, a secure working environment, and transparent administrative operations.",
    feat1Title: "Direct Municipal Affiliation",
    feat1Desc: "Operating Dr. Ambedkar Garden under Veraval-Patan Joint Municipality guidelines.",
    feat2Title: "Fair & Prompt Compensation",
    feat2Desc: "Timely salary structure based on role duties and verified work performance.",
    feat3Title: "Supportive Work Culture",
    feat3Desc: "Safe premises, clear responsibilities, and on-site guidance from supervisors.",

    // Section 02 Roles
    sec02Category: "OPEN POSITIONS",
    sec02Heading: "Roles Available for Recruitment",
    sec02Desc: "Select an operational role that matches your aptitude. Applications are processed on a first-come, first-evaluated basis.",
    role01Badge: "Office Work / Desk Role",
    role01Title: "CCTV & Security Observation",
    role01SubtitleGu: "CCTV & Security Observation",
    role01Desc: "Monitor live video feeds from the dedicated CCTV control room. Ensure the security, visitor peace, and safety across all park sectors and entrance gates.",
    role01Duty1: "Indoor CCTV control room monitoring",
    role01Duty2: "Incident logging & supervisor reporting",
    role01Duty3: "Ensuring peaceful visitor environment",
    roleApplyAction: "Select & Apply for Office Role",

    role02Badge: "General Operations",
    role02Title: "General Role & Ticketing",
    role02SubtitleGu: "General Role & Joy Train Ticketing",
    role02Desc: "Manage visitor flow, assist at children's joy train ticketing counters, and support daily on-ground operations inside Dr. Ambedkar Garden.",
    role02Duty1: "Joy train ticket counter operations",
    role02Duty2: "Visitor guidance & crowd assistance",
    role02Duty3: "General premises facilitation",
    roleApplyActionGeneral: "Select & Apply for General Role",

    // Section 03 Interactive Portal & Form
    sec03Category: "INTERACTIVE SERVICES",
    sec03Heading: "Application & Documentation Portal",
    systemOnline: "System Ready / Live 2026",
    formTitle: "Employment Application Form",
    formNote: "Dr. Ambedkar Garden, Veraval — Staff Recruitment Drive 2026",
    btnReset: "Reset Form",
    sec1Title: "Position Applied For",
    sec1Sub: "Choose the role you wish to apply for",
    tagOffice: "Office Role (CCTV & Security)",
    titleOfficeRole: "CCTV & Security Observation",
    subOfficeRole: "Control Room Surveillance & Visitor Safety",
    tagGeneral: "General Role (Operations & Ticketing)",
    titleGeneralRole: "General Role & Train Ticketing",
    subGeneralRole: "Visitor Ticketing & Garden Assistance",

    sec2Title: "Candidate Details",
    sec2Sub: "Please provide accurate personal information",
    lblFullName: "Full Name (as per ID)",
    lblPhone: "Phone Number (10 Digits)",
    lblEmail: "Email ID",
    lblDob: "Date of Birth",
    lblAge: "Age",
    lblGender: "Gender",
    optSelect: "Select...",
    optMale: "Male",
    optFemale: "Female",
    optOther: "Other",
    lblPhoto: "Full Face Photo (Passport Size)",
    photoPrompt: "Upload Face Photo",
    btnUploadPhoto: "Choose Image",
    photoNote: "Clear front-facing portrait photograph.",
    declarationText: "I hereby declare that all information furnished above is true and authentic. I commit to fulfilling the duties assigned by Shree Swastik Enterprise Group at Dr. Ambedkar Garden, Veraval with diligence, punctuality, and utmost integrity.",
    btnSubmit: "Submit Application",
    btnPrintPreview: "Preview & Print A4 Record",

    // Form Validations
    valName: "Please enter full legal name.",
    valPhone: "Enter a valid 10-digit mobile number.",
    valEmail: "Enter a valid email address.",
    valDob: "Select date of birth.",
    valAge: "Minimum age requirement is 18+.",
    valGender: "Select gender.",

    // Tab 2: Flyer
    flyerTag: "OFFICIAL RECRUITMENT CIRCULAR",
    flyerTitle: "Current Recruitment Notice 2026",
    flyerSub: "Authorized notice by Shree Swastik Enterprise for Dr. Ambedkar Garden, Veraval.",
    btnApplyThis: "Apply for this Role",
    btnDownloadFlyer: "Download Circular",

    // Tab 3: A4 Print
    a4Badge: "OFFICIAL DOCUMENT STANDARD",
    a4FormHeading: "Dr. Ambedkar Garden — Employment Application Record (A4)",
    a4FormSub: "Official document formatted precisely for A4 single-sheet physical filing and office records.",
    btnPrintNow: "Print Physical A4 Form",

    // Values Section
    sec04Category: "OPERATIONAL PILLARS",
    sec04Heading: "Core Principles of Our Stewardship",
    val1Title: "Vigilance & Visitor Safety",
    val1Desc: "Maintaining continuous observation through modern CCTV infrastructure to ensure every citizen, family, and child experiences a secure environment.",
    val2Title: "Civic Care & Punctuality",
    val2Desc: "Delivering disciplined park timings, transparent ticketing for joyful recreation, and cordial assistance to all community members.",
    val3Title: "Professional Integrity",
    val3Desc: "Fair compensation, supportive management, and transparent recruitment standards adhering to civic authority guidelines.",

    // Contact Section
    sec05Category: "ADMINISTRATIVE CONTACT",
    sec05Heading: "Have Questions? Reach Out Directly.",
    sec05Desc: "For recruitment inquiries, submission assistance, or office verification regarding Dr. Ambedkar Garden, Veraval, contact the enterprise administrators.",
    officer1Role: "Administrative Head",
    officer2Role: "Operations Coordinator",
    contactLocationText: "Dr. Ambedkar Garden, Veraval, Dist. Gir Somnath, Gujarat",

    // Modal
    modalSuccessTitle: "Application Submitted Successfully!",
    modalSuccessSub: "Your official Application Reference Number is:",
    btnModalPrint: "Print / Save Application Form",
    btnModalClose: "Done",

    // Footer
    footerMuniLine: "Dr. Ambedkar Garden Operations | Veraval-Patan Joint Municipality",
    footerAuthBadge: "Authorized Civic Management Partner",
    footerNavHead: "Quick Navigation",
    footerContactHead: "Helpline & Support",
    footLinkHome: "Home / Overview",
    footLinkRoles: "Available Roles",
    footLinkApply: "Online Application",
    footLinkFlyer: "Recruitment Notice",
    footLinkPrint: "Official A4 Form",
    footerLegalNote: "Official recruitment for Dr. Ambedkar Garden, Veraval."
  },

  gu: {
    // Brand & Header
    brandMainTitle: "શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ",
    brandSubCivic: "ડૉ. આંબેડકર ગાર્ડન, વેરાવળ",
    companyTag: "શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ ગ્રૂપ",
    tabApply: "ઓનલાઇન અરજી પોર્ટલ",
    tabFlyer: "વર્તમાન ભરતી જાહેરાત",
    tabPrint: "સત્તાવાર A4 પ્રિન્ટ",
    navCta: "અરજી કરો",
    dockApply: "અરજી",
    dockFlyer: "જાહેરાત",
    dockPrint: "A4 ફોર્મ",

    // Hero Section
    heroBadgeText: "સત્તાવાર સ્ટાફ ભરતી ૨૦૨૬",
    heroHeadLine1: "વિશ્વાસ અને ચોકસાઈ સાથે",
    heroHeadLine2: "ગાર્ડન વ્યવસ્થાપન",
    heroHeadLine3: "અને નાગરિક સુરક્ષા.",
    heroLeadDesc: "શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ વેરાવળ-પાટણ સંયુક્ત નગરપાલિકા સંચાલિત ડૉ. આંબેડકર ગાર્ડનની કામગીરી સંભાળે છે. CCTV નિરીક્ષણ અને ગાર્ડન વ્યવસ્થા માટે અમારી ટીમમાં જોડાઓ.",
    heroBtnApply: "ઓનલાઇન અરજી ફોર્મ ભરો",
    heroBtnFlyer: "સત્તાવાર જાહેરાત જુઓ",
    statAge: "ઉંમર મર્યાદા",
    statRoles: "ઉપલબ્ધ જગ્યાઓ",
    statPayHighlight: "યોગ્ય",
    statPayLabel: "સમયસર વેતન",
    chipCivicTitle: "સંચાલક પાર્ટનર",
    chipCivicSub: "વેરાવળ-પાટણ નગરપાલિકા",
    chipActiveTitle: "CCTV અને સિક્યુરિટી",
    chipActiveSub: "કંટ્રોલ રૂમ નિરીક્ષણ કામગીરી",

    // Section 01 Narrative
    sec01Category: "સંસ્થા પરિચય",
    sec01Heading: "વિશ્વાસ અને પ્રમાણિકતાનું પ્રતીક.",
    sec01Lead: "શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ વેરાવળ ખાતે આવેલ ડૉ. આંબેડકર ગાર્ડનની વ્યવસ્થાપન અને સુરક્ષાનું સુચારૂ સંચાલન કરે છે. મુલાકાતી પરિવારો અને નાગરિકો માટે શ્રેષ્ઠ વાતાવરણ પૂરું પાડવું એ અમારો મુખ્ય ઉદ્દેશ છે.",
    sec01Body: "વર્ષ ૨૦૨૬ ની ભરતી અંતર્ગત સીસીટીવી કેમેરા કંટ્રોલ રૂમ નિરીક્ષણ અને ટ્રેન ટિકિટિંગ વ્યવસ્થા માટે યોગ્ય ઉમેદવારો પાસેથી અરજીઓ મંગાવવામાં આવે છે. સમયસર પગાર અને ઉત્સાહી કાર્ય વાતાવરણ ઉપલબ્ધ રહેશે.",
    feat1Title: "નગરપાલિકા સંચાલિત સંસ્થા",
    feat1Desc: "વેરાવળ-પાટણ સંયુક્ત નગરપાલિકાના નિયમો મુજબ ગાર્ડન સંચાલન.",
    feat2Title: "યોગ્ય અને સમયસર વેતન",
    feat2Desc: "કામગીરી અનુસાર યોગ્ય અને સ્પર્ધાત્મક પગાર ધોરણ.",
    feat3Title: "સુરક્ષિત અને સહયોગી વાતાવરણ",
    feat3Desc: "સ્પષ્ટ જવાબદારીઓ અને સુપરવાઇઝરનું માર્ગદર્શન.",

    // Section 02 Roles
    sec02Category: "ઉપલબ્ધ જગ્યાઓ",
    sec02Heading: "ભરતી માટેની ઉપલબ્ધ જગ્યાઓ",
    sec02Desc: "તમારી ક્ષમતા મુજબ યોગ્ય રોલ પસંદ કરો. પ્રથમ આવનાર ઉમેદવારને પ્રાથમિકતા આપવામાં આવશે.",
    role01Badge: "ઓફિસ વર્ક / ડેસ્ક રોલ",
    role01Title: "સીસીટીવી અને સિક્યુરિટી નિરીક્ષણ",
    role01SubtitleGu: "CCTV & Security Observation",
    role01Desc: "CCTV કંટ્રોલ રૂમમાં બેસીને ગાર્ડન પરિસર, મુખ્ય દરવાજા અને મુલાકાતીઓની સુરક્ષાનું સચોટ નિરીક્ષણ રાખવું.",
    role01Duty1: "ઇન્ડોર CCTV કંટ્રોલ રૂમ મોનિટરિંગ",
    role01Duty2: "રોજિંદી ઘટનાઓની નોંધણી",
    role01Duty3: "શાંતિપૂર્ણ અને સુરક્ષિત વાતાવરણની જાળવણી",
    roleApplyAction: "ઓફિસ રોલ માટે પસંદ કરી અરજી કરો",

    role02Badge: "જનરલ ઓપરેશન્સ",
    role02Title: "જનરલ રોલ અને ટ્રેન ટિકિટિંગ",
    role02SubtitleGu: "General Role & Joy Train Ticketing",
    role02Desc: "મુલાકાતીઓનું સંચાલન, જોય ટ્રેન ટિકિટ કાઉન્ટર પર સેવા અને ગાર્ડન પરિસરમાં સામાન્ય સહાયકીય કામગીરી.",
    role02Duty1: "બાળકોની ટ્રેન ટિકિટ વિતરણ કાઉન્ટર",
    role02Duty2: "મુલાકાતીઓનું માર્ગદર્શન અને સહાય",
    role02Duty3: "પરિસરમાં સુચારૂ વ્યવસ્થા જાળવવી",
    roleApplyActionGeneral: "જનરલ રોલ માટે પસંદ કરી અરજી કરો",

    // Section 03 Interactive Portal & Form
    sec03Category: "ઇન્ટરેક્ટિવ સેવાઓ",
    sec03Heading: "અરજી અને દસ્તાવેજી પોર્ટલ",
    systemOnline: "સિસ્ટમ સક્રિય / ૨૦૨૬",
    formTitle: "કર્મચારી ભરતી અરજી પત્રક",
    formNote: "ડૉ. આંબેડકર ગાર્ડન, વેરાવળ — શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ સ્ટાફ ભરતી ૨૦૨૬",
    btnReset: "રીસેટ કરો",
    sec1Title: "જગ્યાની પસંદગી (Select Job Role)",
    sec1Sub: "તમે જે કામ માટે અરજી કરવા માંગો છો તે પસંદ કરો",
    tagOffice: "ઓફિસ રોલ (Office Role)",
    titleOfficeRole: "સીસીટીવી અને સિક્યુરિટી નિરીક્ષણ",
    subOfficeRole: "કંટ્રોલ રૂમ સર્વેલન્સ અને મુલાકાતી સુરક્ષા",
    tagGeneral: "જનરલ રોલ (General Role)",
    titleGeneralRole: "જનરલ રોલ અને ટ્રેન ટિકિટિંગ",
    subGeneralRole: "મુલાકાતી ટિકિટિંગ અને ગાર્ડન સહાય",

    sec2Title: "ઉમેદવારની વિગતો (Candidate Details)",
    sec2Sub: "કૃપા કરીને સાચી અંગત માહિતી ભરો",
    lblFullName: "પૂરું નામ (Full Name)",
    lblPhone: "મોબાઇલ નંબર (Phone Number)",
    lblEmail: "ઇમેઇલ આઇડી (Email ID)",
    lblDob: "જન્મ તારીખ (Date of Birth)",
    lblAge: "ઉંમર (Age)",
    lblGender: "જાતિ (Gender)",
    optSelect: "પસંદ કરો...",
    optMale: "પુરુષ (Male)",
    optFemale: "મહિલા (Female)",
    optOther: "અન્ય (Other)",
    lblPhoto: "સંપૂર્ણ ચહેરાનો ફોટો (Passport Photo)",
    photoPrompt: "પાસપોર્ટ સાઇઝ ફોટો અપલોડ કરો",
    btnUploadPhoto: "ફોટો પસંદ કરો",
    photoNote: "સ્પષ્ટ ચહેરો દેખાતો હોય તેવો પાસપોર્ટ સાઇઝ ફોટો.",
    declarationText: "હું આથી ખાતરી આપું છું કે ઉપર જણાવેલ તમામ વિગતો સત્ય છે. શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ ગ્રૂપ દ્વારા ડૉ. આંબેડકર ગાર્ડન, વેરાવળ ખાતે સોંપાયેલી તમામ ફરજો હું સંપૂર્ણ નિષ્ઠા અને પ્રમાણિકતાથી બજાવીશ.",
    btnSubmit: "અરજી જમા કરો (Submit)",
    btnPrintPreview: "A4 ફોર્મ જુઓ અને પ્રિન્ટ કરો",

    // Form Validations
    valName: "કૃપા કરીને પૂરું નામ લખો.",
    valPhone: "માન્ય ૧૦ અંકનો મોબાઇલ નંબર દાખલ કરો.",
    valEmail: "માન્ય ઇમેઇલ સરનામું દાખલ કરો.",
    valDob: "જન્મ તારીખ પસંદ કરો.",
    valAge: "ઓછામાં ઓછી ઉંમર ૧૮ વર્ષ હોવી જોઈએ.",
    valGender: "જાતિ પસંદ કરો.",

    // Tab 2: Flyer
    flyerTag: "સત્તાવાર ભરતી પરિપત્ર",
    flyerTitle: "વર્તમાન ભરતી જાહેરાત ૨૦૨૬",
    flyerSub: "શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝ દ્વારા ડૉ. આંબેડકર ગાર્ડન, વેરાવળ માટે અધિકૃત જાહેરાત.",
    btnApplyThis: "આ જગ્યા માટે અરજી કરો",
    btnDownloadFlyer: "પરિપત્ર ડાઉનલોડ કરો",

    // Tab 3: A4 Print
    a4Badge: "સત્તાવાર દસ્તાવેજ માળખું",
    a4FormHeading: "ડૉ. આંબેડકર ગાર્ડન — રોજગારી અરજી રેકોર્ડ (A4)",
    a4FormSub: "ઓફિસ ફાઇલિંગ માટે A4 સિંગલ શીટ આધારિત પ્રમાણિત નમૂનો.",
    btnPrintNow: "A4 ફોર્મ પ્રિન્ટ કરો",

    // Values Section
    sec04Category: "મૂળભૂત સિદ્ધાંતો",
    sec04Heading: "અમારી કાર્યપ્રણાલીના મુખ્ય સ્તંભો",
    val1Title: "સતર્કતા અને નાગરિક સુરક્ષા",
    val1Desc: "આધુનિક સીસીટીવી નેટવર્ક દ્વારા સતત મોનિટરિંગ જેથી દરેક પરિવાર અને બાળક સુરક્ષિત વાતાવરણમાં ફરી શકે.",
    val2Title: "સમયપાલન અને સેવા ભાવના",
    val2Desc: "ગાર્ડન સમયનું ચુસ્ત પાલન, પારદર્શક ટિકિટિંગ અને મુલાકાતીઓનું સૌજન્યપૂર્ણ માર્ગદર્શન.",
    val3Title: "વ્યવસાયિક પ્રમાણિકતા",
    val3Desc: "યોગ્ય અને સમયસર વેતન, સહયોગી વાતાવરણ અને સરકારી માર્ગદર્શિકા મુજબ સંપૂર્ણ પારદર્શિતા.",

    // Contact Section
    sec05Category: "સંચાલન સંપર્ક",
    sec05Heading: "કંઈ પૂછવું છે? સીધો સંપર્ક કરો.",
    sec05Desc: "ભરતી પ્રક્રિયા, અરજી પત્રક કે અન્ય માહિતી માટે શ્રી સ્વસ્તિક એન્ટરપ્રાઇઝના સંચાલકોનો સંપર્ક કરો.",
    officer1Role: "વહીવટી વડા",
    officer2Role: "ઓપરેશન્સ કો-ઓર્ડિનેટર",
    contactLocationText: "ડૉ. આંબેડકર ગાર્ડન, વેરાવળ, જિ. ગીર સોમનાથ, ગુજરાત",

    // Modal
    modalSuccessTitle: "અરજી સફળતાપૂર્વક સ્વીકારાઈ ગઈ છે!",
    modalSuccessSub: "તમારો અરજી ક્રમાંક નીચે મુજબ છે:",
    btnModalPrint: "અરજી ફોર્મ પ્રિન્ટ / સેવ કરો",
    btnModalClose: "ઠીક છે (Done)",

    // Footer
    footerMuniLine: "ડૉ. આંબેડકર ગાર્ડન સંચાલન | વેરાવળ-પાટણ સંયુક્ત નગરપાલિકા",
    footerAuthBadge: "સત્તાવાર ગાર્ડન સંચાલક સંસ્થા",
    footerNavHead: "ઝડપી નેવિગેશન",
    footerContactHead: "હેલ્પલાઇન અને સંપર્ક",
    footLinkHome: "હોમ / પરિચય",
    footLinkRoles: "ઉપલબ્ધ જગ્યાઓ",
    footLinkApply: "ઓનલાઇન અરજી",
    footLinkFlyer: "ભરતી જાહેરાત",
    footLinkPrint: "સત્તાવાર A4 ફોર્મ",
    footerLegalNote: "ડૉ. આંબેડકર ગાર્ડન, વેરાવળ માટે સત્તાવાર ભરતી."
  }
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INITIALIZATION ON DOM READY
 * ═══════════════════════════════════════════════════════════════════════════
 */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure default brand theme is active
  document.body.setAttribute('data-theme', 'crimson');

  // Launch first visit intro
  initFirstVisitIntro();

  // Initialize interactive features
  initCursor();
  initSpotlight();
  initEventListeners();
  updateDateDisplays();
  applyTranslations();
  updateLangSlidebarUI();
  
  // Render blank A4 format
  renderBlankA4View();

  // Sync laser tab outline
  requestAnimationFrame(updateCirTabsGlider);
  setTimeout(updateCirTabsGlider, 120);
});

window.addEventListener('resize', updateCirTabsGlider);

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FIRST-VISIT CINEMATIC INTRO VIDEO
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initFirstVisitIntro() {
  const intro = document.getElementById('siteIntro');
  const video = document.getElementById('siteIntroVideo');
  const skip = document.getElementById('siteIntroSkip');

  if (!intro) return;

  const INTRO_KEY = 'swastik_intro_seen_v1';
  let isSeen = false;
  try {
    isSeen = localStorage.getItem(INTRO_KEY) === 'true';
  } catch (e) {
    isSeen = false;
  }

  // Returning visitor or prefers reduced motion: remove instantly
  if (isSeen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('intro-seen');
    if (intro.parentNode) intro.parentNode.removeChild(intro);
    return;
  }

  // First time visitor: Lock page scroll and prepare playback
  document.body.classList.add('intro-playing');

  let isClosed = false;
  function dismissIntro() {
    if (isClosed) return;
    isClosed = true;

    try {
      localStorage.setItem(INTRO_KEY, 'true');
    } catch (e) {}

    document.body.classList.remove('intro-playing');
    document.documentElement.classList.add('intro-seen');
    intro.classList.add('is-leaving');

    if (video) {
      try {
        video.pause();
      } catch (err) {}
    }

    setTimeout(() => {
      if (intro && intro.parentNode) {
        intro.parentNode.removeChild(intro);
      }
    }, 720);
  }

  // Skip button click
  if (skip) {
    skip.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }

  // Video completion or error
  if (video) {
    video.addEventListener('ended', dismissIntro, { once: true });
    // If the video can't load/play, keep the logo splash visible briefly, then continue
    let failTimer = null;
    const onVideoFail = () => {
      if (failTimer || isClosed) return;
      video.style.display = 'none';
      failTimer = setTimeout(dismissIntro, 3500);
    };
    video.addEventListener('error', onVideoFail, { once: true });
    const introSource = video.querySelector('source');
    if (introSource) introSource.addEventListener('error', onVideoFail, { once: true });

    // Autoplay muted video
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, video will wait for interaction
      });
    }
  }

  // Dismiss on Escape key
  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      dismissIntro();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);

  // Auto-dismiss safety timeout after 16s in case video finishes or fails silently
  setTimeout(() => {
    if (!isClosed) dismissIntro();
  }, 16000);

  // Global helper to replay intro if needed
  window.replayIntro = function() {
    try {
      localStorage.removeItem(INTRO_KEY);
    } catch (e) {}
    window.location.reload();
  };
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LANGUAGE LOCALIZATION & SWITCHER SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 */
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'gu' : 'en';
  document.documentElement.lang = currentLanguage;
  updateLangSlidebarUI();
  applyTranslations();
  setTimeout(updateCirTabsGlider, 40);
}
window.toggleLanguage = toggleLanguage;

function applyTranslations() {
  const dict = i18n[currentLanguage] || i18n.en;
  if (!dict) return;

  // Update all [data-i18n] text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update floating dock button label
  const dockLabel = document.getElementById('currentLangLabel');
  if (dockLabel) {
    dockLabel.textContent = currentLanguage === 'en' ? 'ગુજરાતી' : 'English';
  }

  // Update mobile drawer button label
  const mobileLangLabel = document.getElementById('mobileLangLabel');
  if (mobileLangLabel) {
    mobileLangLabel.textContent = currentLanguage === 'en'
      ? 'ગુજરાતીમાં જુઓ (Switch to Gujarati)'
      : 'View in English (અંગ્રેજીમાં બદલો)';
  }

  // Update gender options
  const optSelect = document.querySelector('#fldGender option[value=""]');
  if (optSelect && dict.optSelect) optSelect.textContent = dict.optSelect;
  const optMale = document.querySelector('#fldGender option[data-i18n="optMale"]');
  if (optMale && dict.optMale) optMale.textContent = dict.optMale;
  const optFemale = document.querySelector('#fldGender option[data-i18n="optFemale"]');
  if (optFemale && dict.optFemale) optFemale.textContent = dict.optFemale;
  const optOther = document.querySelector('#fldGender option[data-i18n="optOther"]');
  if (optOther && dict.optOther) optOther.textContent = dict.optOther;
}

function updateLangSlidebarUI() {
  const optGu = document.getElementById('langOptGu');
  const optEn = document.getElementById('langOptEn');
  const pill = document.getElementById('langSlidePill');

  if (currentLanguage === 'en') {
    if (optGu) optGu.classList.remove('active');
    if (optEn) optEn.classList.add('active');
    if (pill) pill.style.transform = 'translateX(100%)';
  } else {
    if (optGu) optGu.classList.add('active');
    if (optEn) optEn.classList.remove('active');
    if (pill) pill.style.transform = 'translateX(0%)';
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOBILE NAVIGATION DRAWER
 * ═══════════════════════════════════════════════════════════════════════════
 */
window.toggleMobileMenu = function() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggle || !drawer) return;

  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    window.closeMobileMenu();
  } else {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }
};

window.closeMobileMenu = function() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggle || !drawer) return;

  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TAB NAVIGATION & LASER OUTLINE GLIDER
 * ═══════════════════════════════════════════════════════════════════════════
 */
function updateCirTabsGlider() {
  const activeTab = document.querySelector('.uiverse-btn.nav-tab.active');
  const outline = document.querySelector('.uiverse-rect');
  if (activeTab && outline) {
    // Laser state updates via CSS transitions
  }
}

window.switchToApplyTab = function() {
  const btn = document.getElementById('tabApplyBtn');
  if (btn) btn.click();
  const portal = document.getElementById('portalSection');
  if (portal) portal.scrollIntoView({ behavior: 'smooth' });
};

window.switchToFlyerTab = function() {
  const btn = document.getElementById('tabFlyerBtn');
  if (btn) btn.click();
  const portal = document.getElementById('portalSection');
  if (portal) portal.scrollIntoView({ behavior: 'smooth' });
};

window.switchToPrintTab = function() {
  const btn = document.getElementById('tabPrintBtn');
  if (btn) btn.click();
  const portal = document.getElementById('portalSection');
  if (portal) portal.scrollIntoView({ behavior: 'smooth' });
};

window.selectRoleAndApply = function(role) {
  window.switchToApplyTab();
  setTimeout(() => {
    const cardId = role === 'office' ? 'cardRoleOffice' : 'cardRoleGeneral';
    const card = document.getElementById(cardId);
    if (card) {
      document.querySelectorAll('.role-choice-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }
  }, 100);
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INTERACTIVE CARD SPOTLIGHT & CUSTOM CURSOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initSpotlight() {
  const cards = document.querySelectorAll('.role-editorial-card, .value-item-card, .app-form-editorial-card, .contact-editorial-card, .officer-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initCursor() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('customCursorDot');
  if (!cursor || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = 'a, button, input, select, label, .role-editorial-card, .officer-card, .photo-dropzone';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EVENT LISTENERS SETUP
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initEventListeners() {
  // Floating dock language button
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // Desktop navigation pill language switcher
  const langSlidebar = document.getElementById('langSlidebar');
  if (langSlidebar) {
    langSlidebar.addEventListener('click', toggleLanguage);
    langSlidebar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLanguage();
      }
    });
  }

  // Mobile drawer language button
  const mobileLangBtn = document.getElementById('mobileLangToggleBtn');
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', toggleLanguage);
  }

  // Hamburger toggle button
  const mobileToggle = document.getElementById('mobileMenuToggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      window.toggleMobileMenu();
    });
  }

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('mobileNavDrawer');
      if (drawer && drawer.classList.contains('open')) {
        window.closeMobileMenu();
      }
    }
  });

  // Close mobile drawer when clicking outside
  document.addEventListener('click', (e) => {
    const drawer = document.getElementById('mobileNavDrawer');
    const toggle = document.getElementById('mobileMenuToggle');
    if (!drawer || !toggle) return;

    if (drawer.classList.contains('open')) {
      if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
        window.closeMobileMenu();
      }
    }
  });

  // Tab Navigation Buttons (Desktop + Mobile)
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      document.querySelectorAll('.nav-tab').forEach(t => {
        const isMatch = t.getAttribute('data-target') === targetId;
        t.classList.toggle('active', isMatch);
        t.setAttribute('aria-selected', String(isMatch));
      });

      document.querySelectorAll('.tab-content').forEach(p => {
        p.classList.toggle('active', p.id === targetId);
      });

      hideFormNotice();
    });
  });

  // Auto-close mobile drawer on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
      window.closeMobileMenu();
    }
  });

  // DOB & Age auto-calculation on change AND input
  const dobInput = document.getElementById('fldDob');
  if (dobInput) {
    dobInput.addEventListener('change', computeAge);
    dobInput.addEventListener('input', computeAge);
  }

  // Clear validation styling when user starts typing
  ['fldFullName', 'fldPhone', 'fldEmail', 'fldDob', 'fldGender'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('invalid');
        const grp = el.closest('.form-group');
        const err = grp ? grp.querySelector('.validation-msg') : null;
        if (err) err.classList.remove('visible');
      });
      el.addEventListener('change', () => {
        el.classList.remove('invalid');
        const grp = el.closest('.form-group');
        const err = grp ? grp.querySelector('.validation-msg') : null;
        if (err) err.classList.remove('visible');
      });
    }
  });

  // DOB cannot be in the future
  if (dobInput) {
    const t = new Date();
    dobInput.max = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  }

  // Phone: digits only
  const phoneInput = document.getElementById('fldPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      if (digits !== phoneInput.value) phoneInput.value = digits;
    });
  }

  // Declaration: clear notice once ticked
  const declBox = document.getElementById('chkDeclaration');
  if (declBox) declBox.addEventListener('change', () => { if (declBox.checked) hideFormNotice(); });

  // Photo Upload Handler
  const photoInput = document.getElementById('filePhotoInput');
  if (photoInput) photoInput.addEventListener('change', handlePhotoFile);

  const removePhotoBtn = document.getElementById('btnRemovePhoto');
  if (removePhotoBtn) removePhotoBtn.addEventListener('click', removePhoto);

  // Reset Button
  const resetBtn = document.getElementById('btnResetForm');
  if (resetBtn) resetBtn.addEventListener('click', () => { resetForm(); renderBlankA4View(); });

  // Role Selection Cards inside Form
  document.querySelectorAll('.role-choice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.role-choice-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Form Submit — single binding on the form's submit event.
  // The button is type="submit" so clicking it automatically fires form submit.
  const form = document.getElementById('gardenJobForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Print Form Direct
  const printDirectBtn = document.getElementById('btnPrintFormDirect');
  if (printDirectBtn) printDirectBtn.addEventListener('click', printFormDirectly);

  // Modal Buttons
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      document.getElementById('successModal').classList.remove('active');
    });
  }

  // Modal: Escape key and backdrop click close it
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('active');
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal) successModal.classList.remove('active');
  });

  const modalPrintBtn = document.getElementById('modalPrintBtn');
  if (modalPrintBtn) {
    modalPrintBtn.addEventListener('click', () => {
      document.getElementById('successModal').classList.remove('active');
      window.print();
    });
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FORM PROCESSING, AGE CALCULATION & A4 SYNC
 * ═══════════════════════════════════════════════════════════════════════════
 */
function computeAge() {
  const dobInput = document.getElementById('fldDob');
  const ageInput = document.getElementById('fldAge');
  const errorMsg = document.getElementById('msgAgeError');

  if (!dobInput || !ageInput) return;
  const dobVal = dobInput.value;
  if (!dobVal) {
    ageInput.value = '';
    return;
  }

  const birthDate = new Date(dobVal);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const calculatedAge = Math.max(0, age);
  ageInput.value = calculatedAge > 0 ? calculatedAge : '';

  if (calculatedAge < 18) {
    ageInput.classList.add('invalid');
    if (errorMsg) {
      errorMsg.textContent = currentLanguage === 'gu'
        ? "ઉંમર ૧૮ વર્ષથી ઓછી છે! આ ભરતી ૧૮+ વર્ષના ઉમેદવારો માટે છે."
        : "Age is below 18! Minimum requirement is 18+.";
      errorMsg.classList.add('visible');
    }
  } else {
    ageInput.classList.remove('invalid');
    if (errorMsg) errorMsg.classList.remove('visible');
  }
}

function handlePhotoFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showFormNotice(currentLanguage === 'gu' ? "કૃપા કરીને 5MB કરતાં નાની સાઈઝનો ફોટો પસંદ કરો." : "Please select an image smaller than 5MB.");
    e.target.value = '';
    return;
  }

  if (!/^image\//.test(file.type)) {
    showFormNotice(currentLanguage === 'gu' ? "કૃપા કરીને ફક્ત ફોટો (ઇમેજ) ફાઇલ પસંદ કરો." : "Please choose an image file.");
    e.target.value = '';
    return;
  }
  hideFormNotice();

  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedPhotoBase64 = event.target.result;
    document.getElementById('photoImgElement').src = uploadedPhotoBase64;
    document.getElementById('btnRemovePhoto').style.display = 'inline-flex';
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  uploadedPhotoBase64 = null;
  const fileInput = document.getElementById('filePhotoInput');
  if (fileInput) fileInput.value = '';
  const imgEl = document.getElementById('photoImgElement');
  if (imgEl) {
    imgEl.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
  }
  const removeBtn = document.getElementById('btnRemovePhoto');
  if (removeBtn) removeBtn.style.display = 'none';
}

function updateDateDisplays() {
  const today = new Date();
  const formatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const a4Date = document.getElementById('a4DocDate');
  if (a4Date) a4Date.textContent = formatted;
}

function resetForm() {
  const form = document.getElementById('gardenJobForm');
  if (form) form.reset();
  removePhoto();
  const fldAge = document.getElementById('fldAge');
  if (fldAge) fldAge.value = '';
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.validation-msg').forEach(el => el.classList.remove('visible'));
  document.querySelectorAll('.role-choice-card').forEach(c => c.classList.remove('active'));
  const defaultCard = document.getElementById('cardRoleOffice');
  if (defaultCard) defaultCard.classList.add('active');
  hideFormNotice();
}

// Helper: Upload photo to Supabase Storage with strict 4s timeout
async function uploadPhotoToSupabase(base64Data, filename) {
  const supabase = getSupabase();
  if (!supabase || !base64Data) return null;
  try {
    const uploadTask = (async () => {
      const res = await fetch(base64Data);
      const blob = await res.blob();
      const ext = (blob.type && blob.type.split('/')[1]) || 'jpg';
      const filePath = `applicants/${filename}_${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from('applicant-photos')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('Supabase storage upload note:', error.message);
        return null;
      }

      const { data: publicData } = supabase.storage
        .from('applicant-photos')
        .getPublicUrl(filePath);

      return publicData ? publicData.publicUrl : null;
    })();

    const timeout = new Promise(resolve => setTimeout(() => resolve(null), 4000));
    return await Promise.race([uploadTask, timeout]);
  } catch (err) {
    console.warn('Photo upload exception:', err);
    return null;
  }
}

async function handleFormSubmit(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (isSubmitting) return;
  hideFormNotice();

  // Pre-calculate age if DOB entered
  computeAge();

  const nameEl = document.getElementById('fldFullName');
  const phoneEl = document.getElementById('fldPhone');
  const emailEl = document.getElementById('fldEmail');
  const dobEl = document.getElementById('fldDob');
  const ageEl = document.getElementById('fldAge');
  const genderEl = document.getElementById('fldGender');

  const name = nameEl ? nameEl.value.trim() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const dob = dobEl ? dobEl.value : '';
  const age = ageEl ? (parseInt(ageEl.value) || 0) : 0;
  const gender = genderEl ? genderEl.value : '';

  let valid = true;
  let firstInvalidEl = null;

  // Name check
  if (!name) {
    nameEl.classList.add('invalid');
    document.getElementById('msgNameError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = nameEl;
  } else {
    nameEl.classList.remove('invalid');
    document.getElementById('msgNameError')?.classList.remove('visible');
  }

  // Phone check (valid Indian mobile: 10 digits starting 6-9)
  const cleanPhone = phone.replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    phoneEl.classList.add('invalid');
    document.getElementById('msgPhoneError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = phoneEl;
  } else {
    phoneEl.classList.remove('invalid');
    document.getElementById('msgPhoneError')?.classList.remove('visible');
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    emailEl.classList.add('invalid');
    document.getElementById('msgEmailError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = emailEl;
  } else {
    emailEl.classList.remove('invalid');
    document.getElementById('msgEmailError')?.classList.remove('visible');
  }

  // DOB check
  if (!dob) {
    dobEl.classList.add('invalid');
    document.getElementById('msgDobError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = dobEl;
  } else {
    dobEl.classList.remove('invalid');
    document.getElementById('msgDobError')?.classList.remove('visible');
  }

  // Age check (18+)
  if (age < 18) {
    ageEl.classList.add('invalid');
    document.getElementById('msgAgeError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = dobEl;
  } else {
    ageEl.classList.remove('invalid');
    document.getElementById('msgAgeError')?.classList.remove('visible');
  }

  // Gender check
  if (!gender) {
    genderEl.classList.add('invalid');
    document.getElementById('msgGenderError')?.classList.add('visible');
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = genderEl;
  } else {
    genderEl.classList.remove('invalid');
    document.getElementById('msgGenderError')?.classList.remove('visible');
  }

  // Declaration must be explicitly accepted
  const declEl = document.getElementById('chkDeclaration');
  let declarationMissing = false;
  if (declEl && !declEl.checked) {
    declarationMissing = true;
    valid = false;
    if (!firstInvalidEl) firstInvalidEl = declEl;
  }

  // If validation fails, scroll to first error field and show inline notice
  if (!valid) {
    if (firstInvalidEl) {
      firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => firstInvalidEl.focus({ preventScroll: true }), 300);
    }
    showFormNotice(declarationMissing && firstInvalidEl === declEl
      ? (currentLanguage === 'gu' ? "કૃપા કરીને સબમિટ કરતા પહેલાં એકરારનામાને સ્વીકારો." : "Please confirm the declaration before submitting.")
      : (currentLanguage === 'gu' ? "કૃપા કરીને લાલ રંગથી દર્શાવેલી તમામ વિગતો યોગ્ય રીતે ભરો." : "Please fill all required highlighted fields properly."));
    return;
  }

  // Submit button visual feedback
  const submitBtn = document.getElementById('btnSubmitForm');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${currentLanguage === 'gu' ? 'અરજી જમા થઈ રહી છે...' : 'Submitting...'}</span>`;
  }

  isSubmitting = true;
  const appId = generateAppId();
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  const selectedRoleVal = document.querySelector('input[name="jobRole"]:checked');
  const roleValue = selectedRoleVal ? selectedRoleVal.value : 'office';

  const roleName = roleValue === 'office'
    ? (currentLanguage === 'gu' ? 'ઓફિસ રોલ: સીસીટીવી અને સિક્યુરિટી નિરીક્ષણ' : 'Office Role: CCTV & Security Observation')
    : (currentLanguage === 'gu' ? 'જનરલ રોલ: ટિકિટિંગ અને ગાર્ડન વ્યવસ્થા' : 'General Role: Ticketing & Operations');

  const roleShort = roleValue === 'office'
    ? 'ઓફિસ રોલ (Office Role)'
    : 'જનરલ રોલ (General Role)';

  let savedOnline = false;
  const supabase = getSupabase();

  try {
    // 1. Upload photo to Supabase storage if photo attached
    let remotePhotoUrl = null;
    if (uploadedPhotoBase64 && supabase) {
      remotePhotoUrl = await uploadPhotoToSupabase(uploadedPhotoBase64, appId);
    }

    // 2. Insert into Supabase database (with 5-second timeout)
    if (supabase) {
      try {
        const insertPromise = supabase.from('applications').insert([
          {
            app_number: appId,
            full_name: name,
            phone: phone,
            email: email,
            dob: dob,
            age: age,
            gender: gender,
            job_role: roleValue,
            photo_url: remotePhotoUrl || null
          }
        ]);

        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('DB Timeout')), 5000)
        );

        const { data, error } = await Promise.race([insertPromise, timeout]);
        if (error) {
          console.warn('Supabase DB Notice:', error.message);
        } else {
          savedOnline = true;
          console.log('Application saved to Supabase! Reference:', appId);
        }
      } catch (dbErr) {
        console.warn('Supabase DB Exception:', dbErr.message || dbErr);
      }
    }
  } catch (err) {
    console.warn('Submission processing notice:', err);
  } finally {
    isSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }

  // Construct candidate record
  const cand = {
    id: appId,
    jobRole: roleName,
    jobRoleShort: roleShort,
    jobRoleValue: roleValue,
    fullName: name,
    phone: phone,
    email: email,
    dob: dob,
    age: age,
    gender: gender,
    photo: uploadedPhotoBase64,
    appliedDate: formattedDate,
    savedOnline: savedOnline
  };

  // Celebration confetti
  if (typeof confetti === 'function') {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  }

  // Populate A4 sheet and open success modal
  populateA4Sheet(cand);
  showSuccessModal(cand);
  resetForm();   // clears the form only; the filled A4 record stays available for printing
}



function showSuccessModal(cand) {
  document.getElementById('modalAppId').textContent = cand.id;
  const statusLine = cand.savedOnline
    ? ''
    : `<div style="margin-top:10px;padding:10px 12px;border-radius:8px;border:1px solid rgba(245,158,11,.5);background:rgba(245,158,11,.12);color:#fcd34d;font-weight:600">${
        currentLanguage === 'gu'
          ? 'ચેતવણી: તમારી અરજી ઓનલાઇન સેવ થઈ શકી નથી. કૃપા કરીને A4 ફોર્મ પ્રિન્ટ કરી ઓફિસમાં જમા કરાવો અથવા 8866771812 / 9099518776 પર સંપર્ક કરો.'
          : 'Notice: your application could not be saved online. Please print the A4 form and submit it at the office, or call 8866771812 / 9099518776.'}</div>`;
  const e = escapeHtml;
  document.getElementById('modalSummaryDetails').innerHTML = `
    <div><strong>${currentLanguage === 'gu' ? 'સંસ્થા:' : 'Enterprise:'}</strong> Shree Swastik Enterprise (ડૉ. આંબેડકર ગાર્ડન)</div>
    <div><strong>${currentLanguage === 'gu' ? 'ઉમેદવારનું નામ:' : 'Candidate:'}</strong> ${e(cand.fullName)}</div>
    <div><strong>${currentLanguage === 'gu' ? 'પસંદ કરેલ રોલ:' : 'Applied Role:'}</strong> ${e(cand.jobRole)}</div>
    <div><strong>${currentLanguage === 'gu' ? 'સંપર્ક નંબર:' : 'Phone:'}</strong> ${e(cand.phone)}</div>
    <div><strong>${currentLanguage === 'gu' ? 'ઇમેઇલ:' : 'Email:'}</strong> ${e(cand.email)}</div>
    <div><strong>${currentLanguage === 'gu' ? 'ઉંમર / જાતિ:' : 'Age / Gender:'}</strong> ${e(cand.age)} Yrs | ${e(cand.gender)}</div>
    <div><strong>${currentLanguage === 'gu' ? 'અરજી તારીખ:' : 'Date:'}</strong> ${e(cand.appliedDate)}</div>
    ${statusLine}
  `;
  document.getElementById('successModal').classList.add('active');
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * POPULATE PHYSICAL PRINT-READY A4 DOCUMENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function populateA4Sheet(cand) {
  document.getElementById('a4DocAppNo').textContent = cand.id || 'AP-2026/001';
  document.getElementById('a4DocDate').textContent = cand.appliedDate || '01/10/2026';
  document.getElementById('docFillName').textContent = cand.fullName;
  document.getElementById('docFillGender').textContent = cand.gender || 'પુરુષ (Male)';
  document.getElementById('docFillDob').textContent = formatDobDisplay(cand.dob);
  document.getElementById('docFillAge').textContent = `${cand.age} વર્ષ (Years)`;
  document.getElementById('docFillPhone').textContent = cand.phone;
  document.getElementById('docFillEmail').textContent = cand.email || '-';

  // Role checkbox mark
  const roleVal = cand.jobRoleValue || 'office';
  const checkOffice = document.getElementById('a4CheckOffice');
  const checkGeneral = document.getElementById('a4CheckGeneral');
  if (checkOffice) checkOffice.textContent = roleVal === 'office' ? '[ X ]' : '[   ]';
  if (checkGeneral) checkGeneral.textContent = roleVal === 'general' ? '[ X ]' : '[   ]';

  // Photo
  const photoBox = document.getElementById('a4PhotoContainer');
  if (photoBox) {
    if (cand.photo) {
      photoBox.innerHTML = '';
      const img = document.createElement('img');
      img.src = cand.photo;
      img.alt = 'Candidate Photo';
      img.style.cssText = 'width:100%; height:100%; object-fit:cover;';
      photoBox.appendChild(img);
    } else {
      photoBox.innerHTML = `<span>સંપૂર્ણ ચહેરાનો ફોટો ચોંટાડવો</span><small>(Affix Full Face Photo)</small>`;
    }
  }

  // Tear-off receipt
  const rcptAppNo = document.getElementById('rcptAppNo');
  if (rcptAppNo) rcptAppNo.textContent = cand.id;
  const rcptName = document.getElementById('rcptName');
  if (rcptName) rcptName.textContent = cand.fullName;
  const rcptRole = document.getElementById('rcptRoleName');
  if (rcptRole) rcptRole.textContent = cand.jobRoleShort || 'ઓફિસ રોલ (Office Role)';
}

function renderBlankA4View() {
  document.getElementById('a4DocAppNo').textContent = 'AP-2026/______';
  document.getElementById('docFillName').textContent = '____________________________________________________________________';
  document.getElementById('docFillGender').textContent = '[ ] પુરુષ (Male)   [ ] મહિલા (Female)';
  document.getElementById('docFillDob').textContent = '____ / ____ / ________';
  document.getElementById('docFillAge').textContent = '_______ વર્ષ (Years)';
  document.getElementById('docFillPhone').textContent = '____________________________________';
  document.getElementById('docFillEmail').textContent = '____________________________________________________________________';
  
  const photoBox = document.getElementById('a4PhotoContainer');
  if (photoBox) {
    photoBox.innerHTML = `<span>સંપૂર્ણ ચહેરાનો ફોટો ચોંટાડવો</span><small>(Affix Full Face Photo)</small>`;
  }
  
  document.getElementById('rcptAppNo').textContent = 'AP-_______';
  document.getElementById('rcptName').textContent = '________________________';
  const co = document.getElementById('a4CheckOffice');
  const cg = document.getElementById('a4CheckGeneral');
  if (co) co.textContent = '[   ]';
  if (cg) cg.textContent = '[   ]';
  const rr = document.getElementById('rcptRoleName');
  if (rr) rr.textContent = '________________________';
  updateDateDisplays();
}

function printFormDirectly() {
  const name = document.getElementById('fldFullName').value.trim();
  if (!name) {
    const nameEl = document.getElementById('fldFullName');
    nameEl.classList.add('invalid');
    document.getElementById('msgNameError')?.classList.add('visible');
    nameEl.focus();
    showFormNotice(currentLanguage === 'gu'
      ? "કૃપા કરીને પહેલાં અરજી ફોર્મમાં તમારી વિગતો ભરો."
      : "Please fill out the form details first.");
    return;
  }
  hideFormNotice();

  const roleChecked = document.querySelector('input[name="jobRole"]:checked');
  const previewRole = roleChecked ? roleChecked.value : 'office';

  const cand = {
    id: "AP-2026-PREVIEW",
    jobRoleValue: previewRole,
    jobRoleShort: previewRole === 'office' ? 'ઓફિસ રોલ (Office Role)' : 'જનરલ રોલ (General Role)',
    fullName: name,
    phone: document.getElementById('fldPhone').value || '__________',
    email: document.getElementById('fldEmail').value || '__________',
    dob: document.getElementById('fldDob').value || '____-__-__',
    age: document.getElementById('fldAge').value || '__',
    gender: document.getElementById('fldGender').value || '________',
    photo: uploadedPhotoBase64,
    appliedDate: document.getElementById('a4DocDate').textContent
  };

  populateA4Sheet(cand);
  switchToPrintTab();
  setTimeout(() => window.print(), 300);
}
