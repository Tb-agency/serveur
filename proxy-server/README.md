
# Serveur Proxy Brevo pour Jeu Concours

Ce serveur proxy est conçu pour résoudre le problème d'adresse IP changeante avec les fonctions Edge de Supabase lors de l'utilisation de l'API Brevo.

## Déploiement sur Railway

1. Créez un compte sur [Railway](https://railway.app/) si vous n'en avez pas déjà un
2. Dans votre tableau de bord Railway, créez un nouveau projet
3. Sélectionnez "Deploy from GitHub repo" et connectez votre dépôt
4. Si vous n'utilisez pas GitHub, vous pouvez également déployer depuis la CLI Railway
5. Une fois le projet créé, Railway détectera automatiquement le Dockerfile et l'utilisera pour le déploiement

## Après le déploiement

Une fois le serveur déployé :

1. Dans le tableau de bord Railway, accédez à l'onglet "Settings" de votre service
2. Trouvez l'URL publique générée par Railway pour votre application
3. Copiez cette URL et remplacez la valeur de `PROXY_SERVER_URL_PLACEHOLDER` dans la fonction Edge Supabase `send-submission-email` par cette URL réelle

## Variables d'environnement

Aucune variable d'environnement n'est requise sur Railway, car les clés API sont passées directement dans les en-têtes depuis la fonction Edge Supabase.

## Tests

Pour tester que tout fonctionne :

1. Visitez `[VOTRE_URL_RAILWAY]/health`
2. Vous devriez recevoir une réponse JSON `{"status":"ok"}`
