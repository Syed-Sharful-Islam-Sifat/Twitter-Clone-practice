export async function getUserAction(session){
    const res = await fetch(`/api/users/${session.id}`);
    return res;
}