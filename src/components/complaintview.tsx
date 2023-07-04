import axios from "axios";
import { ComplaintsInterface, CommentsInterface } from "../interfaces/complaintInterface"
import { Authentication, UserInterface } from "../interfaces/user"
import { baseUrl } from "./home";
import { useEffect, useState } from "react";


const ComplaintView = ({ complaint, i }: { complaint: ComplaintsInterface, i: number }) => {
    const [postSender, setPostSender] = useState<UserInterface | null>(null);
    const [postTime, setPostTime] = useState('')
    const [postcoms, setPostComs] = useState<CommentsInterface[]>([])

    useEffect(() => {
        getUsername();
        getPostTime();
        getPostComments();

    }, [])
    function getUsername() {

        const userId = complaint.user;
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
    function getPostTime() {
        const timestamp = complaint?.created_at;
        const formattedDateTime = new Date(timestamp).toLocaleString();
        setPostTime(formattedDateTime)
    }

    function getPostComments() {
        axios.get(`${baseUrl}complaints/${complaint.id}/comments`, {
            auth: (JSON.parse(localStorage.getItem('user')!) as Authentication).auth
        }).then(
            res => {
                console.log('====================================');
                console.log(res.data, "postcomments");
                setPostComs(res.data)
                console.log('====================================');

            }
        ).catch(
            error => {
                console.log(error, "allcomplaints error");

            }
        )



    }

    return <div className="row d-flex align-items-center justify-content-center">
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
                            {
                                postcoms.map((comm, ii) =>
                                    <>

                                        <div className="col-lg-10 col-sm-12 d-flex align justify-content-between">
                                            <div className="text"></div>
                                            <div className="text"></div>
                                        </div>
                                        <div className=" d-flex col-lg-12">
                                            <p className="text-post">{comm.comment}</p>
                                        </div>
                                    </>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ComplaintView