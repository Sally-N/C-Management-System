import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";


const LoginComponent = () => {
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
              <form action="#" className="signin-form">
                <div className="form-group mt-4">
                  <input type="text" className="form-control rounded-pill input-area" placeholder="Email address" required />
                </div>
                <div className="form-group mt-4">
                  <input id="password-field" type="password" className="form-control rounded-pill input-area" placeholder="Password" required />
                  <span className="fa fa-fw fa-eye field-icon toggle-password"></span>
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