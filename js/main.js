// Archi Aid — interactions

// Current year in the footer
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile navigation toggle
var toggle = document.getElementById('nav-toggle');
var nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Login / signup modal
var modalOverlay = document.getElementById('auth-modal');
if (modalOverlay) {
  var openers = document.querySelectorAll('[data-open-modal]');
  var closeBtn = modalOverlay.querySelector('.modal-close');
  var tabs = modalOverlay.querySelectorAll('.modal-tab');
  var forms = modalOverlay.querySelectorAll('.modal-form');

  function openModal(e) {
    if (e) e.preventDefault();
    modalOverlay.classList.add('open');
    document.body.classList.add('modal-locked');
    var firstInput = modalOverlay.querySelector('.modal-form.active input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.classList.remove('modal-locked');
  }

  openers.forEach(function (el) { el.addEventListener('click', openModal); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      forms.forEach(function (f) { f.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById(tab.getAttribute('data-target'));
      if (target) target.classList.add('active');
    });
  });

  // Connexion côté client : on enregistre l'utilisateur dans le navigateur
  // puis on le redirige vers la page des outils (pas de serveur d'authentification).
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('input[name="name"]');
      var emailInput = form.querySelector('input[name="email"]');
      try {
        localStorage.setItem('archiaid_user', JSON.stringify({
          nom: nameInput ? nameInput.value.trim() : '',
          courriel: emailInput ? emailInput.value.trim() : '',
          depuis: new Date().toISOString()
        }));
      } catch (err) {}
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = note.getAttribute('data-success');
        note.classList.add('success');
      }
      var destination = modalOverlay.getAttribute('data-redirect');
      if (destination) {
        setTimeout(function () { window.location.href = destination; }, 600);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Infographies de services interactives : chaque segment de l'anneau est une
// zone cliquable (SVG posé sur l'image) qui ouvre une fenêtre d'explication.
// ---------------------------------------------------------------------------
var LANG = (document.documentElement.lang || 'en').slice(0, 2) === 'fr' ? 'fr' : 'en';

// Géométrie des anneaux mesurée sur les images (pixels de l'image d'origine).
// Angles en degrés, 0 = droite, sens horaire (repère écran).
var SEVEN = [12.5, 63.9, 115.4, 166.8, 218.2, 269.6, 321.1]; // frontières des anneaux à 7 segments
var INFOGRAPHICS = {
  entreprise: {
    w: 425, h: 481, cx: 201.5, cy: 260, ri: 128, ro: 192,
    segments: [
      { from: 180, to: 270, key: 'crm' },
      { from: 270, to: 360, key: 'gestion-projet' },
      { from: 0,   to: 90,  key: 'erp' },
      { from: 90,  to: 180, key: 'partage-fichiers' }
    ]
  },
  bim: {
    w: 420, h: 465, cx: 205.5, cy: 247, ri: 138, ro: 192,
    segments: [
      { from: SEVEN[4], to: SEVEN[5], key: 'bep' },
      { from: SEVEN[5], to: SEVEN[6], key: 'collaboration-nuage' },
      { from: SEVEN[6], to: SEVEN[0] + 360, key: 'planification-4d' },
      { from: SEVEN[0], to: SEVEN[1], key: 'detection-conflits' },
      { from: SEVEN[1], to: SEVEN[2], key: 'coordination-bim' },
      { from: SEVEN[2], to: SEVEN[3], key: 'cycle-de-vie' },
      { from: SEVEN[3], to: SEVEN[4], key: 'jumeau-numerique' }
    ]
  },
  site: {
    w: 441, h: 500, cx: 224, cy: 275.5, ri: 140, ro: 196,
    segments: [
      { from: SEVEN[4], to: SEVEN[5], key: 'surveillance-site' },
      { from: SEVEN[5], to: SEVEN[6], key: 'timelapse' },
      { from: SEVEN[6], to: SEVEN[0] + 360, key: 'ia-sst' },
      { from: SEVEN[0], to: SEVEN[1], key: 'internet-site' },
      { from: SEVEN[1], to: SEVEN[2], key: 'robotique' },
      { from: SEVEN[2], to: SEVEN[3], key: 'capteurs' },
      { from: SEVEN[3], to: SEVEN[4], key: 'nuage-points' }
    ]
  }
};

var SERVICE_TEXTS = {
  fr: {
    groups: { entreprise: "Solutions d'Entreprise", bim: 'Gestion BIM', site: 'Intégration sur Site' },
    items: {
      'crm': { title: 'CRM', text: [
        "Un CRM (gestion de la relation client) centralise vos contacts, vos soumissions et le suivi de vos opportunités d'affaires.",
        "Nous choisissons et déployons l'outil adapté à votre firme, puis nous le relions à vos projets pour que l'équipe de ventes et l'équipe de production partagent la même information." ] },
      'gestion-projet': { title: 'Gestion de projet', text: [
        "Plateformes de gestion de projet (Asana, Wrike, Microsoft Project, Procore, etc.) pour planifier, assigner et suivre les tâches, les échéanciers et les budgets.",
        "Nous configurons des gabarits propres à vos types de projets et formons vos chargés de projet pour que le suivi devienne un réflexe plutôt qu'une corvée." ] },
      'erp': { title: 'ERP', text: [
        "Un ERP (progiciel de gestion intégré) réunit la comptabilité, les achats, la paie, les ressources et la facturation dans un seul système.",
        "Nous accompagnons la sélection, l'implantation et l'intégration avec vos outils de projet afin d'obtenir une vue en temps réel de la rentabilité de chaque chantier." ] },
      'partage-fichiers': { title: 'Partage de fichiers', text: [
        "Un environnement commun de données (SharePoint, Autodesk Construction Cloud, Dropbox Business...) où plans, devis et documents de chantier sont versionnés et accessibles à tous.",
        "Nous structurons l'arborescence, les permissions et les conventions de nommage pour que chacun trouve toujours la bonne version du bon document." ] },
      'bep': { title: 'Développement BEP', text: [
        "Le BEP (plan d'exécution BIM) est le document qui définit comment le BIM sera utilisé sur votre projet : objectifs, niveaux de détail, responsabilités, échanges de fichiers et livrables.",
        "Nous rédigeons votre BEP avec vous, en conformité avec les exigences du donneur d'ouvrage et la norme ISO 19650, pour que toutes les parties travaillent selon les mêmes règles." ] },
      'collaboration-nuage': { title: 'Collaboration dans le nuage', text: [
        "Les maquettes et les documents sont partagés dans un environnement infonuagique (Autodesk Construction Cloud, BIM 360, Trimble Connect...) où tous les intervenants travaillent sur une source unique et à jour.",
        "Nous mettons en place les espaces, les flux d'approbation et les accès pour que architectes, ingénieurs et entrepreneurs collaborent en temps réel, où qu'ils soient." ] },
      'planification-4d': { title: 'Planification 4D', text: [
        "La 4D lie la maquette 3D à l'échéancier du projet : on visualise la séquence de construction semaine par semaine avant même de lancer le chantier.",
        "Elle permet de détecter les conflits de logistique, d'optimiser la mobilisation des équipes et de communiquer clairement le déroulement au client et aux sous-traitants." ] },
      'detection-conflits': { title: 'Détection des conflits BIM', text: [
        "La détection des conflits (clash detection) compare les maquettes de chaque discipline pour repérer les interférences : une conduite qui traverse une poutre, une gaine qui croise une colonne...",
        "Avec Navisworks ou des outils équivalents, nous identifions et documentons ces conflits en amont, ce qui évite des reprises coûteuses sur le chantier." ] },
      'coordination-bim': { title: 'Coordination BIM', text: [
        "La coordination BIM est le processus qui réunit régulièrement les disciplines autour de la maquette fédérée pour résoudre les conflits et valider les choix techniques.",
        "Nous animons ces rencontres, tenons le registre des points ouverts et nous assurons que chaque modèle est mis à jour selon le calendrier d'échange convenu." ] },
      'cycle-de-vie': { title: 'Analyse du cycle de vie', text: [
        "L'analyse du cycle de vie évalue l'impact environnemental et les coûts d'un bâtiment de la construction jusqu'à sa fin de vie, en s'appuyant sur les quantités de la maquette.",
        "Elle sert à comparer des options de conception, à documenter les certifications (LEED, Zéro carbone) et à choisir les matériaux les plus performants sur la durée." ] },
      'jumeau-numerique': { title: 'Jumeau numérique', text: [
        "Le jumeau numérique est une réplique virtuelle du bâtiment livré, enrichie des données d'exploitation : équipements, capteurs, historique d'entretien.",
        "Nous préparons la maquette tel-que-construit et sa connexion aux systèmes de gestion pour que le propriétaire puisse exploiter et entretenir son actif efficacement." ] },
      'surveillance-site': { title: 'Surveillance du site', text: [
        "Caméras fixes et solutions de vision par ordinateur pour suivre l'avancement du chantier à distance, sécuriser les lieux et documenter les interventions.",
        "Nous choisissons l'équipement, installons le réseau et configurons les alertes pour que vous ayez toujours un œil sur votre chantier." ] },
      'timelapse': { title: 'Timelapse et suivi de projet', text: [
        "Des caméras timelapse capturent l'évolution du chantier jour après jour : un outil de communication puissant pour le client et une preuve datée de l'avancement.",
        "Combiné aux captures 360° régulières, ce suivi visuel permet de comparer le construit à la maquette et de repérer rapidement les écarts." ] },
      'ia-sst': { title: 'IA SST', text: [
        "L'intelligence artificielle appliquée à la santé et sécurité au travail analyse les images du chantier pour détecter les situations à risque : absence d'équipement de protection, zones dangereuses, proximité d'engins.",
        "Nous intégrons ces outils à vos processus de prévention pour réduire les incidents et documenter la conformité." ] },
      'internet-site': { title: 'Internet sur site', text: [
        "Un chantier connecté a besoin d'un réseau fiable : liaisons cellulaires, Starlink, Wi-Fi maillé et équipements robustes adaptés aux conditions de terrain.",
        "Nous concevons et déployons l'infrastructure de connectivité pour que caméras, capteurs, tablettes et équipes aient accès aux données en tout temps." ] },
      'robotique': { title: 'Solutions robotiques', text: [
        "Robots de traçage, robots d'impression de plans au sol, drones et robots d'inspection : des outils qui exécutent des tâches répétitives avec précision et rapidité.",
        "Nous évaluons les cas d'usage rentables pour votre entreprise, puis nous encadrons les essais et le déploiement sur vos chantiers." ] },
      'capteurs': { title: 'Solutions de capteurs', text: [
        "Capteurs IoT pour suivre en continu la température et l'humidité, la cure du béton, les vibrations, la qualité de l'air ou la localisation des équipements.",
        "Les données remontent dans un tableau de bord qui déclenche des alertes et alimente vos rapports de qualité et de conformité." ] },
      'nuage-points': { title: 'Nuage de points', text: [
        "Le balayage laser 3D et la photogrammétrie par drone produisent un nuage de points : un relevé exact de l'existant ou du construit, au millimètre près.",
        "Nous l'utilisons pour créer des maquettes tel-que-construit, vérifier la conformité des travaux et préparer les rénovations sans mauvaises surprises." ] }
    }
  },
  en: {
    groups: { entreprise: 'Enterprise Solutions', bim: 'BIM Management', site: 'On-Site Integration' },
    items: {
      'crm': { title: 'CRM', text: [
        'A CRM (customer relationship management system) centralizes your contacts, bids and the follow-up of every business opportunity.',
        'We select and deploy the tool that fits your firm, then connect it to your projects so that sales and production teams share the same information.' ] },
      'gestion-projet': { title: 'Project Management', text: [
        'Project management platforms (Asana, Wrike, Microsoft Project, Procore, etc.) to plan, assign and track tasks, schedules and budgets.',
        'We configure templates for your project types and train your project managers so that tracking becomes a reflex rather than a chore.' ] },
      'erp': { title: 'ERP', text: [
        'An ERP (enterprise resource planning system) brings accounting, purchasing, payroll, resources and invoicing together in a single system.',
        'We guide selection, implementation and integration with your project tools to give you a real-time view of the profitability of every job site.' ] },
      'partage-fichiers': { title: 'File Sharing', text: [
        'A common data environment (SharePoint, Autodesk Construction Cloud, Dropbox Business...) where drawings, specifications and site documents are versioned and accessible to everyone.',
        'We structure folders, permissions and naming conventions so that everyone always finds the right version of the right document.' ] },
      'bep': { title: 'BEP Development', text: [
        'The BEP (BIM Execution Plan) defines how BIM will be used on your project: goals, levels of detail, responsibilities, file exchanges and deliverables.',
        'We write your BEP with you, in line with the owner\u2019s requirements and ISO 19650, so that every party works by the same rules.' ] },
      'collaboration-nuage': { title: 'Cloud Collaboration', text: [
        'Models and documents are shared in a cloud environment (Autodesk Construction Cloud, BIM 360, Trimble Connect...) where all stakeholders work from a single, up-to-date source.',
        'We set up the workspaces, approval workflows and access rights so that architects, engineers and contractors collaborate in real time, wherever they are.' ] },
      'planification-4d': { title: '4D Planning', text: [
        '4D links the 3D model to the project schedule: you can visualize the construction sequence week by week before the site even opens.',
        'It reveals logistics conflicts, optimizes crew mobilization and communicates the build sequence clearly to the client and subcontractors.' ] },
      'detection-conflits': { title: 'BIM Clash Detection', text: [
        'Clash detection compares the models of each discipline to find interferences: a pipe running through a beam, a duct crossing a column...',
        'With Navisworks or equivalent tools, we identify and document these conflicts upstream, avoiding costly rework on site.' ] },
      'coordination-bim': { title: 'BIM Coordination', text: [
        'BIM coordination is the process that regularly brings the disciplines together around the federated model to resolve clashes and validate technical choices.',
        'We run these meetings, maintain the issue log and make sure every model is updated according to the agreed exchange schedule.' ] },
      'cycle-de-vie': { title: 'Life Cycle Analysis', text: [
        'Life cycle analysis assesses the environmental impact and cost of a building from construction to end of life, using the quantities in the model.',
        'It is used to compare design options, document certifications (LEED, Zero Carbon) and choose the materials that perform best over time.' ] },
      'jumeau-numerique': { title: 'Digital Twin', text: [
        'A digital twin is a virtual replica of the delivered building, enriched with operational data: equipment, sensors, maintenance history.',
        'We prepare the as-built model and its connection to facility management systems so that the owner can operate and maintain the asset efficiently.' ] },
      'surveillance-site': { title: 'Site Monitoring', text: [
        'Fixed cameras and computer vision solutions to follow site progress remotely, secure the premises and document interventions.',
        'We select the equipment, install the network and configure alerts so that you always have an eye on your job site.' ] },
      'timelapse': { title: 'Timelapse and Project Tracking', text: [
        'Timelapse cameras capture the evolution of the site day after day: a powerful communication tool for the client and dated proof of progress.',
        'Combined with regular 360\u00b0 captures, this visual tracking lets you compare the build to the model and spot deviations quickly.' ] },
      'ia-sst': { title: 'AI for Health and Safety', text: [
        'Artificial intelligence applied to occupational health and safety analyzes site images to detect risky situations: missing protective equipment, hazardous zones, proximity to machinery.',
        'We integrate these tools into your prevention processes to reduce incidents and document compliance.' ] },
      'internet-site': { title: 'On-Site Internet', text: [
        'A connected job site needs a reliable network: cellular links, Starlink, mesh Wi-Fi and rugged equipment suited to field conditions.',
        'We design and deploy the connectivity infrastructure so that cameras, sensors, tablets and crews have access to data at all times.' ] },
      'robotique': { title: 'Robotic Solutions', text: [
        'Layout robots, floor-plan printing robots, drones and inspection robots: tools that perform repetitive tasks with precision and speed.',
        'We assess the use cases that pay off for your company, then supervise trials and deployment on your sites.' ] },
      'capteurs': { title: 'Sensor Solutions', text: [
        'IoT sensors to continuously monitor temperature and humidity, concrete curing, vibrations, air quality or equipment location.',
        'The data feeds a dashboard that triggers alerts and supports your quality and compliance reports.' ] },
      'nuage-points': { title: 'Point Cloud', text: [
        '3D laser scanning and drone photogrammetry produce a point cloud: an exact survey of existing or built conditions, down to the millimetre.',
        'We use it to create as-built models, verify the conformity of the work and prepare renovations without unpleasant surprises.' ] }
    }
  }
};


// Libellés courts écrits sur les arcs (une entrée par ligne)
var ARC_LABELS = {
  fr: {
    'crm': ['CRM'], 'gestion-projet': ['Gestion', 'de projet'], 'erp': ['ERP'], 'partage-fichiers': ['Partage', 'de Fichiers'],
    'bep': ['Développement', 'BEP'], 'collaboration-nuage': ['Collaboration', 'dans le nuage'], 'planification-4d': ['Planification', '4D'],
    'detection-conflits': ['Détection', 'des conflits BIM'], 'coordination-bim': ['Coordination', 'BIM'], 'cycle-de-vie': ['Analyse du', 'cycle de vie'],
    'jumeau-numerique': ['Jumeau', 'numérique'],
    'surveillance-site': ['Surveillance', 'du site'], 'timelapse': ['Timelapse et', 'suivi de projet'], 'ia-sst': ['IA SST'], 'internet-site': ['Internet', 'sur site'],
    'robotique': ['Solutions', 'robotiques'], 'capteurs': ['Solutions', 'de capteurs'], 'nuage-points': ['Nuage', 'de points']
  },
  en: {
    'crm': ['CRM'], 'gestion-projet': ['Project', 'Management'], 'erp': ['ERP'], 'partage-fichiers': ['File', 'Sharing'],
    'bep': ['BEP', 'Development'], 'collaboration-nuage': ['Cloud', 'Collaboration'], 'planification-4d': ['4D', 'Planning'],
    'detection-conflits': ['Clash', 'Detection'], 'coordination-bim': ['BIM', 'Coordination'], 'cycle-de-vie': ['Life Cycle', 'Analysis'],
    'jumeau-numerique': ['Digital', 'Twin'],
    'surveillance-site': ['Site', 'Monitoring'], 'timelapse': ['Timelapse &', 'Project Tracking'], 'ia-sst': ['AI Safety'], 'internet-site': ['On-Site', 'Internet'],
    'robotique': ['Robotic', 'Solutions'], 'capteurs': ['Sensor', 'Solutions'], 'nuage-points': ['Point', 'Cloud']
  }
};

function polar(cx, cy, r, deg) {
  var t = deg * Math.PI / 180;
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
}
function fmt(pt) { return pt[0].toFixed(2) + ',' + pt[1].toFixed(2); }

// Secteur annulaire de a1 à a2 (sens horaire), coins légèrement arrondis par le jeu aux coupes
function sectorPath(cx, cy, ri, ro, a1, a2, gapDeg) {
  var go = gapDeg * 0.5 * (200 / ro), gi = gapDeg * 0.5 * (200 / ri); // jeu constant en pixels
  var o1 = polar(cx, cy, ro, a1 + go), o2 = polar(cx, cy, ro, a2 - go);
  var i1 = polar(cx, cy, ri, a1 + gi), i2 = polar(cx, cy, ri, a2 - gi);
  var large = (a2 - a1) > 180 ? 1 : 0;
  return 'M' + fmt(o1) + ' A' + ro + ',' + ro + ' 0 ' + large + ' 1 ' + fmt(o2) +
    ' L' + fmt(i2) + ' A' + ri + ',' + ri + ' 0 ' + large + ' 0 ' + fmt(i1) + ' Z';
}
// Arc pour un texte : sens horaire (texte lisible tête vers l'extérieur) ou antihoraire (tête vers le centre)
function arcPath(cx, cy, r, a1, a2, clockwise) {
  var p1 = polar(cx, cy, r, a1), p2 = polar(cx, cy, r, a2);
  var large = (a2 - a1) > 180 ? 1 : 0;
  return clockwise
    ? 'M' + fmt(p1) + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + fmt(p2)
    : 'M' + fmt(p2) + ' A' + r + ',' + r + ' 0 ' + large + ' 0 ' + fmt(p1);
}

// Fenêtre d'explication (créée une seule fois)
var serviceModal = null;
function ensureServiceModal() {
  if (serviceModal) return serviceModal;
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'service-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<div class="modal service-modal">' +
      '<span class="modal-kicker"></span>' +
      '<div class="modal-header"><h3></h3>' +
        '<button type="button" class="modal-close" aria-label="' + (LANG === 'fr' ? 'Fermer' : 'Close') + '">&times;</button>' +
      '</div>' +
      '<div class="modal-body"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-locked');
    if (overlay._returnFocus) overlay._returnFocus.focus();
  }
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
  serviceModal = overlay;
  return overlay;
}

function openServiceModal(groupKey, itemKey, returnFocus) {
  var texts = SERVICE_TEXTS[LANG];
  var item = texts.items[itemKey];
  if (!item) return;
  var overlay = ensureServiceModal();
  overlay.querySelector('.modal-kicker').textContent = texts.groups[groupKey] || '';
  overlay.querySelector('.modal-header h3').textContent = item.title;
  overlay.querySelector('.modal-body').innerHTML =
    item.text.map(function (p) { return '<p>' + p + '</p>'; }).join('');
  overlay._returnFocus = returnFocus || null;
  overlay.classList.add('open');
  document.body.classList.add('modal-locked');
  overlay.querySelector('.modal-close').focus();
}

// ---------------------------------------------------------------------------
// Construction des infographies en SVG (nettes à toute taille, segments cliquables)
// ---------------------------------------------------------------------------
var SVG_NS = 'http://www.w3.org/2000/svg';
function svgEl(name, attrs) {
  var el = document.createElementNS(SVG_NS, name);
  for (var k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
var IMG_BASE = (document.documentElement.lang || 'en').slice(0, 2) === 'fr' ? '../' : '';

function buildInfographic(container) {
  var groupKey = container.getAttribute('data-infographic');
  var g = INFOGRAPHICS[groupKey];
  if (!g) return;
  var labels = ARC_LABELS[LANG];
  var SIZE = 420, cx = 210, cy = 210, ro = 200, ri = 134, rm = (ro + ri) / 2;
  var seven = g.segments.length > 4;
  var fontSize = seven ? 14.5 : 21;
  var lineGap = seven ? 9 : 12.5;

  // Titre au-dessus de l'anneau
  var title = document.createElement('h3');
  title.className = 'infographic-title';
  title.textContent = SERVICE_TEXTS[LANG].groups[groupKey];
  container.parentNode.insertBefore(title, container);

  var svg = svgEl('svg', { viewBox: '0 0 ' + SIZE + ' ' + SIZE, 'aria-hidden': 'true' });
  var defs = svgEl('defs', {});
  svg.appendChild(defs);

  // Illustration au centre (extraite de l'image d'origine, améliorée)
  var clipId = 'clip-' + groupKey;
  var clip = svgEl('clipPath', { id: clipId });
  clip.appendChild(svgEl('circle', { cx: cx, cy: cy, r: ri - 6 }));
  defs.appendChild(clip);
  var img = svgEl('image', {
    href: IMG_BASE + 'assets/img/services/center-' + groupKey + '.png',
    x: cx - (ri - 6), y: cy - (ri - 6), width: 2 * (ri - 6), height: 2 * (ri - 6),
    'clip-path': 'url(#' + clipId + ')', class: 'center-image', preserveAspectRatio: 'xMidYMid slice'
  });
  svg.appendChild(img);

  g.segments.forEach(function (seg, idx) {
    var a1 = seg.from, a2 = seg.to;
    var mid = ((a1 + a2) / 2) % 360; if (mid < 0) mid += 360;
    var clockwise = !(mid > 20 && mid < 160); // les segments du bas se lisent tête vers le centre
    var lines = labels[seg.key] || [SERVICE_TEXTS[LANG].items[seg.key].title];

    var path = svgEl('path', {
      d: sectorPath(cx, cy, ri, ro, a1, a2, seven ? 2.2 : 2.6),
      class: 'segment', tabindex: '0', role: 'button',
      'aria-label': SERVICE_TEXTS[LANG].items[seg.key].title
    });
    var tip = svgEl('title', {}); tip.textContent = SERVICE_TEXTS[LANG].items[seg.key].title;
    path.appendChild(tip);
    function activate(e) { e.preventDefault(); e.stopPropagation(); openServiceModal(groupKey, seg.key, path); }
    path.addEventListener('click', activate);
    path.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') activate(e); });
    svg.appendChild(path);

    // Textes sur arcs : la première ligne est la plus éloignée du "haut" du texte
    var group = svgEl('g', { class: 'segment-labels' });
    var n = lines.length;
    lines.forEach(function (line, li) {
      var offsetIndex = (li - (n - 1) / 2);            // -0.5 / +0.5 pour deux lignes, 0 pour une
      var r = clockwise ? rm + (-offsetIndex) * lineGap * 2 : rm + offsetIndex * lineGap * 2;
      // décalage de la ligne de base pour centrer verticalement le texte sur l'arc
      var baseline = clockwise ? fontSize * 0.35 : -fontSize * 0.35;
      var pid = 'arc-' + groupKey + '-' + idx + '-' + li;
      defs.appendChild(svgEl('path', { id: pid, d: arcPath(cx, cy, r, a1, a2, clockwise), fill: 'none' }));
      var text = svgEl('text', { class: 'segment-label', 'font-size': fontSize, dy: baseline });
      var tp = svgEl('textPath', { href: '#' + pid, startOffset: '50%', 'text-anchor': 'middle' });
      tp.textContent = line;
      text.appendChild(tp);
      group.appendChild(text);
    });
    svg.appendChild(group);
  });

  // Un clic sur l'illustration centrale fait tourner l'anneau
  img.addEventListener('click', function () {
    if (svg.classList.contains('tourne')) return;
    svg.classList.add('tourne');
  });
  svg.addEventListener('animationend', function () { svg.classList.remove('tourne'); });

  container.appendChild(svg);
}
document.querySelectorAll('.infographic[data-infographic]').forEach(buildInfographic);

// ---------------------------------------------------------------------------
// Défilement par section : un coup de molette = une section, avec une animation
// douce (au lieu de l'accrochage CSS, qui donne une sensation de blocage).
// Actif seulement avec une souris/trackpad sur écran large.
// ---------------------------------------------------------------------------
(function () {
  var HEADER = 88;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = window.matchMedia('(min-width: 681px) and (hover: hover)');
  if (reduced || !wide.matches) return;

  var targets = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var footer = document.querySelector('.site-footer');
  if (footer) targets.push(footer);
  if (targets.length < 2) return;

  var animating = false;
  var lastWheel = 0;

  function topOf(el) {
    return el === footer
      ? document.documentElement.scrollHeight - window.innerHeight
      : el.getBoundingClientRect().top + window.scrollY - HEADER;
  }
  function currentIndex() {
    var y = window.scrollY, best = 0, bestDist = Infinity;
    targets.forEach(function (el, i) {
      var d = Math.abs(topOf(el) - y);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function scrollToY(target) {
    var start = window.scrollY, delta = target - start;
    if (Math.abs(delta) < 2) return;
    var duration = Math.min(900, 450 + Math.abs(delta) * 0.35);
    var t0 = null;
    animating = true;
    document.documentElement.style.scrollBehavior = 'auto';
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, start + delta * easeInOut(p));
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        document.documentElement.style.scrollBehavior = '';
        // petite pause pour absorber l'inertie du trackpad
        setTimeout(function () { animating = false; }, 120);
      }
    }
    requestAnimationFrame(frame);
  }

  function go(dir) {
    var i = currentIndex();
    var cur = targets[i];
    var rect = cur.getBoundingClientRect();
    // Section plus haute que la fenêtre : on la parcourt d'abord
    if (dir > 0 && rect.bottom > window.innerHeight + 4 && cur !== footer) {
      scrollToY(Math.min(window.scrollY + window.innerHeight * 0.85, topOf(cur) + rect.height - window.innerHeight + HEADER));
      return;
    }
    if (dir < 0 && rect.top < HEADER - 4) {
      scrollToY(Math.max(window.scrollY - window.innerHeight * 0.85, topOf(cur)));
      return;
    }
    var next = Math.max(0, Math.min(targets.length - 1, i + dir));
    scrollToY(topOf(targets[next]));
  }

  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) return;                       // zoom navigateur
    if (document.body.classList.contains('modal-locked')) return;
    // les rangées défilantes (témoignages, réalisations) gardent leur molette horizontale
    if (e.target.closest && e.target.closest('.reviews-track, .project-track') && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    var now = Date.now();
    if (animating || now - lastWheel < 60) { lastWheel = now; return; }
    lastWheel = now;
    if (Math.abs(e.deltaY) < 4) return;
    go(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  window.addEventListener('keydown', function (e) {
    if (e.target.matches('input, textarea, select')) return;
    if (document.body.classList.contains('modal-locked')) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) { e.preventDefault(); if (!animating) go(1); }
    if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) { e.preventDefault(); if (!animating) go(-1); }
  });
})();

// Scroll-reveal for sections and cards
var revealTargets = document.querySelectorAll(
  '.section h2, .card, .pillar, .review, .project-card, .roadmap-heading, .step-card, .logo-col, .clients-copy, .stat-card'
);
revealTargets.forEach(function (el) { el.classList.add('reveal'); });

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach(function (el) { observer.observe(el); });
} else {
  revealTargets.forEach(function (el) { el.classList.add('visible'); });
}
