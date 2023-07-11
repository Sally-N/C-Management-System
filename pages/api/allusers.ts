// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseUrl } from "../../src/components/home";

// export class AllUsersURL {
//     static allUsers = `${baseUrl}users/`
// }

// export const ulogin = async ({ uname, pass }: {
//    uname: string,
//     pass: string
// }) => new Promise((resolve, reject) => {
//     axios.get(`${AllUsersURL.allUsers}`, {
//         username: uname,
//         password: pass

//     }).then((res => resolve(res.data)))
//         .catch((err) => reject(err))

// })

export default async function handler( req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }, object: any) {
 const baseUrl = "https://www.muganedev.tech/api/v1/" 
  try {
    const response = await fetch(`${baseUrl}users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${object.username}:${object.password}`)}`
      }
    });
    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status);
    }
    const data = await response.json();
    res.status(200).json(data);
    console.log('====================================');
    console.log(res.status(200).json(data), 'Loginpage');
    console.log('====================================');
  } catch (error) {
    throw new Error('Error fetching userdata');
  }
}









