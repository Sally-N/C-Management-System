import Link from "next/link";
import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const LoginComponent = (formSubmit: FormEvent<HTMLFormElement>) => {
const router = useRouter()

  const [pass, setPassword] = useState('')
  const [usermail, setUserMail] = useState('')
  console.log(pass)
  formSubmit.preventDefault
  
  const handleLogin = () => {

    const savedUserDetailsString = localStorage.getItem('user');

    if (savedUserDetailsString !== null) {
      const savedUserDetails = JSON.parse(savedUserDetailsString)

      console.log(savedUserDetails);
      if (savedUserDetails && savedUserDetails.email == usermail) {

        if (savedUserDetails.password == pass) {
          alert('Login successful!');
          router.push("/");
        } else {
          alert('Wrong Credentials');
        }
      } else {
        // User not found, handle user not found case
        alert('User not found!');
        // Display error message or perform other actions
      }
    } else {
      // User not found, handle user not found case
      alert('User not found!');
      // Display error message or perform other actions
    }
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
                  <input type="text" className="form-control rounded-pill input-area" placeholder="Email address"
                    value={usermail} onChange={(e) => setUserMail(e.target.value)}
                    required />
                </div>
                <div className="form-group mt-4">
                  <input type="password" className="form-control rounded-pill input-area" placeholder="Password"
                    value={pass} onChange={(e) => setPassword(e.target.value)}
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