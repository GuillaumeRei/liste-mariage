/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',  // Active l'export statique
  trailingSlash: true,  // Facultatif : Assure-toi que toutes les URLs se terminent par un slash
  distDir: 'out',  // Dossier de sortie pour les fichiers générés
}

module.exports = nextConfig;




