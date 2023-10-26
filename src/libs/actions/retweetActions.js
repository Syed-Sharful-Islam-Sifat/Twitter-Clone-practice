export async function retweet(postId,ownername){
    
    console.log('postId---->',postId)
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`)

    const post = await response.json();
    console.log('on retweet actions......',post)
    const name = ownername;
    const text = post.text
    const image = post.image;
    const contentType= 'post'
    const retweetId = post.userId;

    const res = await fetch(`http://localhost:3000/api/posts`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
            name ,contentType, text , image ,retweetId
        }),

      })

      const data = await res.json();
      console.log('data on retweet actions',data);

      return data;
 }

