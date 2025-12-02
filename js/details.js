async function loadProductDetails() {
    const loader = document.getElementById("loader"); // make sure you have this div in details.html
    const container = document.getElementById("productDetails");
    const productId = localStorage.getItem("productId");

    if (!productId) {
        container.innerHTML = "<p class='text-danger'>No product selected.</p>";
        return;
    }

    // Show loader while fetching
    loader.style.display = "block";
    container.innerHTML = ""; // clear previous content

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        const result = await response.json();
        const product = result.data;

        container.innerHTML = `
            <div class="card mx-auto" style="max-width: 600px;">
                <img src="${product.imageCover}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="text-success fw-bold">Price: ${product.price} EP</p>
                    <p>${product.description}</p>
                    <p>Category: ${product.category?.name || "No category"}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error loading product:", error);
        container.innerHTML = "<p class='text-danger'>Failed to load product details.</p>";
    } finally {
        // Hide loader after fetching
        loader.style.display = "none";
    }
}

loadProductDetails();
