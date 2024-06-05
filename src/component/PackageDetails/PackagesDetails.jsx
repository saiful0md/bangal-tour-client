import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PackagesDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [packageData, setPackage] = useState([])
    useEffect(() => {
        const loadData = async () => {
            const data = await axiosSecure.get(`/packages/${id}`)
            setPackage(data.data)
        }
        loadData()
    }, [axiosSecure, id])
    const { name, image1, image2, image3, image4, price, description, type } = packageData;

    return (
        <div className="my-10 px-2">
            <Helmet>
                <title>Bangal Tour | Package Details</title>
            </Helmet>
            <div className="card  bg-base-100 shadow-xl">
                <div className="grid md:grid-cols-2 gap-3">
                    <figure><img className="h-[300px] w-full " src={image1} alt={name} /></figure>
                    <figure><img className="h-[300px] w-full " src={image2} alt={name} /></figure>
                    <figure><img className="h-[300px] w-full " src={image3} alt={name} /></figure>
                    <figure><img className="h-[300px] w-full " src={image4} alt={name} /></figure>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <p>{type}</p>
                    <p>{price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesDetails;