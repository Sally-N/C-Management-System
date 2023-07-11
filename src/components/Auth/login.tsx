"use client"
import Link from "next/link";
import React, { FormEvent, use, useContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { generateSessionToken } from "../../../utilities/sessionUtils";
import axios from "axios";
import { UserInterface, Authentication } from "../../interfaces/user";
import { AllUsersContext } from "../../context/allusers";
import { baseUrl } from "../home";
import { json } from "stream/consumers";
import { log } from "console";


const LoginComponent = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [datares, setDatares] = useState<UserInterface[]>([])

  const allUserContext = useContext(AllUsersContext)
  const handleLogin = async (formSubmit: FormEvent<HTMLFormElement>) => {
    formSubmit.preventDefault();

    const fd = new FormData(formSubmit.currentTarget);
    var object: any = {};
    fd.forEach(function (value, key) {
      object[key] = value;
    });


    console.log('====================================');
    console.log(object, 'obj');
    console.log('====================================');

    
    // console.log( `Basic ${JSON.stringify(object)}`)


  //   axios.get(`${baseUrl}users/`, {
  //     auth: object
  //   }).then(res => {
  //     console.log('allUsers', res.data);
  //     localStorage.setItem("allUsers", JSON.stringify(res.data as UserInterface[]))
  //     console.log(localStorage)
  //     allUserContext.update(res.data as UserInterface[])
  //     let filterData = (res.data as UserInterface[]).filter((user) => user.email == object.username)
  //     console.log('====================================');
  //     console.log(filterData, object,  object.username, "filterData");
  //     console.log('====================================');
  //     if (filterData.length > 0) {
  //       alert('Login successful!');
  //       let authData: Authentication = {
  //         auth: object,
  //         id: filterData[0].id,
  //         userName: filterData[0].username
  //       }
  //       localStorage.setItem('user', JSON.stringify(authData));
  //       router.push("/");
  //     } else {
  //       alert('User not found!');
  //     }
  //   }).catch(error => {
  //     console.log('allUsersError', error)
  //   })
  // }

console.log('====================================');

console.log( `Basic ${btoa(`${object.username}:${object.password}`)}`);
console.log( `Basic ${Buffer.from(`${object.username}:${object.password}`).toString('base64')}`
)
console.log('====================================');
console.log(`${object.username}:${object.password}`, 'try');


 try {
      const response =  fetch('/api/allusers', {
      });  
      const data = (await response).json
      console.log('====================================');
      console.log(data, 'data');      
      console.log('====================================');      
  } catch (error) {
      console.log(error, 'logintsx error');
  }
    // .then(res => {
    //   console.log('allUsers', res.data);
    //   localStorage.setItem("allUsers", JSON.stringify(res.data as UserInterface[]))
    //   console.log(localStorage)
    //   allUserContext.update(res.data as UserInterface[])
    //   let filterData = (res.data as UserInterface[]).filter((user) => user.email == object.username)
    //   console.log('====================================');
    //   console.log(filterData, object, object.username, "filterData");
    //   console.log('====================================');
    //   if (filterData.length > 0) {
    //     alert('Login successful!');
    //     let authData: Authentication = {
    //       auth: object,
    //       id: filterData[0].id,
    //       userName: filterData[0].username
    //     }
    //     localStorage.setItem('user', JSON.stringify(authData));
    //     router.push("/");
    //   } else {
    //     alert('User not found!');
    //   }
    // }).catch(error => {
    //   console.log('allUsersError', error)
    // })
  

    // try {
    //   const response = await axios.get(`${baseUrl}users/`, {
    //     auth: object
    //   });
    
    //   if (response.status === 200) {
    //     const data = response.data;
    //     console.log(data); // Process the response data
    //   } else {
    //     console.log('Request failed:', response.status, response.statusText);
    //     // Handle the error based on the response status
    //   }
    // } catch (error) {
    //   console.log('Error:', error);
    // }
    // };

  }
  return <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="wrap mt-4">
            <div className="login-wrap mt-4 p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-2 text-center">Welcome Back</h3>
                </div>
              </div>
              <form action="#" className="signin-form" onSubmit={handleLogin}>
                <div className="form-group mt-4">
                  <input type="text" className="form-control rounded-pill input-area" name="username" placeholder="Username"
                    value={username} onChange={(e) => setUserName(e.target.value)}
                    required />
                </div>
                <div className="form-group mt-4">
                  <input type="password" className="form-control rounded-pill input-area" name="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="form-control btn btn-primary btn-teal rounded-pill submit px-3">Sign In</button>
                </div>
                <div className="form-group d-md-flex mt-3">
                  <div className="text-end w-100">
                    <a href="#" className="fw-bold txt-link">Forgot Password?</a>
                  </div>
                </div>
              </form>
              <p className="text-center mt-4">Don&apos;t have an account? <Link data-toggle="tab" href="/signup" className="fw-bold txt-link">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

}

export default LoginComponent

