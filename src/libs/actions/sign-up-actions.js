export default async function registerApi(formData){
    const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log('response',response.status);
      return response;
}