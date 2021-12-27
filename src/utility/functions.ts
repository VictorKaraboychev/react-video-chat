/**
 * Creates a deep copy of an object.
 * @param object  Object to copy.
 * @returns  Deep copy of the object.
 */
export function deepCopy<T>(object: T): T  {
	return JSON.parse(JSON.stringify(object)) // converts the object to JSON and back into an object
}