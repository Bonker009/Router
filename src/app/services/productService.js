export async function getAllProducts() {
    const response = await fetch("https://dummyjson.com/products", {cache: "no-store"});
    return await response.json()
}

export async function getProductById(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    return await response.json()
}