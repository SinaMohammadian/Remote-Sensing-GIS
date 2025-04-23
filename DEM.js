
// Ce code a été développé dans le cadre du projet final du cours de 
// télédétection et SIG, Master 1, STPE, Hydreressource et Qualite des Milieux (HHQM)
// de L'universite Grenoble-Alpes (UGA), UFR PhITEM, le 23/04/2025
//Ce script permet d’étudier l’évolution du trait de côte. 
// Il extrait le Modèle Numérique de Terrain (MNT)(DEM) à partir des données SRTM 
// pour une zone située en Gironde, en France, incluant Soulac-sur-Mer et les autres communes de la zone d’étude.

var roi = table
Map.centerObject(roi);

var srtm = image.select('elevation');
Map.addLayer(srtm.clip(roi),[],'dem30',false)
print(ui.Chart.image.histogram(srtm,roi,100))
  
var slope = ee.Terrain.slope(srtm);
Map.addLayer(slope.clip(roi),[],'slope', false);

var aspect = ee.Terrain.aspect(srtm);
Map.addLayer(aspect.clip(roi),[],'aspect',false);

var product = ee.Terrain.products(srtm);
print(product);

Export.image.toDrive({
  image: product.clip(roi).float(),
  description: 'dem_product',
  scale: 30,
  region: roi,
  crs: product.getInfo().crs,
  folder: 'dem',
  maxPixels: 1e13
  })

