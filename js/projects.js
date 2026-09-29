// ---------------------------------------------------------------------------
// Réalisations : cartes qui défilent en continu, et fenêtre de détail par projet.
// Les textes existent en anglais et en français ; la langue vient de <html lang>.
// Les images sont dans assets/img/projects/ (un fichier par projet).
// ---------------------------------------------------------------------------
var PROJECTS = {
  en: [
    {
      key: 'olympic-stadium', img: 'olympic-stadium.jpg',
      kicker: 'Roof replacement', title: 'Montreal Olympic Stadium',
      sections: [
        { h: 'Project scope', p: 'We worked on the replacement of the roof of the Montreal Olympic Stadium in collaboration with Pomerleau, Les installations électriques Pichette and Pinnacle Infotech. The goal was to ensure full BIM coordination for the electrical portion over a two-year period, overcoming the complex challenges of this iconic project and ensuring smooth, efficient execution.' },
        { h: 'Electrical BIM services', items: [
          '3D Revit modeling (LOD 350) of all electrical systems, including power conduits (20 mm+), panels, transformers, lighting fixtures and fire detectors',
          'MEP coordination with HVAC, plumbing, architecture and structure via Navisworks',
          'Management of the federated model and clash detection',
          '2D construction drawings, as-built drawings and prefabrication plans' ] },
        { h: 'Technology platform', items: [ 'Autodesk Revit', 'Autodesk Navisworks' ] },
        { h: 'Key deliverables', items: [ 'Coordinated 3D model', 'Clash detection reports', 'NEC clearance documentation', 'As-built documentation' ] }
      ]
    },
    {
      key: 'espace-montmorency', img: 'espace-montmorency.jpg',
      kicker: 'Mixed-use development', title: 'Espace Montmorency',
      sections: [
        { h: 'Project highlights', items: [ 'Mixed-use development', 'Office tower', 'Two residential towers', 'Hotel tower', 'Two-story retail podium', 'Three levels of underground parking' ] },
        { h: 'Strategic implementation', items: [
          'Development of a BIM Execution Plan (BEP)',
          'Real-time, cloud-hosted coordination across six sectors simultaneously to accelerate construction',
          'Clash detection and issue resolution',
          'Accurate validation of geolocation and parameter data',
          'Point cloud and drone scanning with as-built validation',
          'Development of a user-facing BIM-based application' ] },
        { h: 'Impact and innovation', items: [
          'Cutting-edge user experience',
          'Seamless simultaneous construction across six project sectors',
          'Real-time digital twin with integrated element parameters, hardware API integrations and as-built documentation for modern building operations',
          'Resolution of thousands of conflicts before construction, saving millions of dollars',
          'BIM-based sales tool to enhance project visualization' ] }
      ]
    },
    {
      key: 'district-molson', img: 'district-molson.jpg',
      kicker: 'Urban redevelopment', title: 'District Molson',
      sections: [
        { h: 'Project highlights', items: [ 'Existing iconic historic buildings', 'Long-term active project (10 years or more)', '6 million square feet of construction', '1 million square feet of commercial and office space', '5,000 residential units', 'Civil infrastructure', 'Civic and institutional elements' ] },
        { h: 'Strategic implementation', items: [
          'Detailed point cloud scans of the existing infrastructure',
          'Development of a multi-layer BIM Execution Plan (BEP) to address the diversity of phases and uses within the development',
          'Creation of a project-scale, user-facing BIM application',
          'Cyclical LOD to navigate unique, project-specific stages for each phase (master planning, proforma, municipal assessment, community approval, etc.)',
          'Real-time, cloud-hosted coordination of modeling, including point cloud scans of existing conditions',
          'Development of training documentation to ensure consistency across all phases and throughout the project’s duration' ] },
        { h: 'Impact and innovation', items: [
          'Accelerated approval process thanks to complete, highly visual data',
          'Effective coordination despite complex existing conditions',
          'Precise and fast modeling thanks to integrated data capture and coordination processes',
          'Low rework rate thanks to the measured cyclical LOD approach' ] }
      ]
    },
    {
      key: 'universite-montreal', img: 'universite-montreal.jpg',
      kicker: 'Renovation of the RGO building', title: 'University of Montreal',
      sections: [
        { h: 'Project overview', p: 'The renovation of the RGO building at the University of Montreal (UdeM), with Pomerleau, Pinnacle Infotech, MécanicAction and Les installations électriques Pichette. The primary goal was to integrate BIM technology into the renovation process to overcome existing challenges and ensure a smooth and efficient renovation.' },
        { h: 'Challenges addressed', items: [ 'Scalability issues', 'Inefficient workflows', 'Lack of project visibility', 'Poor communication and departmental silos', 'Ineffective data capture and analysis', 'On-site workflow challenges', 'Disconnected systems' ] },
        { h: 'Tools and technology', items: [ 'Procore', 'Trimble Connect', 'Autodesk Revit', 'Autodesk Construction Cloud', 'OpenSpace', 'Navisworks', 'Bluebeam' ] },
        { h: 'Implementation and benefits', items: [
          'Trimble Connect: a cloud-based platform providing remote access to project data without additional software, with automatic clash detection and smooth communication among stakeholders',
          'Procore and Revit: real-time project tracking, improved resource management and reduced design errors, keeping the project on schedule and within budget',
          'Cloud-based workflows: multi-platform tools such as Bluebeam and Navisworks increased accessibility and collaboration and streamlined the entire process' ] },
        { h: 'Project team', items: [ 'Firas Saab, BIM Director', 'Yaser Kojori, BIM Manager (Mechanical)', 'Mathieu Cardin, BIM Manager (Electrical)' ] },
        { h: '2025', p: 'The project is ongoing, with continuous monitoring, the deployment of new tools, and training and support for all departments. Despite space constraints within the existing structure, it is steadily progressing toward completion.' }
      ]
    },
    {
      key: 'vantage-qc61', img: 'vantage-qc61.jpg',
      kicker: 'Data center', title: 'Vantage QC61',
      sections: [
        { h: 'Project highlights', items: [ 'Data center project', '350,000 square feet of construction', '30 MW computing capacity', '2 data modules of 15 MW each', '428 W per square foot density', 'Powered 100% by renewable energy' ] },
        { h: 'Strategic implementation', items: [
          'Development of a BIM Execution Plan (BEP)',
          'Real-time, cloud-hosted coordination',
          'Coordination of 12 models from 12 different professionals',
          'Clash detection and issue resolution',
          'Modeling executed for certain professionals from 2D plans',
          'Accurate validation of geolocation and parameter data',
          'Point cloud scanning and as-built validation' ] },
        { h: 'Impact and innovation', items: [
          'Clear project requirements for the bidding phase',
          '40% faster coordination, enabling accelerated, low-risk construction',
          'Identification and resolution of over 350 conflicts that would otherwise have gone undetected',
          'Delivery of accurate as-built documentation to the client for operations' ] }
      ]
    },
    {
      key: 'pavillons-49', img: 'pavillons-49.jpg',
      kicker: 'Nordic Structures', title: 'The Pavillons of the 49°',
      sections: [
        { h: 'Problems', items: [
          'Lack of modeling knowledge: limited expertise in transitioning from traditional 2D plans to 3D models',
          'Software resource limitations: insufficient tools and resources for effective project modeling and coordination',
          'Inadequate workflow standards: non-standardized processes leading to inefficiencies and errors in project execution' ] },
        { h: 'Project highlights', items: [ 'Modular prefabricated residential pilot project', '46 prefabricated units', '4-story wooden structure', 'Sustainable construction with minimal waste' ] },
        { h: 'Strategic implementation', items: [ 'Full modeling of all disciplines', 'Development of unique modular modeling workflows', 'Millimeter-accurate coordination for a perfect on-site fit', 'Real-time, cloud-hosted coordination for increased precision and speed', 'Automated quantity takeoffs' ] },
        { h: 'Impact and innovation', items: [ 'Unique factory-based manufacturing process to expand the pool of scarce labor', 'Usable rental modeling', 'Mitigation of complexities related to weather and site conditions', 'Real-time modular calculations enabling iterative designs' ] }
      ]
    },
    {
      key: 'montoni', img: 'montoni.jpg',
      kicker: 'Digital transformation', title: 'Montoni',
      sections: [
        { h: 'Project overview', p: 'A construction company based in Laval wanted to transition from a traditional model to an innovative industry leader. Facing the rapid changes in the sector, they called on us to analyze their operations and develop a strategic roadmap for this transformation.' },
        { h: 'Challenges addressed', items: [ 'Scalability issues', 'Inefficient workflows', 'Lack of project visibility', 'Poor communication and departmental silos', 'Ineffective data capture and analysis', 'On-site workflow challenges', 'Disconnected systems' ] },
        { h: 'Tools and technology', items: [ 'Salesforce', 'Acumatica', 'Procore', 'Autodesk Revit', 'Autodesk Construction Cloud', 'Station IX', 'Power BI', 'Navisworks', 'Bluebeam', 'AI tools', 'NFC business cards' ] },
        { h: 'Implementation and benefits', items: [
          'Transition to 100% 3D BIM modeling: improved resource management and reduced design errors',
          'Implementation of Procore and Power BI: real-time project tracking and enhanced decision-making',
          'Adoption of a cloud-based common working environment: streamlined inter-departmental communication using Autodesk Construction Cloud and Salesforce CRM',
          'Use of AI tools and Power BI: efficient data storage and comprehensive analytics',
          'Shift to multi-platform, cloud-based workflows: increased accessibility and collaboration with tools like Bluebeam and Navisworks',
          'Development of an integrated API-based architecture: seamless communication between platforms and advanced automation' ] },
        { h: 'Timeline', p: 'Started in March 2020. The project is ongoing in 2025, with continuous monitoring, deployment of new tools and ongoing training for all departments.' }
      ]
    }
  ],
  fr: [
    {
      key: 'olympic-stadium', img: 'olympic-stadium.jpg',
      kicker: 'Remplacement de la toiture', title: 'Stade olympique de Montréal',
      sections: [
        { h: 'Portée du projet', p: 'Nous avons travaillé au remplacement de la toiture du Stade olympique de Montréal en collaboration avec Pomerleau, Les installations électriques Pichette et Pinnacle Infotech. L’objectif était d’assurer la coordination BIM complète du volet électrique sur une période de deux ans, en surmontant les défis complexes de ce projet emblématique et en garantissant une exécution fluide et efficace.' },
        { h: 'Services BIM électriques', items: [
          'Modélisation 3D Revit (LOD 350) de tous les systèmes électriques : conduits d’alimentation (20 mm et plus), panneaux, transformateurs, luminaires et détecteurs d’incendie',
          'Coordination MEP avec la ventilation, la plomberie, l’architecture et la structure dans Navisworks',
          'Gestion de la maquette fédérée et détection des conflits',
          'Dessins de construction 2D, dessins tels que construits et plans de préfabrication' ] },
        { h: 'Plateforme technologique', items: [ 'Autodesk Revit', 'Autodesk Navisworks' ] },
        { h: 'Livrables clés', items: [ 'Maquette 3D coordonnée', 'Rapports de détection de conflits', 'Documentation des dégagements NEC', 'Documentation telle que construite' ] }
      ]
    },
    {
      key: 'espace-montmorency', img: 'espace-montmorency.jpg',
      kicker: 'Développement à usage mixte', title: 'Espace Montmorency',
      sections: [
        { h: 'Faits saillants', items: [ 'Développement à usage mixte', 'Tour de bureaux', 'Deux tours résidentielles', 'Tour hôtelière', 'Podium commercial de deux étages', 'Trois niveaux de stationnement souterrain' ] },
        { h: 'Mise en œuvre stratégique', items: [
          'Élaboration d’un plan d’exécution BIM (PEB)',
          'Coordination infonuagique en temps réel sur six secteurs simultanément pour accélérer la construction',
          'Détection des conflits et résolution des problèmes',
          'Validation précise des données de géolocalisation et de paramètres',
          'Numérisation par nuage de points et par drone avec validation tel que construit',
          'Développement d’une application BIM destinée aux utilisateurs' ] },
        { h: 'Impact et innovation', items: [
          'Expérience utilisateur de pointe',
          'Construction simultanée fluide sur six secteurs du projet',
          'Jumeau numérique en temps réel avec paramètres d’éléments intégrés, intégrations API matérielles et documentation telle que construite pour l’exploitation moderne du bâtiment',
          'Résolution de milliers de conflits avant la construction, pour des millions de dollars d’économies',
          'Outil de vente basé sur le BIM pour améliorer la visualisation du projet' ] }
      ]
    },
    {
      key: 'district-molson', img: 'district-molson.jpg',
      kicker: 'Requalification urbaine', title: 'District Molson',
      sections: [
        { h: 'Faits saillants', items: [ 'Bâtiments historiques emblématiques existants', 'Projet actif à long terme (10 ans et plus)', '6 millions de pieds carrés de construction', '1 million de pieds carrés d’espaces commerciaux et de bureaux', '5 000 unités résidentielles', 'Infrastructures civiles', 'Éléments civiques et institutionnels' ] },
        { h: 'Mise en œuvre stratégique', items: [
          'Relevés détaillés par nuage de points des infrastructures existantes',
          'Élaboration d’un plan d’exécution BIM multicouche pour répondre à la diversité des phases et des usages du développement',
          'Création d’une application BIM à l’échelle du projet, destinée aux utilisateurs',
          'LOD cyclique pour traverser les étapes propres à chaque phase (planification directrice, pro forma, évaluation municipale, approbation communautaire, etc.)',
          'Coordination infonuagique en temps réel de la modélisation, incluant les relevés par nuage de points des conditions existantes',
          'Développement d’une documentation de formation pour assurer la cohérence à travers toutes les phases et pendant toute la durée du projet' ] },
        { h: 'Impact et innovation', items: [
          'Processus d’approbation accéléré grâce à des données complètes et hautement visuelles',
          'Coordination efficace malgré les conditions existantes complexes',
          'Modélisation précise et rapide grâce à l’intégration des processus de capture de données et de coordination',
          'Faible taux de reprises grâce à l’approche LOD cyclique mesurée' ] }
      ]
    },
    {
      key: 'universite-montreal', img: 'universite-montreal.jpg',
      kicker: 'Rénovation du pavillon RGO', title: 'Université de Montréal',
      sections: [
        { h: 'Aperçu du projet', p: 'La rénovation du pavillon RGO de l’Université de Montréal (UdeM), avec Pomerleau, Pinnacle Infotech, MécanicAction et Les installations électriques Pichette. L’objectif principal était d’intégrer la technologie BIM au processus de rénovation pour surmonter les défis existants et assurer une rénovation fluide et efficace.' },
        { h: 'Défis abordés', items: [ 'Problèmes de mise à l’échelle', 'Flux de travail inefficaces', 'Manque de visibilité sur le projet', 'Communication déficiente et silos entre services', 'Capture et analyse de données inefficaces', 'Difficultés dans les flux de travail au chantier', 'Systèmes déconnectés' ] },
        { h: 'Outils et technologies', items: [ 'Procore', 'Trimble Connect', 'Autodesk Revit', 'Autodesk Construction Cloud', 'OpenSpace', 'Navisworks', 'Bluebeam' ] },
        { h: 'Mise en œuvre et bénéfices', items: [
          'Trimble Connect : une plateforme infonuagique donnant un accès à distance aux données du projet sans logiciel supplémentaire, avec détection automatique des conflits et une communication fluide entre les intervenants',
          'Procore et Revit : suivi du projet en temps réel, meilleure gestion des ressources et réduction des erreurs de conception, pour un projet dans les délais et le budget',
          'Flux de travail infonuagiques : des outils multiplateformes comme Bluebeam et Navisworks ont accru l’accessibilité et la collaboration et simplifié l’ensemble du processus' ] },
        { h: 'Équipe de projet', items: [ 'Firas Saab, directeur BIM', 'Yaser Kojori, gestionnaire BIM (mécanique)', 'Mathieu Cardin, gestionnaire BIM (électricité)' ] },
        { h: '2025', p: 'Le projet est en cours, avec un suivi continu, le déploiement de nouveaux outils, ainsi que la formation et le soutien de tous les services. Malgré les contraintes d’espace de la structure existante, il progresse régulièrement vers son achèvement.' }
      ]
    },
    {
      key: 'vantage-qc61', img: 'vantage-qc61.jpg',
      kicker: 'Centre de données', title: 'Vantage QC61',
      sections: [
        { h: 'Faits saillants', items: [ 'Projet de centre de données', '350 000 pieds carrés de construction', 'Capacité de calcul de 30 MW', '2 modules de données de 15 MW chacun', 'Densité de 428 W par pied carré', 'Alimenté à 100 % en énergie renouvelable' ] },
        { h: 'Mise en œuvre stratégique', items: [
          'Élaboration d’un plan d’exécution BIM (PEB)',
          'Coordination infonuagique en temps réel',
          'Coordination de 12 maquettes provenant de 12 professionnels différents',
          'Détection des conflits et résolution des problèmes',
          'Modélisation réalisée pour certains professionnels à partir de plans 2D',
          'Validation précise des données de géolocalisation et de paramètres',
          'Numérisation par nuage de points et validation tel que construit' ] },
        { h: 'Impact et innovation', items: [
          'Exigences de projet claires pour la phase d’appel d’offres',
          'Coordination 40 % plus rapide, permettant une construction accélérée et à faible risque',
          'Identification et résolution de plus de 350 conflits qui seraient autrement passés inaperçus',
          'Livraison au client d’une documentation telle que construite précise pour l’exploitation' ] }
      ]
    },
    {
      key: 'pavillons-49', img: 'pavillons-49.jpg',
      kicker: 'Nordic Structures', title: 'Les Pavillons du 49°',
      sections: [
        { h: 'Problèmes', items: [
          'Manque de connaissances en modélisation : expertise limitée pour passer des plans 2D traditionnels aux maquettes 3D',
          'Ressources logicielles limitées : outils et ressources insuffisants pour une modélisation et une coordination efficaces',
          'Normes de travail inadéquates : processus non standardisés entraînant des inefficacités et des erreurs d’exécution' ] },
        { h: 'Faits saillants', items: [ 'Projet pilote résidentiel modulaire préfabriqué', '46 unités préfabriquées', 'Structure en bois de 4 étages', 'Construction durable avec un minimum de déchets' ] },
        { h: 'Mise en œuvre stratégique', items: [ 'Modélisation complète de toutes les disciplines', 'Développement de flux de travail de modélisation modulaire uniques', 'Coordination au millimètre pour un assemblage parfait au chantier', 'Coordination infonuagique en temps réel pour plus de précision et de rapidité', 'Relevés de quantités automatisés' ] },
        { h: 'Impact et innovation', items: [ 'Processus de fabrication en usine unique pour élargir le bassin de main-d’œuvre rare', 'Modélisation locative utilisable', 'Atténuation des complexités liées aux conditions météo et de chantier', 'Calculs modulaires en temps réel permettant des conceptions itératives' ] }
      ]
    },
    {
      key: 'montoni', img: 'montoni.jpg',
      kicker: 'Transformation numérique', title: 'Montoni',
      sections: [
        { h: 'Aperçu du projet', p: 'Une entreprise de construction établie à Laval voulait passer d’un modèle traditionnel à celui d’un chef de file innovant de l’industrie. Devant les changements rapides du secteur, elle a fait appel à nous pour analyser ses opérations et élaborer une feuille de route stratégique pour cette transformation.' },
        { h: 'Défis abordés', items: [ 'Problèmes de mise à l’échelle', 'Flux de travail inefficaces', 'Manque de visibilité sur les projets', 'Communication déficiente et silos entre services', 'Capture et analyse de données inefficaces', 'Difficultés dans les flux de travail au chantier', 'Systèmes déconnectés' ] },
        { h: 'Outils et technologies', items: [ 'Salesforce', 'Acumatica', 'Procore', 'Autodesk Revit', 'Autodesk Construction Cloud', 'Station IX', 'Power BI', 'Navisworks', 'Bluebeam', 'Outils d’IA', 'Cartes d’affaires NFC' ] },
        { h: 'Mise en œuvre et bénéfices', items: [
          'Passage à une modélisation BIM 3D à 100 % : meilleure gestion des ressources et réduction des erreurs de conception',
          'Implantation de Procore et de Power BI : suivi des projets en temps réel et prise de décision améliorée',
          'Adoption d’un environnement de travail commun infonuagique : communication interservices simplifiée avec Autodesk Construction Cloud et le CRM Salesforce',
          'Utilisation d’outils d’IA et de Power BI : stockage efficace des données et analyses complètes',
          'Passage à des flux de travail infonuagiques multiplateformes : accessibilité et collaboration accrues avec des outils comme Bluebeam et Navisworks',
          'Développement d’une architecture intégrée basée sur des API : communication fluide entre les plateformes et automatisation avancée' ] },
        { h: 'Échéancier', p: 'Démarré en mars 2020. Le projet se poursuit en 2025, avec un suivi continu, le déploiement de nouveaux outils et la formation continue de tous les services.' }
      ]
    }
  ]
};

(function () {
  var host = document.getElementById('project-marquee');
  if (!host) return;
  var lang = (document.documentElement.lang || 'en').slice(0, 2) === 'fr' ? 'fr' : 'en';
  var list = PROJECTS[lang];
  var base = (lang === 'fr' ? '../' : '') + 'assets/img/projects/';
  var T = lang === 'fr'
    ? { open: 'Voir le projet', close: 'Fermer', details: 'Détails' }
    : { open: 'View project', close: 'Close', details: 'Details' };

  // Une carte par projet, puis la même série une seconde fois pour un défilement sans coupure
  function carte(p) {
    return '<button type="button" class="project-card" data-project="' + p.key + '" aria-label="' + T.open + ' : ' + p.title + '">' +
      '<img src="' + base + p.img + '" alt="" loading="lazy">' +
      '<span class="project-text"><span class="project-kicker">' + p.kicker + '</span><span class="project-title">' + p.title + '</span></span>' +
      '<span class="project-cta" aria-hidden="true">' + T.details + ' <span>&rarr;</span></span>' +
    '</button>';
  }
  // Grand écran : la série deux fois, pour un défilement continu sans coupure.
  // Mobile : la série une seule fois, une carte par écran, avancée automatique.
  var mobile = window.matchMedia('(max-width: 680px)');
  function construire() {
    var serie = list.map(carte).join('');
    host.innerHTML = '<div class="project-track">' + serie + (mobile.matches ? '' : serie) + '</div>';
  }
  construire();
  if (mobile.addEventListener) mobile.addEventListener('change', construire);

  // Mobile : passage à la carte suivante toutes les 4 s, en pause pendant qu'on touche l'écran
  var minuterie = null, pauseTactile = null;
  function carteVisible() {
    var cards = host.querySelectorAll('.project-card');
    var meilleure = 0, distance = Infinity, centre = host.scrollLeft + host.clientWidth / 2;
    cards.forEach(function (c, i) {
      var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centre);
      if (d < distance) { distance = d; meilleure = i; }
    });
    return meilleure;
  }
  function suivante() {
    if (!mobile.matches || document.body.classList.contains('modal-locked')) return;
    var cards = host.querySelectorAll('.project-card');
    if (!cards.length) return;
    var i = (carteVisible() + 1) % cards.length;
    var c = cards[i];
    host.scrollTo({ left: c.offsetLeft - (host.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  }
  function demarrer() { clearInterval(minuterie); minuterie = setInterval(suivante, 4000); }
  host.addEventListener('touchstart', function () { clearInterval(minuterie); clearTimeout(pauseTactile); }, { passive: true });
  host.addEventListener('touchend', function () { clearTimeout(pauseTactile); pauseTactile = setTimeout(demarrer, 6000); }, { passive: true });
  demarrer();

  // Fenêtre de détail : texte à gauche, image à droite
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'project-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<div class="modal project-modal">' +
      '<button type="button" class="modal-close" aria-label="' + T.close + '">&times;</button>' +
      '<div class="project-modal-text">' +
        '<span class="modal-kicker"></span><h3></h3><div class="project-modal-body"></div>' +
      '</div>' +
      '<div class="project-modal-image"><img src="" alt=""></div>' +
    '</div>';
  document.body.appendChild(overlay);

  function fermer() {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-locked');
    if (overlay._returnFocus) overlay._returnFocus.focus();
  }
  function ouvrir(key, returnFocus) {
    var p = list.filter(function (x) { return x.key === key; })[0];
    if (!p) return;
    overlay.querySelector('.modal-kicker').textContent = p.kicker;
    overlay.querySelector('h3').textContent = p.title;
    overlay.querySelector('.project-modal-body').innerHTML = p.sections.map(function (s) {
      return '<h4>' + s.h + '</h4>' + (s.items
        ? '<ul>' + s.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'
        : '<p>' + s.p + '</p>');
    }).join('');
    var img = overlay.querySelector('.project-modal-image img');
    img.src = base + p.img;
    img.alt = p.title;
    overlay.querySelector('.project-modal-text').scrollTop = 0;
    overlay._returnFocus = returnFocus || null;
    overlay.classList.add('open');
    document.body.classList.add('modal-locked');
    overlay.querySelector('.modal-close').focus();
  }

  host.addEventListener('click', function (e) {
    var card = e.target.closest('.project-card');
    if (card) ouvrir(card.getAttribute('data-project'), card);
  });
  overlay.querySelector('.modal-close').addEventListener('click', fermer);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) fermer(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) fermer();
  });
})();
