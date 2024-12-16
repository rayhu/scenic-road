import * as Location from "expo-location";

/**
 * Determines if two locations are almost the same based on a given threshold.
 * @param loc1 - The first location object.
 * @param loc2 - The second location object.
 * @param threshold - The threshold for considering locations as the same.
 * @returns True if the locations are almost the same, false otherwise.
 */
export const areLocationsAlmostSame = (
  loc1: Location.LocationObject | null,
  loc2: Location.LocationObject | null,
  threshold: number = 0.0002,
): boolean => {
  if (!loc1 || !loc2) return false;

  const latDiff = Math.abs(loc1.coords.latitude - loc2.coords.latitude);
  const lonDiff = Math.abs(loc1.coords.longitude - loc2.coords.longitude);

  return latDiff < threshold && lonDiff < threshold;
};
