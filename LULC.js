
// Ce code a été développé dans le cadre du projet final du cours de 
// télédétection et SIG, Master 1, STPE, Hydreressource et Qualite des Milieux (HHQM)
// de L'universite Grenoble-Alpes (UGA), UFR PhITEM, le 23/04/2025
//Ce script vise à analyser l’évolution du trait de côte. 
// Il extrait la carte d’occupation du sol (LULC) à partir des données fournies 
// par l’Agence Spatiale Européenne (ESA), pour une zone située en Gironde, 
// en France, englobant Soulac-sur-Mer ainsi que les autres communes de la zone d’étude.


var roi = table;
var dataset = ee.ImageCollection("ESA/WorldCover/v200")
var lulcCollection = dataset.filterDate('2020-12-31', '2021-01-01');
print('lulcCollection:', lulcCollection);


var lulc = ee.Image(lulcCollection.first());
print('lulc image:', lulc);
var lulcClipped = lulc.clip(roi);

Map.centerObject(roi, 10);
Map.addLayer(lulcClipped, {
  min: 10,
  max: 100,
  palette: [
    '006400', // Tree cover
    'ffbb22', // Shrubland
    'ffff4c', // Grassland
    'f096ff', // Cropland
    'fa0000', // Built-up
    'b4b4b4', // Bare / sparse vegetation
    'f0f0f0', // Snow and ice
    '0064c8', // Permanent water bodies
    '0096a0', // Herbaceous wetland
    '00cf75', // Mangroves
    'fae6a0'  // Moss and lichen
  ]
}, 'ESA WorldCover 2022');


Export.image.toDrive({
  image: lulcClipped,         
  description: 'LULC_2021_ROI', 
  folder: 'GEE_Export',       
  fileNamePrefix: 'lulc_2022',
  region: roi.geometry(),     
  scale: 10,                  
  crs: 'EPSG:4326',         
  maxPixels: 1e13             
});
