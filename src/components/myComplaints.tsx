import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { ComplaintsInterface } from "../interfaces/complaintInterface";
import { Authentication, UserInterface } from "../interfaces/user";
import { generateSessionToken } from "../../utilities/sessionUtils";



const MyComplaintsComponent = () => {
    const baseUrl = "https://www.muganedev.tech/api/v1/"
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [allComplaints, setAllComplaints] = useState<ComplaintsInterface[]>()
    const [postSender, setPostSender] = useState<UserInterface>()
    const [postTime, setPostTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const sessionToken = localStorage.getItem('sessionToken');

    const handleSidebarToggle = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    useEffect(() => {
        ///todo
        axios.get(`${baseUrl}users/${ (JSON.parse(localStorage.getItem('user')!)as Authentication).id}/complaints/`, {
            auth: (JSON.parse(localStorage.getItem('user')!)as Authentication).auth
        }).then(
            res => {
                console.log(res.data);
                setAllComplaints(res.data as ComplaintsInterface[])
                console.log(allComplaints, "allComplaints");
            }
        ).catch(
            error => {
                console.log(error, "allcomplaints error");

            }
        )

        ///get the user who created Post and formatTime of post
        if (allComplaints) {
            const userId = allComplaints[0]?.user;
            axios.get(`${baseUrl}users/${userId}`, {
                auth: {
                    username: "snzungula@gmail.com",
                    password: "foundation25"
                }
            }).then(
                res => {
                    setPostSender(res.data as UserInterface);
                }
            ).catch(
                error => {

                }
            )

        }
        if (allComplaints) {
            const timestamp = allComplaints[0]?.created_at;
            const formattedDateTime = new Date(timestamp).toLocaleString();
            setPostTime(formattedDateTime)
        }

    }, [allComplaints]);




    return <>

        <div className="wrapper">
            <nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
                <div className="sidebar-header">
                    <h3>Complaint Management System</h3>
                </div>
                <ul className="list-unstyled components">
                    <li className="active">
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/mycomplaints">My Complaints</Link>
                    </li>
                    <li>
                        <a href="#">Profile</a>
                    </li>
                    <li>
                        <a href="#">Tokens</a>
                    </li>
                </ul>

            </nav>

            <div id="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" onClick={handleSidebarToggle} className="btn btn-info btn-teal">
                            <i className="fas fa-align-left"></i>
                            <span className="">Menu</span>
                        </button>
                        <div className="">
                            <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target="#complaintModal">Post a Complaint</button>
                        </div>
                    </div>
                </nav>
                {/* <div className="mb-2 fixedMenuFix ">
                    <div className="col-lg-3 col-sm-12 d-flex align justify-content-between ">
                        <div className="text">WendyWaweru:</div>
                        <div className="text">12.11pm</div>
                    </div>
                    <form>
                        <textarea id="postField" className="form-control" placeholder="Post a complaint" />
                        <div className="image-input col-lg-1">

                            <img className="image-preview" src="" alt="Preview" />
                            <span className="change-image">Choose different image</span>

                            <input type="file" accept="image/*" id="imageInput" />
                            <label htmlFor="imageInput" className="image-button">
                                <FontAwesomeIcon icon={faImage} className="iconImage" />
                                Choose Image
                            </label>

                        </div>
                        <button className="btn btn-primary btn-teal btn-sm" >Cancel</button>
                        <button className="btn btn-primary btn-teal btn-sm">Post</button>
                    </form>
                </div> */}

                <div className="mb-2 fixedMenuFix">
                    {
                        allComplaints?.map((complaint, i) => <>

                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card" key={`complaint${i}`}>
                                        <div className="d-flex p-2 px-3 justify-content-between">
                                            <div className="col-lg-3 col-sm-12 d-flex align justify-content-between ">
                                                <div className="text">{postSender?.username}</div>
                                                <div className="text">{postTime}</div>
                                            </div>
                                            <div className="">
                                                <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Comment</button>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-post">{complaint.description}</p>
                                            <hr />
                                            <div className="imgSection col-lg-12 col-sm-12 d-flex flex-wrap">
                                                <img src={complaint.image} className="col-lg-3 col-sm-12 img-fluid" />
                                            </div>
                                            <hr />
                                            <div className="col-lg-10 ms-lg-auto d-flex align-items-start">
                                                <div className="d-flex flex-column align-items-start">
                                                    <div className="col-lg-10 col-sm-12 d-flex align justify-content-between">
                                                        <div className="text">Jleo</div>
                                                        <div className="text">12.11pm</div>
                                                    </div>
                                                    <div className=" d-flex col-lg-12">
                                                        <p className="text-post">We&apos;ll Check it out.</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        )}



                </div >
            </div >



            <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Comment</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="modalTextArea" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary btn-teal btn-sm">Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="complaintModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Complaint Form</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                <input type="text" className="form-control" id="recipient-name" 
                                value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <textarea className="modalTextArea" value={description}  onChange={(e) => setDescription(e.target.value)} />
                            <input type="file"  />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary btn-teal btn-sm">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >



    </>

}

export default MyComplaintsComponent;