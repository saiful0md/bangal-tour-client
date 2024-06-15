import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TourGuideTable = ({item, index}) => {
    return (
        <>
            <tr>
                <th>
                    {index + 1}
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={item.image} alt={item.name} />
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    {item.contact}
                </td>
                <td>
                    <Link to={`/tourGuideDetails/${item._id}`}>
                        <button className='btn btn-sm'>View Details</button>
                    </Link>
                </td>
            </tr>
 
        </>
    );
};
TourGuideTable.propTypes={
    item: PropTypes.object,
    index: PropTypes.number
}

export default TourGuideTable;

