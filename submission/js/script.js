// Pricing plans data — each object needs a "name" property
const pricingPlans = [
  {
    name: "Economy",
    price: "$599",
    features: ["Limited photos (upto 60,000)", "Location: Studio (at the company)", "No editing"]
  },
  {
    name: "Premium",
    price: "$1199",
    features: ["Unlimited photos", "Location is provided", "Editing is provided"]
  },
  {
    name: "Diamond",
    price: "$999",
    features: ["Unlimited photos", "Location is not provided", "Editing is provided"]
  }
];

// Find the empty container in the HTML
const pricingContainer = document.getElementById("pricing-container");

// Loop through each plan and build its HTML
pricingPlans.forEach((plan) => {
  const planDiv = document.createElement("div");
  planDiv.className = "plan " + plan.name.toLowerCase();

  // Build the list of features as HTML
  let featuresHTML = "";
  plan.features.forEach((feature) => {
    featuresHTML += `<li>${feature}</li>`;
  });

  planDiv.innerHTML = `
    <h3>${plan.name}</h3>
    <ul>${featuresHTML}</ul>
    <div class="price">
      <input type="radio" name="plan" id="${plan.name.toLowerCase()}" value="${plan.name.toLowerCase()}">
      <label for="${plan.name.toLowerCase()}">${plan.price}</label>
    </div>
  `;

  pricingContainer.appendChild(planDiv);
});

// Feature 2: Wishlist add & remove
const wishlistInput = document.getElementById("wishlist-input");
const wishlistAddBtn = document.getElementById("wishlist-add-btn");
const wishlistList = document.getElementById("wishlist-list");

wishlistAddBtn.addEventListener("click", () => {
  const text = wishlistInput.value.trim();

  if (text === "") {
    return; // don't add empty entries
  }

  // Create the new list item
  const li = document.createElement("li");
  li.textContent = text;

  // Create its remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";

  removeBtn.addEventListener("click", () => {
    li.remove();
  });

  // Put the remove button inside the list item, then add the item to the list
  li.appendChild(removeBtn);
  wishlistList.appendChild(li);

  // Clear the input box for the next entry
  wishlistInput.value = "";
});

// Feature 3: Booking form validation
const bookingForm = document.getElementById("booking-form");
const bookingFeedback = document.getElementById("booking-feedback");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();
  const planSelected = document.querySelector('input[name="booking-plan"]:checked');
  const termsChecked = document.getElementById("terms").checked;

  // Basic validation checks
  if (nameValue === "") {
    bookingFeedback.textContent = "Please enter your full name.";
    bookingFeedback.style.color = "red";
    return;
  }

  if (emailValue === "" || !emailValue.includes("@")) {
    bookingFeedback.textContent = "Please enter a valid email address.";
    bookingFeedback.style.color = "red";
    return;
  }

  if (!planSelected) {
    bookingFeedback.textContent = "Please select a plan before booking.";
    bookingFeedback.style.color = "red";
    return;
  }

  if (!termsChecked) {
    bookingFeedback.textContent = "You must agree to the terms and conditions.";
    bookingFeedback.style.color = "red";
    return;
  }

  // If everything passed
  bookingFeedback.textContent = `Thanks, ${nameValue}! Your ${planSelected.value} session request has been received. We'll contact you at ${emailValue}.`;
  bookingFeedback.style.color = "green";

  bookingForm.reset(); // clear the form after successful submit
});
// Feature 4: Remember selected plan using localStorage
const planRadios = document.querySelectorAll('input[name="booking-plan"]');

// On page load: check if a plan was saved, and re-select it
const savedPlan = localStorage.getItem("selectedPlan");
if (savedPlan) {
  const matchingRadio = document.querySelector(`input[name="booking-plan"][value="${savedPlan}"]`);
  if (matchingRadio) {
    matchingRadio.checked = true;
  }
}

// Whenever the user picks a plan, save it
planRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    localStorage.setItem("selectedPlan", radio.value);
  });
});
// Feature 5: Click-to-reveal banner caption
const bannerImg = document.getElementById("banner-img");
const bannerCaption = document.getElementById("banner-caption");

bannerImg.addEventListener("click", () => {
  bannerCaption.classList.toggle("hidden");
});