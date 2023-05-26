export async function getOneBeer(id) {
    const response = await fetch(`http://localhost:8000/getOneBeer/${id}`);
    let body = await response.json();
    return body.beer;
}