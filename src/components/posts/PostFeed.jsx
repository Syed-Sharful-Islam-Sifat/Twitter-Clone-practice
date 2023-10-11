const PostFeed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
    console.log("useEffect ran");
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const updatedPosts = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleEdit = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === updatedPost._id) return updatedPost;
        return post;
      })
    );
  };

  const handleDelete = (deletedPost) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => {
        if (post?._id !== deletedPost?._id) return post;
      })
    );
  };
}

export default PostFeed