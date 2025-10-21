<link rel="stylesheet" href="assets/css/viewBox.css">

<?php
$boxes = [
    'info1' => 'Sample title 1',
    'info2' => 'Sample title 2',
    'info3' => 'Sample title 3',
    'info4' => 'Sample title 4'
];

foreach ($boxes as $id => $text): ?>
  <div id="<?= $id ?>" class="viewBox">
    <p class="title"><?= $text ?></p>
  </div>
<?php endforeach; ?>
