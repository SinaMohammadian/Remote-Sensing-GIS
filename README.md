# 🛰️ Remote-Sensing-GIS – Étude du Trait de Côte en Gironde, France

Ce projet a été réalisé dans le cadre du cours de **Télédétection et Systèmes d’Information Géographique (SIG)**. Il a pour objectif l’analyse spatio-temporelle de l’évolution du trait de côte dans une région côtière de la **Gironde**, en France, en utilisant des techniques de télédétection sur Google Earth Engine et QGIS.

## 🌍 Zone d'étude
La zone d’étude comprend **Soulac-sur-Mer** et les autres communes voisines du littoral atlantique girondin.

---

## 🗂️ Structure du projet

### 1. `coastline_change.js`
Ce script permet de :
- Suivre l’évolution du **trait de côte**.
- Utiliser l’indice NDWI (*Normalized Difference Water Index*) pour la **détection des zones aquatiques**.
- Réaliser une **analyse temporelle** des changements de la ligne côtière.

### 2. `DEM.js`
Ce script permet de :
- Extraire le **Modèle Numérique de Terrain (MNT/DEM)** à partir des données **SRTM**.
- Calculer la **pente** pour identifier les zones sujettes à l’érosion ou à l’accumulation.

### 3. `LULC.js`
Ce script permet de :
- Générer une carte d’**occupation du sol (LULC)**.
- Classifier les types de surfaces à partir des données de **ESA (European Space Agency)**.
- Produire une **carte thématique** de la zone d’étude.

### 4. `Analyse_Resultat.ipynb`
Ce notebook Python permet de :
- Tracer les **diagrammes comparatifs** des zones selon leur **vulnérabilité côtière**.
- Visualiser l’évolution de l’**Altitude Dynamique Moyenne (ADT)** en fonction du temps pour choisir la **meilleure date d’analyse**.
- Appuyer les interprétations avec des graphiques clairs et structurés.

---

## 🛠️ Technologies utilisées

- Google Earth Engine (GEE)
- Données SRTM (NASA)
- Produits ESA WorldCover
- JavaScript (API GEE)
- QGIS (pour la visualisation complémentaire)
- Python & Jupyter Notebook (matplotlib, pandas, etc.)

---

## 📚 Auteur

Ce projet a été réalisé par **Sina Mohammadian** dans le cadre du module académique de M1 Hydroressources – Université Grenoble Alpes.

---

## 📌 Données

Les **scripts GEE** et le notebook Python sont accessibles publiquement à l’adresse suivante :  
👉 [https://github.com/SinaMohammadian/Remote-Sensing-GIS](https://github.com/SinaMohammadian/Remote-Sensing-GIS)

---

## 📌 Remarque

Les résultats générés sont destinés à des fins académiques et illustrent le potentiel des outils de télédétection pour le suivi environnemental du littoral.

