import { getCurrentUser } from "../api/auth";

export async function userLoader() {
  return getCurrentUser();
}
