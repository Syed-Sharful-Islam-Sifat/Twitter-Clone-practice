export const getServerSidePros = async (context)=>{
    const res = await fetch('/api/posts');

    const data = await res.json();
    console.log('data',data)

}
const PostFeed = ({props}) => {

    console.log(props)

  return (
    <div>PostFeed</div>
  )
}

export default PostFeed