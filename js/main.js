async function getProducts() {
    const loader = document.getElementById("loader");
    const container = document.getElementById("productsContainer");

    // Show loader before fetching
    loader.style.display = "block";
    container.innerHTML = ""; // clear container while loading

    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const result = await response.json();

        displayProducts(result.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        container.innerHTML = "<p class='text-danger'>Failed to load products.</p>";
    } finally {
        // Hide loader after fetching
        loader.style.display = "none";
    }
}

function displayProducts(products) {
    const container = document.getElementById("productsContainer");
    let html = "";

    products.forEach(product => {
        html += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100">
                <img src="${product.imageCover}" class="card-img-top img-fluid" alt="${product.title}">
                <div class="card-body">
                    <p class="fw-bold text-success mb-2">${product.category.name}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0">${product.price} EP</p>
                        <i class="fa-solid fa-star text-warning"></i>
                    </div>
                    <div class="d-flex justify-content-start mt-2">
                        <button class="btn view-btn mt-auto btn-outline-success" onclick="viewDetails('${product._id}', this)">
                        View 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

function viewDetails(productId, btn) {
    localStorage.setItem("productId", productId);
    // Show loader when going to details page
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    btn.style.backgroundColor = "#28a745";
    btn.style.color = "#ffffff";

    setTimeout(() => {
        window.location.href = "Details.html";
    }, 300);
}

getProducts();

const slider = document.getElementById("categoriesSlider");
async function loadCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const data = await res.json();

  slider.innerHTML = data.data.map(cat => `
    <div class="category-card">
      <img src="${cat.image}" alt="${cat.name}">
      <h6>${cat.name}</h6>
    </div>
  `).join("");

  startAutoSlide(); //start auto sliding after loading categories
}



loadCategories();
function startAutoSlide() {
  const step = 240; // disply width of one category card
  const delay = 5000; // 5 seconds interval

  setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0; // reset to start
    } else {
      slider.scrollLeft += step;
    }
  }, delay);
}

