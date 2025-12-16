export const toggleWishlist = async (plantId, token) => {
  return fetch(`http://localhost:5050/api/wishlist/${plantId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
