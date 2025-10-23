<link rel="stylesheet" href="assets/css/viewBox.css">

<?php
$images = ['img1', 'img2', 'img3', 'img4'];
$boxes = [
    'info1' => 'Clear Weather',
    'info2' => 'Cloudy Weather',
    'info3' => 'Foggy Weather',
    'info4' => 'Rainy Weather',
];

$i = 0;
foreach ($boxes as $id => $text): ?>
  <div id="<?= $id ?>" class="viewBox <?= $images[$i % count($images)] ?>">
    <p class="title"><?= $text ?></p>
  </div>
<?php
  $i++;
endforeach;
?>
