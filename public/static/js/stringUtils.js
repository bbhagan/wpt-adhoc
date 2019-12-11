/**
 * Creates a positive 32bit integer hash of a string
 *
 * @param {string} string -- String to hash
 *
 * @returns {number}
 */
export const hashCode = string => {
	var hash = 0,
		char;
	if (string.length == 0) return hash;
	for (var i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = Math.abs(hash & hash); // Convert to 32bit integer
	}
	return hash;
};
