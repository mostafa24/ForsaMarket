# ForsaMarket

**ForsaMarket** est une application web interne de gestion de commandes pour projets E-commerce.
Le but est de couvrir tout le cycle de vie de la commande: de la réception à la livraison en passant par la confirmation et les rapports statistiques.

---

## 📄 Objectifs du projet
- Gérer les commandes reçues depuis un site e-commerce
- Permettre la confirmation des commandes par un agent
- Envoyer les commandes confirmées à une société de livraison via API
- Suivre les états de livraison
- Visualiser des statistiques de vente

---

## 🧰 Technologies utilisées

### Frontend:
- React.js + Vite
- Tailwind CSS
- Recharts
- React Icons
- XLSX (import de fichiers Excel/CSV)

### Backend:
- Node.js (Express)
- PostgreSQL

### Autres:
- GitHub (repo public)
- Supabase (optionnel pour l'hébergement PostgreSQL)

---

## 🛋️ Fonctionnalités disponibles

### 1. **Dashboard**
- Sidebar + Topbar responsive
- Kpis: Total commandes, Confirmées, En attente, Total ventes
- Graphiques: ventes 7 jours, produits les plus vendus

### 2. **OrdersPage**
- Import de commandes via CSV / Excel
- Tableau dynamique avec:
  - Filtrage par ville / état
  - Recherche rapide par nom ou tél
  - Modification directe des données (inline editing)

---

## 💡 Prochaines étapes
- [ ] Enregistrer les commandes dans la base de données
- [ ] API Backend: `GET /orders`, `POST /orders`
- [ ] Page de confirmation des commandes (ConfirmationPage)
- [ ] Intégration API société de livraison (ex: OzonExpress)
- [ ] Ajout de système de login/admin/agent
- [ ] Exportation PDF / Excel des rapports

---

## 🌐 Lien du projet GitHub
[https://github.com/mostafa24/ForsaMarket](https://github.com/mostafa24/ForsaMarket)

---

## ✅ Auteur
Projet développé avec accompagnement de ChatGPT pour un usage e-commerce interne au Maroc.

