/**
 * Sorts an array of objects (each with a `createdAt` date field)
 * from newest to oldest
 *
 * @param array
 * @returns new array sorted in descending order by 'createdAt' date
 */
export function sortByNewest<T extends { createdAt: string }>(array: T[]): T[] {
  // creates a new copy of the array to avoid changing orginal array
  return [...array].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}
