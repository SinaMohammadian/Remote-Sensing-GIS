
// Ce code a été développé sur Google Eearth Engine dans le cadre du projet final du cours de 
// télédétection et SIG, Master 1, STPE, Hydreressource et Qualite des Milieux (HHQM)
// de L'universite Grenoble-Alpes (UGA), UFR PhITEM, le 23/04/2025
// Nous allons étudier l’évolution du trait de côte à l’aide d’approches 
// de télédétection, notamment en utilisant l’indice NDWI, pour une zone d’étude
// située en Gironde, en France.


var roi = table;
Map.centerObject(roi);

// ==================== Landsat 5 - 07/12/2001 ====================
var l5_img = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
  .filterBounds(roi)
  .filterDate('2001-12-07', '2001-12-08')
  .first();

var scaled_l5 = l5_img.select(['SR_B2', 'SR_B4']).multiply(0.0000275).add(-0.2);
var ndwi2001 = scaled_l5.normalizedDifference(['SR_B2', 'SR_B4']).rename('NDWI').gt(0.1);
Map.addLayer(ndwi2001.clip(roi), {palette: ['white', 'blue']}, 'NDWI 2001');
print('Landsat 5 timestamp:', ee.Date(l5_img.get('system:time_start')).format('YYYY-MM-dd HH:mm:ss'));

// ==================== Landsat 9 - 27/05/2023 ====================
var l9_img = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
  .filterBounds(roi)
  .filterDate('2023-05-27', '2023-05-28')
  .first();

var scaled_l9 = l9_img.select(['SR_B3', 'SR_B5']).multiply(0.0000275).add(-0.2);
var ndwi2023 = scaled_l9.normalizedDifference(['SR_B3', 'SR_B5']).rename('NDWI').gt(0.1);
Map.addLayer(ndwi2023.clip(roi), {palette: ['white', 'cyan']}, 'NDWI 2023');
print('Landsat 9 timestamp:', ee.Date(l9_img.get('system:time_start')).format('YYYY-MM-dd HH:mm:ss'));

// ==================== Change & Export =========================================================================
var change = ndwi2001.subtract(ndwi2023);
Map.addLayer(change.clip(roi), {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'NDWI Change');

Export.image.toDrive({
  image: change.clip(roi).selfMask(), 
  description: 'NDWI_Change_2001_2023',
  folder: 'coastline_mapping',
  fileNamePrefix: 'ndwi_change_2001_2023',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});

var mask = change.updateMask(change.neq(0));
var vector = mask.reduceToVectors({
  geometry: roi,
  scale: 30,
  geometryType: 'polygon',
  maxPixels: 1e10
});
Map.addLayer(vector, {}, 'Vector of Change');

Export.table.toDrive({
  collection: vector,
  description: 'Landsat_Coastline_Change_2001_2023_specific_dates',
  fileFormat: 'SHP',
  folder: 'coastline_mapping'
});

Export.image.toDrive({
  image: ndwi2001.clip(roi).selfMask(), 
  description: 'NDWI_2001_Landsat5',
  folder: 'coastline_mapping',
  fileNamePrefix: 'ndwi_2001',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});
Export.image.toDrive({
  image: ndwi2023.clip(roi).selfMask(),
  description: 'NDWI_2023_Landsat9',
  folder: 'coastline_mapping',
  fileNamePrefix: 'ndwi_2023',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});
//=============================Avancer ou Reculer==============================
var gain = change.gt(0).selfMask(); 
var gainArea = gain.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  maxPixels: 1e10
});
print('recule de Eau (metres carres):', gainArea);


var loss = change.lt(0).selfMask(); 
var lossArea = loss.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  maxPixels: 1e10
});
print('Avancement de Eau (metres carres):', lossArea);
//=============================les images satellitaire brutes=================
var l9_sr = l9_img.select(['SR_B2', 'SR_B3', 'SR_B4']) 
                  .multiply(0.0000275).add(-0.2); // c'est pour corriger "scale reflectance"

Export.image.toDrive({
  image: l9_sr.clip(roi),
  description: 'Landsat9_SR_2023',
  folder: 'coastline_mapping',
  fileNamePrefix: 'landsat9_2023',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});

var l5_sr = l5_img.select(['SR_B1', 'SR_B2', 'SR_B3']) 
                  .multiply(0.0000275).add(-0.2); // c'est pour corriger "scale reflectance"

Export.image.toDrive({
  image: l5_sr.clip(roi),
  description: 'Landsat5_SR_2001',
  folder: 'coastline_mapping',
  fileNamePrefix: 'landsat5_2001',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});
//////////////////////////// Carte de classifiication de NDWI==========================
var change_classified = change.gt(0).multiply(1)  // Avancement de l'eau  = 1
  .add(change.lt(0).multiply(-1))                // Recule de l'eau = -1
  .rename('NDWI_Classified');


Map.addLayer(change_classified.clip(roi), {
  min: -1,
  max: 1,
  palette: ['red', 'white', 'green']
}, 'NDWI Change Classified');


Export.image.toDrive({
  image: change_classified.clip(roi),
  description: 'NDWI_Change_Classified_2001_2023',
  folder: 'coastline_mapping',
  fileNamePrefix: 'Raster_classified',
  region: roi,
  scale: 30,
  maxPixels: 1e10
});

