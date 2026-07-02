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