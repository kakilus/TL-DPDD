
<?php
$pageTitle = 'Browse - PokéViewer';
include __DIR__ . '/templates/header.php';
?>
<section>
    <div class="controls">
        <button id="prevBtn" class="btn" disabled>Prev</button>
        <button id="nextBtn" class="btn">Next</button>
    </div>

    <div id="pokemonGrid" class="grid"></div>
</section>
<?php include __DIR__ . '/templates/footer.php'; ?>