async function getProducts() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const result = await response.json();

        displayProducts(result.data);
    } catch (error) {
        console.error("Error fetching products:", error);
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
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

getProducts();
