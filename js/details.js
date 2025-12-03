async function loadProductDetails() {
    const loader = document.getElementById("loader");
    const container = document.getElementById("productDetails");
    const productId = localStorage.getItem("productId");

    loader.style.display = "block";

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        const result = await response.json();
        const product = result.data;

        const sliderImages = product.images.length > 0 ? product.images : [product.imageCover];

        const sliderHtml = sliderImages.map((img, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${img}" class="d-block w-100" style="height:400px; object-fit:cover;" alt="${product.title}">
            </div>
        `).join("");

        container.innerHTML = `
            <div class="card mx-auto" style="max-width: 600px;">
                <div id="productSlider" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${sliderHtml}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productSlider" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productSlider" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>

                <div class="card-body">
                    <h3>${product.title}</h3>
                    <p class="text-success fw-bold">${product.price} EP</p>
                    <p>${product.description}</p>
                    <p>Category: ${product.category?.name || "No category"}</p>
                    <button class="btn btn-outline-success w-100">Add to cart</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error loading product:", error);
        container.innerHTML = "<p class='text-danger'>Failed to load product details.</p>";
    } finally {
        loader.style.display = "none";
    }
}

loadProductDetails();
