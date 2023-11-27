export  async function likeACtions() {
  const res = await fetch("http://localhost:3000/api/likes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, postId }),
  });

  return res;
}
export  async function deletePostACtions() {
  const res = await fetch("http://localhost:3000/api/likes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, postId }),
  });

  return res;
}
export  async function getLikeDataActions() {
  const res =  await fetch(`http://localhost:3000/api/likes/${postId}`);
  return res;
}
