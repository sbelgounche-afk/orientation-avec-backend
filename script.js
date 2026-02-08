// =========================================================================
// ORIENT'MAROC - SYSTÈME D'ORIENTATION INTELLIGENT (Refactorisé & Optimisé)
// =========================================================================

// --- 1. DONNÉES BRUTES ---
const RAW_DATA = {
    "Achat": ["Acheteur", "Acheteur industriel", "Acheteur informatique", "Agent de soin", "Assistant achat", "Assistant chef de produit tourisme", "Conducteur de travaux agencement", "Directeur achat", "Ingénieur achat", "Ingénieur d'études", "Peintre aéronautique", "Photographe assistant", "Professeur fitness", "Responsable achats", "Responsable approvisionnement", "Responsable crédit", "Technicien d'achats", "Téléopérateur"],
    "Administratif": ["Adjoint des cadres hospitaliers", "Agent administratif", "Agent distribution courrier", "Agent services généraux", "Assistant administratif", "Assistant de direction", "Assistant polyvalent", "Assistant technique", "Chargé de mission handicap", "Collaborateur administrateur judiciaire", "Dactylo", "Directeur administratif financier", "Directeur associé", "Directeur des services techniques", "Directeur général", "Employé administratif", "Gestionnaire administratif", "Greffier", "Responsable administratif", "Responsable des services généraux", "Rédacteur des débats", "Secrétaire général", "Standardiste", "Traducteur"],
    "Agricole": ["Agent d'élevage", "Agent viticole", "Agriculteur", "Apiculteur", "Bûcheron", "Chauffeur agricole", "Conseiller foncier", "Cueilleur", "Eleveur", "Horticulteur", "Ingénieur agricole", "Ingénieur agronome", "Magasinier agricole", "Maraîcher", "Mécanicien agricole", "Ouvrier agricole", "Palefrenier", "Pépiniériste", "Vendangeur"],
    "Alimentation": ["Boucher", "Boulanger", "Caviste", "Charcutier", "Charcutier-traiteur", "Chef boucher", "Chocolatier", "Cuisinier traiteur", "Désosseur", "Fromager", "Glacier", "Pizzaiolo", "Pâtissier chocolatier", "Responsable qualité agroalimentaire"],
    "Aménagement": ["Géographe", "Urbaniste"],
    "Architecture": ["Architecte", "Architecte d'intérieur", "Assistant architecte", "BIM Manager", "Cartographe", "Collaborateur d'architecte", "Décorateur", "Paysagiste"],
    "Artisanat": ["Bijoutier", "Carreleur", "Charpentier", "Charpentier couvreur", "Chaudronnier", "Cordonnier", "Couturier", "Ebéniste", "Ferronnier", "Fleuriste", "Forgeron", "Gemmologue", "Graveur", "Horloger", "Imprimeur", "Maroquinier", "Maréchal ferrant", "Menuisier", "Menuisier poseur aluminium", "Menuisier-agenceur", "Métallier serrurier", "Ouvrier boulanger", "Poseur cuisine", "Poseur menuiserie PVC", "Pâtissier tourier", "Pêcheur", "Relieur", "Serrurier", "Styliste", "Tailleur", "Tailleur de pierre", "Tapissier", "Technicien chaudronnier"],
    "Assurance": ["Actuaire", "Collaborateur agence assurances", "Comptable assurance", "Conseiller commercial assurance", "Conseiller mutualiste", "Courtier", "Courtier en assurances", "Expert en assurances", "Expert en sinistres", "Gestionnaire contrats", "Gestionnaire d'assurances", "Gestionnaire frais de santé", "Gestionnaire middle office", "Souscripteur", "Tarificateur assurance"],
    "Banque": ["Analyste crédit", "Chargé de clientèle", "Chargé de conformité", "Conseiller accueil banque", "Conseiller clientèle", "Dabiste", "Directeur d'agence", "Gestionnaire back office", "Guichetier", "Responsable recouvrement"],
    "Btp": ["Aide-maçon", "Assistant travaux", "Bancheur", "Bardeur", "Calorifugeur", "Canalisateur", "Chargé d'affaires btp", "Chauffagiste", "Chauffeur tp", "Chef d'équipe TP", "Chef d'équipe vrd", "Chef de chantier", "Coffreur", "Coffreur bancheur", "Coffreur boiseur", "Conducteur de grue mobile", "Conducteur de nacelle", "Conducteur de pelle", "Conducteur de travaux", "Conducteur engins", "Contremaitre", "Coordinateur technique", "Cordiste", "Courtier travaux", "Couvreur", "Couvreur zingueur", "Cuisiniste", "Câbleur", "Dessinateur projeteur électricité", "Dessinateur-projeteur bâtiment", "Deviseur", "Diagnostiqueur immobilier", "Directeur travaux", "Désamianteur", "Echafaudeur", "Economiste de la construction", "Electricien", "Electricien du bâtiment", "Etancheur", "Façadier", "Ferrailleur", "Finisseur", "Foreur", "Formateur CACES", "Frigoriste", "Grutier", "Grutier mobile", "Géomètre topographe", "Ingénieur BTP", "Ingénieur construction", "Ingénieur efficacité énergétique", "Ingénieur géotechnicien", "Ingénieur structures", "Ingénieur travaux", "Ingénieur études de prix", "Manoeuvre", "Maçon", "Menuisier aluminium", "Menuisier poseur", "Miroitier", "Métreur", "Ouvrier qualifié", "Ouvrier vrd", "Peintre en bâtiment", "Pilote OPC", "Plaquiste", "Plaquiste enduiseur", "Plombier", "Plâtrier", "Polisseur", "Pontier", "Projeteur béton armé", "Ramoneur", "Responsable maintenance travaux neufs", "Responsable travaux", "Sableur", "Solier moquettiste", "Technicien acoustique", "Technicien bâtiment", "Technicien génie civil", "Technicien géomètre"],
    "Chimie": ["Aromaticien", "Biochimiste", "Ingénieur chimiste", "Ingénieur formulation", "Ingénieur génie chimique", "Laborantin", "Responsable de laboratoire", "Responsable laboratoire chimie", "Responsable scientifique", "Technicien biochimiste", "Technicien chimiste", "Technicien de laboratoire", "Technicien de laboratoire biologie", "Technicien génie chimique"],
    "Commerce": ["Agent commercial", "Assistant administratif commercial", "Assistant commercial", "Assistant export", "Buraliste", "Business developer", "Chargé d'affaires", "Chargé de développement commercial", "Chef de projet CRM", "Chef de projet e-commerce", "Chef de secteur commerce", "Chef de zone export", "Chef des ventes", "Client mystère", "Commercial", "Commercial B to C", "Commercial CHR", "Commercial GMS", "Commercial automobile", "Commercial b to b", "Commercial export", "Commercial sédentaire", "Commerçant", "Conseiller commercial", "Contract manager", "Directeur business unit", "Directeur commercial", "Directeur commercial export", "Directeur de comptes", "Directeur des opérations", "Directeur des ventes", "Directeur du développement", "Directeur régional", "Délégué commercial", "Délégué vétérinaire", "Employé de pharmacie", "Ingénieur avant-vente", "Ingénieur commercial", "Ingénieur d'affaires", "Ingénieur technico-commercial", "Opticien", "Poissonnier", "Promoteur des ventes", "Responsable commercial France", "Responsable commercial export", "Responsable commercial sport", "Responsable commercial sédentaire", "Responsable commercial transport", "Responsable d'affaires", "Responsable développement commercial", "Responsable e-commerce", "Responsable grands comptes", "Skiman", "Technico-commercial", "Téléconseiller", "VRP"],
    "Communication": ["Assistant chef de projet", "Assistant de communication", "Attaché de presse", "Chargé de communication", "Chargé de communication événementielle", "Chargé de relations publiques", "Chef de projet communication", "Chef de publicité", "Conseiller en image", "Directeur de la communication", "Documentaliste ged", "Graphiste", "Infographiste", "Recruteur de donateurs", "Responsable communication", "Responsable partenariats", "Responsable éditorial"],
    "Comptabilité": ["Agent de facturation", "Agent de recouvrement", "Assistant administratif et comptable", "Assistant comptable", "Assistant facturation", "Auditeur", "Chargé de recouvrement", "Chef de mission comptable", "Collaborateur comptable", "Commissaire aux comptes", "Comptable", "Comptable Fournisseur", "Comptable auxiliaire", "Comptable client", "Comptable clients recouvrement", "Comptable copropriété", "Comptable gestion locative", "Comptable général", "Comptable paie", "Comptable trésorerie", "Directeur comptable", "Expert-comptable", "Responsable administratif comptable", "Responsable audit", "Responsable comptabilité analytique", "Responsable comptabilité clients", "Responsable comptabilité fournisseurs", "Responsable comptable", "Responsable facturation", "Responsable trésorerie", "Secrétaire comptable", "Technicien comptable", "Trésorier"],
    "Culture": ["Accessoiriste", "Animateur cirque", "Animateur sportif", "Archiviste", "Archiviste documentaliste", "Auteur", "Bibliothécaire", "Caméraman", "Chanteur", "Chef de projet évènementiel", "Chorégraphe", "Compositeur", "Comédien", "DJ", "Danseur", "Dessinateur", "Documentaliste", "Figurant", "Game designer", "Illustrateur", "Ingénieur du son", "Interprète", "Libraire", "Linguiste", "Machiniste", "Mannequin", "Metteur en scène", "Modéliste", "Monteur de stands", "Musicien", "Médiateur culturel", "Photographe", "Professeur de danse", "Professeur de zumba", "Professeur guitare", "Responsable événementiel", "Réalisateur", "Régisseur", "Régisseur lumière", "Sculpteur", "Tatoueur", "Technicien audiovisuel", "Technicien du spectacle", "Technicien son"],
    "Digital": ["Chargé de communication digitale", "Chef de projet digital", "Chef de projet internet", "Community manager", "Designer 3d", "Développeur iPhone", "Développeur mobile", "Développeur web", "Graphiste 2d", "Graphiste 3d", "Graphiste web", "Responsable digital", "Rédacteur web", "Référenceur web", "Webmaster"],
    "Droit": ["Assistant juridique", "Avocat", "Clerc de notaire", "Directeur juridique", "Huissier", "Juriste", "Juriste assurance", "Juriste construction", "Juriste contentieux", "Juriste d'entreprise", "Juriste droit de la concurrence", "Juriste droit des affaires", "Juriste en droit public", "Juriste en droit social", "Juriste immobilier", "Juriste international", "Juriste propriété intellectuelle", "Notaire", "Rédacteur juridique"],
    "Economie": ["Statisticien", "Économiste"],
    "Edition": ["Conducteur offset", "Iconographe"],
    "Emploi public": ["ASVP", "Administratif de la fonction publique", "Agent d'entretien en collectivité", "Agent de service", "Agent de tri courrier", "Agent de voirie", "Animateur du patrimoine", "Chargé de recherche", "Facteur", "Ingénieur VRD", "Militaire", "Policier", "Postier", "Rédacteur territorial", "Surveillant de baignade", "Technicien de recherche", "Technicien environnement"],
    "Enseignement": ["Animateur BAFA", "Assistant pédagogique", "Auxiliaire de vie scolaire", "Chef de projet formation", "Chef de service éducatif", "Coach sportif", "Conseiller d'orientation", "Conseiller pédagogique", "Directeur de centre de formation", "Educateur technique", "Enseignant", "Enseignant chercheur", "Formateur", "Formateur FLE", "Formateur bâtiment", "Formateur en bureautique", "Formateur gestion du stress", "Formateur insertion", "Formateur vacataire", "Ingénieur pédagogique", "Maître-nageur sauveteur", "Moniteur", "Moniteur auto-école", "Professeur allemand", "Professeur d'anglais", "Professeur de SVT", "Professeur de français", "Professeur des écoles", "Professeur histoire géographie", "Professeur mathématiques", "Professeur musique", "Professeur philosophie", "Professeur physique", "Professeur économie", "Responsable pédagogique", "Surveillant examens", "Éducateur sportif"],
    "Environnement": ["Agent d'entretien des espaces verts", "Agent de tri", "Animateur sécurité environnement", "Assistant développement durable", "Biologiste", "Botaniste", "Chargé de mission RSE", "Coordinateur qhse", "Ecologue", "Elagueur", "Garde forestier", "Géologue", "Hydrogéologue", "Ingénieur environnement", "Ingénieur photovoltaique", "Ingénieur thermicien", "Installateur thermique", "Jardinier", "Jardinier paysagiste", "Monteur en climatisation", "Météorologue", "Naturaliste", "Océanographe", "Ouvrier paysagiste", "Releveur de compteur", "Responsable HSE", "Responsable QSE", "Responsable développement durable", "Ripeur", "Technicien HVAC", "Technicien de maintenance génie climatique", "Technicien en froid et climatisation", "Technicien en électricité", "Technicien forestier", "Technicien gaz", "Technicien génie climatique"],
    "Finance": ["Analyste financier", "Asset manager", "Auditeur financier", "Chargé de reporting", "Chef de mission audit", "Conseiller Fiscal", "Conseiller financier", "Consolideur", "Contrôleur financier", "Credit manager", "Directeur financier", "Fiscaliste", "Gestionnaire financier", "Ingénieur financier", "Opérateur de marché", "Responsable administratif financier", "Responsable financier", "Trader"],
    "Gestion": ["Assistant de gestion", "Assistant de gestion PME/PMI", "Business analyst", "Chargé de contentieux", "Consultant gestion", "Contrôleur de gestion", "Delivery manager", "Directeur technique", "Gestionnaire de patrimoine", "Risk manager"],
    "Grande distribution": ["Animateur commercial", "Animateur réseau", "Attaché commercial GMS", "Chef de caisse", "Chef de rayon", "Chef de secteur", "Chef de secteur GMS", "Chef rayon bazar", "Chef rayon boucherie", "Chef rayon boulangerie pâtisserie", "Chef rayon charcuterie traiteur", "Chef rayon poissonnerie", "Conseiller de vente", "Directeur de magasin", "Employé libre-service", "Employé point chaud", "Merchandiseur", "Responsable adjoint magasin", "Responsable commercial GMS", "Responsable drive", "Responsable produits frais", "Responsable rayon", "Responsable rayon poissonnerie"],
    "Hôtellerie": ["Chef de réception", "Directeur hôtel", "Femme de chambre", "Gouvernant", "Majordome", "Réceptionniste", "Valet de chambre", "Veilleur de nuit"],
    "Immobilier": ["Administrateur de biens", "Agent commercial immobilier", "Agent immobilier", "Assistant gestion locative", "Chasseur immobilier", "Commercial immobilier", "Conseiller commercial immobilier", "Directeur de copropriété", "Développeur foncier", "Gestionnaire de copropriété", "Gestionnaire immobilier", "Gestionnaire locatif", "Home stager", "Mandataire immobilier", "Négociateur immobilier", "Négociateur location", "Promoteur", "Prospecteur foncier", "Responsable commercial immobilier", "Responsable contentieux locatif", "Responsable développement foncier", "Responsable immobilier", "Technicien diagnostic immobilier"],
    "Industrie": ["Affûteur", "Agent de conditionnement", "Agent de fabrication", "Agent de finition", "Agent de production", "Agent technique", "Agent technique polyvalent", "Ajusteur", "Ajusteur aéronautique", "Ajusteur mouliste", "Assembleur monteur", "Assistant qualité", "Auditeur qualité", "Bobinier", "Calculateur", "Cariste", "Carrossier", "Chargé de mission qualité", "Chef d'atelier", "Chef d'équipe maintenance", "Chef de projet industriel", "Chef de projet production", "Conditionneur", "Conducteur de four", "Conducteur de ligne", "Conducteur de ligne industrie pharmaceutique", "Conducteur de machine", "Dessinateur industriel", "Dessinateur projeteur cao", "Dessinateur-projeteur", "Directeur R&D", "Directeur de production", "Directeur de site", "Directeur industriel", "Directeur qualité", "Directeur usine", "Drapeur", "Décolleteur", "Ebarbeur", "Electricien industriel", "Electrotechnicien", "Erodeur", "Fraiseur", "Ingénieur calcul de structures", "Ingénieur de production", "Ingénieur de projet", "Ingénieur industrialisation", "Ingénieur maintenance", "Ingénieur métallurgiste", "Ingénieur métrologue", "Ingénieur planning", "Ingénieur pétrolier", "Ingénieur qse", "Ingénieur qualité", "Ingénieur soudage", "Inspecteur qualité", "Metteur au point", "Monteur de meubles", "Monteur-câbleur", "Mouleur", "Mécanicien de maintenance", "Métallier", "Métrologue", "Opérateur de production", "Opérateur salle blanche", "Ordonnanceur", "Outilleur", "Outilleur mouliste", "Ouvrier abattoir", "Ouvrier de production", "Oxycoupeur", "Peintre automobile", "Peintre industriel", "Planificateur", "Plasturgiste", "Plieur cn", "Programmeur CFAO", "Qualiticien", "Rectifieur", "Responsable atelier", "Responsable bureau d'études", "Responsable contrôle qualité", "Responsable de maintenance", "Responsable de production", "Responsable de site", "Responsable fonderie", "Responsable méthodes", "Responsable planification", "Responsable qualité", "Responsable uap", "Régleur", "Soudeur", "Soudeur aluminium", "Stratifieur", "Superviseur de maintenance", "Technicien assurance qualité", "Technicien automaticien", "Technicien bureau d'études", "Technicien controle qualité", "Technicien d'études", "Technicien de fabrication", "Technicien de maintenance", "Technicien de maintenance industrielle", "Technicien de maintenance itinérant", "Technicien essai", "Technicien fonderie", "Technicien industrialisation", "Technicien instrumentation", "Technicien qualité", "Technicien électronicien", "Technicien électrotechnique", "Tourneur", "Usineur"],
    "Informatique": ["Administrateur Linux", "Administrateur SAP", "Administrateur Sharepoint", "Administrateur Windows", "Administrateur base de données", "Administrateur systèmes", "Administrateur unix", "Analyste d'exploitation", "Analyste developpeur", "Analyste-programmeur", "Architecte Java", "Architecte SI", "Architecte informatique", "Architecte logiciel", "Architecte réseau", "Architecte technique", "Chef de projet .NET", "Chef de projet AMOA", "Chef de projet Java", "Chef de projet MOA", "Chef de projet MOE", "Chef de projet décisionnel", "Chef de projet erp", "Chef de projet fonctionnel", "Chef de projet informatique", "Chef de projet infrastructure", "Chef de projet mobile", "Chef de projet technique", "Chef de projet web", "Concepteur designer", "Consultant AMOA", "Consultant SAP", "Consultant SEO", "Consultant SIRH", "Consultant Sécurité", "Consultant fonctionnel", "Consultant informatique", "Coordinateur informatique", "Data Scientist", "Developpeur full stack", "Directeur informatique", "Développeur .NET", "Développeur Android", "Développeur C", "Développeur C++", "Développeur Flash", "Développeur Java", "Développeur PHP", "Développeur Python", "Développeur SQL", "Développeur VBA", "Développeur back end", "Développeur front end", "Développeur informatique", "Développeur logiciel", "Electronicien", "Expert sécurité", "Formateur informatique", "Géomaticien", "IT manager", "Informaticien", "Ingenieur devops", "Ingénieur Unix", "Ingénieur commercial informatique", "Ingénieur décisionnel", "Ingénieur développeur", "Ingénieur informatique", "Ingénieur logiciel", "Ingénieur poste de travail", "Ingénieur support", "Ingénieur système", "Ingénieur sécurité", "Ingénieur traitement du signal", "Intégrateur web", "Motion designer", "Programmeur informatique", "Pupitreur", "Scrum master", "Technicien de maintenance informatique", "Technicien de support", "Technicien exploitation informatique", "Technicien helpdesk", "Technicien support informatique", "Webdesigner"],
    "Ingénierie": ["Acousticien", "Automaticien", "Chargé d'affaires cvc", "Chaudronnier naval", "Dessinateur cvc", "Hydraulicien", "Ingénieur Génie des procédés", "Ingénieur R&D", "Ingénieur acoustique", "Ingénieur automaticien", "Ingénieur automobile", "Ingénieur aéronautique", "Ingénieur calcul", "Ingénieur contrôle commande", "Ingénieur de recherche", "Ingénieur eau", "Ingénieur en optique", "Ingénieur génie civil", "Ingénieur laser", "Ingénieur mathématiques appliquées", "Ingénieur matériaux", "Ingénieur micro électronique", "Ingénieur modélisation", "Ingénieur mécanique des fluides", "Ingénieur mécatronique", "Ingénieur méthodes", "Ingénieur nucléaire", "Ingénieur procédés", "Ingénieur robotique", "Ingénieur simulation numérique", "Ingénieur sûreté", "Ingénieur électricité", "Ingénieur électronique", "Metteur au point climatisation", "Projeteur vrd", "Roboticien", "Technicien aéronautique", "Technicien courant faible", "Technicien cvc", "Technicien domotique"],
    "Logistique": ["Affréteur", "Agent de logistique", "Agent de quai", "Agent de transit", "Analyste logistique", "Approvisionneur", "Assistant approvisionnement", "Assistant d'exploitation", "Assistant import export", "Assistant logistique", "Chef de dépôt", "Chef de projet logistique", "Conducteur routier", "Conducteur routier pl", "Conducteur routier spl", "Consultant supply chain", "Coordinateur logistique", "Coursier", "Directeur logistique", "Directeur supply chain", "Dispatcheur", "Gestionnaire de parc automobile", "Gestionnaire de stocks", "Ingénieur logistique", "Inventoriste", "Logisticien", "Magasinier", "Manutentionnaire", "Opérateur logistique", "Pilote de flux", "Préparateur de commande", "Responsable de quai", "Responsable exploitation", "Responsable export", "Responsable expéditions", "Responsable logistique", "Responsable magasinier", "Responsable transit", "Réceptionnaire", "Technicien logistique", "gestionnaire de flux"],
    "Marketing": ["Analyste de données", "Assistant chef de produit marketing", "Assistant chef de projet marketing", "Assistant marketing", "Bid manager", "Brand manager", "Category manager", "Chargé d'études marketing", "Chargé d'études statistiques", "Chargé de marketing", "Chef de produit", "Chef de projet marketing", "Chef de projet web marketing", "Concepteur rédacteur", "Coordinateur Marketing", "Designer", "Directeur artistique", "Directeur de clientèle", "Directeur marketing", "Distributeur", "Enquêteur sondage", "Enquêteur terrain", "Panéliste", "Responsable marketing", "Responsable marketing opérationnel", "Responsable trade marketing", "Responsable web marketing", "Traffic manager"],
    "Mécanique": ["Aide mécanicien", "Ascensoriste", "Chef atelier automobile", "Chef mécanicien", "Contrôleur technique automobile", "Dessinateur mécanique", "Dépanneur remorqueur", "Electricien automobile", "Electromécanicien", "Ingenieur conception mecanique", "Ingénieur en génie mécanique", "Ingénieur mécanique", "Monteur mécanique", "Mécanicien automobile", "Mécanicien monteur", "Mécanicien moto", "Mécanicien motoculture", "Mécanicien outilleur", "Mécanicien poids lourds", "Projeteur mécanique", "Préparateur automobile", "Responsable carrosserie", "Technicien automobile", "Technicien d'atelier"],
    "Médias": ["Cadreur monteur", "Chef de rubrique", "Graphiste PAO", "Graphiste designer", "Graphiste multimédias", "Infographiste multimédias", "Journaliste", "Maquettiste", "Massicotier", "Monteur vidéo", "Relecteur-correcteur", "Reporter", "Rédacteur en chef", "Rédacteur pigiste", "Rédacteur scientifique", "Secrétaire de rédaction", "Sérigraphe"],
    "Petite enfance": ["ATSEM", "Agent service crèche", "Aide-éducateur", "Animateur centre loisirs", "Animateur enfants", "Animateur périscolaire", "Assistante maternelle", "Auxiliaire crèche", "Auxiliaire petite enfance", "Directeur de centre de loisirs", "Directeur de crèche", "Infirmier crèche", "Puériculteur"],
    "Physique": ["Animateur tennis", "Physicien"],
    "Propreté": ["Agent de nettoyage", "Agent de propreté", "Agent maintenance bâtiment", "Employé de nettoyage", "Laveur de vitres", "Ouvrier d'entretien"],
    "Ressources humaines": ["Assistant recrutement", "Assistant ressources humaines", "Chargé de mission RH", "Chargé de recrutement", "Chargé de ressources humaines", "Chef de projet Ressources Humaines", "Chef de projet SIRH", "Chef du personnel", "Chief happiness officer", "Collaborateur social", "Conseiller formation", "Consultant en recrutement", "Consultant en ressources humaines", "Consultant management", "Contrôleur de gestion sociale", "Directeur des ressources humaines", "Ergonome", "Gestionnaire RH", "Gestionnaire de paie", "Gestionnaire du personnel", "Knowledge manager", "Lean manager", "Project management officer", "Responsable Administration Du Personnel", "Responsable des ressources humaines", "Responsable formation", "Responsable paie", "Responsable relations sociales", "Team leader"],
    "Restauration": ["Agent de restauration", "Aide-cuisinier", "Barman", "Chef cuisinier", "Chef de partie", "Chef de rang", "Chef de secteur CHR", "Chef gérant", "Chef pâtissier", "Commis de cuisine", "Commis de salle", "Crêpier", "Cuisinier", "Cuisinier de collectivité", "Directeur de restaurant", "Employé polyvalent de restauration", "Grillardin", "Livreur de pizzas", "Manager en restauration", "Maître d'hôtel", "Oenologue", "Plongeur", "Pâtissier", "Responsable de cuisine", "Responsable de salle", "Responsable en restauration", "Second de cuisine", "Serveur", "Serveur barman", "Serveur extra", "Sommelier"],
    "Santé": ["ASH - Agent de services hospitaliers", "Agent de service maison de retraite", "Agent de stérilisation", "Aide-soignant", "Ambulancier", "Anesthésiste", "Assistant dentaire", "Assistant médical", "Assistant vétérinaire", "Attaché de recherche clinique", "Audioprothésiste", "Auxiliaire ambulancier", "Auxiliaire de puériculture", "Biostatisticien", "Brancardier", "Cadre de santé", "Cadre infirmier", "Cadre supérieur de santé", "Cardiologue", "Chef de bloc", "Chef de service", "Chirurgien", "Chirurgien orthopédique", "Dentiste", "Dermatologue", "Directeur d'EHPAD", "Directeur d'établissement de santé", "Directeur des soins", "Directeur médico-social", "Diététicien", "Endocrinologue", "Ergothérapeute", "Gastro-entérologue", "Gynécologue", "Infirmier", "Infirmier anesthésiste", "Infirmier auxiliaire", "Infirmier bloc opératoire", "Infirmier coordinateur", "Infirmier dialyse", "Infirmier du secteur psychiatrique", "Infirmier ehpad", "Infirmier médecine du travail", "Infirmier urgences", "Infirmière en entreprise", "Infirmière libérale", "Kinésithérapeute", "Manipulateur en radiologie", "Masseur kinésithérapeute", "Médecin coordinateur", "Médecin du travail", "Médecin généraliste", "Médecin gériatre", "Médecin urgentiste", "Neurochirurgien", "Neurologue", "Neuropsychologue", "Nutritionniste", "Néphrologue", "Oncologue", "Ophtalmologue", "Optométriste", "Orthophoniste", "Ostéopathe", "Pharmacien", "Pharmacien affaires réglementaires", "Pharmacien biologiste", "Pharmacien hospitalier", "Pharmacien qualité", "Pneumologue", "Podologue", "Professeur de yoga", "Préparateur en pharmacie", "Psychiatre", "Psychologue", "Psychologue clinicien", "Psychologue du travail", "Psychomotricien", "Pédiatre", "Radiologue", "Sage-femme", "Secrétaire dentaire", "Sophrologue", "Technicien biomédical", "Urologue", "Visiteur médical", "Vétérinaire"],
    "Secrétariat": ["Assistant secrétaire", "Secrétaire", "Secrétaire administratif", "Secrétaire bilingue", "Secrétaire commercial", "Secrétaire de direction", "Secrétaire médicale", "Télésecrétaire"],
    "Sécurité": ["Agent cynophile sécurité", "Agent de surveillance", "Agent de sécurité", "Agent de sécurité incendie", "Animateur sécurité", "Convoyeur de fonds", "Détective", "Garde du corps", "Gardien", "Gardien de la paix", "Gendarme", "Opérateur télésurveillance", "Pilote de drones", "Responsable sécurité", "Sapeur-Pompier", "Secouriste"],
    "Service clientèle": ["Agent d'accueil", "Assistant personnel", "Etalagiste", "Hotliner", "Père Noël", "Rédacteur technique", "Technicien SAV", "Technicien électroménager", "Toiletteur"],
    "Services à la personne": ["Aide ménagère à domicile", "Aide à domicile", "Baby sitter", "Chef d'équipe propreté", "Coach professionnel", "Coiffeur", "Concierge", "Déménageur", "Employé familial", "Employé pressing", "Esthéticien", "Femme de ménage", "Garde d'animaux", "Gardien d'immeuble", "Maquilleur", "Repasseur", "Thanatopracteur"],
    "Social": ["Aide médico-psychologique", "Animateur maison retraite", "Assistant de service social", "Auxiliaire de vie sociale - AVS", "Conseiller en insertion professionnelle", "Conseiller en économie sociale et familiale", "Conseiller social", "Coordinateur social", "Directeur ESAT", "Directeur adjoint ESAT", "Educateur", "Intervenant action sociale", "Moniteur d'atelier", "Moniteur éducateur", "Éducateur spécialisé"],
    "Télécommunications": ["Administrateur réseau", "Ingénieur radio", "Ingénieur réseau", "Ingénieur télécom", "Piqueteur", "Technicien fibre optique", "Technicien réseau", "ingénieur hyperfréquences"],
    "Tourisme": ["Accompagnateur montagne", "Accompagnateur tourisme équestre", "Agent de comptoir", "Agent de développement touristique", "Agent de réservation", "Agent de voyage", "Animateur tourisme", "Animateur village vacances", "Billettiste", "Conseiller voyages", "Directeur centre de vacances", "Forfaitiste", "Guide touristique", "Moniteur de ski", "Responsable animation", "Spa manager"],
    "Transport": ["Agent aéroportuaire", "Agent d'escale", "Agent d'exploitation transport et logistique", "Agent de piste", "Agent de trafic aérien", "Agent sûreté aéroportuaire", "Architecte naval", "Bagagiste", "Chauffeur VTC", "Chauffeur d'autocar", "Chauffeur de bus", "Chauffeur de direction", "Chauffeur de taxi", "Chauffeur livreur", "Chauffeur privé", "Chauffeur routier", "Chef de quart", "Contrôleur aérien", "Convoyeur de véhicules", "Directeur transport", "Docker", "Déclarant en douanes", "Formateur conduite", "Hôtesse de l'air", "Ingénieur aérodynamique", "Ingénieur signalisation ferroviaire", "Magasinier aéronautique", "Monteur de pneus", "Mécanicien aéronautique", "Pilote d'avion", "Pilote d'hélicoptère", "Responsable transport"],
    "Vente": ["Assistant administration des ventes", "Caissier", "Chef des ventes régional", "Concepteur vendeur", "Conseiller beauté", "Coordinateur des ventes", "Directeur de filiale", "Délégué pharmaceutique", "Formateur vente", "Gestionnaire administration des ventes", "Manager des ventes", "Product owner", "Prévisionniste des ventes", "Responsable administration des ventes", "Responsable boutique", "Responsable commercial automobile", "Responsable de caisse", "Responsable de magasin", "Responsable de secteur", "Responsable parapharmacie", "Responsable télévente", "Télé prospecteur", "Télévendeur", "Vendeur", "Vendeur animalerie", "Vendeur automobile", "Vendeur jeux video", "Vendeur moto", "Vendeur multimédia"]
};

// --- 2. MAP DES FILIÈRES ---
const STREAM_MAP = {
    // Old Categories (Keep for backward compatibility)
    "SC_Maths": ["Ingénierie", "Informatique", "Physique", "Chimie", "Architecture", "Industrie", "Mathématiques"],
    "SC_Exp": ["Santé", "Environnement", "Agricole", "Chimie"],
    "STEG": ["Btp", "Mécanique", "Industrie", "Ingénierie"],
    "EG": ["Commerce", "Vente", "Banque", "Finance", "Comptabilité", "Gestion", "Marketing", "Digital", "Administration"],
    "SH": ["Enseignement", "Social", "Ressources humaines", "Sécurité", "Administration", "Services à la personne"],
    "LP": ["Enseignement", "Droit", "Culture", "Médias", "Communication", "Hôtellerie", "Tourisme", "Artisanat"],

    // New Specific Streams Mapped to Categories
    "SMA": ["Ingénierie", "Informatique", "Physique", "Chimie", "Architecture", "Mathématiques"],
    "SMB": ["Ingénierie", "Informatique", "Physique", "Mathématiques"],
    "PC": ["Ingénierie", "Physique", "Chimie", "Industrie"],
    "SVT": ["Santé", "Environnement", "Agricole", "Chimie", "Enseignement"],
    "Sc_Agro": ["Agricole", "Environnement", "Ingénierie"],
    "STE": ["Ingénierie", "Industrie", "Électronique", "Informatique"],
    "STM": ["Ingénierie", "Industrie", "Mécanique", "Btp"],
    "SEG": ["Commerce", "Vente", "Banque", "Finance", "Comptabilité", "Gestion", "Marketing"],
    "LSH": ["Enseignement", "Droit", "Journalisme", "Traduction", "Culture", "Social"],
    "SH": ["Enseignement", "Social", "Ressources humaines", "Psychologie"],
    "Langue_Arabe": ["Enseignement", "Traduction", "Journalisme", "Droit"],
    "Sc_Chariaa": ["Enseignement", "Droit", "Social"],
    "Arts": ["Architecture", "Design", "Culture", "Artisanat", "Mode"],
    "TC_Sc": ["Ingénierie", "Santé", "Informatique", "Sciences"],
    "TC_Lit": ["Droit", "Enseignement", "Journalisme", "Sciences Humaines"],
    "BacPro": ["Industrie", "Commerce", "Artisanat", "Btp", "Services", "Hôtellerie"],
    "Autre": []
};

// --- 3. TAGS MAP ---
const TAG_MAP = {
    "Santé": ["bio", "social", "soin"],
    "Btp": ["manuel", "technique", "logique"],
    "Informatique": ["tech", "logique", "code"],
    "Industrie": ["technique", "manuel", "usine"],
    "Mécanique": ["technique", "manuel", "logique"],
    "Ingénierie": ["science", "logique", "maths"],
    "Commerce": ["vente", "contact", "eco"],
    "Vente": ["vente", "contact", "commerce"],
    "Banque": ["finance", "eco", "maths"],
    "Finance": ["finance", "eco", "maths"],
    "Comptabilité": ["admin", "maths", "eco"],
    "Gestion": ["admin", "eco", "management"],
    "Droit": ["lettre", "droit", "justice"],
    "Architecture": ["arts", "logique", "design"],
    "Artisanat": ["manuel", "arts", "creation"],
    "Culture": ["arts", "creation", "lettre"],
    "Enseignement": ["social", "lettre", "science"],
    "Social": ["social", "soin", "humain"],
    "Ressources humaines": ["social", "admin", "droit"],
    "Transport": ["manuel", "logistique", "conducteur"],
    "Logistique": ["manuel", "organisation", "logistique"],
    "Hôtellerie": ["contact", "service", "social"],
    "Restauration": ["manuel", "service", "creation"],
    "Environnement": ["bio", "nature", "science"],
    "Agricole": ["bio", "nature", "manuel"],
    "Sécurité": ["manuel", "social", "ordre"],
    "Marketing": ["creation", "commerce", "eco"],
    "Communication": ["creation", "media", "lettre"],
    "Médias": ["creation", "media", "lettre"],
    "Digital": ["tech", "creation", "code"],
    "Immobilier": ["commerce", "logique", "patrimoine"],
    "Administration": ["admin", "secretariat", "org"],
    "Secrétariat": ["admin", "secretariat", "org"],
    "Services à la personne": ["social", "manuel", "service"],
    "Propreté": ["manuel", "service", "hygiene"],
    "Achat": ["commerce", "organisation", "négociation"],
    "Grande distribution": ["commerce", "service", "stock"],
    "Tourisme": ["contact", "service", "culture"],
    "Alimentation": ["manuel", "creation", "hygiene"],
    "Chimie": ["science", "labo", "bio"],
    "Physique": ["science", "maths", "recherche"],
    "Economie": ["eco", "maths", "analyse"],
    "Aménagement": ["urbanisme", "nature", "design"],
    "Emploi public": ["admin", "social", "service"],
    "Petite enfance": ["social", "soin", "education"]
};

// --- 4. DESCRIPTIONS SPÉCIFIQUES ---
const CUSTOM_DESC = {
    "Médecin": "Médecin généraliste ou spécialiste qui diagnostique et traite les maladies.",
    "Infirmier": "Personnel soignant qui réalise les soins médicaux et assure le confort des patients.",
    "Avocat": "Juriste qui conseille et défend ses clients devant les tribunaux.",
    "Architecte": "Professionnel qui conçoit la structure et l'esthétique des bâtiments.",
    "Développeur web": "Ingénieur logiciel qui crée des sites internet et des applications web.",
    "Ingénieur": "Professionnel hautement qualifié qui conçoit des solutions techniques.",
    "Comptable": "Spécialiste de la gestion financière qui enregistre les flux et assure la fiscalité.",
    "Maçon": "Ouvrier du BTP spécialisé dans la construction de murs et structures.",
    "Plombier": "Technicien qui installe et répare les réseaux d'eau.",
    "Électricien": "Technicien qui réalise l'installation des circuits électriques.",
    "Professeur": "Enseignant qui transmet des connaissances dans un établissement scolaire.",
    "Policier": "Agent de l'État chargé de maintenir l'ordre public.",
    "Pilote d'avion": "Professionnel chargé de piloter un aéronef.",
    "Chef de projet": "Responsable qui coordonne les ressources d'un projet pour atteindre les objectifs.",
    "Journaliste": "Professionnel de l'information qui rédige des articles sur l'actualité."
};

// --- 5. LEVEL MAP ---
const LEVEL_MAP = {
    "3AC": ["3ème Année Collège"],
    "TC": ["Tronc Commun"],
    "1BAC": ["1ère Bac"],
    "2BAC": ["2ème Bac"],
};

// --- 6. DONNÉES PARCOURS TIMELINE ---
const PATHS_DATA = {
    "Médecin": {
        main: [
            { year: "Baccalauréat", target: "FMP (1ère Année Commune)", desc: "Obtenir le Bac Scientifique avec bonne moyenne." },
            { year: "FMP", target: "CNA (Concours National d'Accès)", desc: "1 année universitaire commune (SVT/BCP)." },
            { year: "1er Cycle (2 ans)", target: "Externat ou Internat", desc: "Formation sciences fondamentales (anatomie, physiologie, biochimie)." },
            { year: "2ème Cycle (3 ans)", target: "Stages cliniques", desc: "Enseignements théoriques avancés et stages cliniques externes." },
            { year: "3ème cycle (1 ans)", target: "Thèse de Médecine", desc: "Stages cliniques à plein temps et soutenance de thèse." }
        ],
        alternatives: [
            { condition: "Si échec au CNA", path: ["Option: Répéter l'année suivante.", "Option: Médecine à l'étranger.", "Option: Pharmacie ou Dentaire si rang suffisant."] }
        ]
    },
    "Ingénieur": {
        main: [
            { year: "Baccalauréat", target: "CPGE (Classes Préparatoires)", desc: "Bac Sciences Maths." },
            { year: "CPGE (2 ans)", target: "CNC (Concours National Commun)", desc: "MPSI, PTSI, ou TSI." },
            { year: "Grande École", target: "Cycle Ingénieur (3 ans)", desc: "ENSA, ENSEM, ENIM, ENA..." }
        ],
        alternatives: [
            { condition: "Si échec au BAC", path: ["Option: Redoubler.", "Option: OFPPT (TS Mécanique/Électricité)."] }
        ]
    },
    "Avocat": {
        main: [
            { year: "Baccalauréat", target: "Faculté de Droit", desc: "Licence de Droit Privé ou Public." },
            { year: "Licence (3 ans)", target: "Master (2 ans)", desc: "Spécialisation en Droit des Affaires, Fiscalité ou Justice." },
            { year: "Master", target: "IEA (Institut d'Études Judiciaires)", desc: "Stage de 18 mois obligatoire." },
            { year: "Serment", target: "Avocat au Barreau", desc: "Prestation de serment et début de carrière." }
        ],
        alternatives: []
    },
    "default": {
        main: [
            { year: "Baccalauréat", target: "Enseignement Supérieur", desc: "Choisir une formation adaptée à la filière." }
        ],
        alternatives: []
    }
};

// --- 7. NOTIFICATIONS (TOASTS) ---


// --- 7. RIASEC TAGS MAPPING ---
const RIASEC_TAGS = {
    "R": ["manuel", "technique", "nature", "agricole", "transport", "logistique", "btp", "mécanique", "industrie"],
    "I": ["science", "logique", "maths", "recherche", "informatique", "ingénierie", "chimie", "physique", "biologie"],
    "A": ["arts", "creation", "design", "lettre", "culture", "médias", "communication", "architecture", "artisanat"],
    "S": ["social", "soin", "enseignement", "service", "santé", "rh", "petite enfance", "services à la personne"],
    "E": ["commerce", "vente", "management", "droit", "finance", "banque", "assurance", "immobilier", "tourisme"],
    "C": ["admin", "organisation", "finance", "data", "comptabilité", "gestion", "secrétariat"]
};

// --- HELPER FUNCTIONS ---
function showToast(message, type = "success") {
    let toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = type === "error" ? "#e74c3c" : "#2ecc71";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    toast.style.zIndex = "10000";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- 8. APPLICATION CORE ---
const app = {
    jobs: [],
    user: null, // { name, level, stream, quiz: { codes: 'RIA', scores: {...} } }
    quizScores: {},
    questions: [],
    currentQ: 0,
    scores: {},

    // === GESTION DU THÈME ===
    toggleTheme: function () {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        // Le CSS gère désormais l'animation et l'affichage des icônes
        // Pas besoin de modifier innerText ici
    },

    // === NAVIGATION MOBILE ===
    toggleMenu: function () {
        const nav = document.getElementById('mobileNav');
        const overlay = document.getElementById('mobileOverlay');
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            overlay.classList.remove('open');
        } else {
            nav.classList.add('open');
            overlay.classList.add('open');
        }
    },

    // === AUTHENTICATION ===
    toggleAuth: function (mode) {
        if (mode === 'register') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        } else {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
        }
    },

    register: function () {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const level = document.getElementById('regLevel').value;
        const stream = document.getElementById('regStream').value;
        const phone = document.getElementById('regPhone').value;

        if (!name || !email || !password || !level) return showToast("Remplissez les champs obligatoires !", "error");

        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, level, stream, phone })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) showToast(data.error, "error");
                else {
                    showToast("Compte créé !");
                    this.checkSession();
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Erreur de connexion au serveur.", "error");
            });
    },

    login: function () {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) return showToast("Remplissez tout !", "error");

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) showToast(data.error, "error");
                else {
                    showToast("Connecté !");
                    if (data.user && data.user.isAdmin) {
                        this.updateAdminUI(true);
                    }
                    this.checkSession();
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Erreur de connexion au serveur.", "error");
            });
    },

    logout: function () {
        if (confirm("Se déconnecter ?")) {
            fetch('/api/logout', { method: 'POST' })
                .then(() => {
                    this.user = null;
                    this.updateAdminUI(false);
                    this.navigate('auth');
                    showToast("Déconnexion réussie.");
                })
                .catch(e => {
                    console.error(e);
                    this.user = null;
                    this.navigate('auth');
                });
        }
    },

    checkSession: function () {
        console.log("Checking session...");
        fetch('/api/session')
            .then(res => res.json())
            .then(data => {
                console.log("Session data:", data);
                if (data.authenticated) {
                    // Update: Wait for user data then navigate
                    this.loadUser().then(() => {
                        console.log("User loaded, navigating to dashboard");
                        // Check if admin
                        const isAdmin = data.user && data.user.isAdmin;
                        this.updateAdminUI(isAdmin);
                        if (isAdmin) {
                            this.navigate('admin');
                        } else {
                            this.navigate('dashboard');
                        }
                    }).catch(() => {
                        console.error("Failed to load user after auth");
                        this.navigate('auth');
                    });
                } else {
                    console.log("Not authenticated, redirecting to auth");
                    this.updateAdminUI(false);
                    this.navigate('auth');
                }
            })
            .catch(e => {
                console.error("Session check failed", e);
                this.navigate('auth');
            });
    },

    // === INITIALIZATION ===
    init: function () {
        try {
            console.log("App Init Started");
            this.processData();
            console.log("Data Processed. Jobs:", this.jobs.length);
            this.checkSession(); // Replaces direct loadUser
            this.renderFilters();
            console.log("Filters Rendered");

            // Attach AJAX handler for Formspree
            const form = document.getElementById("fs-form");
            if (form) {
                form.addEventListener("submit", this.handleFormSubmit);
            }
        } catch (error) {
            console.error("CRITICAL ERROR IN INIT:", error);
            showToast("Erreur critique au lancement : " + error.message, "error");
        }
    },

    updateAdminUI: function (isAdmin) {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isAdmin ? 'block' : 'none';
            // Specific handling for mobile if needed (it uses flex in some containers)
            if (el.id === 'adminStatsBtnMobile' && isAdmin) {
                el.style.display = 'block';
            }
        });
    },

    processData: function () {
        let idCounter = 1;
        this.jobs = [];
        for (const [category, jobList] of Object.entries(RAW_DATA)) {
            jobList.forEach(jobTitle => {
                const tags = TAG_MAP[category] || ["general"];
                const description = CUSTOM_DESC[jobTitle] || `Professionnel dans le secteur ${category}. Ce métier nécessite des compétences variées.`;
                this.jobs.push({ id: idCounter++, title: jobTitle, category: category, description: description, tags: tags });
            });
        }
        const totalJobsEl = document.getElementById('totalJobsCount');
        const totalCatsEl = document.getElementById('totalCatsCount');
        if (totalJobsEl) totalJobsEl.textContent = this.jobs.length;
        if (totalCatsEl) totalCatsEl.textContent = Object.keys(RAW_DATA).length;
    },

    // === FORMSPREE AJAX HANDLER ===
    handleFormSubmit: async function (event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const btn = document.getElementById("submit-btn");
        const originalBtnText = btn.textContent;

        // UI Feedback: Loading
        btn.textContent = "Envoi en cours...";
        btn.disabled = true;

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showToast("✅ Message envoyé avec succès !", "success");
                form.reset();
                window.app.navigate('dashboard'); // Redirect to dashboard after success
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        showToast(data["errors"].map(error => error["message"]).join(", "), "error");
                    } else {
                        showToast("❌ Oups ! Il y a eu un problème.", "error");
                    }
                })
            }
        }).catch(error => {
            showToast("❌ Erreur de connexion.", "error");
        }).finally(() => {
            // Reset Button
            btn.textContent = originalBtnText;
            btn.disabled = false;
        });
    },

    getHollandQuestions: function () {
        return [
            { text: "Aimes-tu travailler avec des outils et des machines ?", type: "R" },
            { text: "Aimes-tu résoudre des problèmes mathématiques complexes ?", type: "I" },
            { text: "Aimes-tu dessiner, écrire ou créer des choses artistiques ?", type: "A" },
            { text: "Aimes-tu aider et enseigner les autres ?", type: "S" },
            { text: "Aimes-tu vendre des produits ou persuader les gens ?", type: "E" },
            { text: "Aimes-tu organiser des données et suivre des procédures ?", type: "C" },
            { text: "Préfères-tu travailler à l'extérieur ?", type: "concret" },
            { text: "Est-ce que tu aimes travailler seul sans supervision ?", type: "autonomie" },
            { text: "Est-ce que tu aimes diriger une équipe ?", type: "encadrement" },
            { text: "Est-ce que tu préfères les tâches manuelles ?", type: "manuel" }
        ];
    },

    comparator: {
        data: {
            "sc_maths": { label: "Sciences Maths", difficulty: 5, math: 5, load: 5, duration: "5 à 7 ans", jobs: ["Ingénieur", "Architecte", "Chercheur", "Data Scientist"], market: "Très porteur", profile: "Logique développée, excellence en maths." },
            "sc_exp": { label: "Sciences Expérimentales", difficulty: 3, math: 3, load: 4, duration: "6 à 8 ans", jobs: ["Médecin", "Pharmacien", "Biologiste"], market: "Santé stable", profile: "Intérêt pour les sciences de la vie." },
            "eco": { label: "Économie & Gestion", difficulty: 3, math: 4, load: 3, duration: "4 à 5 ans", jobs: ["Comptable", "Commercial", "Banquier"], market: "Large besoin", profile: "Aisance avec les chiffres." },
            "lettres": { label: "Lettres & Philosophie", difficulty: 3, math: 1, load: 3, duration: "4 à 5 ans", jobs: ["Professeur", "Journaliste", "Avocat"], market: "Enseignement, droit", profile: "Excellente expression écrite." },
            "univ": { label: "Université (Littéraire/Humaines)", difficulty: 2, math: 1, load: 2, duration: "4 ans +", jobs: ["Enseignant", "Chercheur"], market: "Secteur public", profile: "Autonomie, recherche." },
            "ecoles": { label: "Écoles Supérieures", difficulty: 5, math: 5, load: 5, duration: "5 ans", jobs: ["Ingénieur d'État", "Chef de projet"], market: "Rémunération élevée", profile: "Bon niveau général, ambition." },
            "ofppt": { label: "OFPPT (Formation Pro)", difficulty: 2, math: 2, load: 4, duration: "2 à 3 ans", jobs: ["Technicien", "Ouvrier qualifié"], market: "Besoins forts", profile: "Goût pour la pratique." }
        },
        runComparison: function () {
            const s1 = document.getElementById('streamSelect1').value;
            const s2 = document.getElementById('streamSelect2').value;
            const container = document.getElementById('compareResults');
            container.innerHTML = '';
            if (!s1 || !s2) { showToast("Veuillez sélectionner au moins deux options.", "error"); return; }
            const selections = [s1, s2].filter(Boolean);
            selections.forEach(key => {
                const data = this.data[key];
                if (!data) return;
                const isMatch = window.app.user && window.app.user.stream === key;
                const matchBadge = isMatch ? `<div style="position:absolute; top:10px; right:10px; background:var(--accent); color:var(--accent-text); padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">✓ Pour toi</div>` : '';
                const html = `
                            <div class="card" style="position:relative; border-top: 4px solid ${isMatch ? 'var(--accent)' : 'var(--primary)'};">
                                ${matchBadge}
                                <h3 style="color:var(--primary); margin-bottom:15px;">${data.label}</h3>
                                <ul style="margin-bottom:15px; padding-left:20px; color:var(--text-muted);">
                                    <li><strong>Durée :</strong> ${data.duration}</li>
                                    <li><strong>Débouchés :</strong> ${data.market}</li>
                                </ul>
                                <div style="margin-bottom:10px;">
                                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:5px;"><span>Difficulté</span><span>${data.difficulty}/5</span></div>
                                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${data.difficulty * 20}%"></div></div>
                                </div>
                                <div>
                                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:5px;"><span>Maths</span><span>${data.math}/5</span></div>
                                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${data.math * 20}%"></div></div>
                                </div>
                            </div>
                        `;
                container.innerHTML += html;
            });
        }
    },

    navigate: function (pageId) {
        // Gestion de l'affichage du header
        const header = document.querySelector('header');
        if (pageId === 'onboarding') {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (pageId === 'dashboard' && this.user) this.renderDashboard();
            if (pageId === 'jobs') this.filterJobs('all');
            if (pageId === 'admin') this.loadAdminUsers();
        }
    },

    toggleStream: function () {
        const lvl = document.getElementById('level').value;
        const grp = document.getElementById('streamGroup');
        grp.style.display = (lvl === '1BAC' || lvl === '2BAC') ? 'block' : 'none';
    },

    saveProfile: function (e) {
        if (e) e.preventDefault();

        // Get values from form if e is present, otherwise use existing user data
        let name = this.user ? this.user.name : "";
        let level = this.user ? this.user.level : "";
        let stream = this.user ? this.user.stream : "";
        let quiz = this.user ? this.user.quiz : null;

        if (e) {
            const nameInput = document.getElementById('name');
            const levelInput = document.getElementById('level');
            const streamInput = document.getElementById('stream');

            if (nameInput) name = nameInput.value;
            if (levelInput) level = levelInput.value;
            if (streamInput) stream = streamInput.value || '';

            if (!name || !level) { showToast("Veuillez remplir tous les champs !", "error"); return; }
        }

        const userData = { name, level, stream, quiz };

        fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) showToast("Erreur sauvegarde", "error");
                else {
                    this.user = userData;
                    const uName = document.getElementById('uName');
                    if (uName) uName.textContent = name;

                    if (e) {
                        showToast(`Profil mis à jour !`);
                        this.navigate('dashboard');
                    }
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Erreur réseau", "error");
            });
    },

    saveAndExit: function () {
        this.saveProfile();
        showToast("Résultats sauvegardés !");
        this.navigate('dashboard');
    },

    loadUser: function () {
        // Update: Return promise
        return fetch('/api/profile')
            .then(res => res.json())
            .then(data => {
                const profile = data.profile;
                if (profile && profile.name) {
                    this.user = profile;
                    const uName = document.getElementById('uName');
                    if (uName) uName.textContent = this.user.name;
                    return this.user;
                } else {
                    this.user = null;
                    throw new Error("Profile empty");
                }
            })
            .catch(e => {
                console.error(e);
                this.user = null;
                throw e;
            });
    },

    logout: function () {
        if (confirm("Se déconnecter ?")) {
            fetch('/api/logout', { method: 'POST' })
                .then(() => {
                    this.user = null;
                    this.navigate('auth');
                });
        }
    },

    // === SMART SCORING ALGORITHM ===
    calculateJobScore: function (job) {
        let score = 0;
        const user = this.user;
        if (!user) return 0;

        // 1. Stream Match (Base Priority)
        if (user.stream && STREAM_MAP[user.stream]) {
            if (STREAM_MAP[user.stream].includes(job.category)) {
                score += 50; // Big boost for matching stream
            }
        } else {
            // If no stream (e.g. 3AC), slightly boost everything to avoid 0
            score += 10;
        }

        // 2. Quiz (RIASEC) Match
        // Matches job tags against user's dominant RIASEC letters
        if (user.quiz && user.quiz.codes) {
            const userCodes = user.quiz.codes.split(''); // e.g. ['R', 'I', 'S']

            userCodes.forEach((code, index) => {
                const weight = 3 - index; // 1st letter: weight 3, 2nd: 2, 3rd: 1
                const associatedTags = RIASEC_TAGS[code] || [];

                // Check intersection between Job Tags and RIASEC Tags
                const matchCount = job.tags.filter(tag => associatedTags.includes(tag)).length;

                if (matchCount > 0) {
                    score += (matchCount * 15 * weight);
                }
            });
        }

        return score;
    },

    renderDashboard: function () {
        if (!this.user) return;

        let suggestions = this.jobs.map(job => {
            return { ...job, score: this.calculateJobScore(job) };
        });

        // Sort by score descending
        suggestions.sort((a, b) => b.score - a.score);

        // Take top 3 for dashboard
        const topJobs = suggestions.slice(0, 3);

        const container = document.getElementById('featuredJobs');
        if (container) {
            if (topJobs.length > 0 && topJobs[0].score > 0) {
                container.innerHTML = topJobs.map(j => this.createJobCard(j, true)).join('');
            } else {
                // Fallback if no scores (e.g. new user no quiz) - Random but consistent
                container.innerHTML = this.jobs.sort(() => 0.5 - Math.random()).slice(0, 3).map(j => this.createJobCard(j)).join('');
            }
        }

        // Also update profile summary if existing
        this.renderProfileSummary();
    },

    renderProfileSummary: function () {
        const head = document.querySelector('#dashboard .card');
        const existingSummary = document.getElementById('dashboardProfileSummary');
        if (existingSummary) existingSummary.remove();

        const summaryEl = document.createElement('div');
        summaryEl.id = 'dashboardProfileSummary';

        if (this.user.quiz) {
            summaryEl.innerHTML = `
                <div style="background:rgba(255,255,255,0.2); padding:15px; border-radius:8px; margin-top:20px; border:1px solid rgba(255,255,255,0.3);">
                    <h4 style="margin:0 0 5px 0;">Profil RIASEC : ${this.user.quiz.codes}</h4>
                    <p style="font-size:0.9rem; margin:0; opacity:0.9;">Basé sur vos résultats au test.</p>
                </div>
             `;
        } else {
            summaryEl.innerHTML = `
                <div style="background:rgba(255,255,255,0.2); padding:15px; border-radius:8px; margin-top:20px; border:1px dashed rgba(255,255,255,0.5);">
                    <p style="font-size:0.9rem; margin:0;">
                        Passez le test d'orientation pour affiner vos suggestions ! 
                    </p>
                </div>
             `;
        }
        if (head) head.appendChild(summaryEl);
    },

    renderFilters: function () {
        const select = document.getElementById('categoryFilter');
        if (!select) return;
        select.innerHTML = '<option value="all">Toutes les catégories</option>';
        Object.keys(RAW_DATA).sort().forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            select.appendChild(opt);
        });
    },

    filterJobs: function (category) {
        const container = document.getElementById('jobsList');
        if (!container) return;
        const searchValue = document.getElementById('jobSearch') ? document.getElementById('jobSearch').value.toLowerCase() : "";
        let filtered = this.jobs;
        if (category !== 'all') filtered = filtered.filter(j => j.category === category);
        if (searchValue.length > 0) filtered = filtered.filter(j => j.title.toLowerCase().includes(searchValue) || j.category.toLowerCase().includes(searchValue));

        container.innerHTML = filtered.map(j => this.createJobCard(j)).join('');
        const countSpan = document.getElementById('currentCount');
        if (countSpan) countSpan.textContent = filtered.length;
    },

    createJobCard: function (job, showMatch = false) {
        let matchBadge = '';
        if (showMatch && job.score > 40) {
            // Dynamic Badge Color based on score
            const color = job.score > 80 ? 'var(--accent)' : 'var(--secondary)';
            matchBadge = `<div style="position:absolute; top:10px; right:10px; background:${color}; color:white; padding:2px 8px; border-radius:10px; font-size:0.7rem; font-weight:bold;">★ Recommandé</div>`;
        }

        return `
                    <div class="job-card" style="position:relative;" onclick="window.app.showJob(${job.id})">
                        ${matchBadge}
                        <div class="job-header">
                            <div class="job-title">${job.title}</div>
                            <span class="job-category">${job.category}</span>
                        </div>
                        <div class="job-body">
                            ${job.description.substring(0, 80)}...
                        </div>
                    </div>
                `;
    },

    showJob: function (id) {
        const job = this.jobs.find(j => j.id === id);
        if (!job) return;

        const pathData = PATHS_DATA[job.title] || PATHS_DATA.default;
        const userLevel = this.user ? this.user.level : null;

        let timelineHTML = `<div class="timeline">`;
        pathData.main.forEach((step) => {
            let isCurrent = false;
            if (userLevel && LEVEL_MAP[userLevel]) {
                if (LEVEL_MAP[userLevel][0].includes(step.year) || step.year.includes(LEVEL_MAP[userLevel][0])) isCurrent = true;
            }
            const activeClass = isCurrent ? 'is-current' : '';
            timelineHTML += `
                        <div class="timeline-item ${activeClass}">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <span style="font-weight:bold; color:var(--primary); display:block;">${step.year}</span>
                                <span style="display:block; margin-bottom:5px;">${step.target}</span>
                                <p style="font-size:0.9rem; color:var(--text-muted);">${step.desc}</p>
                            </div>
                        </div>
                    `;
        });
        timelineHTML += `</div>`;

        let altsHTML = '';
        if (pathData.alternatives && pathData.alternatives.length > 0) {
            altsHTML = `<div style="margin-top:20px; background:rgba(255, 193, 7, 0.1); padding:15px; border-radius:var(--radius-sm); border-left:4px solid var(--accent);">
                        <h5 style="color:#E65100; margin-bottom:10px;">🛡️ Alternatives</h5>`;
            pathData.alternatives.forEach(alt => {
                altsHTML += `<div style="margin-bottom:10px;"><strong>${alt.condition}</strong><br/><span style="font-size:0.9rem;">${Array.isArray(alt.path) ? alt.path.join(' / ') : alt.path}</span></div>`;
            });
            altsHTML += `</div>`;
        }

        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:20px;">
                            <div>
                                <h2 style="color:var(--primary); line-height:1.2;">${job.title}</h2>
                                <span style="background:var(--secondary); color:white; padding:4px 10px; border-radius:4px; font-size:0.75rem; text-transform:uppercase;">${job.category}</span>
                            </div>
                        </div>
                        <p style="margin-bottom:20px; line-height:1.6;">${job.description}</p>
                        
                        <div style="margin-bottom:20px;">
                            <strong>Compétences clés :</strong>
                            <div style="display:flex; gap:5px; flex-wrap:wrap; margin-top:5px;">
                                ${job.tags.map(t => `<span style="background:var(--bg-input); padding:4px 10px; border-radius:12px; font-size:0.8rem; color:var(--text-muted);">${t}</span>`).join('')}
                            </div>
                        </div>

                        <details style="background:var(--bg-input); border-radius:var(--radius-sm); overflow:hidden;">
                            <summary style="padding:15px; cursor:pointer; font-weight:600; color:var(--primary);">Voir le parcours scolaire 🎓</summary>
                            <div style="padding:15px; border-top:1px solid var(--border-color);">
                                ${timelineHTML}
                                ${altsHTML}
                            </div>
                        </details>
                    `;
        }
        document.getElementById('jobModal').classList.add('open');
    },

    closeModal: function () {
        document.getElementById('jobModal').classList.remove('open');
    },

    startQuiz: function () {
        this.questions = this.getHollandQuestions();
        this.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0, concret: 0, abstrait: 0, autonomie: 0, encadrement: 0, manuel: 0 };
        this.currentQ = 0;
        this.navigate('quiz');
        this.renderQuestion();
    },

    renderQuestion: function () {
        if (!this.questions || this.currentQ >= this.questions.length) return;
        const q = this.questions[this.currentQ];
        const progress = Math.round(((this.currentQ) / this.questions.length) * 100);
        document.getElementById('qText').textContent = `${this.currentQ + 1}. ${q.text}`;
        document.getElementById('quizProgress').style.width = progress + '%';
        document.getElementById('quizProgressText').textContent = `${progress}%`;

        document.getElementById('qOptions').innerHTML = `
                    <button class="option-btn" onclick="window.app.answerQuiz(true)">✓ Oui, tout à fait</button>
                    <button class="option-btn" onclick="window.app.answerQuiz(false)">✗ Non, pas du tout</button>
                `;
    },

    answerQuiz: function (answer) {
        if (!this.questions || this.currentQ >= this.questions.length) return;
        const q = this.questions[this.currentQ];
        if (answer) { if (this.scores[q.type] !== undefined) this.scores[q.type]++; }

        this.currentQ++;
        if (this.currentQ < this.questions.length) { this.renderQuestion(); } else { this.showQuizResults(); }
    },

    showQuizResults: function () {
        const riasecScores = { R: this.scores.R, I: this.scores.I, A: this.scores.A, S: this.scores.S, E: this.scores.E, C: this.scores.C };
        const riasecCode = Object.entries(riasecScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([letter]) => letter).join("");
        const profiles = { cognitif: this.scores.concret > this.scores.abstrait ? "Concret" : "Abstrait", autonomie: this.scores.autonomie > this.scores.encadrement ? "Autonome" : "Encadré" };

        // SAVE QUIZ RESULTS TO PROFILE
        if (this.user) {
            this.user.quiz = {
                codes: riasecCode,
                scores: this.scores,
                profiles: profiles
            };
            this.saveProfile(); // Persist to local storage
        }

        document.getElementById('resProfile').textContent = `Code RIASEC : ${riasecCode}`;
        document.getElementById('resStream').textContent = this.user?.stream || "À déterminer";
        document.getElementById('resTags').innerHTML = `
                    <span style="background:var(--bg-body); padding:6px 12px; border-radius:20px; border:1px solid var(--secondary); color:var(--primary); font-weight:600;">${profiles.cognitif}</span>
                    <span style="background:var(--bg-body); padding:6px 12px; border-radius:20px; border:1px solid var(--secondary); color:var(--primary); font-weight:600;">${profiles.autonomie}</span>
                `;

        // USE NEW SCORING FOR RESULTS
        let suggestions = this.jobs.map(job => {
            return { ...job, score: this.calculateJobScore(job) };
        });
        suggestions.sort((a, b) => b.score - a.score);
        const matches = suggestions.slice(0, 8);

        document.getElementById('resJobs').innerHTML = matches.map(j => this.createJobCard(j, true)).join('');
        this.navigate('results');
    },

    showStats: function () {
        fetch('/api/stats')
            .then(res => res.json())
            .then(stats => {
                const body = document.getElementById('statsBody');
                let html = `<h3>📊 Statistiques Visiteurs</h3>`;
                html += `<p><strong>Total Inscrits :</strong> ${stats.totalUsers}</p>`;
                html += `<p><strong>Tests Passés :</strong> ${stats.quizRun}</p>`;

                html += `<h4>Niveaux</h4><ul>`;
                for (const [lvl, count] of Object.entries(stats.levels)) {
                    html += `<li>${lvl}: ${count}</li>`;
                }
                html += `</ul>`;

                html += `<h4>Filières</h4><ul>`;
                for (const [st, count] of Object.entries(stats.streams)) {
                    html += `<li>${st}: ${count}</li>`;
                }
                html += `</ul>`;

                body.innerHTML = html;
                document.getElementById('statsModal').classList.add('open');
            })
            .catch(e => {
                console.error(e);
                showToast("Impossible de charger les stats", "error");
            });
    },

    loadAdminUsers: function () {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    showToast(data.error, "error");
                    return;
                }
                const container = document.getElementById('adminUsersTable');
                let html = `
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background: var(--primary); color: white;">
                                <th style="padding: 10px; text-align: left;">ID</th>
                                <th style="padding: 10px; text-align: left;">Nom</th>
                                <th style="padding: 10px; text-align: left;">Email</th>
                                <th style="padding: 10px; text-align: left;">Téléphone</th>
                                <th style="padding: 10px; text-align: left;">Niveau</th>
                                <th style="padding: 10px; text-align: left;">Filière</th>
                                <th style="padding: 10px; text-align: left;">Test RIASEC</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.users.forEach((user, index) => {
                    const bgColor = index % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'white';
                    html += `
                        <tr style="background: ${bgColor};">
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.id}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.name}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.email}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.phone || 'Non renseigné'}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.level}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.stream}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${user.quiz}</td>
                        </tr>
                    `;
                });

                html += `
                        </tbody>
                    </table>
                    <p style="margin-top: 15px; color: var(--text-muted); font-size: 0.9rem;">
                        Total: ${data.users.length} utilisateur(s)
                    </p>
                `;

                container.innerHTML = html;
            })
            .catch(e => {
                console.error(e);
                showToast("Erreur de chargement", "error");
            });
    }
};

window.app = app;
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    if (window.app) {
        window.app.init();
    } else {
        console.error("window.app is not defined!");
    }
});
