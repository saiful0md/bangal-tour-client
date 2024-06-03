import PropTypes from 'prop-types';
const PackageCart = ({ item }) => {
    const { title, image, type, price } = item
    return (
        <div className=" rounded  shadow-lg">
            <img className="w-full h-[300px]" src={image} alt={title} />
            <div className="px-6  py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{type}</p>
                <p className="text-gray-700 text-base">Price: &#8378; {price}</p>
                <button className=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    View Package
                </button>
            </div>
        </div>
    );
};
PackageCart.propTypes = {
    item: PropTypes.object
}
export default PackageCart;