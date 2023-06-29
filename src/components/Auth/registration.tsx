import React from "react";
import { useState, useEffect } from "react";


const SignupComponent = () => {
    return <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="wrap mt-4">
                        <div className="login-wrap mt-4 p-4 p-md-5">
                            <div className="d-flex">
                                <div className="w-100">
                                    <h3 className="mb-2 text-center">Create an Account</h3>
                                </div>
                            </div>
                            <form action="#" className="signin-form">
                                <div className="form-group mt-4">
                                    <input type="text" className="form-control rounded-pill input-area" placeholder="Username" required />
                                </div>
                                <div className="form-group mt-4">
                                    <input type="text" className="form-control rounded-pill input-area" placeholder="Email address" required />
                                </div>
                                <div className="form-group mt-4">
                                    <input id="password-field" type="password" className="form-control rounded-pill input-area" placeholder="Password" required />
                                    <span className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group mt-4">
                                    <input id="password-field" type="password" className="form-control rounded-pill input-area" placeholder="Confirm Password" required />
                                    <span className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" className="form-control btn btn-primary btn-teal rounded-pill submit px-3">Sign Up</button>
                                </div>
                            </form>
                            <p className="text-center mt-4">Already have an account? <a data-toggle="tab" href="#signup" className="fw-bold txt-link">Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}

export default SignupComponent