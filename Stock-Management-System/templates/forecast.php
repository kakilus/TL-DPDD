<?php
// Coordinates for example
$latitude = 40.7128;
$longitude = -74.0060;

$apiUrl = "https://api.open-meteo.com/v1/forecast?latitude={$latitude}&longitude={$longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto";
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

$weatherIcons = [
    0 => "clear.png",
    1 => "clear.png",
    2 => "cloudy.png",
    3 => "cloudy.png",
    45 => "fog.png",
    48 => "fog.png",
    51 => "rain.png",
    53 => "rain.png",
    55 => "rain.png",
    61 => "rain.png",
    63 => "rain.png",
    65 => "rain.png",
    71 => "snow_thunder.png",
    73 => "snow_thunder.png",
    75 => "snow_thunder.png",
    95 => "snow_thunder.png",
    96 => "snow_thunder.png",
    99 => "snow_thunder.png"
];

$dates = $data['daily']['time'];
$maxTemps = $data['daily']['temperature_2m_max'];
$minTemps = $data['daily']['temperature_2m_min'];
$codes = $data['daily']['weathercode'];
?>




<?php
for ($i = 0; $i < count($dates); $i++) {
    $date = date("D, M j", strtotime($dates[$i]));
    $max = round($maxTemps[$i]);
    $min = round($minTemps[$i]);
    $code = $codes[$i];
    $icon = isset($weatherIcons[$code]) ? $weatherIcons[$code] : "clear.png";
    echo "<div class='forecast'>";
    echo "<img src='../assets/images/{$icon}' alt='Weather icon'>";
    echo "<p><strong>{$date}</strong></p>";
    echo "<p>Max: {$max}°C / Min: {$min}°C</p>";
    echo "</div>";
}
?>

</body>
</html>
