import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TourGuideDetals = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [guideData, setGuideData] = useState([])
    useEffect(() => {
        const loadData = async () => {
            const data = await axiosSecure.get(`/tourGuide/${id}`)
            setGuideData(data.data)
        }
        loadData()
    }, [axiosSecure, id])
    const {  name, image, contactDetails, education, skills, workExperience } = guideData
    return (
        <div className="max-w-3xl mx-auto my-10">
            <div className="card  bg-base-100 shadow-xl">
                <figure><img className="h-[350px] w-full  origin-bottom" src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {name}</h2>
                    <p><span className="font-bold">Contact:</span> {contactDetails}</p>
                    <p><span className="font-bold">Education:</span> {education}</p>
                    <p><span className="font-bold">Skill:</span> {skills}</p>
                    <p><span className="font-bold">Experience:</span> {workExperience}</p>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetals;