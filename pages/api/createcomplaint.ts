import { json } from "stream/consumers";

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; },
    object: any) {

    const baseUrl = "https://www.muganedev.tech/api/v1/";
    const { complaint, userId, comment, title, description, image, status, password, username } = req.body;
    try {
        const response = await fetch(`${baseUrl}comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            },
            body: JSON.stringify({ complaint, userId, comment, title, description, image, status, })
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