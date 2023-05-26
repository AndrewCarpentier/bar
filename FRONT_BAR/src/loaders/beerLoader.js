import { getAllBeers } from '../apis/datas';

export async function beerLoader() {
    return getAllBeers();
}