
<link rel="stylesheet" href="assets/css/viewBox.css">
<div id="<?= $infoId ?? 'info1'; ?>"
     class="<?= $infoClass ?? 'viewBox'; ?>"
     onmouseover="presentInfo('<?= $infoId ?? 'info1'; ?>')"
     onmouseout="restoreInfo('<?= $infoId ?? 'info1'; ?>')">
    <?= $infoText ?? 'Sample title'; ?>
</div>

<div id="<?= $infoId ?? 'info2'; ?>"
     class="<?= $infoClass ?? 'viewBox'; ?>"
     onmouseover="presentInfo('<?= $infoId ?? 'info2'; ?>')"
     onmouseout="restoreInfo('<?= $infoId ?? 'info2'; ?>')">
    <?= $infoText ?? 'Sample title'; ?>
</div>

<div id="<?= $infoId ?? 'info3'; ?>"
     class="<?= $infoClass ?? 'viewBox'; ?>"
     onmouseover="presentInfo('<?= $infoId ?? 'info3'; ?>')"
     onmouseout="restoreInfo('<?= $infoId ?? 'info3'; ?>')">
    <?= $infoText ?? 'Sample title'; ?>
</div>

<div id="<?= $infoId ?? 'info4'; ?>"
     class="<?= $infoClass ?? 'viewBox'; ?>"
     onmouseover="presentInfo('<?= $infoId ?? 'info4'; ?>')"
     onmouseout="restoreInfo('<?= $infoId ?? 'info4'; ?>')">
    <?= $infoText ?? 'Sample title'; ?>
</div>