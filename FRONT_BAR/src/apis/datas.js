export async function getAllBeers() {
    const response = await fetch('http://localhost:8000/getAllBeers')
    const { beers } = await response.json();
    return beers;
}