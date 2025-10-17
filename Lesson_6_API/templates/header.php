
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title><?= $pageTitle ?? 'PokéViewer' ?></title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <script defer src="assets/js/app.js"></script>
</head>
<body>
<header class="site-header">
    <h1><a href="index.php">PokéViewer</a></h1>
    <nav>
        <a href="index.php">Home</a>
        <a href="list.php">Browse</a>
    </nav>

    
    <form id="searchForm" action="pokemon.php" method="get" class="search-form" onsubmit="">
        <input id="searchInput" name="name" type="search" placeholder="Search Pokémon by name" aria-label="Search Pokémon">
        <button type="submit" class="btn">Search</button>
    </form>
</header>
<main>