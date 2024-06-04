

import PropTypes from 'prop-types';

const PackageDetails = ({ item }) => {
    const { title, image, type, price, _id } = item;
    return (
        <div>
            
        </div>
    );
};
PackageDetails.propTypes = {
    item: PropTypes.object,
}

export default PackageDetails;