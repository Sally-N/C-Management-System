export default async function handler(
req : {params:  any, body: any},
  res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }
) {
  const baseUrl = "https://www.muganedev.tech/api/v1/";
  const auth = req.params;
  // const {username, password} = req.params
  // console.log(auth, 'params');
  const {fd} = req.body
  console.log(req);
    try {
      const response = await fetch(`${baseUrl}complaints/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`
        },
        body: fd
      });
      if (!response.ok) {
        throw new Error('Request failed with status code ' + response.status);
      }
      const data = await response.json();
      console.log('====================================');
      console.log(data, 'PostComplaint');
      console.log('====================================');
      return res.status(200).json(data);
    } catch (error) {
      console.log('====================================');
      console.log('Error creating new complaint', error);
      console.log('====================================');
    }
  
}
  