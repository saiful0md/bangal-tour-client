import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import PackageCart from "../../component/PackageCart";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AllPackages = () => {
    const axiosPublic = useAxiosPublic();
    const { data: packages = [],  } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/packages')
            return res.data
        }
    })
    return (
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6 my-4'>
            <Helmet>
                <title>Bangal Tour | All Package</title>
            </Helmet>
            {
                packages.map(item => <PackageCart key={item._id} item={item}></PackageCart>)
            }
        </div>
    );
};

export default AllPackages;