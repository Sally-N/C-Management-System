import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { ComplaintsInterface } from "../interfaces/complaintInterface";
import { Authentication, UserInterface } from "../interfaces/user";
import { generateSessionToken } from "../../utilities/sessionUtils";
import ComplaintView from "./complaintview";
export const baseUrl = "https://www.muganedev.tech/api/v1/"



const HomeComponent = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [allComplaints, setAllComplaints] = useState<ComplaintsInterface[]>()
    const [postSender, setPostSender] = useState<UserInterface>()
    const [postTime, setPostTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')


    const handleSidebarToggle = () => {
        setIsSidebarActive(!isSidebarActive);
    };


    const getComplaintsAndComments = () => {
        axios.get(`${baseUrl}complaints/`, {
            auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth
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

        axios.get(`${baseUrl}comments`, {
            auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth
        }).then(
            res => {
                console.log('====================================');
                console.log(res.data, "comments");
                console.log('====================================');
            }
        ).catch(
            error => {
                console.log(error, "allcomplaints error");

            }
        )

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

    }

    useEffect(() => {

        getComplaintsAndComments()
        ///get the user who created Post and formatTime of post


    }, []);

    const handleComplaintData = (formSubmit: FormEvent<HTMLFormElement>) => {
        formSubmit.preventDefault();

        let fd = new FormData(formSubmit.currentTarget);
        axios.post(`${baseUrl}complaints/create`, fd, {
            auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log('====================================');
            console.log(res.data, 'newcomplaint');
            console.log('====================================');
        }).catch(error => {
            console.log('====================================');
            console.log(error, "myposterror");
            console.log('====================================');
        })


    }

    const handleComplaintComment = (formSubmit: FormEvent<HTMLFormElement>) => {
        formSubmit.preventDefault();

        let fd = new FormData(formSubmit.currentTarget);
        axios.post(`${baseUrl}complaints//create`, fd, {
            auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth,
        
        }).then(res => {
            console.log('====================================');
            console.log(res.data, 'newcomment');
            console.log('====================================');
        }).catch(error => {
            console.log('====================================');
            console.log(error, "commenterror");
            console.log('====================================');
        })
    }







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


                <div className="mb-2 fixedMenuFix">
                    {
                        allComplaints?.map((complaint, i) => <>

                            <ComplaintView complaint={complaint} i={i} />
                            <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                                <form onSubmit={handleComplaintComment}>
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Comment</h5>
                                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <textarea className="modalTextArea" name="comment" />
                                            <input value={complaint.id}  name="complaint" hidden />
                                            <input name="user" value={(JSON.parse(localStorage.getItem('user')!) as Authentication).id} hidden />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                                            <button type="submit" className="btn btn-primary btn-teal btn-sm">Post</button>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>

                        </>
                        )}



                </div >
            </div >




            <div className="modal" id="complaintModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                <form onSubmit={handleComplaintData}>
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
                                    <input type="text" className="form-control" name="title" id="recipient-name"
                                        value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <textarea className="modalTextArea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <input type="file" name="image" />
                                <input type="text" name="status" value="pending" hidden />
                                <input type="text" name="user" value={(JSON.parse(localStorage.getItem('user')!) as Authentication).id} hidden />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger btn-teal btn-sm" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary btn-teal btn-sm">Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >



    </>

}

export default HomeComponent;