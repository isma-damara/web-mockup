import data from "./gov-content.json";

export type GovContent = typeof data;

export async function getGovContent(): Promise<GovContent> {
  return data;
}
