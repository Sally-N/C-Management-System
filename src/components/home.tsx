import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const HomeComponent = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    // const [showModal, setShowModal] = useState(false)

    const handleSidebarToggle = () => {
        setIsSidebarActive(!isSidebarActive);
    };

   

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onCancelFile = (event: { preventDefault: () => void; }) => {
        console.log("From onCancelFile");
    };

    const onUploadFile = (event: { preventDefault: () => void; }) => {
        console.log("uploaded")
    };

    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (!fileInput.files) {
            alert("No file was chosen");
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Files list is empty");
            return;
        }

        const file = fileInput.files[0];

        /** File validation */
        if (!file.type.startsWith("image")) {
            alert("Please select a valide image");
            return;
        }

        /** Setting file state */
        setFile(file); // we will use the file state, to send it later to the server
        setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
    };



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
                </div>
            </nav>
            <div className="mb-2 fixedMenuFix ">
                <div className="col-lg-3 col-sm-12 d-flex align justify-content-between ">
                    <div className="text">WendyWaweru:</div>
                    <div className="text">12.11pm</div>
                </div>
                <form>
                    <textarea id="postField" className="form-control" placeholder="Post a complaint" />
                    <div className="image-input col-lg-1">
                        {previewUrl ? (
                            <><img className="image-preview" src={previewUrl} alt="Preview" />
                                <span className="change-image">Choose different image</span></>

                        ) : (<> <input type="file" accept="image/*" id="imageInput" onChange={onUploadFile} />
                            <label htmlFor="imageInput" className="image-button">
                                <FontAwesomeIcon icon={faImage} className="iconImage" />
                                Choose Image
                            </label></>)}

                    </div>
                    <button className="btn btn-primary btn-teal btn-sm" onClick={onCancelFile}>Cancel</button>
                    <button className="btn btn-primary btn-teal btn-sm" onClick={onUploadFile}>Post</button>
                </form>
            </div>
            <div className="mb-2 fixedMenuFix">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="d-flex p-2 px-3 justify-content-between">
                                <div className="col-lg-3 col-sm-12 d-flex align justify-content-between ">
                                    <div className="text">JulieO</div>
                                    <div className="text">12.11pm</div>
                                </div>
                                <div className="">
                                    <button role="button" className="form-control btn btn-primary btn-teal rounded-pill submit px-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Comment</button>
                                </div>
                            </div>
                            <div className="p-2">
                                <p className="text-post">In Juja, opposite police station, the following area has a poor sewarege system and as a result,
                                    the community in this area has had to endure bad extreme odor and a recent cholera outbreak.....   @JujaConstituency</p>
                                <hr />
                                <div className="imgSection col-lg-12 col-sm-12 d-flex flex-wrap">
                                    <img src="https://i.imgur.com/xhzhaGA.jpg" className="col-lg-3 col-sm-12 img-fluid" />
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



            </div >
        </div>



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
                        <button type="button" className="btn btn-danger btn-teal btn-sm"  data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary btn-teal btn-sm">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </>

}

export default HomeComponent;