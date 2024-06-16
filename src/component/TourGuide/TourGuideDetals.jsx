import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TourGuideDetals = () => {
    const { id } = useParams()
    const [guideData, setGuideData] = useState([])
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await axiosSecure.get(`/users/${id}`);
                setGuideData(data);
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: 'Failed to load package details',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
            }
        };
        loadData();
    }, [axiosSecure, id])
    const { name, image, contactDetails, education, skills, workExprience } = guideData
    return (
        <div className="max-w-3xl mx-auto my-10">
            <div className="card  bg-base-100 shadow-xl">
                <figure><img className="h-[350px] w-full  origin-bottom" src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {name}</h2>
                    <p><span className="font-bold">Contact:</span> {contactDetails}</p>
                    <p><span className="font-bold">Education:</span> {education}</p>
                    <p><span className="font-bold">Skill:</span> {skills}</p>
                    <p><span className="font-bold">Experience:</span> {workExprience}</p>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetals;