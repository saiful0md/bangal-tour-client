import PackageCart from "../../component/PackageCart";
import usePackages from "../../hooks/usePackages";


const AllPackages = () => {
    const [packages] = usePackages()
    return (
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6 pt-24'>
            {
                packages.map(item => <PackageCart key={item._id} item={item}></PackageCart>)
            }
        </div>
    );
};

export default AllPackages;