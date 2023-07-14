import { baseUrl } from "../../src/components/home";


export default async function handler(req: { body: {mp: any; auth: any; uId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    const { mp, auth, uId } = req.body;
    const {username, password} = auth

    try {
        const response = await fetch(`${baseUrl}users/update/${uId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            },
            body: JSON.stringify({ mp }), 
           });
              const data = await response.json();
   console.log('====================================');
   console.log(res.status(200).json(data), 'updateprofile page');
   console.log('====================================');        
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
}