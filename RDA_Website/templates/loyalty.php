<?php
function loyaltyButton($tier) {
    if (isset($_SESSION['username'])) {
        echo '<button class="btn primary join-tier" data-tier="'.$tier.'">Join '.$tier.'</button>';
    } else {
        // Open login modal instead of linking to login.php
        echo '<button class="btn primary" data-modal-target="#loginModal">Login to Join</button>';
    }
}
?>


<section id="loyalty" class="loyalty-section">
    <div class="container">
        <h2>Join Our Loyalty Program</h2>
        <div class="loyalty-grid">

            <div class="loyalty-card bronze">
                <div class="tier-header bronze">
                    <h3>Bronze</h3>
                    <p class="price">Free</p>
                </div>
                <ul>
                    <li>Monthly newsletter</li>
                    <li>Birthday discount</li>
                    <li>Event notifications</li>
                    <li>Member-only hours</li>
                </ul>
                <div class="loyalty-tier-display" data-tier="Bronze"></div>
            </div>

            <div class="loyalty-card silver featured">
                <div class="tier-header silver">
                    <h3>Silver</h3>
                    <p class="price">£49/year</p>
                </div>
                <ul>
                    <li>All Bronze benefits</li>
                    <li>10% gift shop discount</li>
                    <li>Free parking</li>
                    <li>Priority event registration</li>
                    <li>Quarterly behind-scenes tours</li>
                </ul>
                <div class="loyalty-tier-display" data-tier="Silver"></div>
            </div>

            <div class="loyalty-card gold">
                <div class="tier-header gold">
                    <h3>Gold</h3>
                    <p class="price">£99/year</p>
                </div>
                <ul>
                    <li>All Silver benefits</li>
                    <li>Unlimited free admission</li>
                    <li>20% gift shop discount</li>
                    <li>Exclusive member events</li>
                    <li>Guest passes (4 per year)</li>
                    <li>VIP animal encounters</li>
                </ul>
                <div class="loyalty-tier-display" data-tier="Gold"></div>
            </div>

        </div>
    </div>
</section>
