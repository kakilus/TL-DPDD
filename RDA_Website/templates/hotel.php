<!-- This is the hotel section of the website, showcasing accommodation options for visitors. -->

<section id="hotel" class="hotel-section">
    <div class="container">
        <h2>Stay Close to the Action</h2>
        <div class="hotel-grid">
            <!-- This is the hotel card for the safari lodge -->
            <div class="hotel-card">
                <div style="position:relative;">
                    <img src="assets/img/hotel-safari-lodge.jpg" alt="Safari Lodge">
                    <span style="position:absolute;top:8px;right:8px;background:#32702A;color:white;padding:6px 12px;border-radius:6px;font-weight:bold;font-size:0.9rem;">£99/night</span>
                </div>
                <h3>Safari Lodge</h3>
                <p>Luxury accommodations with views of the African savanna exhibits.</p>
                <p class="amenities">Pool, Restaurant, Spa</p>
                <button class="btn primary" data-modal-target="#bookingModal" data-hotel="Safari Lodge" data-price="99">Book Now</button>
            </div>
            <!-- This is the hotel card for the rainforest retreat -->
            <div class="hotel-card">
                <div style="position:relative;">
                    <img src="assets/img/hotel-rainforest-retreat.jpg" alt="Rainforest Retreat">
                    <span style="position:absolute;top:8px;right:8px;background:#32702A;color:white;padding:6px 12px;border-radius:6px;font-weight:bold;font-size:0.9rem;">£129/night</span>
                </div>
                <h3>Rainforest Retreat</h3>
                <p>Immersive experience surrounded by tropical gardens and exotic birds.</p>
                <p class="amenities">Breakfast Included, Gym</p>
                <button class="btn primary" data-modal-target="#bookingModal" data-hotel="Rainforest Retreat" data-price="129">Book Now</button>
            </div>
            <!-- This is the hotel card for the wildlife inn -->
            <div class="hotel-card">
                <div style="position:relative;">
                    <img src="assets/img/hotel-wildlife-inn.jpg" alt="Wildlife Inn">
                    <span style="position:absolute;top:8px;right:8px;background:#32702A;color:white;padding:6px 12px;border-radius:6px;font-weight:bold;font-size:0.9rem;">£69/night</span>
                </div>
                <h3>Wildlife Inn</h3>
                <p>Family-friendly hotel just steps from the main zoo entrance.</p>
                <p class="amenities">Free Parking, Kids Activities</p>
                <button class="btn primary" data-modal-target="#bookingModal" data-hotel="Wildlife Inn" data-price="69">Book Now</button>
            </div>
        </div>
    </div>
</section>