"use strict";
const code = (...lines) => lines.join("\n");
const tracks = [
    {
        id: "122",
        code: "122",
        name: "Shell 122",
        title: "PowerShell",
        subtitle: "Automatiser des procédures à l'aide de scripts",
        description: "Le parcours de révision déjà prêt: fiches, quiz, exercices, notes et examen blanc.",
        status: "Disponible",
        logo: "powershell",
        color: "#0f6fc5"
    },
    {
        id: "106",
        code: "106",
        name: "SQL 106",
        title: "Bases de données SQL",
        subtitle: "Interroger, filtrer et organiser les données",
        description: "Une première version fonctionnelle avec modules, fiches, quiz et exercices SQL.",
        status: "Verrouille",
        logo: "sql",
        color: "#147d82"
    },
    {
        id: "231",
        code: "231",
        name: "Sécu 231",
        title: "Sécurité",
        subtitle: "Risques, protections et bonnes pratiques",
        description: "Une première version fonctionnelle avec modules, fiches, quiz et exercices sécurité.",
        status: "Verrouille",
        logo: "security",
        color: "#b33d3d"
    }
];
const modules = [
    {
        id: "administratif",
        title: "Administratif",
        icon: "AD",
        color: "#5c5a9d",
        duration: "20 min",
        summary: "Les réflexes qui évitent de perdre des points: lire l'énoncé, choisir la bonne commande, tester sans casser, puis expliquer ce que fait le script.",
        goals: [
            "Transformer un énoncé en étapes PowerShell simples.",
            "Utiliser l'aide intégrée et les commandes de découverte.",
            "Sécuriser les actions sensibles avec WhatIf, Confirm et un dossier de test."
        ],
        essentials: [
            { term: "Méthode d'examen", detail: "Entrée, traitement, sortie: identifie toujours ce que le script reçoit, ce qu'il modifie et ce qu'il doit afficher.", code: "Get-Help about_Automatic_Variables" },
            { term: "Action prudente", detail: "Les cmdlets destructives acceptent souvent -WhatIf et -Confirm. C'est le premier réflexe avant une suppression ou un déplacement massif.", code: "Remove-Item .\\temp\\*.log -WhatIf" },
            { term: "Commande de secours", detail: "Si tu bloques, découvre la commande avec Get-Command, lis ses exemples avec Get-Help, puis inspecte les objets avec Get-Member.", code: "Get-Command -Noun Item\nGet-Help Copy-Item -Examples" }
        ],
        examples: [
            { title: "Tester avant de modifier", text: "Tu peux vérifier l'effet d'une commande sans l'exécuter réellement.", code: code("Get-ChildItem .\\logs -Filter *.tmp |", "  Remove-Item -WhatIf") },
            { title: "Garder une trace", text: "Un journal simple aide à prouver ce que ton script a fait.", code: code("$date = Get-Date -Format 'yyyy-MM-dd HH:mm'", "\"$date - Nettoyage lancé\" | Out-File .\\journal.txt -Append") }
        ],
        pitfalls: [
            "Utiliser des alias dans une réponse longue: ls marche, mais Get-ChildItem est plus clair.",
            "Lancer une suppression récursive sans -WhatIf pendant les essais.",
            "Oublier d'expliquer le type d'objet qui circule dans le pipeline."
        ],
        quiz: [
            { q: "Quelle commande permet de lire des exemples officiels pour une cmdlet?", choices: ["Get-Command Get-ChildItem", "Get-Help Get-ChildItem -Examples", "Show-Examples Get-ChildItem", "Read-Manual Get-ChildItem"], answer: 1, why: "Get-Help avec -Examples affiche des usages concrets de la cmdlet." },
            { q: "Quel paramètre sert à simuler une action sans l'exécuter?", choices: ["-Preview", "-Confirm", "-WhatIf", "-DryRun"], answer: 2, why: "-WhatIf décrit ce qui serait fait sans modifier le système." },
            { q: "Pourquoi éviter les alias dans un script évalué?", choices: ["Ils sont toujours plus lents", "Ils peuvent être ambigus et moins lisibles", "Ils ne fonctionnent jamais dans un script", "Ils changent les permissions"], answer: 1, why: "Les noms complets rendent le script plus clair et plus portable." },
            { q: "Quel ordre de réflexion est le plus solide avant d'écrire un script?", choices: ["Sortie, couleur, raccourci", "Entrée, traitement, sortie", "Alias, thème, police", "Erreur, hasard, correction"], answer: 1, why: "Entrée, traitement, sortie donne une structure simple pour résoudre l'exercice." }
        ],
        labs: [
            { prompt: "Écris une commande qui supprimerait les fichiers .tmp du dossier logs uniquement en simulation.", hint: "Il faut filtrer les fichiers et ajouter la simulation.", checks: ["(Remove-Item|rm|del)", "\\.tmp|\\*\\.tmp|-Filter", "-WhatIf"], solution: "Get-ChildItem .\\logs -Filter *.tmp | Remove-Item -WhatIf" },
            { prompt: "Écris deux commandes pour trouver une cmdlet liée aux fichiers, puis afficher ses exemples.", hint: "Commence par Get-Command, puis Get-Help.", checks: ["Get-Command", "Get-Help", "-Examples"], solution: "Get-Command -Noun Item\nGet-Help Get-ChildItem -Examples" }
        ],
        memo: [
            { front: "Premier réflexe avant une suppression?", back: "Tester avec -WhatIf, vérifier le chemin, puis seulement exécuter." },
            { front: "Commande pour découvrir une cmdlet?", back: "Get-Command, par exemple Get-Command -Verb Get." },
            { front: "Commande pour lire les exemples?", back: "Get-Help Nom-Cmdlet -Examples." },
            { front: "Pourquoi écrire les noms complets?", back: "Parce qu'ils sont lisibles, explicites et acceptés partout." }
        ]
    },
    {
        id: "bases",
        title: "Bases de PowerShell",
        icon: "PS",
        color: "#206ba4",
        duration: "35 min",
        summary: "Les fondations: cmdlets, paramètres, pipeline, aide intégrée et logique objet. C'est le module qui rend tous les autres plus simples.",
        goals: [
            "Reconnaître la forme Verb-Noun des cmdlets.",
            "Utiliser le pipeline comme transport d'objets.",
            "Trouver seul une commande, un paramètre ou un exemple."
        ],
        essentials: [
            { term: "Cmdlet", detail: "Une cmdlet suit souvent la forme Verbe-Nom: Get-Process, Set-Location, New-Item.", code: "Get-Command -Verb Get" },
            { term: "Pipeline", detail: "Le pipeline ne transporte pas juste du texte: il transmet des objets avec propriétés et méthodes.", code: "Get-Process | Sort-Object CPU -Descending" },
            { term: "Paramètres", detail: "Un paramètre nommé commence par un tiret. Les paramètres positionnels existent, mais les nommer améliore la lecture.", code: "Get-ChildItem -Path . -Filter *.ps1" }
        ],
        examples: [
            { title: "Trouver une commande", text: "Quand tu ne connais pas la cmdlet exacte, cherche par verbe, nom ou mot-clé.", code: code("Get-Command -Verb Get", "Get-Command *Service*", "Get-Help Get-Service -Examples") },
            { title: "Pipeline objet", text: "Where-Object filtre les objets, Select-Object choisit les propriétés à afficher.", code: code("Get-Service |", "  Where-Object Status -eq 'Running' |", "  Select-Object Name, Status") }
        ],
        pitfalls: [
            "Croire que le pipeline PowerShell fonctionne comme un simple flux de texte.",
            "Utiliser Format-Table trop tôt: après un Format-*, tu as surtout préparé l'affichage.",
            "Confondre Get-Command, qui trouve les commandes, avec Get-Help, qui explique leur usage."
        ],
        quiz: [
            { q: "Quelle cmdlet respecte la convention Verb-Noun?", choices: ["ListFiles", "Get-Process", "process-get", "Show all files"], answer: 1, why: "Get-Process utilise un verbe approuvé puis un nom." },
            { q: "Que transporte principalement le pipeline PowerShell?", choices: ["Des captures d'écran", "Des objets .NET", "Uniquement du texte brut", "Des fichiers ZIP"], answer: 1, why: "Le pipeline transporte des objets, ce qui permet de filtrer par propriété." },
            { q: "Quel caractère introduit un paramètre nommé?", choices: ["$", "-", "@", "#"], answer: 1, why: "Les paramètres nommés s'écrivent avec un tiret: -Path, -Filter, -Recurse." },
            { q: "Quelle commande affiche l'aide complète d'une cmdlet?", choices: ["Get-Help Get-Service -Full", "Get-Service -Help", "Show-Help Get-Service", "Help-Command Get-Service"], answer: 0, why: "Get-Help Nom-Cmdlet -Full affiche la documentation détaillée." }
        ],
        labs: [
            { prompt: "Écris une commande qui liste les services démarrés et affiche seulement Name et Status.", hint: "Utilise Get-Service, Where-Object et Select-Object.", checks: ["Get-Service", "Where-Object|\\?", "Status", "Running", "Select-Object|select", "Name"], solution: "Get-Service | Where-Object Status -eq 'Running' | Select-Object Name, Status" },
            { prompt: "Écris une commande qui cherche les cmdlets contenant le mot Service.", hint: "Get-Command accepte des jokers.", checks: ["Get-Command", "\\*Service\\*|Service"], solution: "Get-Command *Service*" }
        ],
        memo: [
            { front: "Structure typique d'une cmdlet?", back: "Verbe-Nom, par exemple Get-Process ou Set-Location." },
            { front: "Pipeline PowerShell = ?", back: "Une chaîne d'objets transmis de commande en commande." },
            { front: "Filtrer dans le pipeline?", back: "Where-Object, souvent avec une propriété et un opérateur." },
            { front: "Choisir les propriétés affichées?", back: "Select-Object NomPropriete1, NomPropriete2." }
        ]
    },
    {
        id: "fichiers",
        title: "Système de fichiers",
        icon: "SF",
        color: "#147d82",
        duration: "40 min",
        summary: "Naviguer, créer, copier, déplacer, supprimer et filtrer des fichiers. C'est le terrain d'entraînement idéal pour les scripts.",
        goals: [
            "Manipuler chemins absolus, relatifs et éléments du système de fichiers.",
            "Utiliser les filtres, la récursion et les tests d'existence.",
            "Écrire des commandes prudentes pour les actions destructives."
        ],
        essentials: [
            { term: "Navigation", detail: "Set-Location change de dossier. Get-Location affiche le dossier courant.", code: "Set-Location C:\\Cours\\122\nGet-Location" },
            { term: "Lister", detail: "Get-ChildItem liste les éléments. -Recurse descend dans les sous-dossiers, -Filter limite côté fournisseur.", code: "Get-ChildItem . -Filter *.ps1 -Recurse" },
            { term: "Créer et tester", detail: "New-Item crée fichiers ou dossiers. Test-Path vérifie l'existence avant une action.", code: "if (-not (Test-Path .\\out)) { New-Item .\\out -ItemType Directory }" }
        ],
        examples: [
            { title: "Copier des scripts", text: "Filtre d'abord ce que tu veux copier, puis envoie les objets à Copy-Item.", code: code("Get-ChildItem .\\src -Filter *.ps1 |", "  Copy-Item -Destination .\\backup") },
            { title: "Nettoyer avec prudence", text: "Pour les suppressions, commence avec -WhatIf et un filtre précis.", code: code("Get-ChildItem .\\logs -Filter *.log -Recurse |", "  Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) |", "  Remove-Item -WhatIf") }
        ],
        pitfalls: [
            "Confondre -Filter et Where-Object: -Filter est souvent plus efficace pour les fichiers.",
            "Oublier que Remove-Item -Recurse peut supprimer beaucoup plus que prévu.",
            "Construire des chemins par concaténation fragile au lieu de Join-Path."
        ],
        quiz: [
            { q: "Quelle cmdlet liste les fichiers et dossiers?", choices: ["Get-ItemName", "Get-ChildItem", "Read-Folder", "Open-Directory"], answer: 1, why: "Get-ChildItem liste le contenu d'un chemin." },
            { q: "Quel paramètre descend dans les sous-dossiers?", choices: ["-DepthOnly", "-Recursive", "-Recurse", "-Inside"], answer: 2, why: "-Recurse indique que la commande doit parcourir les sous-dossiers." },
            { q: "Quelle cmdlet vérifie qu'un chemin existe?", choices: ["Test-Path", "Check-File", "Get-Exists", "Confirm-Path"], answer: 0, why: "Test-Path retourne True ou False selon l'existence du chemin." },
            { q: "Quelle cmdlet construit proprement un chemin?", choices: ["Build-Path", "Join-Path", "Make-Path", "Set-Path"], answer: 1, why: "Join-Path assemble des parties de chemin en respectant le fournisseur." }
        ],
        labs: [
            { prompt: "Écris une commande qui liste récursivement tous les fichiers .ps1 du dossier courant.", hint: "Il faut Get-ChildItem, -Recurse et un filtre .ps1.", checks: ["Get-ChildItem|gci|dir|ls", "-Recurse", "\\.ps1|\\*\\.ps1|-Filter"], solution: "Get-ChildItem . -Filter *.ps1 -Recurse" },
            { prompt: "Écris un bloc qui crée le dossier out seulement s'il n'existe pas.", hint: "Combine Test-Path, if et New-Item.", checks: ["if", "Test-Path", "New-Item", "Directory"], solution: "if (-not (Test-Path .\\out)) {\n  New-Item .\\out -ItemType Directory\n}" }
        ],
        memo: [
            { front: "Lister un dossier?", back: "Get-ChildItem, alias fréquents: gci, dir, ls." },
            { front: "Tester l'existence?", back: "Test-Path .\\chemin." },
            { front: "Créer un dossier?", back: "New-Item .\\out -ItemType Directory." },
            { front: "Assembler des chemins?", back: "Join-Path $base 'fichier.txt'." }
        ]
    },
    {
        id: "fournisseurs",
        title: "Fournisseurs",
        icon: "FO",
        color: "#2f8a4d",
        duration: "30 min",
        summary: "PowerShell expose plusieurs espaces sous forme de lecteurs: fichiers, registre, variables, environnement, certificats. Les mêmes verbes deviennent réutilisables.",
        goals: [
            "Comprendre la notion de fournisseur PowerShell.",
            "Lister les lecteurs disponibles avec Get-PSDrive.",
            "Naviguer dans Env:, Variable: ou HKCU: comme dans un dossier."
        ],
        essentials: [
            { term: "Provider", detail: "Un fournisseur adapte les cmdlets Item à un espace de données: FileSystem, Registry, Environment, Variable, Certificate.", code: "Get-PSProvider" },
            { term: "PSDrive", detail: "Un lecteur PowerShell est un point d'accès à un fournisseur. Exemples: C:, Env:, HKCU:, Variable:.", code: "Get-PSDrive" },
            { term: "Même logique", detail: "Get-ChildItem, Get-Item, Set-Item et Remove-Item peuvent fonctionner sur plusieurs fournisseurs.", code: "Get-ChildItem Env:\nGet-Item Variable:HOME" }
        ],
        examples: [
            { title: "Lire les variables d'environnement", text: "Env: se parcourt comme un lecteur.", code: code("Get-ChildItem Env:", "$env:USERNAME", "$env:PATH -split ';'") },
            { title: "Explorer le registre", text: "Sur Windows, HKCU: et HKLM: exposent le registre via le fournisseur Registry.", code: code("Get-ChildItem HKCU:\\Software", "Get-ItemProperty HKCU:\\Software\\Microsoft") }
        ],
        pitfalls: [
            "Penser que PowerShell ne sait travailler qu'avec des fichiers.",
            "Oublier le deux-points dans Env: ou Variable:.",
            "Confondre variable PowerShell $HOME et variable d'environnement $env:PATH."
        ],
        quiz: [
            { q: "Quelle commande liste les fournisseurs disponibles?", choices: ["Get-Provider", "Get-PSProvider", "Show-PSDrive", "Get-Registry"], answer: 1, why: "Get-PSProvider affiche les fournisseurs PowerShell." },
            { q: "Quel lecteur expose les variables d'environnement?", choices: ["Env:", "Var:", "Path:", "System:"], answer: 0, why: "Env: permet de lire et modifier les variables d'environnement." },
            { q: "Quelle commande liste les lecteurs PowerShell?", choices: ["Get-Drive", "Get-PSDrive", "Get-Location", "Get-VolumeOnly"], answer: 1, why: "Get-PSDrive affiche C:, Env:, Variable:, HKCU:, etc." },
            { q: "Quelle syntaxe lit directement la variable d'environnement PATH?", choices: ["$PATH", "$env:PATH", "Env.PATH", "Get-PATH"], answer: 1, why: "$env:PATH lit PATH via le fournisseur Environment." }
        ],
        labs: [
            { prompt: "Écris une commande qui affiche toutes les variables d'environnement.", hint: "Le lecteur est Env:.", checks: ["Get-ChildItem|gci|dir|ls", "Env:"], solution: "Get-ChildItem Env:" },
            { prompt: "Écris deux commandes: une pour afficher les fournisseurs, une pour afficher les lecteurs PowerShell.", hint: "Les deux cmdlets commencent par Get-PS.", checks: ["Get-PSProvider", "Get-PSDrive"], solution: "Get-PSProvider\nGet-PSDrive" }
        ],
        memo: [
            { front: "Lister les fournisseurs?", back: "Get-PSProvider." },
            { front: "Lister les lecteurs PowerShell?", back: "Get-PSDrive." },
            { front: "Variables d'environnement?", back: "Lecteur Env: ou syntaxe $env:NOM." },
            { front: "Registre utilisateur Windows?", back: "HKCU: via le fournisseur Registry." }
        ]
    },
    {
        id: "variables",
        title: "Variables, constantes et types",
        icon: "VT",
        color: "#bf7410",
        duration: "40 min",
        summary: "Stocker une valeur, contrôler son type, interpoler du texte et protéger une constante. Indispensable pour écrire des scripts fiables.",
        goals: [
            "Déclarer et modifier des variables.",
            "Comprendre typage implicite, conversion et annotations de type.",
            "Créer une constante et choisir les guillemets adaptés."
        ],
        essentials: [
            { term: "Variable", detail: "Une variable commence par $. PowerShell déduit souvent le type, mais tu peux l'indiquer.", code: "$nom = 'Jonathan'\n[int]$age = 18" },
            { term: "Chaînes", detail: "Les guillemets doubles interpolent les variables. Les guillemets simples gardent le texte littéral.", code: "\"Bonjour $nom\"\n'Bonjour $nom'" },
            { term: "Constante", detail: "Set-Variable avec -Option Constant crée une valeur qui ne peut pas être modifiée dans la session.", code: "Set-Variable -Name TVA -Value 0.081 -Option Constant" }
        ],
        examples: [
            { title: "Contrôler un type", text: "Une annotation [int] force une conversion ou déclenche une erreur si la valeur ne convient pas.", code: code("[int]$quantite = '12'", "$quantite.GetType().Name") },
            { title: "Créer une chaîne lisible", text: "Pour coller une propriété d'objet dans une phrase, utilise $() dans une chaîne double.", code: code("$file = Get-Item .\\script.ps1", "\"Le fichier pèse $($file.Length) octets\"") }
        ],
        pitfalls: [
            "Écrire '$nom' avec des guillemets simples et attendre une interpolation.",
            "Confondre $env:PATH avec une variable PowerShell ordinaire.",
            "Utiliser une variable sans l'initialiser, puis croire qu'elle vaut 0."
        ],
        quiz: [
            { q: "Quel symbole commence une variable PowerShell?", choices: ["@", "$", "%", "&"], answer: 1, why: "Les variables PowerShell commencent par $." },
            { q: "Quelle chaîne interpole la variable $nom?", choices: ["'Bonjour $nom'", "\"Bonjour $nom\"", "`Bonjour $nom`", "@Bonjour $nom"], answer: 1, why: "Les guillemets doubles remplacent $nom par sa valeur." },
            { q: "Comment forcer une variable en entier?", choices: ["$age:int = 18", "int $age = 18", "[int]$age = 18", "$age = int(18)"], answer: 2, why: "L'annotation de type se place avant la variable." },
            { q: "Quelle option crée une constante avec Set-Variable?", choices: ["-ReadOnly", "-Fixed", "-Static", "-Option Constant"], answer: 3, why: "-Option Constant empêche la modification ou suppression dans la session." }
        ],
        labs: [
            { prompt: "Écris deux lignes: une variable $nom avec ton prénom, puis une phrase qui l'affiche avec interpolation.", hint: "Utilise des guillemets doubles pour la phrase.", checks: ["\\$nom", "\".*\\$nom.*\""], solution: "$nom = 'Jonathan'\n\"Bonjour $nom\"" },
            { prompt: "Écris une ligne qui crée une constante PI valant 3.14.", hint: "Set-Variable sait créer une constante.", checks: ["Set-Variable", "PI", "3\\.14", "Constant"], solution: "Set-Variable -Name PI -Value 3.14 -Option Constant" }
        ],
        memo: [
            { front: "Variable PowerShell?", back: "$nom = 'valeur'." },
            { front: "Type entier?", back: "[int]$nombre = 42." },
            { front: "Interpolation?", back: "Guillemets doubles: \"Salut $nom\"." },
            { front: "Constante?", back: "Set-Variable -Name NOM -Value valeur -Option Constant." }
        ]
    },
    {
        id: "operateurs",
        title: "Opérateurs",
        icon: "OP",
        color: "#b33d3d",
        duration: "35 min",
        summary: "Comparer, combiner, tester un motif, calculer et affecter. Les opérateurs rendent les conditions et filtres précis.",
        goals: [
            "Utiliser les opérateurs de comparaison PowerShell.",
            "Différencier -eq, -like, -match, -contains et -in.",
            "Combiner des conditions avec -and, -or et -not."
        ],
        essentials: [
            { term: "Comparaison", detail: "PowerShell utilise -eq, -ne, -gt, -ge, -lt, -le au lieu de ==, !=, > dans les conditions typiques.", code: "$age -ge 18" },
            { term: "Motifs", detail: "-like utilise des jokers. -match utilise une expression régulière.", code: "$name -like 'Jo*'\n$email -match '@.+\\.'" },
            { term: "Collections", detail: "-contains demande si une collection contient une valeur. -in demande si une valeur est dans une collection.", code: "@('ps1','txt') -contains 'ps1'\n'ps1' -in @('ps1','txt')" }
        ],
        examples: [
            { title: "Filtrer par taille et extension", text: "Combine plusieurs conditions dans Where-Object.", code: code("Get-ChildItem . |", "  Where-Object { $_.Length -gt 1MB -and $_.Extension -eq '.zip' }") },
            { title: "Tester un nom de fichier", text: "Utilise -like pour un joker simple et -match pour un motif plus précis.", code: code("$file = 'rapport-2026.pdf'", "$file -like 'rapport-*'", "$file -match '^rapport-\\d{4}\\.pdf$'") }
        ],
        pitfalls: [
            "Utiliser = au lieu de -eq dans une condition.",
            "Confondre -contains et -in: l'ordre collection/valeur change.",
            "Employer -match alors qu'un simple joker -like suffit."
        ],
        quiz: [
            { q: "Quel opérateur teste l'égalité?", choices: ["=", "==", "-eq", "-same"], answer: 2, why: "-eq est l'opérateur d'égalité PowerShell." },
            { q: "Quel opérateur utilise des jokers comme * ?", choices: ["-like", "-match", "-contains", "-regex"], answer: 0, why: "-like compare avec des jokers." },
            { q: "Quelle expression vérifie que 'ps1' est dans un tableau?", choices: ["@('ps1','txt') -in 'ps1'", "'ps1' -in @('ps1','txt')", "'ps1' -inside @('ps1')", "@('ps1') -has 'ps1'"], answer: 1, why: "Avec -in, la valeur est à gauche et la collection à droite." },
            { q: "Quel opérateur combine deux conditions obligatoires?", choices: ["-or", "-and", "-xor", "-join"], answer: 1, why: "-and exige que les deux conditions soient vraies." }
        ],
        labs: [
            { prompt: "Écris une condition qui vérifie que $age est au moins 18 et que $pays vaut CH.", hint: "Combine -ge, -eq et -and.", checks: ["\\$age", "-ge", "18", "-and", "\\$pays", "-eq", "CH"], solution: "$age -ge 18 -and $pays -eq 'CH'" },
            { prompt: "Écris une commande qui garde seulement les fichiers .log plus grands que 10MB.", hint: "Get-ChildItem puis Where-Object avec Extension et Length.", checks: ["Get-ChildItem|gci|dir|ls", "Where-Object|\\?", "Extension", "-eq", "\\.log", "Length", "-gt", "10MB"], solution: "Get-ChildItem . | Where-Object { $_.Extension -eq '.log' -and $_.Length -gt 10MB }" }
        ],
        memo: [
            { front: "Égalité?", back: "-eq, pas = dans une condition." },
            { front: "Jokers?", back: "-like, par exemple $x -like 'adm*'." },
            { front: "Regex?", back: "-match, par exemple $mail -match '@'." },
            { front: "Valeur dans collection?", back: "'a' -in @('a','b') ou @('a','b') -contains 'a'." }
        ]
    },
    {
        id: "objets",
        title: "Objets et collections",
        icon: "OC",
        color: "#206ba4",
        duration: "45 min",
        summary: "PowerShell devient puissant quand tu manipules les propriétés et méthodes des objets au lieu de simples lignes de texte.",
        goals: [
            "Inspecter un objet avec Get-Member.",
            "Filtrer, trier, grouper et sélectionner des objets.",
            "Créer un objet personnalisé pour structurer une sortie."
        ],
        essentials: [
            { term: "Inspection", detail: "Get-Member révèle le type, les propriétés et les méthodes des objets qui passent dans le pipeline.", code: "Get-Process | Get-Member" },
            { term: "Sélection", detail: "Select-Object choisit ou calcule des propriétés pour produire une sortie plus utile.", code: "Get-Process | Select-Object Name, CPU, Id" },
            { term: "Objet personnalisé", detail: "[pscustomobject] crée une structure claire, très pratique pour des rapports.", code: "[pscustomobject]@{ Nom = 'Script'; Etat = 'OK' }" }
        ],
        examples: [
            { title: "Trier les processus", text: "Sort-Object trie selon une propriété, puis Select-Object limite l'affichage.", code: code("Get-Process |", "  Sort-Object CPU -Descending |", "  Select-Object -First 5 Name, CPU, Id") },
            { title: "Rapport personnalisé", text: "Un objet personnalisé donne des colonnes propres à ton résultat.", code: code("[pscustomobject]@{", "  Dossier = (Get-Location).Path", "  Date = Get-Date", "  Fichiers = (Get-ChildItem -File).Count", "}") }
        ],
        pitfalls: [
            "Formater trop tôt avec Format-Table, puis perdre la facilité de trier ou filtrer.",
            "Oublier Get-Member quand on ne connaît pas les propriétés disponibles.",
            "Confondre une propriété avec une méthode: propriété = valeur, méthode = action."
        ],
        quiz: [
            { q: "Quelle commande inspecte les propriétés et méthodes d'un objet?", choices: ["Get-Info", "Get-Member", "Show-Object", "Read-Type"], answer: 1, why: "Get-Member affiche le type et les membres disponibles." },
            { q: "Quelle cmdlet trie des objets?", choices: ["Order-Object", "Sort-Object", "Arrange-Object", "Group-Object"], answer: 1, why: "Sort-Object trie selon une ou plusieurs propriétés." },
            { q: "Quelle syntaxe crée un objet personnalisé?", choices: ["new object {}", "[pscustomobject]@{ Nom = 'Test' }", "@object(Nom='Test')", "Object-Create Nom Test"], answer: 1, why: "[pscustomobject] transforme une table de hachage en objet personnalisé." },
            { q: "Quelle cmdlet choisit les propriétés à afficher?", choices: ["Select-Object", "Pick-Object", "Where-Object", "Format-Object"], answer: 0, why: "Select-Object extrait ou calcule les propriétés voulues." }
        ],
        labs: [
            { prompt: "Écris une commande qui affiche les 5 processus qui consomment le plus de CPU avec Name, CPU et Id.", hint: "Get-Process, Sort-Object -Descending, Select-Object -First 5.", checks: ["Get-Process", "Sort-Object", "CPU", "-Descending", "Select-Object|select", "-First\\s+5", "Name", "Id"], solution: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, Id" },
            { prompt: "Écris une expression qui crée un objet avec les propriétés Nom='Backup' et Etat='OK'.", hint: "Utilise [pscustomobject] et une table de hachage.", checks: ["\\[pscustomobject\\]", "Nom", "Backup", "Etat", "OK"], solution: "[pscustomobject]@{ Nom = 'Backup'; Etat = 'OK' }" }
        ],
        memo: [
            { front: "Inspecter un objet?", back: "Objet | Get-Member." },
            { front: "Filtrer des objets?", back: "Where-Object." },
            { front: "Trier?", back: "Sort-Object Propriété -Descending." },
            { front: "Créer un objet propre?", back: "[pscustomobject]@{ Cle = Valeur }." }
        ]
    },
    {
        id: "tableaux",
        title: "Tableaux",
        icon: "TA",
        color: "#147d82",
        duration: "35 min",
        summary: "Les tableaux regroupent plusieurs valeurs. Tu dois savoir les créer, les parcourir, accéder à un index et distinguer tableau et table de hachage.",
        goals: [
            "Créer et lire un tableau.",
            "Parcourir des valeurs avec foreach.",
            "Utiliser une table de hachage pour associer clés et valeurs."
        ],
        essentials: [
            { term: "Tableau", detail: "Un tableau se crée avec des valeurs séparées par des virgules ou avec @() pour forcer une collection.", code: "$notes = @(4.5, 5, 6)" },
            { term: "Index", detail: "Les index commencent à 0. -1 récupère souvent le dernier élément.", code: "$notes[0]\n$notes[-1]" },
            { term: "Table de hachage", detail: "Une hashtable associe une clé à une valeur. Elle se note @{}.", code: "$user = @{ Nom = 'Mukuna'; Role = 'Etudiant' }" }
        ],
        examples: [
            { title: "Parcourir un tableau", text: "foreach donne chaque élément dans une variable temporaire.", code: code("$extensions = @('.ps1', '.txt', '.csv')", "foreach ($ext in $extensions) {", "  \"Extension: $ext\"", "}") },
            { title: "Transformer des lignes en objets", text: "Une boucle peut produire une collection d'objets structurés.", code: code("$noms = @('Ana', 'Luca')", "$noms | ForEach-Object {", "  [pscustomobject]@{ Nom = $_; Longueur = $_.Length }", "}") }
        ],
        pitfalls: [
            "Oublier que le premier index est 0.",
            "Utiliser += dans une très grande boucle: simple pour apprendre, moins performant à grande échelle.",
            "Confondre tableau @() et table de hachage @{}."
        ],
        quiz: [
            { q: "Comment créer explicitement un tableau?", choices: ["#(1,2,3)", "@(1,2,3)", "{1,2,3}", "array[1,2,3]"], answer: 1, why: "@() force une expression à être traitée comme tableau." },
            { q: "Quel index récupère le premier élément?", choices: ["1", "-1", "0", "first"], answer: 2, why: "Les tableaux sont indexés à partir de 0." },
            { q: "Quelle notation crée une table de hachage?", choices: ["@{}", "@()", "[]", "$()"], answer: 0, why: "@{} crée une collection clé-valeur." },
            { q: "Quelle boucle est naturelle pour parcourir chaque élément?", choices: ["foreach", "switch", "try", "param"], answer: 0, why: "foreach parcourt chaque élément d'une collection." }
        ],
        labs: [
            { prompt: "Écris un tableau $extensions contenant .ps1, .txt et .csv, puis affiche le premier élément.", hint: "Le premier index est 0.", checks: ["\\$extensions", "@\\(", "\\.ps1", "\\.txt", "\\.csv", "\\[0\\]"], solution: "$extensions = @('.ps1', '.txt', '.csv')\n$extensions[0]" },
            { prompt: "Écris une table de hachage $personne avec les clés Nom et Role.", hint: "Une table de hachage utilise @{}.", checks: ["\\$personne", "@\\{", "Nom", "Role"], solution: "$personne = @{ Nom = 'Jonathan'; Role = 'Etudiant' }" }
        ],
        memo: [
            { front: "Créer un tableau?", back: "$nombres = @(1, 2, 3)." },
            { front: "Premier élément?", back: "$tableau[0]." },
            { front: "Dernier élément?", back: "$tableau[-1]." },
            { front: "Hashtable?", back: "@{ Cle = Valeur; AutreCle = Valeur }." }
        ]
    },
    {
        id: "controle",
        title: "Structures de contrôle",
        icon: "SC",
        color: "#bf7410",
        duration: "45 min",
        summary: "if, switch, for, foreach, while et try/catch permettent de décider, répéter et gérer les erreurs.",
        goals: [
            "Écrire des conditions if/elseif/else lisibles.",
            "Choisir la bonne boucle selon le besoin.",
            "Gérer une erreur avec try/catch."
        ],
        essentials: [
            { term: "Condition", detail: "if exécute un bloc si une condition est vraie. elseif et else gèrent les autres cas.", code: "if ($note -ge 4) { 'Réussi' } else { 'À revoir' }" },
            { term: "Boucles", detail: "foreach parcourt une collection. for contrôle un compteur. while répète tant qu'une condition est vraie.", code: "foreach ($file in Get-ChildItem) { $file.Name }" },
            { term: "Erreurs", detail: "try/catch capture une erreur bloquante. Avec -ErrorAction Stop, une erreur non bloquante devient capturable.", code: "try { Get-Item .\\absent -ErrorAction Stop } catch { $_.Exception.Message }" }
        ],
        examples: [
            { title: "Choisir avec switch", text: "switch est propre quand plusieurs valeurs sont possibles.", code: code("switch ($extension) {", "  '.ps1' { 'Script PowerShell' }", "  '.csv' { 'Données' }", "  default { 'Autre' }", "}") },
            { title: "Boucle avec compteur", text: "for est utile quand tu dois contrôler un index.", code: code("for ($i = 0; $i -lt $notes.Count; $i++) {", "  \"Note $i = $($notes[$i])\"", "}") }
        ],
        pitfalls: [
            "Utiliser = au lieu de -eq dans une condition.",
            "Faire une boucle while sans modifier la condition: risque de boucle infinie.",
            "Penser que catch capture toutes les erreurs sans -ErrorAction Stop."
        ],
        quiz: [
            { q: "Quelle structure choisit entre plusieurs blocs selon une condition?", choices: ["if", "param", "function", "select"], answer: 0, why: "if/elseif/else permet de décider selon des conditions." },
            { q: "Quelle boucle parcourt naturellement une collection?", choices: ["foreach", "while", "switch", "try"], answer: 0, why: "foreach donne chaque élément de la collection." },
            { q: "Comment rendre une erreur capturable par catch dans beaucoup de cmdlets?", choices: ["-Catch True", "-ErrorAction Stop", "-Force Catch", "-Exception"], answer: 1, why: "-ErrorAction Stop transforme l'erreur en erreur bloquante capturable." },
            { q: "Quelle structure est pratique pour plusieurs valeurs exactes?", choices: ["switch", "for", "try", "New-Item"], answer: 0, why: "switch évite une longue chaîne de if/elseif." }
        ],
        labs: [
            { prompt: "Écris un if qui affiche Réussi si $note est au moins 4, sinon À revoir.", hint: "Condition avec -ge et bloc else.", checks: ["if", "\\$note", "-ge", "4", "else"], solution: "if ($note -ge 4) {\n  'Réussi'\n} else {\n  'À revoir'\n}" },
            { prompt: "Écris une boucle foreach qui affiche le nom de chaque fichier du dossier courant.", hint: "Get-ChildItem fournit les fichiers; chaque objet a Name.", checks: ["foreach", "\\$file", "Get-ChildItem|gci|dir|ls", "Name"], solution: "foreach ($file in Get-ChildItem) {\n  $file.Name\n}" }
        ],
        memo: [
            { front: "Condition simple?", back: "if (condition) { bloc } else { bloc }." },
            { front: "Parcourir une collection?", back: "foreach ($x in $collection) { ... }." },
            { front: "Plusieurs cas?", back: "switch ($valeur) { ... }." },
            { front: "Capturer une erreur de cmdlet?", back: "try avec -ErrorAction Stop, puis catch." }
        ]
    },
    {
        id: "fonctions",
        title: "Fonctions et scripts",
        icon: "FS",
        color: "#2f8a4d",
        duration: "50 min",
        summary: "Une fonction transforme une suite de commandes en outil réutilisable. Un bon script a des paramètres, des noms clairs et une sortie exploitable.",
        goals: [
            "Écrire une fonction avec un bloc param.",
            "Créer un script .ps1 propre et paramétrable.",
            "Retourner des objets plutôt que du texte difficile à traiter."
        ],
        essentials: [
            { term: "Fonction", detail: "Une fonction nommée contient des commandes et peut accepter des paramètres.", code: "function Get-Salutation { param([string]$Nom) \"Bonjour $Nom\" }" },
            { term: "Script", detail: "Un script .ps1 peut commencer par param pour recevoir des valeurs depuis la ligne de commande.", code: "param([string]$Path = '.')\nGet-ChildItem -Path $Path" },
            { term: "Sortie", detail: "Évite Write-Host pour les données. Retourne des objets ou des chaînes dans le pipeline.", code: "[pscustomobject]@{ Path = $Path; Count = (Get-ChildItem $Path).Count }" }
        ],
        examples: [
            { title: "Fonction avec validation", text: "ValidateSet limite les valeurs acceptées par un paramètre.", code: code("function Get-Message {", "  param([ValidateSet('Court','Long')]$Format = 'Court')", "  if ($Format -eq 'Long') { 'Bonjour et bienvenue' } else { 'Bonjour' }", "}") },
            { title: "Script de comptage", text: "Un script utile accepte un chemin et produit un objet clair.", code: code("param([string]$Path = '.')", "$items = Get-ChildItem -Path $Path", "[pscustomobject]@{", "  Path = (Resolve-Path $Path).Path", "  Count = $items.Count", "}") }
        ],
        pitfalls: [
            "Mettre Write-Host partout: joli à l'écran, mais peu réutilisable.",
            "Utiliser des variables globales au lieu de paramètres.",
            "Nommer une fonction avec un verbe non standard quand un verbe approuvé existe."
        ],
        quiz: [
            { q: "Quel mot-clé déclare les paramètres d'une fonction ou d'un script?", choices: ["args", "param", "input", "using"], answer: 1, why: "param déclare les paramètres et leurs types éventuels." },
            { q: "Quelle sortie est la plus réutilisable dans un pipeline?", choices: ["Write-Host coloré", "Un objet ou une chaîne retournée", "Une boîte de dialogue", "Une pause clavier"], answer: 1, why: "Les objets et chaînes dans le pipeline peuvent être filtrés, triés et exportés." },
            { q: "Quelle commande liste les verbes PowerShell approuvés?", choices: ["Get-Verb", "Get-CommandVerb", "Show-Verbs", "Verb-List"], answer: 0, why: "Get-Verb affiche les verbes recommandés pour les fonctions." },
            { q: "Quelle extension porte un script PowerShell?", choices: [".bat", ".ps1", ".vbs", ".pwshdoc"], answer: 1, why: "Les scripts PowerShell utilisent l'extension .ps1." }
        ],
        labs: [
            { prompt: "Écris une fonction Get-Double qui prend un entier $Nombre et retourne son double.", hint: "function, param([int]$Nombre), multiplication.", checks: ["function\\s+Get-Double", "param", "\\[int\\]\\$Nombre", "\\$Nombre\\s*\\*\\s*2"], solution: "function Get-Double {\n  param([int]$Nombre)\n  $Nombre * 2\n}" },
            { prompt: "Écris le début d'un script qui accepte un paramètre $Path par défaut à '.', puis liste ce chemin.", hint: "Le bloc param est au début du script.", checks: ["param", "\\[string\\]\\$Path", "'\\.'|\"\\.\"", "Get-ChildItem", "-Path\\s+\\$Path"], solution: "param([string]$Path = '.')\nGet-ChildItem -Path $Path" }
        ],
        memo: [
            { front: "Déclarer une fonction?", back: "function Verb-Noun { param(...) commandes }." },
            { front: "Paramètres de script?", back: "param(...) au début du fichier .ps1." },
            { front: "Verbes approuvés?", back: "Get-Verb." },
            { front: "Sortie réutilisable?", back: "Retourne objets/chaînes, évite Write-Host pour les données." }
        ]
    },
    {
        id: "evaluations",
        title: "Evaluations",
        icon: "EV",
        color: "#5c5a9d",
        duration: "30 min",
        summary: "Un espace pour te mettre en condition: réviser les pièges, lancer un examen blanc et vérifier que tu sais expliquer tes réponses.",
        goals: [
            "Réviser les erreurs fréquentes avant un test.",
            "S'entraîner avec des questions mélangées.",
            "Savoir justifier une commande PowerShell."
        ],
        essentials: [
            { term: "Lire la consigne", detail: "Repère les verbes: afficher, créer, supprimer, filtrer, compter, exporter. Chaque verbe appelle une famille de cmdlets.", code: "Get-Command -Verb Export" },
            { term: "Justifier", detail: "Une bonne réponse explique la commande, le pipeline et les propriétés utilisées.", code: "Get-ChildItem | Where-Object Length -gt 1MB" },
            { term: "Vérifier", detail: "Teste d'abord sur un petit dossier, puis ajoute -Recurse ou Remove-Item seulement quand le résultat est correct.", code: "Get-ChildItem .\\test -Filter *.log" }
        ],
        examples: [
            { title: "Mini réponse d'examen", text: "Commande + explication courte = réponse solide.", code: code("Get-ChildItem . -Filter *.csv | Measure-Object", "# Liste les CSV du dossier courant puis compte les objets obtenus.") },
            { title: "Exporter proprement", text: "Pour garder des données réutilisables, exporte des objets sélectionnés.", code: code("Get-Process |", "  Select-Object Name, Id, CPU |", "  Export-Csv .\\processus.csv -NoTypeInformation") }
        ],
        pitfalls: [
            "Donner une commande sans expliquer les propriétés utilisées.",
            "Se précipiter sur une commande destructrice sans test.",
            "Réviser seulement en lisant: il faut écrire des commandes."
        ],
        quiz: [
            { q: "Quelle stratégie est la meilleure pour réviser PowerShell?", choices: ["Lire uniquement les titres", "Écrire des commandes et vérifier leur sortie", "Mémoriser tous les alias", "Ignorer les erreurs"], answer: 1, why: "PowerShell s'apprend en écrivant, testant et expliquant les commandes." },
            { q: "Pour compter les fichiers retournés par Get-ChildItem, quelle cmdlet est adaptée?", choices: ["Measure-Object", "Count-File", "Get-Total", "Sum-Path"], answer: 0, why: "Measure-Object compte ou mesure les objets reçus." },
            { q: "Quelle option évite la ligne de type dans un CSV exporté?", choices: ["-Clean", "-NoTypeInformation", "-NoHeader", "-Simple"], answer: 1, why: "-NoTypeInformation évite l'ancienne ligne de métadonnées de type." },
            { q: "Que faut-il expliquer si une commande utilise Where-Object?", choices: ["La couleur du terminal", "La propriété filtrée et la condition", "Le nom de l'ordinateur uniquement", "Le nombre de touches utilisées"], answer: 1, why: "Where-Object filtre selon une propriété et une condition." }
        ],
        labs: [
            { prompt: "Écris une commande qui compte les fichiers .csv du dossier courant.", hint: "Liste avec un filtre, puis compte avec Measure-Object.", checks: ["Get-ChildItem|gci|dir|ls", "\\.csv|\\*\\.csv|-Filter", "Measure-Object"], solution: "Get-ChildItem . -Filter *.csv | Measure-Object" },
            { prompt: "Écris une commande qui exporte Name, Id et CPU des processus vers processus.csv.", hint: "Sélectionne les propriétés avant Export-Csv.", checks: ["Get-Process", "Select-Object|select", "Name", "Id", "CPU", "Export-Csv", "processus\\.csv"], solution: "Get-Process | Select-Object Name, Id, CPU | Export-Csv .\\processus.csv -NoTypeInformation" }
        ],
        memo: [
            { front: "Réviser efficacement?", back: "Écrire, exécuter mentalement, corriger, expliquer." },
            { front: "Compter des objets?", back: "Pipeline | Measure-Object." },
            { front: "Exporter en CSV?", back: "Export-Csv fichier.csv -NoTypeInformation." },
            { front: "Réponse solide?", back: "Commande + explication du pipeline + prudence si action sensible." }
        ]
    }
];
const courseEnhancements = {
    administratif: {
        courseRefs: [
            "C01: interet des scripts, automatisation de procedures repetitives et reduction des erreurs.",
            "C01: PowerShell 7 / Core, console, Visual Studio Code, snippets, F5/F8 et points d'arret.",
            "C07: execution policy, scripts .ps1, execution depuis PowerShell, cmd.exe, BAT ou tache planifiee."
        ],
        essentials: [
            { term: "Execution policy", detail: "La strategie d'execution n'est pas une securite absolue: elle evite surtout l'execution involontaire de scripts non autorises.", code: "Get-ExecutionPolicy\nSet-ExecutionPolicy RemoteSigned" },
            { term: "Structure d'un script", detail: "Un script propre commence souvent par des commentaires d'identite, puis les parametres, les fonctions, et enfin le corps principal.", code: code("# MonScript.ps1", "# Auteur, version, date", "param([string]$Path = '.')", "# Fonctions", "# Corps principal") }
        ],
        quiz: [
            { q: "Quelle extension porte toujours un script PowerShell dans le cours?", choices: [".ps1", ".bat", ".psm", ".cmdlet"], answer: 0, why: "Le cours C07 rappelle que les scripts PowerShell portent l'extension .ps1." },
            { q: "Quelle commande sert a connaitre la strategie d'execution courante?", choices: ["Get-ExecutionPolicy", "Get-ScriptPolicy", "Show-Policy", "Read-Execution"], answer: 0, why: "Get-ExecutionPolicy affiche la strategie appliquee a la session ou au systeme." }
        ],
        labs: [
            { prompt: "Ecris une ligne de commande cmd.exe qui execute C:\\scripts\\config_ip.ps1 avec PowerShell 7.", hint: "Le cours utilise pwsh avec le parametre -File.", checks: ["pwsh", "-File", "config_ip\\.ps1"], solution: "pwsh -File \"C:\\scripts\\config_ip.ps1\"" }
        ],
        memo: [
            { front: "RemoteSigned autorise quoi?", back: "Les scripts locaux peuvent s'executer; les scripts venant d'Internet doivent etre signes ou debloques." },
            { front: "Ordre classique dans un script?", back: "Commentaires d'identite, parametres, fonctions, corps principal." }
        ]
    },
    bases: {
        courseRefs: [
            "C01/P01.02: une cmdlet est construite avec un verbe, un tiret, puis un nom.",
            "C01: Get-Command est la commande principale quand on apprend PowerShell.",
            "C01/P01.02: Get-Help peut afficher l'aide simple, detaillee, complete, les exemples ou l'aide en ligne.",
            "C01/P01.02: Get-Member montre les proprietes et methodes; Get-Alias retrouve les alias."
        ],
        essentials: [
            { term: "Verbes approuves", detail: "Get-Verb donne la liste des verbes recommandes. C'est utile pour comprendre et nommer les commandes.", code: "Get-Verb" },
            { term: "Types de commandes", detail: "Get-Command peut filtrer par type: alias, function, cmdlet, externalScript, application.", code: "Get-Command -CommandType Cmdlet | Measure-Object" },
            { term: "Aide conceptuelle", detail: "Les rubriques about_* expliquent les concepts du langage: tableaux, variables, regex, fonctions.", code: "Get-Help -Name about_*\nGet-Help -Name about_Arrays" }
        ],
        examples: [
            { title: "Rechercher sans connaitre le nom exact", text: "Le joker * permet de chercher une commande par debut, fin ou morceau de nom.", code: code("Get-Command -Name write*", "Get-Command -Name *log", "Get-Command -Name *time*") },
            { title: "Inspecter une chaine", text: "Meme une chaine de texte est un objet avec proprietes et methodes.", code: code("$test = 'Bonjour tout le monde !!'", "$test | Get-Member", "$test.Length", "$test.ToUpper()") }
        ],
        pitfalls: [
            "Confondre le verbe de la cmdlet avec le nom: Get est l'action, Command est la cible.",
            "Oublier que Help est un alias pratique de Get-Help, mais que Get-Help reste le nom complet."
        ],
        quiz: [
            { q: "Quelle commande donne la liste des verbes PowerShell recommandes?", choices: ["Get-Verb", "Get-Command -Verb", "Show-Verbs", "Get-Help verbs"], answer: 0, why: "Le cours P01.02 cite Get-Verb pour lister les verbes." },
            { q: "Quelle commande compte le nombre de cmdlets disponibles?", choices: ["Get-Command -CommandType cmdlet | Measure-Object", "Count-Cmdlet", "Get-Verb | Measure-Object", "Get-Help -Count"], answer: 0, why: "Get-Command filtre les cmdlets, Measure-Object compte les objets recus." },
            { q: "Quelle commande retrouve les alias de Get-ChildItem?", choices: ["Get-Alias -Definition Get-ChildItem", "Get-Command -Alias Get-ChildItem", "Show-Alias Get-ChildItem", "Alias-Of Get-ChildItem"], answer: 0, why: "Get-Alias -Definition retourne les alias associes a une commande." }
        ],
        labs: [
            { prompt: "Ecris une commande qui affiche l'aide complete de Get-Command.", hint: "Le cours cite -Full pour l'aide detaillee et exemples.", checks: ["Get-Help|Help", "Get-Command", "-Full"], solution: "Get-Help -Name Get-Command -Full" },
            { prompt: "Ecris une commande qui cherche les commandes commencant par Write.", hint: "Utilise Get-Command et le joker *.", checks: ["Get-Command", "write\\*"], solution: "Get-Command -Name write*" }
        ],
        memo: [
            { front: "Cmdlet = ?", back: "Verbe-Nom, par exemple Get-Command ou Set-Location." },
            { front: "Get-Member sert a quoi?", back: "Voir les proprietes et methodes de l'objet recu." }
        ]
    },
    fichiers: {
        courseRefs: [
            "C01/P01.03: commandes de base des dossiers: Get-ChildItem, Get-Location, Set-Location, New-Item, Remove-Item, Move-Item, Rename-Item, Copy-Item.",
            "P01.03: le mode indique la nature: d directory, a archive, r readonly, h hidden, s system.",
            "P01.03: le pipe transmet les objets a Where-Object; $_ represente l'objet courant.",
            "P01.03: KB, MB, GB, TB et PB sont des quantificateurs utilisables dans les comparaisons."
        ],
        essentials: [
            { term: "Attributs", detail: "Get-ChildItem peut filtrer selon les attributs: Hidden, Directory, System, ReadOnly. Les operateurs !, + et , combinent les criteres.", code: "Get-ChildItem -Path 'C:\\' -Attributes Hidden+!Directory" },
            { term: "Fichiers caches", detail: "-Force affiche les elements normalement caches par le fournisseur.", code: "Get-ChildItem -Force" },
            { term: "Dates", detail: "On peut filtrer les fichiers selon LastWriteTime; attention aux formats de dates selon les machines.", code: "Get-ChildItem | Where-Object { $_.LastWriteTime -gt '01/20/2018' }" }
        ],
        examples: [
            { title: "Taille avec quantificateur", text: "PowerShell comprend directement 128KB, 1MB ou 2GB.", code: "Get-ChildItem | Where-Object { $_.Length -gt 128KB }" },
            { title: "Créer un fichier avec contenu", text: "New-Item accepte Path, ItemType, Name et Value.", code: "New-Item -Path 'C:\\Temp' -ItemType File -Name 'Test.txt' -Value 'Bonjour !'" },
            { title: "Renommer puis copier", text: "Rename-Item change le nom; Copy-Item cree une copie vers une destination.", code: code("Rename-Item -Path 'C:\\Temp2\\Test.txt' -NewName 'Test2.txt'", "Copy-Item -Path 'C:\\Temp2\\Test2.txt' -Destination 'C:\\Temp2\\Test3.txt'") }
        ],
        pitfalls: [
            "La date ecrite sous forme de texte peut etre interpretee au format US selon le contexte.",
            "Le pipe transmet des objets; $_ n'est pas une variable magique globale, c'est l'objet courant du pipeline."
        ],
        quiz: [
            { q: "Dans la colonne Mode de Get-ChildItem, que signifie d?", choices: ["Directory", "Deleted", "Data", "Default"], answer: 0, why: "Le support P01.03 indique d pour repertoire/directory." },
            { q: "Quel parametre affiche aussi les elements caches?", choices: ["-HiddenOnly", "-All", "-Force", "-System"], answer: 2, why: "-Force demande au fournisseur d'afficher les elements caches." },
            { q: "Dans Where-Object { $_.Length -gt 128KB }, que represente $_?", choices: ["Le dossier courant", "Chaque objet recu par le pipe", "Une erreur", "Le nom du script"], answer: 1, why: "$_ represente l'objet actuellement traite dans le pipeline." }
        ],
        labs: [
            { prompt: "Ecris une commande qui liste les fichiers caches de C:\\ sans afficher les dossiers.", hint: "Combine Hidden et !Directory dans -Attributes.", checks: ["Get-ChildItem|gci|dir|ls", "-Path", "C:\\\\", "-Attributes", "Hidden", "!Directory"], solution: "Get-ChildItem -Path 'C:\\' -Attributes Hidden+!Directory" },
            { prompt: "Ecris une commande qui cree C:\\Temp\\Test.txt avec le texte Bonjour !", hint: "New-Item avec -ItemType File, -Name et -Value.", checks: ["New-Item", "C:\\\\Temp", "File", "Test\\.txt", "Bonjour"], solution: "New-Item -Path 'C:\\Temp' -ItemType File -Name 'Test.txt' -Value 'Bonjour !'" }
        ],
        memo: [
            { front: "Afficher les caches?", back: "Get-ChildItem -Force." },
            { front: "Objet courant du pipe?", back: "$_ dans le bloc Where-Object ou ForEach-Object." },
            { front: "Quantificateur 1KB vaut?", back: "1024." }
        ]
    },
    fournisseurs: {
        courseRefs: [
            "P01.04: PowerShell peut manipuler registre, variables, variables d'environnement, alias, certificats, fonctions et systeme de fichiers via des fournisseurs.",
            "P01.04: Provider signifie fournisseur; Get-PSProvider liste les fournisseurs disponibles.",
            "P01.04: les cmdlets de fichiers peuvent souvent fonctionner sur d'autres fournisseurs."
        ],
        essentials: [
            { term: "Registre", detail: "HKLM: et HKCU: peuvent se parcourir avec Set-Location et Get-ChildItem comme des lecteurs.", code: "Set-Location -Path 'HKLM:'\nGet-ChildItem -Path 'HKLM:'" },
            { term: "Variables d'environnement", detail: "Le lecteur Env: permet de creer, lire et supprimer des variables d'environnement.", code: code("Set-Location -Path 'Env:\\'", "New-Item -Path '.\\' -Name 'varTest' -Value 'Variable de test'", "Get-Content -Path 'Env:\\varTest'", "Remove-Item -Path 'Env:\\varTest'") }
        ],
        quiz: [
            { q: "Dans le cours, Provider signifie quoi?", choices: ["Fournisseur", "Processus", "Parametre", "Protection"], answer: 0, why: "Le PDF P01.04 traduit explicitement Provider par fournisseur." },
            { q: "Quelle commande liste les fournisseurs disponibles?", choices: ["Get-PSProvider", "Get-Provider", "Get-PSDrive", "Get-ChildItem Provider:"], answer: 0, why: "Get-PSProvider liste les fournisseurs PowerShell." }
        ],
        labs: [
            { prompt: "Ecris la suite de commandes qui cree Env:\\varTest avec la valeur Variable de test, l'affiche, puis la supprime.", hint: "New-Item, Get-Content et Remove-Item fonctionnent sur Env:.", checks: ["New-Item", "Env:\\\\varTest|varTest", "Variable de test", "Get-Content", "Remove-Item"], solution: "New-Item -Path 'Env:\\' -Name 'varTest' -Value 'Variable de test'\nGet-Content -Path 'Env:\\varTest'\nRemove-Item -Path 'Env:\\varTest'" }
        ],
        memo: [
            { front: "Lecteur des variables d'environnement?", back: "Env:" },
            { front: "Lister HKLM comme un dossier?", back: "Get-ChildItem -Path 'HKLM:'." }
        ]
    },
    variables: {
        courseRefs: [
            "C02: une variable commence toujours par $; les bonnes pratiques recommandent lowerCamelCase et eviter accents/caracteres speciaux.",
            "C02: PowerShell determine automatiquement le type, mais GetType() permet de le verifier.",
            "C02: New-Variable -Option Constant cree une constante; par convention, son nom est en MAJUSCULE.",
            "C02: variables automatiques importantes: $_, $Home, $Host, $Profile, $PWD, $PSCulture, $PSVersionTable."
        ],
        essentials: [
            { term: "Bon nommage", detail: "Le cours recommande de commencer par une minuscule, utiliser lowerCamelCase, et eviter accents ou caracteres speciaux.", code: "$nomFamille = 'Burma'\n$anneeNaissance = 1987" },
            { term: "Constante du cours", detail: "Le support utilise New-Variable, pas seulement Set-Variable, pour creer PI en constante.", code: "New-Variable -Name 'PI' -Value 3.14159 -Option Constant" },
            { term: "Variables automatiques", detail: "$_ est l'objet courant du pipeline; $PWD est le chemin courant; $PSVersionTable contient les informations de version.", code: "$PSVersionTable\n$PWD\n$_" }
        ],
        examples: [
            { title: "Type automatique", text: "La meme variable peut recevoir un type different selon la valeur affectee.", code: code("$variable1 = 'Hello'", "$variable1.GetType()", "$variable2 = 123", "$variable2.GetType()") },
            { title: "Transtypage et perte", text: "Convertir un double en int supprime la partie fractionnaire.", code: code("$var = 3.1415", "$var1 = [int]$var", "$var1") }
        ],
        pitfalls: [
            "Un caractere unique entre guillemets reste String; pour forcer Char, utilise [char].",
            "La conversion de 'Salut' en [int] echoue; la conversion de '123' en [int] reussit."
        ],
        quiz: [
            { q: "Quelle methode indique le type d'une variable?", choices: ["GetType()", "TypeOf()", "Get-VariableType", "Show-Type"], answer: 0, why: "Le cours C02 utilise $variable.GetType()." },
            { q: "Quelle commande correspond a la constante PI du cours?", choices: ["New-Variable -Name 'PI' -Value 3.14159 -Option Constant", "$PI = constant 3.14159", "Set-Const PI 3.14159", "[const]$PI = 3.14159"], answer: 0, why: "Le support C02 cree la constante avec New-Variable et -Option Constant." },
            { q: "Quelle variable automatique represente l'objet courant transmis par le pipe?", choices: ["$_", "$PWD", "$Home", "$Host"], answer: 0, why: "$_ est l'objet courant dans le pipeline." }
        ],
        labs: [
            { prompt: "Ecris trois lignes: cree $nomFamille, cree $anneeNaissance, puis affiche le type de $anneeNaissance.", hint: "Le cours utilise GetType().", checks: ["\\$nomFamille", "\\$anneeNaissance", "GetType\\(\\)"], solution: "$nomFamille = 'Burma'\n$anneeNaissance = 1987\n$anneeNaissance.GetType()" },
            { prompt: "Ecris une ligne qui force la variable $lettre au type char avec la valeur a.", hint: "Le type se place entre crochets devant la variable.", checks: ["\\[char\\]", "\\$lettre", "'a'|\"a\""], solution: "[char] $lettre = 'a'" }
        ],
        memo: [
            { front: "Variable de preference $OFS?", back: "Separateur utilise quand un tableau est converti en string." },
            { front: "Nom de constante selon le cours?", back: "En MAJUSCULE, par exemple PI." }
        ]
    },
    operateurs: {
        courseRefs: [
            "C03: arithmetique + - * / %, avec priorite mathematique et parentheses.",
            "C03: comparaisons -eq, -ne, -gt, -ge, -lt, -le; par defaut souvent insensibles a la casse.",
            "C03: prefixe c pour sensible a la casse (-ceq, -clt), prefixe i pour forcer l'insensibilite.",
            "C03: autres operateurs: plage .., appartenance -in/-contains, remplacement -replace, type -is, logique, binaire, redirections, split/join."
        ],
        essentials: [
            { term: "Casse", detail: "Par defaut, 'a' -eq 'A' vaut True. Pour tester la casse, ajoute c: -ceq, -clt, etc.", code: code("'a' -eq 'A'", "'a' -ceq 'A'") },
            { term: "Plage", detail: "L'operateur .. cree une sequence de valeurs, utile dans les tableaux et boucles.", code: "1..10\n$debut..$fin" },
            { term: "Redirections", detail: "> remplace le fichier, >> ajoute a la fin, 2> redirige les erreurs, 2>&1 fusionne erreur et sortie standard.", code: "Get-Process > 'C:\\Temp\\process.txt'\n'.\\monScript.ps1' 2> 'C:\\Temp\\error.txt'" },
            { term: "Split et join", detail: "-split fractionne une chaine; -join assemble plusieurs chaines.", code: "'Nom:Prenom:Age' -split ':'\n@('Lundi','Mardi','Mercredi') -join ':'" }
        ],
        examples: [
            { title: "Remplacement", text: "-replace remplace une chaine ou un motif; il peut aussi travailler avec des regex.", code: "'PowerShell' -replace 'Shell', 'Ceff'" },
            { title: "Type", text: "-is et -isnot testent le type d'une valeur.", code: code("'Bonjour' -is [string]", "20 -is [Int32]", "3.1415 -is [double]") }
        ],
        pitfalls: [
            "Dans le PDF, l'exemple regex du NPA montre l'importance d'ecrire et tester soigneusement le nom de variable et le motif.",
            "-contains et -in sont inverses: collection -contains valeur, valeur -in collection."
        ],
        quiz: [
            { q: "Quel resultat donne 'a' -eq 'A' par defaut?", choices: ["True", "False", "Erreur", "Null"], answer: 0, why: "Les comparateurs de base sont generalement insensibles a la casse." },
            { q: "Quel operateur cree une plage de 1 a 10?", choices: ["1..10", "1-10", "range(1,10)", "1=>10"], answer: 0, why: "Le cours C03 presente l'operateur de plage .." },
            { q: "Quelle expression teste qu'une chaine est du type string?", choices: ["'Bonjour' -is [string]", "'Bonjour' -type string", "string('Bonjour')", "'Bonjour'.type = string"], answer: 0, why: "-is teste le type d'une valeur." },
            { q: "Quel operateur ajoute une sortie a la fin d'un fichier?", choices: [">>", ">", "2>", "2>&1"], answer: 0, why: ">> ajoute, alors que > remplace le contenu." }
        ],
        labs: [
            { prompt: "Ecris deux expressions: une comparaison insensible entre 'a' et 'A', puis une comparaison sensible a la casse.", hint: "Utilise -eq puis -ceq.", checks: ["'a'|\"a\"", "-eq", "'A'|\"A\"", "-ceq"], solution: "'a' -eq 'A'\n'a' -ceq 'A'" },
            { prompt: "Ecris une commande qui separe 'Nom:Prenom:Age' sur les deux-points.", hint: "Le cours utilise -split.", checks: ["Nom:Prenom:Age", "-split", ":"], solution: "'Nom:Prenom:Age' -split ':'" }
        ],
        memo: [
            { front: "Sensible a la casse?", back: "Ajouter c: -ceq, -clt, -cge..." },
            { front: "Redirection erreur seule?", back: "2> fichier.txt." }
        ]
    },
    objets: {
        courseRefs: [
            "C04: un objet possede des proprietes et des methodes; on accede a un membre avec le point.",
            "C04: Get-Member sur une collection montre les membres des objets contenus; Get-Member -InputObject montre le contenant.",
            "C04: Select-Object gere Property, First, Last, Unique, Index, ExpandProperty.",
            "C04: Format-List, Format-Table, Format-Wide et Format-Custom servent a l'affichage, pas au traitement en script."
        ],
        essentials: [
            { term: "Objet vs collection", detail: "Get-Member applique au pipeline montre les types contenus. Avec -InputObject, il inspecte la collection elle-meme.", code: code("$fichiers = Get-ChildItem", "$fichiers | Get-Member", "Get-Member -InputObject $fichiers") },
            { term: "ExpandProperty", detail: "Select-Object -Property garde un objet selectionne; -ExpandProperty extrait directement la valeur de la propriete.", code: code("Get-Process | Select-Object -Property ProcessName", "Get-Process | Select-Object -ExpandProperty ProcessName") },
            { term: "Group-Object", detail: "Regroupe les objets par valeur de propriete, par exemple les services par Status.", code: "Get-Service | Group-Object -Property Status" },
            { term: "Measure-Object", detail: "Mesure ou compte une collection: maximum CPU, nombre de lignes, mots et caracteres.", code: code("Get-Process | Measure-Object -Property CPU -Maximum", "Get-Content .\\test.txt | Measure-Object -Line -Word -Character") }
        ],
        examples: [
            { title: "Ordre des operations", text: "Select-Object -Unique avant ou apres -Last ne donne pas toujours le meme resultat.", code: code("Get-Process | Select-Object -Unique | Select-Object -Last 5", "Get-Process | Select-Object -Last 5 -Unique") },
            { title: "Formatage a la fin", text: "Les Format-* denaturent les objets pour l'affichage; garde-les pour la toute fin.", code: "Get-ChildItem | Format-List -Property Name, *time" }
        ],
        pitfalls: [
            "Format-Table dans un script peut casser la suite du pipeline: ce n'est plus l'objet original.",
            "Select-Object -Property ProcessName ne produit pas la meme chose que -ExpandProperty ProcessName."
        ],
        quiz: [
            { q: "Quelle commande inspecte la collection elle-meme plutot que ses elements?", choices: ["Get-Member -InputObject $arr", "$arr | Get-Member", "Get-Object $arr", "Show-Collection $arr"], answer: 0, why: "C04 montre que -InputObject inspecte le contenant, par exemple System.Object[]." },
            { q: "Quelle option de Select-Object extrait une valeur brute de propriete?", choices: ["-ExpandProperty", "-PropertyOnly", "-Value", "-RawProperty"], answer: 0, why: "-ExpandProperty retourne la valeur de la propriete, pas un objet selectionne." },
            { q: "Quelle cmdlet regroupe les services selon leur statut?", choices: ["Group-Object -Property Status", "Sort-Object Status", "Measure-Object Status", "Select-Object Status"], answer: 0, why: "Group-Object regroupe par valeur de propriete." },
            { q: "Pourquoi eviter Format-Table au milieu d'un script?", choices: ["Il transforme les objets pour l'affichage", "Il supprime les fichiers", "Il ralentit toujours Windows", "Il change la strategie d'execution"], answer: 0, why: "Les commandes Format-* sont faites pour afficher, pas pour continuer le traitement." }
        ],
        labs: [
            { prompt: "Ecris une commande qui retourne uniquement les noms de processus sous forme de chaines.", hint: "Utilise -ExpandProperty ProcessName.", checks: ["Get-Process", "Select-Object|select", "-ExpandProperty", "ProcessName"], solution: "Get-Process | Select-Object -ExpandProperty ProcessName" },
            { prompt: "Ecris une commande qui groupe les services par Status.", hint: "Group-Object attend une propriete.", checks: ["Get-Service", "Group-Object", "Status"], solution: "Get-Service | Group-Object -Property Status" }
        ],
        memo: [
            { front: "Inspecter le contenant tableau?", back: "Get-Member -InputObject $tableau." },
            { front: "Format-* dans un script?", back: "A eviter au milieu; utiliser en fin d'affichage seulement." }
        ]
    },
    tableaux: {
        courseRefs: [
            "C05: le premier indice d'un tableau est 0; les indices negatifs lisent depuis la fin.",
            "C05: [array] $tab = @() cree un tableau vide; [char[]] force un tableau de caracteres.",
            "C05: + concatene des tableaux, += ajoute, mais supprimer demande souvent une recopie filtree.",
            "C05: $OFS change le separateur lors de la conversion d'un tableau en chaine.",
            "C05: les hashtables utilisent @{} et permettent l'acces par cle avec point ou crochets."
        ],
        essentials: [
            { term: "Indices multiples", detail: "On peut demander plusieurs indices en une fois.", code: "$tab = @(10..20)\n$tab[1, 3, 5]" },
            { term: "Depuis la fin", detail: "Les indices negatifs lisent depuis la fin du tableau.", code: "$tab[-1..-3]" },
            { term: "OFS", detail: "$OFS controle le separateur lors d'une conversion [string] d'un tableau.", code: "$OFS = '; '\n[string]$notes" },
            { term: "Hashtable", detail: "Une table de hachage associe une cle a une valeur; la syntaxe est @{}.", code: "[hashtable] $tabAssoc = @{ 'EMZ' = 'Emilie Zaugg'; 'JAB' = 'Javier Bracamonte' }" }
        ],
        examples: [
            { title: "Filtrer un tableau", text: "Sur un tableau, certains operateurs retournent les valeurs correspondantes, pas seulement True/False.", code: code("$noms = @('pierre', 'paul', 'jacques')", "$noms -ne 'jacques'", "$noms -like '*a*'") },
            { title: "Tableau a plusieurs dimensions", text: "Un tableau peut contenir d'autres tableaux.", code: code("[array] $tab = @(", "  @(1..3),", "  @('a','b','c'),", "  @('lundi','mardi')", ")") }
        ],
        pitfalls: [
            "La suppression directe d'un element de tableau n'est pas le chemin naturel; on recree souvent un tableau filtre.",
            "@() cree un tableau; @{} cree une hashtable."
        ],
        quiz: [
            { q: "Quelle syntaxe cree un tableau vide?", choices: ["[array] $tab = @()", "[array] $tab = @{}", "$tab = []", "$tab = empty"], answer: 0, why: "C05 donne [array] $tab = @() pour un tableau vide." },
            { q: "Que fait $tab[-1]?", choices: ["Retourne le dernier element", "Retourne le premier element", "Provoque toujours une erreur", "Supprime le dernier element"], answer: 0, why: "Les indices negatifs accedent au tableau depuis la fin." },
            { q: "Quelle variable controle le separateur lors d'une conversion [string] d'un tableau?", choices: ["$OFS", "$IFS", "$Separator", "$PSCulture"], answer: 0, why: "$OFS est la variable de preference utilisee pour ce separateur." },
            { q: "Quelle syntaxe declare une hashtable vide?", choices: ["[hashtable] $h = @{}", "[hashtable] $h = @()", "$h = []", "$h = hash()"], answer: 0, why: "Une hashtable utilise les accolades @{}." }
        ],
        labs: [
            { prompt: "Ecris deux lignes: cree $tab de 10 a 20, puis affiche les indices 1, 3 et 5.", hint: "Utilise l'operateur de plage et les indices multiples.", checks: ["\\$tab", "10\\.\\.20", "\\[1,\\s*3,\\s*5\\]"], solution: "$tab = @(10..20)\n$tab[1, 3, 5]" },
            { prompt: "Ecris une ligne qui garde seulement les notes >= 4.0 dans $notesPositives.", hint: "Utilise le pipeline et Where-Object.", checks: ["\\$notesPositives", "\\$notes", "Where-Object|\\?", "\\$_", "-ge", "4\\.0"], solution: "$notesPositives = $notes | Where-Object { $_ -ge 4.0 }" }
        ],
        memo: [
            { front: "Derniers trois elements?", back: "$tab[-1..-3]." },
            { front: "Concatener deux tableaux?", back: "$troisieme = $premier + $deuxieme." }
        ]
    },
    controle: {
        courseRefs: [
            "C06: boucles du cours: while, do-while, for, foreach.",
            "C06: while teste avant d'executer; do-while execute au moins une fois.",
            "C06: for utilise initialisation, condition et increment.",
            "C06: foreach assigne successivement chaque valeur d'une collection a une variable.",
            "C06: conditions if, if else et if elseif orientent l'execution."
        ],
        essentials: [
            { term: "while", detail: "La condition est testee avant le bloc; si elle est fausse au depart, le bloc ne s'execute pas.", code: code("while ($nombre -lt $notes.Length) {", "  $somme += $notes[$nombre]", "  $nombre++", "}") },
            { term: "do-while", detail: "Le bloc s'execute au moins une fois, puis la condition est testee.", code: code("do {", "  [int] $var = Read-Host -Prompt 'Entrez une valeur entre 0 et 10'", "} while (($var -lt 0) -or ($var -gt 10))") },
            { term: "for", detail: "Ideal pour parcourir un tableau avec un index controle.", code: code("for ($i = 0; $i -lt $notes.Length; $i++) {", "  $somme += $notes[$i]", "}") }
        ],
        examples: [
            { title: "Lire deux nombres", text: "Un if peut combiner plusieurs conditions avec -and.", code: code("[int] $var1 = Read-Host -Prompt 'Saisissez un nombre'", "[int] $var2 = Read-Host -Prompt 'Saisissez un autre nombre'", "if (($var1 -eq 15) -and ($var2 -eq 18)) {", "  'OK'", "} else {", "  'Autre cas'", "}") }
        ],
        pitfalls: [
            "Dans l'exemple for du cours, l'index et le compteur doivent rester coherents; relis toujours la variable incrementee.",
            "Un do-while mal conditionne peut boucler sans fin apres avoir deja execute le bloc une fois."
        ],
        quiz: [
            { q: "Quelle boucle execute son bloc au moins une fois?", choices: ["do-while", "while", "for", "foreach"], answer: 0, why: "do-while teste la condition a la fin." },
            { q: "Quelle boucle est la plus naturelle pour parcourir chaque valeur sans gerer l'index?", choices: ["foreach", "for", "while", "if"], answer: 0, why: "foreach place chaque element dans une variable temporaire." },
            { q: "Dans for ($i=0; $i -lt $notes.Length; $i++), quelle partie incremente?", choices: ["$i++", "$i=0", "$i -lt $notes.Length", "$notes.Length"], answer: 0, why: "$i++ augmente l'index a chaque iteration." }
        ],
        labs: [
            { prompt: "Ecris une boucle do-while qui redemande $var tant qu'il est hors de 0..10.", hint: "Le cours combine -lt 0 et -gt 10 avec -or.", checks: ["do", "Read-Host", "while", "\\$var", "-lt", "0", "-or", "-gt", "10"], solution: "do {\n  [int] $var = Read-Host -Prompt 'Entrez une valeur entre 0 et 10'\n} while (($var -lt 0) -or ($var -gt 10))" },
            { prompt: "Ecris un foreach qui additionne toutes les notes de $notes dans $somme.", hint: "foreach ($note in $notes).", checks: ["foreach", "\\$note", "\\$notes", "\\$somme", "\\+="], solution: "$somme = 0\nforeach ($note in $notes) {\n  $somme += $note\n}" }
        ],
        memo: [
            { front: "while vs do-while?", back: "while teste avant; do-while teste apres et s'execute au moins une fois." },
            { front: "for contient quoi?", back: "Initialisation; condition; increment." }
        ]
    },
    fonctions: {
        courseRefs: [
            "C07: une fonction a un nom, une portee facultative, des arguments/parametres facultatifs et un bloc d'instructions.",
            "C07: le cours prefere les parametres a $args pour passer des valeurs.",
            "C07: une fonction PowerShell doit retourner des objets exploitables, pas seulement des chaines informatives.",
            "C07: les fonctions filtre traitent chaque objet recu par le pipe.",
            "C07: fonctions avancees: [CmdletBinding()], [Parameter()], common parameters, validation, Begin/Process/End.",
            "C07: aide integree avec .SYNOPSIS, .DESCRIPTION, .PARAMETER, .EXAMPLE."
        ],
        essentials: [
            { term: "Arguments $args", detail: "Possible mais moins propre: $args[0], $args[1] dependent de l'ordre et sont moins explicites.", code: code("function Show-Popup1 {", "  $WshShell = New-Object -ComObject wscript.Shell", "  $WshShell.Popup($args[0], 0, $args[1])", "}") },
            { term: "Parametres nommes", detail: "Avec param(), l'ordre n'a plus d'importance si tu nommes les parametres a l'appel.", code: code("function Show-Popup3 {", "  param([string] $Message, [string] $Titre)", "}", "Show-Popup3 -Titre 'popup' -Message 'Bonjour'") },
            { term: "Retourner un objet", detail: "Le cours recommande de retourner un objet Select-Object plutot que plusieurs chaines de texte.", code: code("function Get-Fileinfo {", "  param([string] $Path)", "  $fichier = Get-Item -Path $Path", "  return $fichier | Select-Object -Property FullName, CreationTime, LastAccessTime", "}") },
            { term: "Fonction filtre", detail: "filter traite les objets recus un par un via le pipeline.", code: code("filter Where-SmallFiles {", "  if ($_.Length -lt 1KB) { return $_ }", "}") },
            { term: "Aide integree", detail: "Les commentaires bases sur l'aide donnent a tes fonctions le meme confort que les cmdlets natives.", code: code("<#", " .SYNOPSIS", "   Affiche un message.", " .PARAMETER Message", "   Message a afficher.", " .EXAMPLE", "   Show-Popup -Message 'Bonjour'", "#>") }
        ],
        examples: [
            { title: "Fonction avancee", text: "[CmdletBinding()] active un comportement proche des cmdlets, avec parametres communs.", code: code("function Show-Popup {", "  [CmdletBinding()]", "  param(", "    [Parameter(Mandatory = $true)]", "    [string] $Titre,", "    [string] $Message = 'Message ...'", "  )", "  process {", "    $WshShell = New-Object -ComObject wscript.Shell", "    $WshShell.Popup($Message, 0, $Titre)", "  }", "}") },
            { title: "Begin Process End", text: "Begin et End s'executent une fois; Process s'execute pour chaque objet recu.", code: code("filter Where-SmallFiles {", "  begin { $taille = 0 }", "  process { if ($_.Length -lt 1KB) { $taille += $_.Length; $_ } }", "  end { Write-Host \"Taille cumulee: $taille octets\" }", "}") }
        ],
        pitfalls: [
            "Appeler une fonction PowerShell ne se fait pas avec des parentheses comme en C#: Show-Popup -Message 'Bonjour'.",
            "Retourner du texte formatte rend la fonction difficile a reutiliser dans un pipeline.",
            "Si tu veux que Get-Help affiche ton aide, laisse les retours a la ligne necessaires entre le commentaire d'aide et le code."
        ],
        quiz: [
            { q: "Quelle methode de passage de valeurs le cours prefere-t-il?", choices: ["Les parametres param()", "$args uniquement", "Les variables globales", "Les boites de dialogue"], answer: 0, why: "C07 presente $args, mais recommande les parametres." },
            { q: "Quel attribut transforme une fonction en fonction avancee?", choices: ["[CmdletBinding()]", "[AdvancedFunction]", "[PowerShellCmdlet]", "[ParameterSet()]"], answer: 0, why: "[CmdletBinding()] identifie les fonctions avancees." },
            { q: "Dans Begin/Process/End, quel bloc s'execute pour chaque objet du pipeline?", choices: ["Process", "Begin", "End", "Param"], answer: 0, why: "Process est execute une fois par objet recu." },
            { q: "Quelle rubrique aide a documenter une fonction dans le code?", choices: [".SYNOPSIS", ".SCREEN", ".START", ".PIPE"], answer: 0, why: "L'aide integree utilise .SYNOPSIS, .DESCRIPTION, .PARAMETER, .EXAMPLE..." }
        ],
        labs: [
            { prompt: "Ecris une fonction Invoke-Moyenne avec deux doubles et return de leur moyenne.", hint: "Le cours C07 donne exactement cette idee.", checks: ["function\\s+Invoke-Moyenne", "param", "\\[double\\].*\\$Nombre1", "\\[double\\].*\\$Nombre2", "return", "\\$Nombre1\\s*\\+\\s*\\$Nombre2"], solution: "function Invoke-Moyenne {\n  param ([double] $Nombre1, [double] $Nombre2)\n  return ($Nombre1 + $Nombre2) / 2\n}" },
            { prompt: "Ecris un filtre Where-SmallFiles qui retourne les fichiers de moins de 1KB.", hint: "Utilise filter, $_.Length et return $_.", checks: ["filter\\s+Where-SmallFiles", "\\$_\\.Length", "-lt", "1KB", "return\\s+\\$_"], solution: "filter Where-SmallFiles {\n  if ($_.Length -lt 1KB) {\n    return $_\n  }\n}" },
            { prompt: "Ecris le squelette d'aide integree avec .SYNOPSIS et .EXAMPLE.", hint: "Bloc de commentaire <# #>.", checks: ["<#", "\\.SYNOPSIS", "\\.EXAMPLE", "#>"], solution: "<#\n .SYNOPSIS\n   Decrit rapidement la fonction.\n .EXAMPLE\n   Ma-Fonction -Parametre Valeur\n#>" }
        ],
        memo: [
            { front: "Pourquoi param() plutot que $args?", back: "Les noms de parametres sont explicites et l'ordre peut devenir sans importance." },
            { front: "Fonction filtre?", back: "filter Nom { ... } traite chaque objet recu par le pipeline." },
            { front: "Aide integree minimale?", back: ".SYNOPSIS, .DESCRIPTION, .PARAMETER, .EXAMPLE dans un bloc <# #>." }
        ]
    },
    evaluations: {
        courseRefs: [
            "P01.02-P01.04: les pratiques insistent sur Get-Command, Get-Help, Get-Member, Get-Alias, fichiers/dossiers et fournisseurs.",
            "C02-C07: savoir expliquer la difference entre syntaxe, objet, type, collection et pipeline.",
            "C04/C07: une bonne reponse d'examen evite de formater trop tot et retourne des objets exploitables."
        ],
        essentials: [
            { term: "Reponse complete", detail: "Une bonne reponse d'evaluation contient la commande, l'explication du pipe, la propriete filtree et le risque eventuel.", code: code("Get-ChildItem | Where-Object { $_.Length -gt 128KB }", "# Get-ChildItem retourne des objets fichier/dossier.", "# $_ est l'objet courant; Length est compare a 128KB.") },
            { term: "Mini checklist", detail: "Avant de valider: commande complete, noms de parametres, objet courant, test de suppression, sortie reutilisable.", code: "Remove-Item -WhatIf\nSelect-Object avant Format-Table" }
        ],
        quiz: [
            { q: "Dans une reponse d'evaluation, pourquoi nommer les parametres?", choices: ["Pour rendre la commande plus lisible", "Pour changer le theme de la console", "Pour executer plus vite a coup sur", "Pour eviter Get-Help"], answer: 0, why: "Les noms de parametres rendent la logique plus claire et limitent les ambiguites." },
            { q: "Quel trio est le plus utile si tu ne connais pas une commande?", choices: ["Get-Command, Get-Help, Get-Member", "Clear-Host, Exit, Pause", "Format-Table, Write-Host, cls", "New-Item, Remove-Item, Stop-Process"], answer: 0, why: "Ce trio permet de trouver, comprendre puis inspecter les objets." }
        ],
        labs: [
            { prompt: "Explique en commentaire la commande: Get-ChildItem | Where-Object { $_.Length -gt 128KB }", hint: "Mentionne les objets, le pipe, $_ et Length.", checks: ["#", "Get-ChildItem", "Where-Object", "\\$_", "Length", "128KB"], solution: "# Get-ChildItem retourne les objets du dossier courant.\n# Le pipe les transmet a Where-Object.\n# $_ represente chaque objet; Length est compare a 128KB.\nGet-ChildItem | Where-Object { $_.Length -gt 128KB }" }
        ],
        memo: [
            { front: "Commande risquee en examen?", back: "Ajouter -WhatIf si disponible et tester sur un petit dossier." },
            { front: "Formater ou selectionner?", back: "Select-Object pour traiter; Format-* seulement pour afficher a la fin." }
        ]
    }
};
applyCourseEnhancements();
const revisionExpansion = {
    administratif: {
        essentials: [
            { term: "Mode revision", detail: "Avant une evaluation, travaille dans un dossier de test et garde une trace des commandes utiles.", code: code("New-Item -ItemType Directory -Path .\\sandbox -Force", "Start-Transcript -Path .\\revision.log") },
            { term: "Lecture d'enonce", detail: "Repere toujours le verbe attendu: afficher, compter, creer, copier, supprimer, filtrer, exporter.", code: "Get-Command -Verb Copy\nGet-Command -Verb Export" }
        ],
        examples: [
            { title: "Preparation d'un dossier d'examen", text: "Un dossier propre evite de tester sur de vraies donnees.", code: code("$base = Join-Path $PWD 'sandbox'", "New-Item -ItemType Directory -Path $base -Force", "Set-Location $base") }
        ],
        labs: [
            { prompt: "Cree un dossier sandbox dans le dossier courant sans erreur s'il existe deja.", hint: "New-Item accepte -Force.", checks: ["New-Item", "sandbox", "Directory", "-Force"], solution: "New-Item -ItemType Directory -Path .\\sandbox -Force" },
            { prompt: "Demarre une transcription dans revision.log.", hint: "La cmdlet s'appelle Start-Transcript.", checks: ["Start-Transcript", "revision\\.log"], solution: "Start-Transcript -Path .\\revision.log" },
            { prompt: "Trouve toutes les commandes dont le verbe est Export.", hint: "Get-Command peut filtrer par verbe.", checks: ["Get-Command", "-Verb", "Export"], solution: "Get-Command -Verb Export" },
            { prompt: "Affiche la strategie d'execution courante.", hint: "Elle commence par Get-Execution.", checks: ["Get-ExecutionPolicy"], solution: "Get-ExecutionPolicy" },
            { prompt: "Ecris une commande qui montre ce que supprimerait Remove-Item sur les .tmp sans supprimer.", hint: "Utilise -WhatIf.", checks: ["Remove-Item", "\\.tmp|\\*\\.tmp", "-WhatIf"], solution: "Remove-Item -Path .\\*.tmp -WhatIf" },
            { prompt: "Arrete proprement une transcription PowerShell.", hint: "La cmdlet inverse de Start-Transcript.", checks: ["Stop-Transcript"], solution: "Stop-Transcript" }
        ]
    },
    bases: {
        essentials: [
            { term: "Commande inconnue", detail: "Si tu ne connais pas la cmdlet, cherche par nom, verbe, nom commun ou type de commande.", code: code("Get-Command -Name *process*", "Get-Command -Verb Get", "Get-Command -CommandType Alias") },
            { term: "Aide rapide", detail: "Le suffixe -? affiche l'aide d'une commande sans ecrire Get-Help.", code: "Get-Command -?" }
        ],
        examples: [
            { title: "Alias utiles mais prudents", text: "Les alias aident en console, mais en script le nom complet reste plus clair.", code: code("Get-Alias -Definition Get-ChildItem", "Get-Alias -Definition Where-Object") }
        ],
        labs: [
            { prompt: "Compte les commandes de type Cmdlet disponibles.", hint: "Get-Command puis Measure-Object.", checks: ["Get-Command", "-CommandType", "cmdlet", "Measure-Object"], solution: "Get-Command -CommandType Cmdlet | Measure-Object" },
            { prompt: "Affiche les alias qui pointent vers Where-Object.", hint: "Get-Alias avec -Definition.", checks: ["Get-Alias", "-Definition", "Where-Object"], solution: "Get-Alias -Definition Where-Object" },
            { prompt: "Affiche les rubriques conceptuelles about_*.", hint: "Get-Help peut chercher about_*.", checks: ["Get-Help|Help", "about_\\*"], solution: "Get-Help -Name about_*" },
            { prompt: "Demande les exemples d'aide pour Get-Service.", hint: "Parametre -Examples.", checks: ["Get-Help|Help", "Get-Service", "-Examples"], solution: "Get-Help -Name Get-Service -Examples" }
        ]
    },
    fichiers: {
        essentials: [
            { term: "Chemins robustes", detail: "Join-Path evite les erreurs de slash et rend le script plus portable.", code: "$logPath = Join-Path $PWD 'logs\\today.log'" },
            { term: "Contenu texte", detail: "Get-Content lit, Set-Content remplace, Add-Content ajoute.", code: code("Set-Content -Path .\\note.txt -Value 'Premiere ligne'", "Add-Content -Path .\\note.txt -Value 'Suite'", "Get-Content -Path .\\note.txt") }
        ],
        examples: [
            { title: "Mode d'un fichier", text: "Le mode affiche les attributs principaux: archive, readonly, hidden, system ou directory.", code: "Get-ChildItem -Path . | Select-Object Mode, Name" }
        ],
        labs: [
            { prompt: "Construis dans $path le chemin vers logs\\today.log depuis le dossier courant.", hint: "Utilise Join-Path.", checks: ["\\$path", "Join-Path", "\\$PWD|Get-Location", "logs"], solution: "$path = Join-Path $PWD 'logs\\today.log'" },
            { prompt: "Ecris Bonjour dans note.txt en remplacant le contenu existant.", hint: "Set-Content remplace.", checks: ["Set-Content", "note\\.txt", "Bonjour"], solution: "Set-Content -Path .\\note.txt -Value 'Bonjour'" },
            { prompt: "Ajoute Suite dans note.txt sans remplacer le contenu.", hint: "Add-Content ajoute.", checks: ["Add-Content", "note\\.txt", "Suite"], solution: "Add-Content -Path .\\note.txt -Value 'Suite'" },
            { prompt: "Copie tous les fichiers .ps1 vers .\\backup.", hint: "Filtre puis Copy-Item.", checks: ["Get-ChildItem|gci|dir|ls|Copy-Item", "\\.ps1|\\*\\.ps1|-Filter", "Copy-Item", "backup"], solution: "Get-ChildItem -Filter *.ps1 | Copy-Item -Destination .\\backup" }
        ]
    },
    fournisseurs: {
        essentials: [
            { term: "Lecteur Variable", detail: "Variable: permet d'explorer les variables PowerShell comme des elements.", code: "Get-ChildItem Variable:\nGet-Item Variable:HOME" },
            { term: "Lecteur Alias", detail: "Alias: expose les alias sous forme d'elements manipulables.", code: "Get-ChildItem Alias:\nGet-Item Alias:dir" }
        ],
        examples: [
            { title: "Comparer deux fournisseurs", text: "La meme cmdlet peut lister les fichiers, les variables et les alias.", code: code("Get-ChildItem .", "Get-ChildItem Variable:", "Get-ChildItem Alias:") }
        ],
        labs: [
            { prompt: "Liste les variables PowerShell avec le fournisseur Variable:.", hint: "Get-ChildItem fonctionne dessus.", checks: ["Get-ChildItem|gci|dir|ls", "Variable:"], solution: "Get-ChildItem Variable:" },
            { prompt: "Affiche l'element Alias:dir.", hint: "Get-Item peut lire un element precis.", checks: ["Get-Item", "Alias:dir"], solution: "Get-Item Alias:dir" },
            { prompt: "Liste les certificats du lecteur Cert: si disponible.", hint: "C'est le fournisseur certificats.", checks: ["Get-ChildItem|gci|dir|ls", "Cert:"], solution: "Get-ChildItem Cert:" },
            { prompt: "Va dans HKCU: puis affiche le chemin courant.", hint: "Set-Location puis Get-Location.", checks: ["Set-Location", "HKCU:", "Get-Location"], solution: "Set-Location HKCU:\nGet-Location" },
            { prompt: "Affiche la variable d'environnement windir via Env:.", hint: "Get-Content peut lire Env:\\windir.", checks: ["Get-Content", "Env:\\\\windir"], solution: "Get-Content -Path 'Env:\\windir'" },
            { prompt: "Cree puis supprime Env:\\revisionTest.", hint: "New-Item puis Remove-Item.", checks: ["New-Item", "Env:\\\\revisionTest|revisionTest", "Remove-Item"], solution: "New-Item -Path 'Env:\\' -Name 'revisionTest' -Value 'ok'\nRemove-Item -Path 'Env:\\revisionTest'" }
        ]
    },
    variables: {
        essentials: [
            { term: "String vs calcul", detail: "L'operateur + concatene les chaines mais additionne les nombres.", code: code("$nom = 'Burma'", "$nom + 123", "$var = 100", "$var + 100") },
            { term: "DateTime", detail: "Le type [datetime] permet de travailler avec des dates comme objets.", code: "[datetime]$date = '2026-06-11'\n$date.Year" }
        ],
        examples: [
            { title: "Conversion impossible", text: "Un texte non numerique ne peut pas etre converti en entier.", code: code("$texte = 'Salut'", "# [int]$texte provoque une erreur", "$nombre = [int]'123'") }
        ],
        labs: [
            { prompt: "Cree $texte avec '123', convertis-le en entier dans $nombre.", hint: "Utilise [int].", checks: ["\\$texte", "123", "\\$nombre", "\\[int\\]\\$texte|\\[int\\].*123"], solution: "$texte = '123'\n$nombre = [int]$texte" },
            { prompt: "Cree [double]$prix avec 19, puis affiche son type.", hint: "GetType().", checks: ["\\[double\\]\\$prix", "19", "GetType\\(\\)"], solution: "[double]$prix = 19\n$prix.GetType()" },
            { prompt: "Cree [datetime]$date avec la date du jour de ton choix puis affiche l'annee.", hint: "Une date a une propriete Year.", checks: ["\\[datetime\\]\\$date", "\\$date\\.Year"], solution: "[datetime]$date = '2026-06-11'\n$date.Year" },
            { prompt: "Affiche le chemin courant avec une variable automatique.", hint: "$PWD existe.", checks: ["\\$PWD"], solution: "$PWD" }
        ]
    },
    operateurs: {
        essentials: [
            { term: "Modulo", detail: "% retourne le reste d'une division, utile pour tester pair/impair.", code: "10 % 3\n$nombre % 2 -eq 0" },
            { term: "Affectations raccourcies", detail: "+=, -=, *=, /=, %= et ++ evitent de reecrire la variable.", code: code("$i = 1", "$i += 8", "$i++") }
        ],
        examples: [
            { title: "Pair ou impair", text: "Le modulo permet d'ecrire une condition simple.", code: code("if ($nombre % 2 -eq 0) {", "  'Pair'", "} else {", "  'Impair'", "}") }
        ],
        labs: [
            { prompt: "Ecris une expression qui teste si $nombre est pair.", hint: "Utilise % 2 et -eq 0.", checks: ["\\$nombre", "%", "2", "-eq", "0"], solution: "$nombre % 2 -eq 0" },
            { prompt: "Remplace Shell par Ceff dans PowerShell.", hint: "Operateur -replace.", checks: ["PowerShell", "-replace", "Shell", "Ceff"], solution: "'PowerShell' -replace 'Shell', 'Ceff'" },
            { prompt: "Teste si 85 est compris dans la plage 1..99.", hint: "Utilise -in.", checks: ["85", "-in", "1\\.\\.99"], solution: "85 -in @(1..99)" },
            { prompt: "Ecris une commande qui redirige Get-Process vers process.txt en remplacant le fichier.", hint: "Operateur >.", checks: ["Get-Process", ">", "process\\.txt"], solution: "Get-Process > .\\process.txt" }
        ]
    },
    objets: {
        essentials: [
            { term: "Propriete calculee", detail: "Select-Object peut creer une propriete calculee avec Name et Expression.", code: "Get-ChildItem | Select-Object Name, @{Name='KB'; Expression={$_.Length / 1KB}}" },
            { term: "ForEach-Object", detail: "ForEach-Object execute un bloc pour chaque objet du pipeline.", code: "Get-ChildItem | ForEach-Object { $_.Name.ToUpper() }" }
        ],
        examples: [
            { title: "Objet personnalise", text: "Un objet personnalise donne une sortie propre pour un rapport.", code: code("[pscustomobject]@{", "  Nom = 'Revision'", "  Fichiers = (Get-ChildItem -File).Count", "}") }
        ],
        labs: [
            { prompt: "Affiche les 3 premiers services avec Name et Status.", hint: "Get-Service puis Select-Object -First.", checks: ["Get-Service", "Select-Object|select", "-First\\s+3", "Name", "Status"], solution: "Get-Service | Select-Object -First 3 Name, Status" },
            { prompt: "Mesure le CPU maximal des processus.", hint: "Measure-Object avec -Property CPU -Maximum.", checks: ["Get-Process", "Measure-Object", "CPU", "-Maximum"], solution: "Get-Process | Measure-Object -Property CPU -Maximum" },
            { prompt: "Transforme les noms de fichiers en majuscules avec ForEach-Object.", hint: "Chaque objet a Name, une chaine a ToUpper().", checks: ["Get-ChildItem|gci|dir|ls", "ForEach-Object|%", "\\$_\\.Name", "ToUpper\\(\\)"], solution: "Get-ChildItem | ForEach-Object { $_.Name.ToUpper() }" },
            { prompt: "Cree un [pscustomobject] avec Nom='Revision' et Etat='OK'.", hint: "Hashtable apres [pscustomobject].", checks: ["\\[pscustomobject\\]", "Nom", "Revision", "Etat", "OK"], solution: "[pscustomobject]@{ Nom = 'Revision'; Etat = 'OK' }" }
        ]
    },
    tableaux: {
        essentials: [
            { term: "Tableau type", detail: "[int[]] ou [char[]] force le type des elements du tableau.", code: "[char[]]$lettres = @(65, 66, 67)" },
            { term: "Acces hashtable", detail: "Une valeur de hashtable peut se lire par point ou par crochets.", code: "$tabAssoc.EMZ\n$tabAssoc['EMZ']" }
        ],
        examples: [
            { title: "Ajouter a une hashtable", text: "L'operateur += ajoute une nouvelle paire cle-valeur.", code: "$tabAssoc += @{ 'NIV' = 'Nils von Allmen' }" }
        ],
        labs: [
            { prompt: "Cree un tableau de caracteres A, B, C a partir de 65, 66, 67.", hint: "Force [char[]].", checks: ["\\[char\\[\\]\\]", "\\$lettres|\\$tab", "65", "66", "67"], solution: "[char[]]$lettres = @(65, 66, 67)" },
            { prompt: "Cree un tableau vide $tab.", hint: "@() et non @{}.", checks: ["\\$tab", "@\\(\\)"], solution: "[array]$tab = @()" },
            { prompt: "Change la valeur d'index 2 de $tab en 'c'.", hint: "Affectation par index.", checks: ["\\$tab\\[2\\]", "=", "'c'|\"c\""], solution: "$tab[2] = 'c'" },
            { prompt: "Cree $tabAssoc avec la cle EMZ puis lis cette valeur avec la notation par point.", hint: "Hashtable puis $tabAssoc.EMZ.", checks: ["\\$tabAssoc", "@\\{", "EMZ", "\\$tabAssoc\\.EMZ"], solution: "$tabAssoc = @{ 'EMZ' = 'Emilie Zaugg' }\n$tabAssoc.EMZ" }
        ]
    },
    controle: {
        essentials: [
            { term: "elseif", detail: "elseif permet d'enchainer plusieurs cas sans imbriquer trop de if.", code: code("if ($note -ge 5) { 'Bien' }", "elseif ($note -ge 4) { 'Suffisant' }", "else { 'Insuffisant' }") },
            { term: "break et continue", detail: "break quitte une boucle; continue passe directement a l'iteration suivante.", code: code("foreach ($n in 1..10) {", "  if ($n -eq 5) { continue }", "  if ($n -eq 9) { break }", "  $n", "}") }
        ],
        examples: [
            { title: "Validation simple", text: "Une condition combinee permet de valider une plage.", code: "if (($var -ge 0) -and ($var -le 10)) { 'Valide' }" }
        ],
        labs: [
            { prompt: "Ecris un if/elseif/else pour $note: >=5 Bien, >=4 Suffisant, sinon Insuffisant.", hint: "Ordre important: teste d'abord le plus grand.", checks: ["if", "\\$note", "-ge", "5", "elseif", "-ge", "4", "else"], solution: "if ($note -ge 5) {\n  'Bien'\n} elseif ($note -ge 4) {\n  'Suffisant'\n} else {\n  'Insuffisant'\n}" },
            { prompt: "Ecris une boucle while qui affiche 1 a 5.", hint: "Initialise $i puis incremente.", checks: ["\\$i", "while", "-le", "5", "\\$i\\+\\+|\\+\\+\\$i"], solution: "$i = 1\nwhile ($i -le 5) {\n  $i\n  $i++\n}" },
            { prompt: "Ecris une boucle for qui affiche les nombres de 0 a 4.", hint: "Condition -lt 5.", checks: ["for", "\\$i\\s*=\\s*0", "-lt", "5", "\\$i\\+\\+"], solution: "for ($i = 0; $i -lt 5; $i++) {\n  $i\n}" },
            { prompt: "Ecris une boucle foreach sur 1..10 qui ignore 5 avec continue.", hint: "if puis continue.", checks: ["foreach", "1\\.\\.10", "if", "-eq", "5", "continue"], solution: "foreach ($n in 1..10) {\n  if ($n -eq 5) { continue }\n  $n\n}" }
        ]
    },
    fonctions: {
        essentials: [
            { term: "Parametre obligatoire", detail: "[Parameter(Mandatory = $true)] force l'utilisateur a fournir une valeur.", code: code("param(", "  [Parameter(Mandatory = $true)]", "  [string]$Path", ")") },
            { term: "Valeur par defaut", detail: "Un parametre peut recevoir une valeur par defaut dans le bloc param.", code: "param([string]$Message = 'Texte par defaut')" }
        ],
        examples: [
            { title: "Fonction reutilisable", text: "Retourne une valeur exploitable plutot que l'afficher uniquement avec Write-Host.", code: code("function Get-Carre {", "  param([int]$Nombre)", "  $Nombre * $Nombre", "}") }
        ],
        labs: [
            { prompt: "Ecris une fonction Get-Carre qui retourne le carre d'un entier.", hint: "Ne mets pas Write-Host, retourne le resultat.", checks: ["function\\s+Get-Carre", "param", "\\[int\\]\\$Nombre", "\\$Nombre\\s*\\*\\s*\\$Nombre"], solution: "function Get-Carre {\n  param([int]$Nombre)\n  $Nombre * $Nombre\n}" },
            { prompt: "Ecris un bloc param avec un parametre obligatoire [string]$Path.", hint: "Parameter(Mandatory = $true).", checks: ["param", "Parameter", "Mandatory\\s*=\\s*\\$true", "\\[string\\]\\$Path"], solution: "param(\n  [Parameter(Mandatory = $true)]\n  [string]$Path\n)" }
        ]
    },
    evaluations: {
        essentials: [
            { term: "Auto-correction", detail: "Pour t'auto-corriger, explique la commande en 3 parties: source, filtre/transformation, sortie.", code: "Get-Service | Where-Object Status -eq 'Running' | Select-Object Name, Status" },
            { term: "Reflexe objet", detail: "Si tu dois continuer un traitement, utilise Select-Object ou des objets; garde Format-* pour l'affichage final.", code: "Get-Process | Select-Object Name, CPU | Sort-Object CPU -Descending" }
        ],
        examples: [
            { title: "Reponse type", text: "Une reponse solide nomme la propriete et l'operateur.", code: code("# Filtre les services dont Status vaut Running", "Get-Service | Where-Object Status -eq 'Running'") }
        ],
        labs: [
            { prompt: "Donne une commande et un commentaire pour lister les services Running.", hint: "Commentaire + Get-Service + Where-Object.", checks: ["#", "Get-Service", "Where-Object|\\?", "Status", "Running"], solution: "# Liste les services en cours d'execution en filtrant la propriete Status.\nGet-Service | Where-Object Status -eq 'Running'" },
            { prompt: "Ecris une commande qui trie les processus par CPU decroissant puis garde les 5 premiers.", hint: "Sort-Object puis Select-Object.", checks: ["Get-Process", "Sort-Object", "CPU", "-Descending", "Select-Object|select", "-First\\s+5"], solution: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5" },
            { prompt: "Ecris une commande prudente pour supprimer les .log en simulation.", hint: "Remove-Item -WhatIf.", checks: ["Get-ChildItem|Remove-Item", "\\.log|\\*\\.log", "Remove-Item", "-WhatIf"], solution: "Get-ChildItem -Filter *.log | Remove-Item -WhatIf" },
            { prompt: "Ecris une commande qui exporte les services Running en CSV.", hint: "Filtre, selectionne, exporte.", checks: ["Get-Service", "Where-Object|\\?", "Running", "Select-Object|select", "Export-Csv", "\\.csv"], solution: "Get-Service | Where-Object Status -eq 'Running' | Select-Object Name, Status | Export-Csv .\\services-running.csv -NoTypeInformation" },
            { prompt: "Ecris une commande qui affiche l'aide conceptuelle des fonctions.", hint: "about_Functions.", checks: ["Get-Help|Help", "about_Functions"], solution: "Get-Help about_Functions" },
            { prompt: "Ecris une commande qui compte les lignes, mots et caracteres d'un fichier texte.", hint: "Get-Content puis Measure-Object.", checks: ["Get-Content", "Measure-Object", "-Line", "-Word", "-Character"], solution: "Get-Content .\\test.txt | Measure-Object -Line -Word -Character" }
        ]
    }
};
applyRevisionExpansion();
const finalExerciseTopUp = {
    administratif: [
        { prompt: "Ajoute un commentaire PowerShell qui indique le nom, la version et l'auteur d'un script.", hint: "Un commentaire commence par #.", checks: ["#", "version", "auteur|author"], solution: "# Nom: revision.ps1\n# Version: 1.0\n# Auteur: Jonathan" }
    ],
    bases: [
        { prompt: "Trouve les commandes dont le nom se termine par log.", hint: "Get-Command -Name accepte le joker *.", checks: ["Get-Command", "-Name", "\\*log"], solution: "Get-Command -Name *log" },
        { prompt: "Affiche le type et les membres de la chaine 'PowerShell'.", hint: "Envoie la chaine a Get-Member.", checks: ["PowerShell", "Get-Member"], solution: "'PowerShell' | Get-Member" }
    ],
    fichiers: [
        { prompt: "Affiche le dossier courant puis deplace-toi dans .\\backup.", hint: "Get-Location puis Set-Location.", checks: ["Get-Location", "Set-Location", "backup"], solution: "Get-Location\nSet-Location .\\backup" },
        { prompt: "Renomme ancien.txt en nouveau.txt.", hint: "Rename-Item utilise -Path et -NewName.", checks: ["Rename-Item", "ancien\\.txt", "-NewName", "nouveau\\.txt"], solution: "Rename-Item -Path .\\ancien.txt -NewName 'nouveau.txt'" }
    ],
    fournisseurs: [
        { prompt: "Liste les lecteurs PowerShell et filtre ceux dont le Provider est FileSystem.", hint: "Get-PSDrive retourne une propriete Provider.", checks: ["Get-PSDrive", "Where-Object|\\?", "Provider", "FileSystem"], solution: "Get-PSDrive | Where-Object { $_.Provider -like '*FileSystem*' }" }
    ],
    variables: [
        { prompt: "Cree $prenom et $nom, puis cree $identite en concatenant les deux avec un espace.", hint: "L'operateur + concatene les chaines.", checks: ["\\$prenom", "\\$nom", "\\$identite", "\\+"], solution: "$prenom = 'Nestor'\n$nom = 'Burma'\n$identite = $prenom + ' ' + $nom" },
        { prompt: "Affiche les informations de version PowerShell avec une variable automatique.", hint: "$PSVersionTable.", checks: ["\\$PSVersionTable"], solution: "$PSVersionTable" }
    ],
    operateurs: [
        { prompt: "Teste si 'PowerShell' commence par power sans tenir compte de la casse.", hint: "-like est insensible a la casse par defaut.", checks: ["PowerShell", "-like", "power\\*"], solution: "'PowerShell' -like 'power*'" },
        { prompt: "Teste si 'PowerShell' commence par power en tenant compte de la casse.", hint: "Ajoute c a l'operateur.", checks: ["PowerShell", "-clike", "power\\*"], solution: "'PowerShell' -clike 'power*'" }
    ],
    objets: [
        { prompt: "Affiche toutes les proprietes d'un fichier avec Format-List -Property *.", hint: "A utiliser pour inspecter l'affichage.", checks: ["Get-ChildItem|Get-Item", "Format-List", "-Property", "\\*"], solution: "Get-Item .\\test.txt | Format-List -Property *" },
        { prompt: "Selectionne Name et une propriete calculee TailleKB pour les fichiers.", hint: "Select-Object avec @{Name=...;Expression=...}.", checks: ["Get-ChildItem|gci|dir|ls", "Select-Object|select", "Name", "TailleKB", "Expression"], solution: "Get-ChildItem -File | Select-Object Name, @{Name='TailleKB'; Expression={$_.Length / 1KB}}" }
    ],
    tableaux: [
        { prompt: "Concatene $dix et $vingt dans $dixVingt.", hint: "L'operateur + assemble deux tableaux.", checks: ["\\$dixVingt", "\\$dix", "\\+", "\\$vingt"], solution: "$dixVingt = $dix + $vingt" },
        { prompt: "Definis $OFS a '; ' puis convertis $notes en string.", hint: "Le cours utilise $OFS.", checks: ["\\$OFS", ";", "\\[string\\]\\$notes|\\[String\\]\\$notes"], solution: "$OFS = '; '\n[string]$notes" }
    ],
    controle: [
        { prompt: "Ecris un if qui verifie que $var est entre 0 et 10 inclus.", hint: "Combine -ge et -le avec -and.", checks: ["if", "\\$var", "-ge", "0", "-and", "-le", "10"], solution: "if (($var -ge 0) -and ($var -le 10)) {\n  'Valide'\n}" },
        { prompt: "Ecris une boucle qui s'arrete quand $n vaut 9 avec break.", hint: "if puis break.", checks: ["foreach|while|for", "\\$n", "-eq", "9", "break"], solution: "foreach ($n in 1..10) {\n  if ($n -eq 9) { break }\n  $n\n}" }
    ],
    fonctions: [
        { prompt: "Ecris une fonction Write-Bonjour qui affiche la date formatee dd MMM yyyy HH:mm.", hint: "Get-Date -Format.", checks: ["function\\s+Write-Bonjour", "Get-Date", "-Format", "dd MMM yyyy HH:mm"], solution: "function Write-Bonjour {\n  [string]$now = Get-Date -Format 'dd MMM yyyy HH:mm'\n  Write-Host \"Bonjour ! Nous sommes le $now\"\n}" },
        { prompt: "Ecris l'appel de Show-Popup3 en nommant -Titre puis -Message.", hint: "L'ordre n'a plus d'importance avec les noms.", checks: ["Show-Popup3", "-Titre", "-Message"], solution: "Show-Popup3 -Titre 'popup' -Message 'Bonjour'" },
        { prompt: "Ecris un squelette Begin/Process/End dans un filtre Demo-Filter.", hint: "filter puis blocs begin/process/end.", checks: ["filter\\s+Demo-Filter", "begin", "process", "end"], solution: "filter Demo-Filter {\n  begin { }\n  process { $_ }\n  end { }\n}" }
    ],
    evaluations: [
        { prompt: "Ecris une mini-checklist en commentaires pour corriger une commande PowerShell.", hint: "Commentaires avec #.", checks: ["#", "commande", "pipeline|pipe", "propriete|propriete|propriété"], solution: "# 1. Verifier la commande et les parametres\n# 2. Expliquer le pipeline\n# 3. Nommer la propriete filtree\n# 4. Tester les actions sensibles avec -WhatIf" }
    ]
};
applyFinalExerciseTopUp();
function createSimpleModule(trackId, color, seed) {
    return {
        id: `${trackId}-${seed.id}`,
        title: seed.title,
        icon: seed.icon,
        color,
        duration: "15 min",
        summary: seed.summary,
        goals: [
            `Comprendre le thème: ${seed.title}.`,
            "Retenir les notions principales du cours.",
            "S'entraîner avec un quiz et un exercice court."
        ],
        essentials: [
            { term: seed.term, detail: seed.detail, code: seed.code }
        ],
        examples: [
            { title: `Exemple - ${seed.title}`, text: seed.detail, code: seed.code }
        ],
        pitfalls: [
            seed.pitfall || "Ne pas apprendre la définition sans savoir l'utiliser dans un cas simple."
        ],
        quiz: [
            {
                q: seed.quizQuestion,
                choices: seed.quizChoices,
                answer: seed.quizAnswer,
                why: seed.quizWhy
            }
        ],
        labs: [
            {
                prompt: seed.labPrompt,
                hint: "Réponds avec les mots-clés essentiels. Le correcteur reste simple pour cette première version.",
                checks: seed.labChecks,
                solution: seed.labSolution
            }
        ],
        memo: [
            { front: seed.memoFront, back: seed.memoBack }
        ]
    };
}
const sqlModules = [
    createSimpleModule("106", "#147d82", {
        id: "administratif",
        title: "Administratif",
        icon: "AD",
        summary: "Organisation du module, méthode de révision et vocabulaire de base pour SQL.",
        term: "Méthode SQL",
        detail: "Avant d'écrire une requête, identifie les tables, les colonnes attendues et le résultat voulu.",
        code: "SELECT colonne FROM table;",
        quizQuestion: "Quel est le premier réflexe avant d'écrire une requête SQL?",
        quizChoices: ["Choisir une couleur", "Identifier les tables et colonnes", "Supprimer les données", "Créer un mot de passe"],
        quizAnswer: 1,
        quizWhy: "Une requête SQL part toujours des données à lire ou modifier.",
        labPrompt: "Écris une requête SQL minimale qui lit une colonne depuis une table.",
        labChecks: ["SELECT", "FROM"],
        labSolution: "SELECT nom FROM clients;",
        memoFront: "Structure minimale d'une lecture SQL?",
        memoBack: "SELECT colonne FROM table;"
    }),
    createSimpleModule("106", "#147d82", {
        id: "echauffement",
        title: "Échauffement et rappels",
        icon: "SQL",
        summary: "Rappels sur SELECT, FROM, WHERE et l'ordre logique d'une requête simple.",
        term: "SELECT",
        detail: "SELECT choisit les colonnes à afficher. FROM indique la table utilisée.",
        code: "SELECT nom, prenom\nFROM clients\nWHERE ville = 'Lausanne';",
        quizQuestion: "Quel mot-clé indique la table utilisée?",
        quizChoices: ["WHERE", "FROM", "ORDER", "COUNT"],
        quizAnswer: 1,
        quizWhy: "FROM désigne la table source de la requête.",
        labPrompt: "Écris une requête qui sélectionne nom et prénom dans la table clients.",
        labChecks: ["SELECT", "nom", "prenom", "FROM", "clients"],
        labSolution: "SELECT nom, prenom FROM clients;",
        memoFront: "Rôle de WHERE?",
        memoBack: "Filtrer les lignes selon une condition."
    }),
    createSimpleModule("106", "#147d82", {
        id: "schemas",
        title: "Gestion de schémas",
        icon: "BD",
        summary: "Créer et comprendre la structure d'une table: colonnes, types et contraintes.",
        term: "CREATE TABLE",
        detail: "CREATE TABLE définit une nouvelle table avec ses colonnes et leurs types.",
        code: "CREATE TABLE clients (\n  id INT PRIMARY KEY,\n  nom VARCHAR(80) NOT NULL\n);",
        quizQuestion: "Quel mot-clé crée une table?",
        quizChoices: ["MAKE TABLE", "CREATE TABLE", "NEW DATA", "SELECT TABLE"],
        quizAnswer: 1,
        quizWhy: "CREATE TABLE est l'instruction SQL standard pour créer une table.",
        labPrompt: "Écris le début d'une création de table clients avec une clé primaire id.",
        labChecks: ["CREATE TABLE", "clients", "id", "PRIMARY KEY"],
        labSolution: "CREATE TABLE clients (id INT PRIMARY KEY);",
        memoFront: "À quoi sert PRIMARY KEY?",
        memoBack: "Identifier chaque ligne de manière unique."
    }),
    createSimpleModule("106", "#147d82", {
        id: "selection",
        title: "Sélection de données",
        icon: "SEL",
        summary: "Lire des données avec SELECT, filtrer avec WHERE et trier avec ORDER BY.",
        term: "ORDER BY",
        detail: "ORDER BY trie les résultats selon une ou plusieurs colonnes.",
        code: "SELECT nom, email\nFROM clients\nWHERE actif = 1\nORDER BY nom ASC;",
        quizQuestion: "Quel mot-clé trie les résultats?",
        quizChoices: ["WHERE", "ORDER BY", "GROUP BY", "JOIN"],
        quizAnswer: 1,
        quizWhy: "ORDER BY organise l'affichage des lignes retournées.",
        labPrompt: "Écris une requête qui lit les clients actifs et trie par nom.",
        labChecks: ["SELECT", "FROM", "clients", "WHERE", "actif", "ORDER BY", "nom"],
        labSolution: "SELECT nom FROM clients WHERE actif = 1 ORDER BY nom;",
        memoFront: "WHERE ou ORDER BY?",
        memoBack: "WHERE filtre, ORDER BY trie."
    }),
    createSimpleModule("106", "#147d82", {
        id: "regroupement",
        title: "Regroupement de données",
        icon: "GR",
        summary: "Regrouper des lignes et calculer des totaux avec GROUP BY et COUNT.",
        term: "GROUP BY",
        detail: "GROUP BY rassemble les lignes qui ont une même valeur pour permettre des calculs.",
        code: "SELECT ville, COUNT(*) AS total\nFROM clients\nGROUP BY ville;",
        quizQuestion: "Quelle fonction compte les lignes?",
        quizChoices: ["SUM", "AVG", "COUNT", "LOWER"],
        quizAnswer: 2,
        quizWhy: "COUNT sert à compter des lignes ou des valeurs.",
        labPrompt: "Écris une requête qui compte les clients par ville.",
        labChecks: ["SELECT", "ville", "COUNT", "FROM", "clients", "GROUP BY", "ville"],
        labSolution: "SELECT ville, COUNT(*) FROM clients GROUP BY ville;",
        memoFront: "GROUP BY sert à quoi?",
        memoBack: "Regrouper les lignes pour faire des calculs par groupe."
    }),
    createSimpleModule("106", "#147d82", {
        id: "normalisation",
        title: "Normalisation",
        icon: "NF",
        summary: "Organiser les données pour éviter les répétitions et les incohérences.",
        term: "Normalisation",
        detail: "La normalisation sépare les informations dans plusieurs tables reliées par des clés.",
        code: "clients(id, nom)\ncommandes(id, client_id, date_commande)",
        quizQuestion: "Pourquoi normaliser une base?",
        quizChoices: ["Pour dupliquer les données", "Pour éviter répétitions et anomalies", "Pour supprimer les clés", "Pour cacher les tables"],
        quizAnswer: 1,
        quizWhy: "La normalisation rend la base plus cohérente et maintenable.",
        labPrompt: "Donne deux tables possibles pour séparer clients et commandes.",
        labChecks: ["clients", "commandes"],
        labSolution: "clients(id, nom)\ncommandes(id, client_id, date_commande)",
        memoFront: "But de la normalisation?",
        memoBack: "Réduire les doublons et garder des données cohérentes."
    }),
    createSimpleModule("106", "#147d82", {
        id: "jointure",
        title: "Jointure",
        icon: "JN",
        summary: "Relier plusieurs tables avec JOIN pour obtenir un résultat complet.",
        term: "INNER JOIN",
        detail: "INNER JOIN retourne les lignes qui correspondent dans les deux tables.",
        code: "SELECT clients.nom, commandes.date_commande\nFROM clients\nINNER JOIN commandes ON commandes.client_id = clients.id;",
        quizQuestion: "Quel mot-clé relie deux tables?",
        quizChoices: ["JOIN", "ORDER", "COUNT", "DELETE"],
        quizAnswer: 0,
        quizWhy: "JOIN sert à combiner des tables liées.",
        labPrompt: "Écris une jointure entre clients et commandes sur l'id client.",
        labChecks: ["JOIN", "clients", "commandes", "ON", "client_id"],
        labSolution: "SELECT * FROM clients JOIN commandes ON commandes.client_id = clients.id;",
        memoFront: "INNER JOIN retourne quoi?",
        memoBack: "Les lignes qui ont une correspondance dans les deux tables."
    }),
    createSimpleModule("106", "#147d82", {
        id: "permissions",
        title: "Permissions",
        icon: "ACL",
        summary: "Comprendre les droits d'accès aux tables et limiter les actions sensibles.",
        term: "GRANT",
        detail: "GRANT donne un droit précis à un utilisateur ou à un rôle.",
        code: "GRANT SELECT ON clients TO lecteur;",
        quizQuestion: "Quel mot-clé donne une permission?",
        quizChoices: ["ALLOW", "GRANT", "OPEN", "SELECT"],
        quizAnswer: 1,
        quizWhy: "GRANT attribue des droits dans une base SQL.",
        labPrompt: "Écris une permission qui autorise seulement la lecture de clients.",
        labChecks: ["GRANT", "SELECT", "clients"],
        labSolution: "GRANT SELECT ON clients TO lecteur;",
        memoFront: "Principe important des permissions?",
        memoBack: "Donner uniquement les droits nécessaires."
    }),
    createSimpleModule("106", "#147d82", {
        id: "modification",
        title: "Modification de données",
        icon: "UPD",
        summary: "Ajouter, modifier et supprimer des lignes avec INSERT, UPDATE et DELETE.",
        term: "UPDATE",
        detail: "UPDATE modifie des lignes. WHERE est essentiel pour éviter de modifier toute la table.",
        code: "UPDATE clients\nSET ville = 'Genève'\nWHERE id = 10;",
        quizQuestion: "Pourquoi WHERE est important avec UPDATE?",
        quizChoices: ["Pour changer la police", "Pour limiter les lignes modifiées", "Pour créer la table", "Pour trier le résultat"],
        quizAnswer: 1,
        quizWhy: "Sans WHERE, UPDATE peut modifier toutes les lignes.",
        labPrompt: "Écris un UPDATE qui modifie la ville du client id 10.",
        labChecks: ["UPDATE", "clients", "SET", "ville", "WHERE", "id"],
        labSolution: "UPDATE clients SET ville = 'Genève' WHERE id = 10;",
        memoFront: "DELETE sans WHERE?",
        memoBack: "Dangereux: cela peut supprimer toutes les lignes."
    }),
    createSimpleModule("106", "#147d82", {
        id: "integrite",
        title: "Intégrité et exhaustivité",
        icon: "INT",
        summary: "Garantir la cohérence avec clés primaires, clés étrangères et contraintes.",
        term: "FOREIGN KEY",
        detail: "Une clé étrangère relie une table à la clé primaire d'une autre table.",
        code: "FOREIGN KEY (client_id) REFERENCES clients(id)",
        quizQuestion: "Quelle contrainte relie deux tables?",
        quizChoices: ["FOREIGN KEY", "ORDER BY", "LIKE", "COUNT"],
        quizAnswer: 0,
        quizWhy: "FOREIGN KEY maintient une relation cohérente entre deux tables.",
        labPrompt: "Écris une contrainte de clé étrangère client_id vers clients(id).",
        labChecks: ["FOREIGN KEY", "client_id", "REFERENCES", "clients", "id"],
        labSolution: "FOREIGN KEY (client_id) REFERENCES clients(id)",
        memoFront: "NOT NULL sert à quoi?",
        memoBack: "Empêcher une valeur vide dans une colonne obligatoire."
    }),
    createSimpleModule("106", "#147d82", {
        id: "documentation",
        title: "Documentations",
        icon: "DOC",
        summary: "Documenter les tables, les champs et les choix importants du modèle.",
        term: "Documentation",
        detail: "Une bonne documentation explique le rôle des tables, des colonnes et des règles métier.",
        code: "-- clients: personnes qui peuvent passer commande\n-- commandes.client_id référence clients.id",
        quizQuestion: "Que doit expliquer une documentation de base de données?",
        quizChoices: ["Uniquement les couleurs", "Tables, colonnes et règles métier", "Les mots de passe", "Le nom du navigateur"],
        quizAnswer: 1,
        quizWhy: "La documentation aide à comprendre et maintenir la base.",
        labPrompt: "Écris deux commentaires SQL qui documentent clients et commandes.client_id.",
        labChecks: ["--", "clients", "commandes", "client_id"],
        labSolution: "-- clients: personnes enregistrées\n-- commandes.client_id: référence clients.id",
        memoFront: "Pourquoi documenter une base?",
        memoBack: "Pour comprendre les choix et faciliter la maintenance."
    })
];
const securityModules = [
    createSimpleModule("231", "#b33d3d", {
        id: "administratif",
        title: "Administratif",
        icon: "AD",
        summary: "Organisation du module 231, vocabulaire et méthode de révision.",
        term: "Méthode sécurité",
        detail: "Pour analyser un cas, identifie la donnée, le risque, l'impact et la mesure de protection.",
        code: "Donnée -> risque -> impact -> protection",
        quizQuestion: "Quel ordre aide à analyser un cas sécurité?",
        quizChoices: ["Couleur -> logo -> police", "Donnée -> risque -> impact -> protection", "Supprimer -> oublier -> recommencer", "Prix -> livraison -> stock"],
        quizAnswer: 1,
        quizWhy: "Cette chaîne aide à expliquer le problème et la mesure adaptée.",
        labPrompt: "Écris la chaîne d'analyse sécurité en quatre mots-clés.",
        labChecks: ["donn", "risque", "impact", "protection"],
        labSolution: "Donnée -> risque -> impact -> protection",
        memoFront: "Premier réflexe en sécurité?",
        memoBack: "Identifier ce qu'on protège et contre quel risque."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "categorisation",
        title: "Catégorisation des données",
        icon: "CAT",
        summary: "Classer les données selon leur sensibilité et leur usage.",
        term: "Classification",
        detail: "On peut classer une donnée comme publique, interne, confidentielle ou sensible.",
        code: "publique | interne | confidentielle | sensible",
        quizQuestion: "Pourquoi catégoriser les données?",
        quizChoices: ["Pour choisir la protection adaptée", "Pour les rendre publiques", "Pour supprimer les droits", "Pour changer leur format"],
        quizAnswer: 0,
        quizWhy: "La catégorie guide le niveau de protection nécessaire.",
        labPrompt: "Donne trois catégories possibles de données.",
        labChecks: ["publique|public", "interne", "confidentielle|sensible"],
        labSolution: "publique, interne, confidentielle",
        memoFront: "Une donnée confidentielle demande quoi?",
        memoBack: "Un accès limité et des protections adaptées."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "securite-donnees",
        title: "Sécurité des données",
        icon: "SEC",
        summary: "Protéger la confidentialité, l'intégrité et la disponibilité des données.",
        term: "CIA",
        detail: "La sécurité vise confidentialité, intégrité et disponibilité.",
        code: "Confidentialité\nIntégrité\nDisponibilité",
        quizQuestion: "Que signifie le triangle CIA en sécurité?",
        quizChoices: ["Copie, Image, Archive", "Confidentialité, Intégrité, Disponibilité", "Code, Identité, Application", "Client, Internet, Accès"],
        quizAnswer: 1,
        quizWhy: "Ce sont trois objectifs majeurs de la sécurité de l'information.",
        labPrompt: "Écris les trois objectifs CIA.",
        labChecks: ["confidentialit", "int", "disponibilit"],
        labSolution: "Confidentialité, intégrité, disponibilité",
        memoFront: "Intégrité des données?",
        memoBack: "Les données restent exactes et non modifiées sans autorisation."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "sauvegarde",
        title: "Sauvegarde des données",
        icon: "BK",
        summary: "Prévoir des copies pour restaurer les données après incident.",
        term: "Règle 3-2-1",
        detail: "La règle 3-2-1 conseille 3 copies, 2 supports différents et 1 copie hors site.",
        code: "3 copies\n2 supports\n1 copie hors site",
        quizQuestion: "À quoi sert une sauvegarde?",
        quizChoices: ["Remplacer les mots de passe", "Restaurer les données après incident", "Créer une licence", "Supprimer les logs"],
        quizAnswer: 1,
        quizWhy: "Une sauvegarde utile permet une restauration testée.",
        labPrompt: "Écris la règle 3-2-1 en une ligne.",
        labChecks: ["3", "2", "1", "cop", "support|site"],
        labSolution: "3 copies, 2 supports, 1 copie hors site",
        memoFront: "Une sauvegarde non testée?",
        memoBack: "Elle n'est pas fiable tant qu'on n'a pas testé la restauration."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "acces",
        title: "Gestion des accès",
        icon: "ACL",
        summary: "Limiter les droits aux personnes qui en ont réellement besoin.",
        term: "Moindre privilège",
        detail: "Chaque utilisateur reçoit uniquement les droits nécessaires pour son travail.",
        code: "Utilisateur -> rôle -> droits nécessaires",
        quizQuestion: "Quel principe limite les droits inutiles?",
        quizChoices: ["Moindre privilège", "Accès total", "Partage public", "Mot de passe unique"],
        quizAnswer: 0,
        quizWhy: "Le moindre privilège réduit les risques en cas d'erreur ou de compromission.",
        labPrompt: "Écris une phrase qui explique le moindre privilège.",
        labChecks: ["droit|acc", "n", "cessaire|besoin|minimum"],
        labSolution: "Donner seulement les droits nécessaires à chaque utilisateur.",
        memoFront: "Moindre privilège?",
        memoBack: "Le minimum de droits nécessaires, pas plus."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "licences",
        title: "Les licences",
        icon: "LIC",
        summary: "Comprendre les droits d'utilisation liés aux logiciels et contenus.",
        term: "Licence",
        detail: "Une licence définit ce qu'on a le droit de faire avec un logiciel, une image ou un document.",
        code: "utiliser | modifier | partager | redistribuer",
        quizQuestion: "Que définit une licence?",
        quizChoices: ["Les droits d'utilisation", "La taille de l'écran", "La vitesse du réseau", "La couleur du site"],
        quizAnswer: 0,
        quizWhy: "La licence précise les usages autorisés ou interdits.",
        labPrompt: "Donne deux actions qu'une licence peut autoriser ou interdire.",
        labChecks: ["utiliser|usage", "modifier|partager|redistribuer"],
        labSolution: "utiliser, modifier, partager ou redistribuer",
        memoFront: "Pourquoi lire une licence?",
        memoBack: "Pour savoir ce qu'on peut faire légalement avec la ressource."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "conservation",
        title: "Conservation des données",
        icon: "RET",
        summary: "Définir combien de temps garder les données et quand les supprimer.",
        term: "Durée de conservation",
        detail: "Les données doivent être gardées seulement tant qu'elles sont nécessaires ou légalement requises.",
        code: "collecter -> utiliser -> conserver -> supprimer",
        quizQuestion: "Pourquoi définir une durée de conservation?",
        quizChoices: ["Pour garder tout à vie", "Pour limiter les risques et respecter les règles", "Pour perdre les données", "Pour augmenter les doublons"],
        quizAnswer: 1,
        quizWhy: "Garder trop longtemps augmente les risques et peut poser problème.",
        labPrompt: "Écris le cycle simple de vie d'une donnée.",
        labChecks: ["collecter", "utiliser", "conserver", "supprimer"],
        labSolution: "collecter -> utiliser -> conserver -> supprimer",
        memoFront: "Conserver une donnée combien de temps?",
        memoBack: "Aussi longtemps que nécessaire ou requis, pas indéfiniment."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "juridique",
        title: "Conditions juridiques",
        icon: "LAW",
        summary: "Relier la protection des données aux règles, contrats et obligations.",
        term: "Base légale",
        detail: "Une collecte de données doit avoir une raison claire: contrat, obligation, consentement ou intérêt légitime selon le contexte.",
        code: "finalité + base légale + information des personnes",
        quizQuestion: "Que faut-il clarifier avant de collecter des données?",
        quizChoices: ["La finalité et la base légale", "La couleur du formulaire", "Le nom du fichier CSS", "Le nombre d'icônes"],
        quizAnswer: 0,
        quizWhy: "La finalité et la base légale expliquent pourquoi les données sont traitées.",
        labPrompt: "Écris trois mots-clés juridiques liés à une collecte.",
        labChecks: ["finalit", "base", "information|personne|consentement"],
        labSolution: "finalité, base légale, information des personnes",
        memoFront: "Finalité d'un traitement?",
        memoBack: "La raison précise pour laquelle on traite les données."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "lois",
        title: "Lois et règlements",
        icon: "REG",
        summary: "Identifier les textes, politiques et règles applicables à une situation.",
        term: "Conformité",
        detail: "La conformité consiste à respecter les lois, règlements, contrats et politiques internes.",
        code: "loi + règlement + contrat + politique interne",
        quizQuestion: "Que signifie être conforme?",
        quizChoices: ["Ignorer les règles", "Respecter les règles applicables", "Partager tous les accès", "Supprimer la documentation"],
        quizAnswer: 1,
        quizWhy: "La conformité signifie respecter les obligations applicables.",
        labPrompt: "Cite trois sources de règles possibles.",
        labChecks: ["loi", "r", "glement|contrat|politique"],
        labSolution: "loi, règlement, contrat, politique interne",
        memoFront: "Conformité?",
        memoBack: "Respect des règles applicables à la situation."
    }),
    createSimpleModule("231", "#b33d3d", {
        id: "evaluations",
        title: "Évaluations",
        icon: "EV",
        summary: "S'entraîner à expliquer un risque et une mesure de protection.",
        term: "Réponse type",
        detail: "Une bonne réponse nomme le risque, l'impact, la mesure et la justification.",
        code: "Risque: ...\nImpact: ...\nMesure: ...\nJustification: ...",
        quizQuestion: "Que doit contenir une réponse de sécurité solide?",
        quizChoices: ["Risque, impact, mesure, justification", "Uniquement une définition", "Un dessin", "Une URL au hasard"],
        quizAnswer: 0,
        quizWhy: "Cette structure montre que tu sais appliquer la notion à un cas.",
        labPrompt: "Écris les quatre rubriques d'une réponse type.",
        labChecks: ["risque", "impact", "mesure", "justification"],
        labSolution: "Risque, impact, mesure, justification",
        memoFront: "Structure de réponse en évaluation?",
        memoBack: "Risque -> impact -> mesure -> justification."
    })
];
const trackCourseModules = {
    "122": modules,
    "106": sqlModules,
    "231": securityModules
};
function applyCourseEnhancements() {
    for (const [moduleId, addition] of Object.entries(courseEnhancements)) {
        const module = modules.find((item) => item.id === moduleId);
        if (!module)
            continue;
        if (addition.courseRefs) {
            module.courseRefs = addition.courseRefs;
        }
        for (const key of ["goals", "essentials", "examples", "pitfalls", "quiz", "labs", "memo"]) {
            if (addition[key]) {
                module[key].push(...addition[key]);
            }
        }
    }
}
function applyRevisionExpansion() {
    for (const [moduleId, addition] of Object.entries(revisionExpansion)) {
        const module = modules.find((item) => item.id === moduleId);
        if (!module)
            continue;
        for (const key of ["essentials", "examples", "labs"]) {
            if (addition[key]) {
                module[key].push(...addition[key]);
            }
        }
    }
}
function applyFinalExerciseTopUp() {
    for (const [moduleId, labs] of Object.entries(finalExerciseTopUp)) {
        const module = modules.find((item) => item.id === moduleId);
        if (!module)
            continue;
        module.labs.push(...labs);
    }
}
const storageKey = "revision-powershell-122-v1";
const themeKey = "revision-powershell-122-theme";
const sidebarKey = "revision-powershell-122-sidebar-collapsed";
const mobileSidebarQuery = "(max-width: 860px)";
const state = {
    view: "home",
    current: "bases",
    selectedTrack: "122",
    tab: "fiche",
    search: "",
    quizAnswers: {},
    quizChecked: {},
    labAnswers: {},
    labFeedback: {},
    solutionVisible: {},
    flashRevealed: {},
    exam: null,
    history: []
};
let progress = loadProgress();
let theme = loadTheme();
let sidebarCollapsed = loadSidebarCollapsed();
let sidebarMobileOpen = false;
function qs(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element introuvable: ${selector}`);
    }
    return element;
}
function cloneExam(exam) {
    if (!exam)
        return null;
    return {
        ...exam,
        answers: { ...exam.answers },
        questions: [...exam.questions]
    };
}
function currentNavigation() {
    return {
        view: state.view,
        current: state.current,
        tab: state.tab,
        search: state.search,
        selectedTrack: state.selectedTrack,
        exam: cloneExam(state.exam)
    };
}
function pushNavigation() {
    state.history.push(currentNavigation());
    if (state.history.length > 30) {
        state.history.shift();
    }
}
function restoreNavigation(snapshot) {
    state.view = snapshot.view;
    state.current = snapshot.current;
    state.tab = snapshot.tab;
    state.search = snapshot.search;
    state.selectedTrack = snapshot.selectedTrack;
    state.exam = cloneExam(snapshot.exam);
    progress.lastTrack = snapshot.selectedTrack;
    progress.lastModule = snapshot.current;
    saveProgress();
}
function goBack() {
    const previous = state.history.pop();
    if (!previous)
        return;
    restoreNavigation(previous);
    render();
}
function showHome(push = true) {
    if (push && state.view !== "home") {
        pushNavigation();
    }
    state.view = "home";
    state.search = "";
    state.exam = null;
    render();
}
function showDashboard(push = true) {
    if (push && state.view !== "dashboard") {
        pushNavigation();
    }
    if (!trackHasModule(state.selectedTrack, state.current)) {
        state.current = getFirstModuleId(state.selectedTrack);
    }
    state.view = "dashboard";
    render();
}
function normalizeAnswer(value) {
    return String(value)
        .replace(/\r\n/g, "\n")
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, "\"")
        .replace(/`[\n\r]+/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\s*\|\s*/g, " | ")
        .trim();
}
function readableCheck(pattern) {
    const labels = [
        [/Get-ChildItem|gci|dir|ls/i, "une liste avec Get-ChildItem"],
        [/Get-Service/i, "Get-Service"],
        [/Get-Process/i, "Get-Process"],
        [/Where-Object|\\\?/i, "un filtre Where-Object"],
        [/Select-Object|select/i, "Select-Object"],
        [/Measure-Object/i, "Measure-Object"],
        [/Export-Csv/i, "Export-Csv"],
        [/Remove-Item/i, "Remove-Item"],
        [/-WhatIf/i, "la simulation -WhatIf"],
        [/-Recurse/i, "le parcours -Recurse"],
        [/-Filter/i, "un filtre de fichiers"],
        [/New-Item/i, "New-Item"],
        [/Test-Path/i, "Test-Path"],
        [/Join-Path/i, "Join-Path"],
        [/function/i, "une fonction"],
        [/param/i, "un bloc param"],
        [/foreach/i, "une boucle foreach"],
        [/while|do/i, "une boucle ou condition"],
        [/if|elseif|else/i, "une structure conditionnelle"],
        [/return/i, "un retour de valeur"],
        [/#/i, "un commentaire"],
    ];
    return labels.find(([regex]) => regex.test(pattern))?.[1] || `l'élément attendu ${pattern}`;
}
function validateLabAnswer(lab, answer) {
    const normalized = normalizeAnswer(answer);
    if (!normalized) {
        return { ok: false, message: "Pas encore: écris d'abord une commande à vérifier." };
    }
    const missing = lab.checks.filter((pattern) => {
        const regex = new RegExp(pattern, "i");
        return !regex.test(answer) && !regex.test(normalized);
    });
    if (!missing.length) {
        return { ok: true, message: "Validé. J'ai retrouvé les éléments clés de la solution." };
    }
    const details = missing.slice(0, 3).map(readableCheck).join(", ");
    const suffix = missing.length > 3 ? "..." : ".";
    return { ok: false, message: `Pas encore: il manque ${details}${suffix}` };
}
function isTabName(value) {
    return ["fiche", "quiz", "exercices", "memo"].includes(value);
}
function loadTheme() {
    try {
        const saved = localStorage.getItem(themeKey);
        if (saved === "dark" || saved === "light")
            return saved;
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    catch {
        return "light";
    }
}
function applyTheme(value) {
    document.documentElement.dataset.theme = value;
    const button = document.querySelector("#themeBtn");
    const icon = document.querySelector("#themeIcon");
    const label = document.querySelector("#themeLabel");
    if (!button || !icon || !label)
        return;
    const dark = value === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.title = dark ? "Passer en mode jour" : "Passer en mode nuit";
    icon.classList.toggle("is-sun", dark);
    icon.classList.toggle("is-moon", !dark);
    label.textContent = dark ? "Jour" : "Nuit";
}
function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(themeKey, theme);
    applyTheme(theme);
}
function loadSidebarCollapsed() {
    try {
        return localStorage.getItem(sidebarKey) === "true";
    }
    catch {
        return false;
    }
}
function isMobileSidebarMode() {
    return window.matchMedia?.(mobileSidebarQuery).matches || false;
}
function syncMobileSidebar() {
    const shell = qs(".app-shell");
    const sidebar = qs("#sidebarPanel");
    const backdrop = qs("#sidebarBackdrop");
    const openButton = qs("#sidebarOpenBtn");
    const mobile = isMobileSidebarMode();
    const isLanding = state.view === "home" || state.view === "comingSoon";
    const visible = sidebarMobileOpen && mobile && !isLanding;
    if (!visible) {
        sidebarMobileOpen = false;
    }
    shell.classList.toggle("sidebar-mobile-open", visible);
    document.body.classList.toggle("sidebar-overlay-open", visible);
    backdrop.hidden = !visible;
    openButton.hidden = isLanding;
    openButton.setAttribute("aria-expanded", String(visible));
    sidebar.setAttribute("aria-hidden", String(isLanding || (mobile && !visible)));
}
function applySidebarState() {
    const shell = qs(".app-shell");
    const button = qs("#sidebarToggle");
    shell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
    const mobile = isMobileSidebarMode();
    button.setAttribute("aria-expanded", String(mobile ? sidebarMobileOpen : !sidebarCollapsed));
    button.title = mobile
        ? "Fermer les modules"
        : sidebarCollapsed
            ? "Ouvrir la navigation"
            : "Réduire la navigation";
    const label = button.querySelector(".sr-only");
    if (label)
        label.textContent = button.title;
    syncMobileSidebar();
}
function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem(sidebarKey, String(sidebarCollapsed));
    applySidebarState();
}
function openMobileSidebar() {
    sidebarMobileOpen = true;
    closeTopMenu();
    applySidebarState();
}
function closeMobileSidebar() {
    if (!sidebarMobileOpen)
        return;
    sidebarMobileOpen = false;
    applySidebarState();
}
function handleSidebarToggle() {
    if (isMobileSidebarMode()) {
        closeMobileSidebar();
        return;
    }
    toggleSidebar();
}
function closeTopMenu() {
    const menu = document.querySelector("#topMenu");
    const button = document.querySelector("#topMenuBtn");
    const panel = document.querySelector("#topMenuPanel");
    if (!menu || !button || !panel)
        return;
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    document.querySelector("#trackMenu")?.removeAttribute("open");
}
function openTopMenu() {
    const menu = qs("#topMenu");
    const button = qs("#topMenuBtn");
    const panel = qs("#topMenuPanel");
    menu.classList.add("open");
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;
}
function toggleTopMenu() {
    const button = qs("#topMenuBtn");
    if (button.getAttribute("aria-expanded") === "true") {
        closeTopMenu();
    }
    else {
        openTopMenu();
    }
}
function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        return {
            quizzes: saved?.quizzes || {},
            labs: saved?.labs || {},
            flashcards: saved?.flashcards || {},
            notes: saved?.notes || {},
            examBest: saved?.examBest || null,
            lastTrack: isTrackId(saved?.lastTrack) ? saved.lastTrack : "122",
            lastModule: saved?.lastModule || "bases"
        };
    }
    catch {
        return { quizzes: {}, labs: {}, flashcards: {}, notes: {}, examBest: null, lastTrack: "122", lastModule: "bases" };
    }
}
function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progress));
}
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function normalize(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}
function isTrackId(value) {
    return tracks.some((track) => track.id === value);
}
function getTrack(id = state.selectedTrack) {
    return tracks.find((track) => track.id === id) || tracks[0];
}
function isTrackAvailable(trackId) {
    return getTrack(trackId).status === "Disponible";
}
function getTrackModules(trackId = state.selectedTrack) {
    return trackCourseModules[trackId] || modules;
}
function getFirstModuleId(trackId = state.selectedTrack) {
    return getTrackModules(trackId)[0]?.id || "bases";
}
function trackHasModule(trackId, moduleId) {
    return getTrackModules(trackId).some((module) => module.id === moduleId);
}
function getTrackForModule(moduleId) {
    return tracks.find((track) => trackHasModule(track.id, moduleId))?.id || state.selectedTrack;
}
function getModule(id = state.current) {
    const trackModules = getTrackModules();
    return trackModules.find((module) => module.id === id) || trackModules[0] || modules[0];
}
function getLabDone(moduleId) {
    return progress.labs[moduleId] || [];
}
function getFlashKnown(moduleId) {
    return progress.flashcards[moduleId] || [];
}
function getModuleNote(moduleId) {
    return progress.notes[moduleId] || "";
}
function modulesToReview(count = 3, trackId = state.selectedTrack) {
    return [...getTrackModules(trackId)]
        .sort((a, b) => moduleProgress(a) - moduleProgress(b))
        .slice(0, count);
}
function moduleProgress(module) {
    const quiz = progress.quizzes[module.id];
    const quizRatio = quiz ? quiz.score / module.quiz.length : 0;
    const labRatio = module.labs.length ? getLabDone(module.id).length / module.labs.length : 0;
    const flashRatio = module.memo.length ? getFlashKnown(module.id).length / module.memo.length : 0;
    return Math.round((quizRatio * 0.58 + labRatio * 0.28 + flashRatio * 0.14) * 100);
}
function overallProgress(trackId = state.selectedTrack) {
    const trackModules = getTrackModules(trackId);
    const total = trackModules.reduce((sum, module) => sum + moduleProgress(module), 0);
    return trackModules.length ? Math.round(total / trackModules.length) : 0;
}
function noteCount(trackId = state.selectedTrack) {
    const moduleIds = new Set(getTrackModules(trackId).map((module) => module.id));
    return Object.entries(progress.notes)
        .filter(([moduleId, note]) => moduleIds.has(moduleId) && note.trim().length > 0)
        .length;
}
function getModuleForTrack(trackId, moduleId) {
    return getTrackModules(trackId).find((module) => module.id === moduleId);
}
function getContinueModule(trackId = state.selectedTrack) {
    return getModuleForTrack(trackId, progress.lastModule) || getTrackModules(trackId)[0] || modules[0];
}
function getRecommendedModule(trackId = state.selectedTrack) {
    return modulesToReview(1, trackId)[0] || getContinueModule(trackId);
}
function moduleStatusMeta(module) {
    const percent = moduleProgress(module);
    if (percent >= 80) {
        return { label: "Maîtrisé", className: "is-complete", detail: "Synthèse prête" };
    }
    if (percent >= 45) {
        return { label: "En cours", className: "is-progress", detail: "À consolider" };
    }
    if (percent > 0) {
        return { label: "À revoir", className: "is-review", detail: "Priorité" };
    }
    return { label: "À commencer", className: "is-empty", detail: "Fiche d'abord" };
}
function overallStatusLabel(percent) {
    if (percent >= 80)
        return "Parcours maîtrisé";
    if (percent >= 45)
        return "Progression moyenne";
    if (percent > 0)
        return "Progression faible";
    return "Première session";
}
function renderProgressMetric(label, value, tone = "") {
    return `
    <div class="progress-metric ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}
function renderDashboardShortcut(label, detail, module, tab) {
    return `
    <button class="shortcut-button" type="button" data-start-module="${module.id}" data-start-tab="${tab}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(detail)}</strong>
    </button>
  `;
}
function renderPlanStep(index, title, note, done, current) {
    const stateClass = done ? "done" : current ? "current" : "";
    const stateLabel = done ? "Fait" : current ? "À faire" : "Ensuite";
    return `
    <div class="plan-step ${stateClass}">
      <span class="plan-step-marker">${index}</span>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p class="mini-note">${escapeHtml(note)}</p>
      </div>
      <span class="plan-step-state">${stateLabel}</span>
    </div>
  `;
}
function renderQuickPlan(module) {
    const savedQuiz = Boolean(progress.quizzes[module.id]);
    const doneLabs = getLabDone(module.id).length;
    const allLabsDone = module.labs.length > 0 && doneLabs >= module.labs.length;
    const percent = moduleProgress(module);
    return `
    <div class="plan-list">
      ${renderPlanStep(1, "Lire la fiche", "Repère les commandes et pièges du module.", percent > 0, percent === 0)}
      ${renderPlanStep(2, "Faire le quiz", "Vise au moins 3 bonnes réponses sur 4.", savedQuiz, percent > 0 && !savedQuiz)}
      ${renderPlanStep(3, "Écrire les exercices", "Tape la commande avant de regarder la solution.", allLabsDone, savedQuiz && !allLabsDone)}
      ${renderPlanStep(4, "Passer à la synthèse", "Termine par le mémo puis l'examen blanc.", percent >= 80, allLabsDone && percent < 80)}
    </div>
  `;
}
function moduleMatches(module, query) {
    if (!query)
        return true;
    const haystack = normalize([
        module.title,
        module.summary,
        module.goals.join(" "),
        module.essentials.map((item) => `${item.term} ${item.detail} ${item.code}`).join(" "),
        module.quiz.map((item) => item.q).join(" ")
    ].join(" "));
    return haystack.includes(query);
}
function render() {
    renderShell();
    const app = qs("#app");
    if (state.view === "home") {
        app.innerHTML = renderHome();
    }
    else if (state.view === "dashboard") {
        app.innerHTML = renderDashboard();
    }
    else if (state.view === "module") {
        app.innerHTML = renderModule(getModule());
    }
    else if (state.view === "exam") {
        app.innerHTML = renderExam();
    }
    else {
        app.innerHTML = renderComingSoon();
    }
}
function renderShell() {
    applyTheme(theme);
    const shell = qs(".app-shell");
    applySidebarState();
    const isLanding = state.view === "home" || state.view === "comingSoon";
    const isCourseArea = !isLanding;
    shell.classList.toggle("landing-view", isLanding);
    shell.classList.toggle("home-view", state.view === "home");
    shell.classList.toggle("placeholder-view", state.view === "comingSoon");
    const overall = overallProgress();
    const homeButton = qs("#homeBtn");
    const dashboardButton = qs("#dashboardBtn");
    const backButton = qs("#backBtn");
    const examButton = qs("#examBtn");
    const searchBox = qs(".search-box");
    const mobilePicker = qs(".mobile-module-picker");
    const brandMark = qs(".moodle-logo");
    const sidebarTrackCode = qs("#sidebarTrackCode");
    const sidebarTrackName = qs("#sidebarTrackName");
    const currentTrackLabel = qs("#currentTrackLabel");
    const topMenuLabel = qs("#topMenuLabel");
    homeButton.hidden = state.view === "home";
    dashboardButton.hidden = !isCourseArea || state.view === "dashboard";
    examButton.hidden = !isCourseArea;
    searchBox.hidden = !isCourseArea;
    mobilePicker.hidden = !isCourseArea;
    backButton.hidden = state.view === "home" && state.history.length === 0;
    backButton.disabled = state.history.length === 0;
    backButton.setAttribute("aria-disabled", String(backButton.disabled));
    brandMark.textContent = state.view === "home" ? "ICT" : getTrack().code;
    sidebarTrackCode.textContent = getTrack().code;
    sidebarTrackName.textContent = getTrack().name;
    currentTrackLabel.textContent = state.view === "home" ? "Choisir" : getTrack().name;
    topMenuLabel.textContent = state.view === "home" ? "Navigation" : getTrack().name;
    document.querySelectorAll(".track-menu-item").forEach((button) => {
        button.classList.toggle("active", button.dataset.track === state.selectedTrack);
    });
    qs("#overallPercent").textContent = `${overall}%`;
    qs("#overallBar").style.width = `${overall}%`;
    qs("#searchInput").value = state.search;
    const title = state.view === "home"
        ? "Choisir un parcours"
        : state.view === "comingSoon"
            ? getTrack().name
            : state.view === "module"
                ? getModule().title
                : state.view === "exam"
                    ? "Examen blanc"
                    : `Tableau ${getTrack().code}`;
    const eyebrow = state.view === "home"
        ? "Accueil des révisions"
        : state.view === "comingSoon"
            ? getTrack().subtitle
            : getTrack().subtitle;
    qs("#courseEyebrow").textContent = eyebrow;
    qs("#pageTitle").textContent = title;
    const query = normalize(state.search);
    const trackModules = getTrackModules();
    const navModules = trackModules.filter((module) => moduleMatches(module, query));
    qs("#moduleNav").innerHTML = navModules.map((module) => {
        const percent = moduleProgress(module);
        const status = moduleStatusMeta(module);
        const active = state.current === module.id && state.view === "module";
        return `
      <button class="nav-item ${status.className} ${active ? "active" : ""}" data-module="${module.id}" type="button" title="${escapeHtml(module.title)}" aria-current="${active ? "page" : "false"}" style="--module-color:${module.color}">
        <span class="nav-icon" aria-hidden="true">${module.icon}</span>
        <span class="nav-label">
          <strong>${escapeHtml(module.title)}</strong>
          <span>${escapeHtml(module.duration)}</span>
          <span class="nav-status">${status.label}</span>
        </span>
        <span class="mini-meter" aria-label="${percent}% terminé"><span style="width:${percent}%"></span></span>
      </button>
    `;
    }).join("") || `<div class="empty-state">Aucun module ne correspond à cette recherche.</div>`;
    qs("#moduleSelect").innerHTML = trackModules.map((module) => (`<option value="${module.id}" ${state.current === module.id ? "selected" : ""}>${escapeHtml(module.title)}</option>`)).join("");
}
function renderTrackLogo(track) {
    if (track.logo === "powershell") {
        return `<span class="track-logo track-logo-powershell" aria-hidden="true"><span>&gt;_</span></span>`;
    }
    if (track.logo === "sql") {
        return `<span class="track-logo track-logo-sql" aria-hidden="true"><span>SQL</span></span>`;
    }
    return `<span class="track-logo track-logo-security" aria-hidden="true"><span>SEC</span></span>`;
}
function dashboardHeroLabel(track) {
    if (track.logo === "sql")
        return "Interface de revision SQL et schemas de base de donnees";
    if (track.logo === "security")
        return "Tableau de bord de revision en cybersecurite";
    return "Console PowerShell de revision";
}
function renderTrackCard(track) {
    const locked = !isTrackAvailable(track.id);
    const percent = locked ? 0 : overallProgress(track.id);
    const moduleCount = getTrackModules(track.id).length;
    return `
    <button class="track-card ${locked ? "is-locked" : "is-ready"}" type="button" data-track="${track.id}" style="--track-color:${track.color}" ${locked ? "disabled" : ""}>
      <span class="track-card-top">
        <span class="track-code">${escapeHtml(track.code)}</span>
        <span class="track-status">${locked ? "Bientôt" : escapeHtml(track.status)}</span>
      </span>
      <span class="track-card-title">
        ${renderTrackLogo(track)}
        <strong>${escapeHtml(track.name)}</strong>
      </span>
      <span class="track-title">${escapeHtml(track.title)}</span>
      <span class="track-description">${escapeHtml(track.subtitle)}</span>
      <span class="track-card-meter" aria-hidden="true"><span style="width:${percent}%"></span></span>
      <span class="track-card-foot">
        <span>${moduleCount} modules</span>
        <strong>${locked ? "À publier" : `${percent}%`}</strong>
      </span>
    </button>
  `;
}
function renderHome() {
    const trackId = isTrackAvailable(progress.lastTrack) ? progress.lastTrack : "122";
    const track = getTrack(trackId);
    const continueModule = getContinueModule(trackId);
    const recommendedModule = getRecommendedModule(trackId);
    const percent = overallProgress(trackId);
    const bestExam = progress.examBest ? `${progress.examBest.score}/${progress.examBest.total}` : "Pas encore";
    return `
    <section class="home-hero">
      <div class="home-copy">
        <div class="home-kicker-row">
          <p class="eyebrow">Centre de révision</p>
          <span>${getTrackModules(trackId).length} modules</span>
        </div>
        <h2>Choisis le parcours que tu veux travailler.</h2>
        <p>Les parcours ouvrent une version fonctionnelle avec modules, fiches, quiz, exercices, mémo et sauvegarde locale.</p>
        <div class="home-session-panel" style="--track-color:${track.color}">
          <div class="home-session-main">
            <div class="home-progress-number" aria-label="${percent}% de progression">${percent}<span>%</span></div>
            <div>
              <strong>${escapeHtml(track.name)}</strong>
              <span>${escapeHtml(overallStatusLabel(percent))}</span>
            </div>
          </div>
          <div class="home-session-meter" aria-hidden="true"><span style="width:${percent}%"></span></div>
          <div class="progress-metric-grid home-session-metrics">
            ${renderProgressMetric("Dernier module", continueModule.title)}
            ${renderProgressMetric("Priorité", recommendedModule.title)}
            ${renderProgressMetric("Examen", bestExam)}
            ${renderProgressMetric("Méthode", "Fiche · quiz · exercices")}
          </div>
          <div class="hero-actions">
            <button class="small-button primary" type="button" data-start-module="${continueModule.id}" data-start-tab="fiche">Continuer la révision</button>
            <button class="small-button" type="button" data-track="${track.id}">Ouvrir le tableau ${escapeHtml(track.code)}</button>
          </div>
        </div>
      </div>
      <div class="home-track-area">
        <div class="home-track-heading">
          <span>Parcours disponibles</span>
          <strong>ICT</strong>
        </div>
        <div class="track-grid" aria-label="Parcours de revision">
          ${tracks.map(renderTrackCard).join("")}
        </div>
        <div class="home-support-panel">
          <div>
            <span>Révision guidée</span>
            <strong>Shell 122 est prêt pour la session.</strong>
            <p>Continue le dernier module, puis passe au quiz ou aux exercices depuis le tableau.</p>
          </div>
          <div class="home-support-tags" aria-label="Outils disponibles">
            <span>Fiches</span>
            <span>Quiz</span>
            <span>Exercices</span>
            <span>Mémo</span>
          </div>
        </div>
      </div>
    </section>
    <section class="home-workflow" aria-label="Modes de révision">
      <article><span>01</span><strong>Fiche</strong><p>Relire les commandes et les pièges du module.</p></article>
      <article><span>02</span><strong>Quiz</strong><p>Vérifier les notions avant de pratiquer.</p></article>
      <article><span>03</span><strong>Exercices</strong><p>Écrire les commandes PowerShell soi-même.</p></article>
      <article><span>04</span><strong>Examen blanc</strong><p>S'entraîner sur des questions mélangées.</p></article>
    </section>
  `;
}
function renderComingSoon() {
    const track = getTrack();
    return `
    <section class="coming-panel" style="--track-color:${track.color}">
      <div class="coming-copy">
        <p class="eyebrow">Parcours ${escapeHtml(track.code)}</p>
        <div class="coming-title-row">
          ${renderTrackLogo(track)}
          <strong>${escapeHtml(track.name)}</strong>
        </div>
        <h2>${escapeHtml(track.title)} arrive bientôt.</h2>
        <p>${escapeHtml(track.description)}</p>
        <div class="button-row">
          <button class="small-button primary" type="button" data-track="122">Ouvrir Shell 122</button>
          <button class="small-button" type="button" data-home>Accueil</button>
        </div>
      </div>
    </section>
  `;
}
function renderDashboard() {
    const track = getTrack();
    const trackModules = getTrackModules();
    const query = normalize(state.search);
    const filteredModules = trackModules.filter((module) => moduleMatches(module, query));
    const continueModule = getContinueModule();
    const recommended = getRecommendedModule();
    const reviewModules = modulesToReview(3);
    const completed = trackModules.filter((module) => moduleProgress(module) >= 80).length;
    const bestExam = progress.examBest ? `${progress.examBest.score}/${progress.examBest.total}` : "Pas encore";
    const percent = overallProgress();
    const statusLabel = overallStatusLabel(percent);
    return `
    <div class="dashboard-grid">
      <section class="hero-panel">
        <div class="hero-visual">
          <div class="hero-copy">
            <p class="eyebrow">Session de travail · ${escapeHtml(statusLabel)}</p>
            <h2>Continue ${escapeHtml(continueModule.title)}, puis consolide les modules les plus faibles.</h2>
            <p>Lis la fiche, fais le quiz, écris les exercices, puis garde tes notes. La progression reste sauvegardée dans ce navigateur.</p>
            <div class="progress-metric-grid" aria-label="Résumé de progression">
              ${renderProgressMetric("Global", `${percent}%`)}
              ${renderProgressMetric("Modules solides", `${completed}/${trackModules.length}`)}
              ${renderProgressMetric("Notes perso", `${noteCount()}`)}
              ${renderProgressMetric("Meilleur examen", bestExam)}
            </div>
            <div class="hero-actions">
              <button class="small-button primary" type="button" data-start-module="${continueModule.id}" data-start-tab="fiche">Continuer la révision</button>
              <button class="small-button" type="button" data-start-module="${recommended.id}" data-start-tab="quiz">Réviser ${escapeHtml(recommended.title)}</button>
              <button class="small-button" type="button" data-start-exam>Examen blanc</button>
              <button class="small-button danger" type="button" data-reset-progress>Réinitialiser</button>
            </div>
            <div class="shortcut-grid" aria-label="Raccourcis d'apprentissage">
              ${renderDashboardShortcut("Fiche", continueModule.title, continueModule, "fiche")}
              ${renderDashboardShortcut("Quiz", continueModule.title, continueModule, "quiz")}
              ${renderDashboardShortcut("Exercices", continueModule.title, continueModule, "exercices")}
              <button class="shortcut-button strong" type="button" data-start-exam>
                <span>Examen</span>
                <strong>20 questions</strong>
              </button>
            </div>
          </div>
          <div class="hero-image hero-image-${track.logo}" role="img" aria-label="${escapeHtml(dashboardHeroLabel(track))}"></div>
        </div>
      </section>

      <aside class="side-stack">
        <section class="study-panel review-panel">
          <div class="panel-title-row">
            <h2>À revoir</h2>
            <span>${escapeHtml(statusLabel)}</span>
          </div>
          <div class="review-list">
            ${reviewModules.map(renderReviewItem).join("")}
          </div>
        </section>

        <section class="study-panel">
          <div class="panel-title-row">
            <h2>Plan rapide</h2>
            <span>${escapeHtml(continueModule.title)}</span>
          </div>
          ${renderQuickPlan(continueModule)}
        </section>
      </aside>
    </div>

    <section>
      <h2 class="section-title">${state.search ? "Résultats" : "Tous les thèmes"}</h2>
      ${filteredModules.length ? `<div class="module-grid">${filteredModules.map(renderModuleCard).join("")}</div>` : `<div class="empty-state">Aucun résultat. Essaie un mot du programme comme jointure, sauvegarde, permissions ou données.</div>`}
    </section>
  `;
}
function renderReviewItem(module) {
    const percent = moduleProgress(module);
    const note = getModuleNote(module.id).trim();
    const status = moduleStatusMeta(module);
    return `
    <button class="review-item ${status.className}" type="button" data-start-module="${module.id}" style="--module-color:${module.color}">
      <span class="module-icon" aria-hidden="true">${module.icon}</span>
      <span class="review-copy">
        <strong>${escapeHtml(module.title)}</strong>
        <span>${escapeHtml(status.label)} · ${percent}% maîtrise${note ? " · note perso" : ""}</span>
        <span class="progress-track" aria-hidden="true"><span style="width:${percent}%"></span></span>
      </span>
      <span class="review-percent">${percent}%</span>
    </button>
  `;
}
function renderModuleCard(module) {
    const percent = moduleProgress(module);
    const status = moduleStatusMeta(module);
    return `
    <button class="module-card ${status.className}" type="button" data-start-module="${module.id}" style="--module-color:${module.color}">
      <span class="module-card-head">
        <span class="module-icon" aria-hidden="true">${module.icon}</span>
        <span class="module-state">${escapeHtml(status.label)}</span>
      </span>
      <h3>${escapeHtml(module.title)}</h3>
      <p>${escapeHtml(module.summary)}</p>
      <span class="module-meta">${escapeHtml(module.duration)} · ${escapeHtml(status.detail)} · ${percent}% terminé</span>
      <span class="progress-track" aria-hidden="true"><span style="width:${percent}%"></span></span>
    </button>
  `;
}
function renderModule(module) {
    const percent = moduleProgress(module);
    return `
    <section class="module-header">
      <div class="module-title-panel" style="--module-color:${module.color}">
        <div class="module-title-row">
          <span class="module-icon" aria-hidden="true">${module.icon}</span>
          <div>
            <p class="eyebrow">${escapeHtml(module.duration)}</p>
            <h2>${escapeHtml(module.title)}</h2>
            <p>${escapeHtml(module.summary)}</p>
          </div>
        </div>
      </div>
      <div class="module-score-panel">
        <span>Maîtrise du module</span>
        <strong>${percent}%</strong>
        <div class="progress-track" aria-hidden="true"><span style="width:${percent}%"></span></div>
      </div>
    </section>

    ${renderModuleNotes(module)}

    <div class="tab-list" role="tablist" aria-label="Modes de révision">
      ${["fiche", "quiz", "exercices", "memo"].map((tab) => `
        <button class="tab-button ${state.tab === tab ? "active" : ""}" type="button" role="tab" aria-selected="${state.tab === tab}" data-tab="${tab}">
          ${tabLabel(tab)}
        </button>
      `).join("")}
    </div>

    ${state.tab === "fiche" ? renderFiche(module) : ""}
    ${state.tab === "quiz" ? renderQuiz(module) : ""}
    ${state.tab === "exercices" ? renderLabs(module) : ""}
    ${state.tab === "memo" ? renderMemo(module) : ""}
  `;
}
function renderModuleNotes(module) {
    const value = getModuleNote(module.id);
    return `
    <section class="study-panel notes-panel">
      <div class="panel-title-row">
        <h2>Mes notes</h2>
        <span>${value.trim().length ? "Sauvegarde locale" : "Vide"}</span>
      </div>
      <textarea class="notes-area" name="notes-${module.id}" data-note-module="${module.id}" spellcheck="true" aria-label="Notes personnelles pour ${escapeHtml(module.title)}" placeholder="Commandes à revoir, pièges perso, rappel d'examen...">${escapeHtml(value)}</textarea>
    </section>
  `;
}
function tabLabel(tab) {
    return { fiche: "Fiche", quiz: "Quiz", exercices: "Exercices", memo: "Mémo" }[tab];
}
function renderFiche(module) {
    return `
    <section class="lesson-grid">
      <article class="lesson-card">
        <h3>Objectifs</h3>
        <ul>${module.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}</ul>
      </article>
      <article class="lesson-card">
        <h3>Pièges à éviter</h3>
        <div class="mistake-list">
          ${module.pitfalls.map((item) => `<div class="mistake">${escapeHtml(item)}</div>`).join("")}
        </div>
      </article>
    </section>

    ${module.courseRefs ? `
      <section class="study-panel course-focus">
        <h2>Repères du cours</h2>
        <ul>${module.courseRefs.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    ` : ""}

    <section>
      <h2 class="section-title">Commandes et notions clés</h2>
      <div class="command-grid">
        ${module.essentials.map((item) => `
          <article class="command-card">
            <h3>${escapeHtml(item.term)}</h3>
            <p>${escapeHtml(item.detail)}</p>
            <pre><code>${escapeHtml(item.code)}</code></pre>
          </article>
        `).join("")}
      </div>
    </section>

    <section>
      <h2 class="section-title">Exemples commentés</h2>
      <div class="lesson-grid">
        ${module.examples.map((example) => `
          <article class="lesson-card">
            <h3>${escapeHtml(example.title)}</h3>
            <p>${escapeHtml(example.text)}</p>
            <pre><code>${escapeHtml(example.code)}</code></pre>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
function renderQuiz(module) {
    const answers = state.quizAnswers[module.id] || {};
    const checked = Boolean(state.quizChecked[module.id]);
    const saved = progress.quizzes[module.id];
    const answeredCount = Object.keys(answers).length;
    const score = scoreQuiz(module, answers);
    return `
    <section class="study-panel">
      <div class="exam-header">
        <div>
          <h2>Quiz du module</h2>
          <p>${answeredCount}/${module.quiz.length} réponses sélectionnées${saved ? ` · meilleur score: ${saved.score}/${module.quiz.length}` : ""}</p>
        </div>
        <div class="button-row">
          <button class="small-button primary" type="button" data-check-quiz>Corriger</button>
          <button class="small-button" type="button" data-retry-quiz>Recommencer</button>
        </div>
      </div>
    </section>
    <section class="exam-question-list">
      ${module.quiz.map((question, index) => renderQuestion(module.id, question, index, answers[index], checked)).join("")}
    </section>
    ${checked ? `<section class="study-panel"><h2>Résultat</h2><p role="status" class="${score >= Math.ceil(module.quiz.length * 0.75) ? "feedback ok" : "feedback bad"}">Score: ${score}/${module.quiz.length}. ${score >= 3 ? "Solide, garde le rythme." : "Reprends la fiche puis refais le quiz."}</p></section>` : ""}
  `;
}
function renderQuestion(moduleId, question, index, selected, checked) {
    return `
    <article class="question-card">
      <h3>${index + 1}. ${escapeHtml(question.q)}</h3>
      <div class="choice-list" role="group" aria-label="Réponses">
        ${question.choices.map((choice, choiceIndex) => {
        const status = checked && choiceIndex === question.answer ? "correct" : checked && choiceIndex === selected && selected !== question.answer ? "wrong" : "";
        return `
            <button class="choice-button ${selected === choiceIndex ? "selected" : ""} ${status}" type="button" aria-pressed="${selected === choiceIndex}" data-choice="${choiceIndex}" data-question="${index}" data-quiz-module="${moduleId}">
              ${escapeHtml(choice)}
            </button>
          `;
    }).join("")}
      </div>
      ${checked ? `<p class="feedback" role="status">${escapeHtml(question.why)}</p>` : ""}
    </article>
  `;
}
function scoreQuiz(module, answers) {
    return module.quiz.reduce((score, question, index) => score + (answers[index] === question.answer ? 1 : 0), 0);
}
function renderLabs(module) {
    const done = getLabDone(module.id);
    return `
    <section class="study-panel">
      <h2>Exercices pratiques</h2>
      <p>Écris la commande dans la zone de réponse, puis valide. Le correcteur vérifie les éléments importants; la solution reste disponible si tu veux comparer.</p>
    </section>
    <section class="lab-grid">
      ${module.labs.map((lab, index) => renderLab(module, lab, index, done.includes(index))).join("")}
    </section>
  `;
}
function renderLab(module, lab, index, done) {
    const key = `${module.id}:${index}`;
    const feedback = state.labFeedback[key];
    const visible = Boolean(state.solutionVisible[key]);
    const value = state.labAnswers[key] || "";
    const editorState = feedback ? feedback.ok ? "ok" : "bad" : done ? "ok" : "";
    return `
    <article class="lab-card">
      <h3>Exercice ${index + 1}${done ? " · validé" : ""}</h3>
      <p>${escapeHtml(lab.prompt)}</p>
      <p class="hint">${escapeHtml(lab.hint)}</p>
      <div class="answer-editor ${editorState}">
        <div class="answer-editor-top">
          <span class="terminal-lights" aria-hidden="true"><span></span><span></span><span></span></span>
          <strong>Réponse PowerShell</strong>
          <span class="answer-status">${done ? "Validé" : "À compléter"}</span>
        </div>
        <label class="answer-editor-body" for="lab-${module.id}-${index}">
          <span class="prompt-mark" aria-hidden="true">PS&gt;</span>
          <textarea data-lab-input="${key}" id="lab-${module.id}-${index}" name="lab-${module.id}-${index}" spellcheck="false" placeholder="Commande PowerShell...">${escapeHtml(value)}</textarea>
        </label>
      </div>
      <div class="button-row">
        <button class="small-button primary" type="button" data-check-lab="${index}">Valider</button>
        <button class="small-button" type="button" data-show-solution="${index}">${visible ? "Masquer" : "Voir"} la solution</button>
        <button class="small-button ghost" type="button" data-clear-lab="${index}">Effacer</button>
      </div>
      ${feedback ? `<p class="feedback ${feedback.ok ? "ok" : "bad"}" role="status">${escapeHtml(feedback.message)}</p>` : ""}
      <pre class="solution ${visible ? "visible" : ""}"><code>${escapeHtml(lab.solution)}</code></pre>
    </article>
  `;
}
function renderMemo(module) {
    const known = getFlashKnown(module.id);
    return `
    <section class="study-panel">
      <h2>Cartes mémo</h2>
      <p>Clique sur révéler, puis marque la carte comme sue si tu peux redonner la réponse sans regarder.</p>
    </section>
    <section class="flash-grid">
      ${module.memo.map((card, index) => {
        const key = `${module.id}:${index}`;
        const revealed = Boolean(state.flashRevealed[key]);
        const isKnown = known.includes(index);
        return `
          <article class="flash-card ${revealed ? "revealed" : ""} ${isKnown ? "known" : ""}">
            <h3>${escapeHtml(card.front)}</h3>
            <p class="flash-answer">${escapeHtml(card.back)}</p>
            <div class="flash-actions">
              <button class="small-button" type="button" aria-expanded="${revealed}" data-reveal-card="${index}">${revealed ? "Cacher" : "Révéler"}</button>
              <button class="small-button primary" type="button" data-known-card="${index}">${isKnown ? "Sue" : "Je sais"}</button>
            </div>
          </article>
        `;
    }).join("")}
    </section>
  `;
}
function startExam(push = true) {
    if (push && state.view !== "exam") {
        pushNavigation();
    }
    const pool = getTrackModules().flatMap((module) => module.quiz.map((question) => ({ ...question, moduleId: module.id, moduleTitle: module.title })));
    state.exam = {
        questions: shuffle(pool).slice(0, Math.min(20, pool.length)),
        answers: {},
        finished: false,
        startedAt: Date.now(),
        durationSeconds: 20 * 60
    };
    state.view = "exam";
    render();
}
function renderExam() {
    if (!state.exam) {
        startExam(false);
        return "";
    }
    const exam = state.exam;
    const total = exam.questions.length;
    const answered = Object.keys(exam.answers).length;
    const score = exam.finished ? scoreExam(exam) : 0;
    return `
    <section class="exam-panel">
      <div class="exam-header">
        <div>
          <p class="eyebrow">Questions mélangées</p>
          <h2>Examen blanc PowerShell 122</h2>
          <p>${answered}/${total} réponses sélectionnées${exam.finished ? ` · score: ${score}/${total}` : ""}</p>
        </div>
        <div class="exam-timer" id="examTimer">${exam.finished ? "Terminé" : formatTime(timeLeft(exam))}</div>
      </div>
      <div class="exam-actions">
        <button class="small-button primary" type="button" data-finish-exam>${exam.finished ? "Voir le score" : "Terminer et corriger"}</button>
        <button class="small-button" type="button" data-new-exam>Nouveau tirage</button>
      </div>
    </section>
    <section class="exam-question-list">
      ${exam.questions.map((question, index) => renderExamQuestion(question, index, exam.answers[index], exam.finished)).join("")}
    </section>
    ${exam.finished ? renderExamResult(exam, score) : ""}
  `;
}
function renderExamQuestion(question, index, selected, finished) {
    return `
    <article class="question-card">
      <p class="eyebrow">${escapeHtml(question.moduleTitle)}</p>
      <h3>${index + 1}. ${escapeHtml(question.q)}</h3>
      <div class="choice-list" role="group" aria-label="Réponses">
        ${question.choices.map((choice, choiceIndex) => {
        const status = finished && choiceIndex === question.answer ? "correct" : finished && selected === choiceIndex && selected !== question.answer ? "wrong" : "";
        return `
            <button class="choice-button ${selected === choiceIndex ? "selected" : ""} ${status}" type="button" aria-pressed="${selected === choiceIndex}" data-exam-choice="${choiceIndex}" data-exam-question="${index}">
              ${escapeHtml(choice)}
            </button>
          `;
    }).join("")}
      </div>
      ${finished ? `<p class="feedback" role="status">${escapeHtml(question.why)}</p>` : ""}
    </article>
  `;
}
function examBreakdown(exam) {
    const byModule = {};
    exam.questions.forEach((question, index) => {
        const module = getModule(question.moduleId);
        byModule[module.id] = byModule[module.id] || { module, total: 0, correct: 0 };
        byModule[module.id].total += 1;
        if (exam.answers[index] === question.answer) {
            byModule[module.id].correct += 1;
        }
    });
    return Object.values(byModule).sort((a, b) => {
        const ratioA = a.correct / a.total;
        const ratioB = b.correct / b.total;
        return ratioA - ratioB;
    });
}
function renderExamBreakdown(exam) {
    const rows = examBreakdown(exam);
    return `
    <div class="breakdown-list">
      ${rows.map((row) => {
        const percent = Math.round((row.correct / row.total) * 100);
        const wrong = row.total - row.correct;
        return `
          <button class="breakdown-item" type="button" data-start-module="${row.module.id}" style="--module-color:${row.module.color}">
            <span class="module-icon" aria-hidden="true">${row.module.icon}</span>
            <span class="breakdown-copy">
              <strong>${escapeHtml(row.module.title)}</strong>
              <span>${row.correct}/${row.total} juste${wrong ? ` · ${wrong} à revoir` : ""}</span>
              <span class="progress-track" aria-hidden="true"><span style="width:${percent}%"></span></span>
            </span>
            <span class="review-percent">${percent}%</span>
          </button>
        `;
    }).join("")}
    </div>
  `;
}
function renderExamResult(exam, score) {
    const percent = Math.round((score / exam.questions.length) * 100);
    return `
    <section class="study-panel">
      <h2>Bilan</h2>
      <p role="status" class="${percent >= 75 ? "feedback ok" : "feedback bad"}">Score: ${score}/${exam.questions.length} (${percent}%). ${percent >= 75 ? "Tu es dans une bonne zone. Termine par les exercices écrits." : "Reprends les modules les plus faibles, puis relance un examen."}</p>
      ${renderExamBreakdown(exam)}
    </section>
  `;
}
function scoreExam(exam) {
    return exam.questions.reduce((score, question, index) => score + (exam.answers[index] === question.answer ? 1 : 0), 0);
}
function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
}
function timeLeft(exam) {
    const elapsed = Math.floor((Date.now() - exam.startedAt) / 1000);
    return Math.max(0, exam.durationSeconds - elapsed);
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}
function openTrack(trackId, push = true) {
    if (!isTrackAvailable(trackId)) {
        showHome(push);
        return;
    }
    const nextView = "dashboard";
    if (push && (state.view !== nextView || state.selectedTrack !== trackId)) {
        pushNavigation();
    }
    state.selectedTrack = trackId;
    if (!trackHasModule(trackId, state.current)) {
        state.current = getFirstModuleId(trackId);
    }
    state.view = nextView;
    state.search = "";
    state.exam = null;
    progress.lastTrack = trackId;
    progress.lastModule = state.current;
    saveProgress();
    render();
}
function openModule(moduleId, push = true) {
    const trackId = getTrackForModule(moduleId);
    if (!isTrackAvailable(trackId)) {
        showHome(push);
        return;
    }
    if (push && (state.view !== "module" || state.current !== moduleId)) {
        pushNavigation();
    }
    state.selectedTrack = trackId;
    state.current = moduleId;
    state.view = "module";
    state.tab = state.tab || "fiche";
    progress.lastTrack = state.selectedTrack;
    progress.lastModule = moduleId;
    saveProgress();
    render();
}
qs("#dashboardBtn").addEventListener("click", () => {
    showDashboard();
    closeTopMenu();
});
qs("#topMenuBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleTopMenu();
});
qs("#sidebarToggle").addEventListener("click", () => {
    handleSidebarToggle();
});
qs("#sidebarOpenBtn").addEventListener("click", () => {
    openMobileSidebar();
});
qs("#sidebarBackdrop").addEventListener("click", () => {
    closeMobileSidebar();
});
qs("#homeBtn").addEventListener("click", () => {
    showHome();
    closeTopMenu();
});
qs("#backBtn").addEventListener("click", () => {
    goBack();
    closeTopMenu();
});
qs("#themeBtn").addEventListener("click", () => {
    toggleTheme();
    closeTopMenu();
});
qs("#examBtn").addEventListener("click", () => {
    startExam();
    closeTopMenu();
});
qs("#searchInput").addEventListener("input", (event) => {
    if (state.view !== "dashboard") {
        pushNavigation();
    }
    state.search = event.currentTarget.value;
    state.view = "dashboard";
    render();
});
qs("#moduleSelect").addEventListener("change", (event) => {
    openModule(event.currentTarget.value);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeTopMenu();
        closeMobileSidebar();
    }
});
window.addEventListener("resize", () => {
    applySidebarState();
});
document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target && !target.closest("#topMenu")) {
        closeTopMenu();
    }
});
document.addEventListener("input", (event) => {
    const target = event.target instanceof HTMLTextAreaElement ? event.target : null;
    const noteModule = target?.dataset.noteModule;
    if (noteModule) {
        progress.notes[noteModule] = target.value;
        saveProgress();
        return;
    }
    const key = target?.dataset.labInput;
    if (key) {
        state.labAnswers[key] = target.value;
    }
});
document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("button");
    if (!button)
        return;
    if (button.dataset.home !== undefined) {
        showHome();
        return;
    }
    if (button.dataset.track && isTrackId(button.dataset.track)) {
        openTrack(button.dataset.track);
        button.closest(".track-menu")?.removeAttribute("open");
        closeMobileSidebar();
        closeTopMenu();
        return;
    }
    if (button.dataset.module) {
        openModule(button.dataset.module);
        closeMobileSidebar();
        return;
    }
    if (button.dataset.startModule) {
        if (button.dataset.startTab && isTabName(button.dataset.startTab)) {
            state.tab = button.dataset.startTab;
        }
        openModule(button.dataset.startModule);
        closeMobileSidebar();
        return;
    }
    if (button.dataset.startExam !== undefined) {
        startExam();
        return;
    }
    if (button.dataset.resetProgress !== undefined) {
        if (confirm("Réinitialiser toute la progression locale ?")) {
            progress = { quizzes: {}, labs: {}, flashcards: {}, notes: {}, examBest: null, lastTrack: "122", lastModule: "bases" };
            state.selectedTrack = "122";
            state.current = "bases";
            state.history = [];
            state.quizAnswers = {};
            state.quizChecked = {};
            state.labFeedback = {};
            state.flashRevealed = {};
            saveProgress();
            render();
        }
        return;
    }
    if (button.dataset.tab) {
        if (isTabName(button.dataset.tab)) {
            state.tab = button.dataset.tab;
        }
        render();
        return;
    }
    if (button.dataset.choice !== undefined) {
        const moduleId = button.dataset.quizModule;
        const questionIndex = Number(button.dataset.question);
        const choiceIndex = Number(button.dataset.choice);
        if (!moduleId)
            return;
        state.quizAnswers[moduleId] = state.quizAnswers[moduleId] || {};
        state.quizAnswers[moduleId][questionIndex] = choiceIndex;
        state.quizChecked[moduleId] = false;
        render();
        return;
    }
    if (button.dataset.checkQuiz !== undefined) {
        const module = getModule();
        const answers = state.quizAnswers[module.id] || {};
        state.quizChecked[module.id] = true;
        const score = scoreQuiz(module, answers);
        const previous = progress.quizzes[module.id]?.score || 0;
        progress.quizzes[module.id] = { score: Math.max(previous, score), date: new Date().toISOString() };
        saveProgress();
        render();
        return;
    }
    if (button.dataset.retryQuiz !== undefined) {
        const module = getModule();
        state.quizAnswers[module.id] = {};
        state.quizChecked[module.id] = false;
        render();
        return;
    }
    if (button.dataset.checkLab !== undefined) {
        const module = getModule();
        const index = Number(button.dataset.checkLab);
        const key = `${module.id}:${index}`;
        const lab = module.labs[index];
        const answer = state.labAnswers[key] || document.querySelector(`#lab-${module.id}-${index}`)?.value || "";
        const feedback = validateLabAnswer(lab, answer);
        state.labFeedback[key] = feedback;
        if (feedback.ok) {
            const done = new Set(getLabDone(module.id));
            done.add(index);
            progress.labs[module.id] = [...done].sort((a, b) => a - b);
            saveProgress();
        }
        render();
        return;
    }
    if (button.dataset.showSolution !== undefined) {
        const module = getModule();
        const key = `${module.id}:${button.dataset.showSolution}`;
        state.solutionVisible[key] = !state.solutionVisible[key];
        render();
        return;
    }
    if (button.dataset.clearLab !== undefined) {
        const module = getModule();
        const key = `${module.id}:${button.dataset.clearLab}`;
        state.labAnswers[key] = "";
        delete state.labFeedback[key];
        render();
        return;
    }
    if (button.dataset.revealCard !== undefined) {
        const module = getModule();
        const key = `${module.id}:${button.dataset.revealCard}`;
        state.flashRevealed[key] = !state.flashRevealed[key];
        render();
        return;
    }
    if (button.dataset.knownCard !== undefined) {
        const module = getModule();
        const index = Number(button.dataset.knownCard);
        const known = new Set(getFlashKnown(module.id));
        known.add(index);
        progress.flashcards[module.id] = [...known].sort((a, b) => a - b);
        saveProgress();
        render();
        return;
    }
    if (button.dataset.examChoice !== undefined && state.exam && !state.exam.finished) {
        state.exam.answers[Number(button.dataset.examQuestion)] = Number(button.dataset.examChoice);
        render();
        return;
    }
    if (button.dataset.finishExam !== undefined && state.exam) {
        state.exam.finished = true;
        const score = scoreExam(state.exam);
        if (!progress.examBest || score > progress.examBest.score) {
            progress.examBest = { score, total: state.exam.questions.length, date: new Date().toISOString() };
            saveProgress();
        }
        render();
        return;
    }
    if (button.dataset.newExam !== undefined) {
        startExam(false);
    }
});
setInterval(() => {
    if (state.view !== "exam" || !state.exam || state.exam.finished)
        return;
    const left = timeLeft(state.exam);
    const timer = document.querySelector("#examTimer");
    if (timer)
        timer.textContent = formatTime(left);
    if (left === 0) {
        state.exam.finished = true;
        const score = scoreExam(state.exam);
        if (!progress.examBest || score > progress.examBest.score) {
            progress.examBest = { score, total: state.exam.questions.length, date: new Date().toISOString() };
            saveProgress();
        }
        render();
    }
}, 1000);
state.selectedTrack = isTrackAvailable(progress.lastTrack) ? progress.lastTrack : "122";
state.current = trackHasModule(state.selectedTrack, progress.lastModule) ? progress.lastModule : getFirstModuleId(state.selectedTrack);
render();
