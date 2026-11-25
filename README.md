# CHD-Drapeaux-officiel

Site vitrine de fabrication et de fourniture de drapeaux au Maroc, réalisé avec React, Vite et TypeScript.

## Développement

Avec Node.js 22.12+ ou 24 et npm, depuis la racine du dépôt.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Coordonnées et réception des devis

Renseigner les coordonnées dans [src/config.ts](src/config.ts). Le numéro WhatsApp doit être au format international. Utiliser l’URL d’intégration Google Maps pour `mapsEmbedUrl`.

- Avec `quoteEndpoint`, le formulaire envoie les champs et la pièce jointe facultative via POST multipart. Lorsqu’un modèle est sélectionné depuis le catalogue, le champ `model` contient son identifiant. Pour les drapeaux internationaux, le champ multipart répété `countries` contient les codes ISO 3166-1 alpha-2. Le service doit renvoyer un statut HTTP 2xx après traitement et valider les données et fichiers côté serveur. Autoriser l’origine du site si le service est hébergé sur un autre domaine.
- Avec un numéro WhatsApp et sans service de réception, le site propose un lien vers une conversation préremplie. Le visiteur envoie ensuite lui-même son message.
- Sans canal configuré, le visiteur peut télécharger le récapitulatif de sa demande.

## Publication

Déployer le dossier `dist/` sur l’hébergement statique. À la configuration du domaine public, renseigner l’URL canonique et l’URL absolue de l’image Open Graph dans `index.html`. Les images sont des illustrations et peuvent être remplacées par des photos de réalisations vérifiées.
