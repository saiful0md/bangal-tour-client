import PropTypes from "prop-types";

const BannerText = ({heading, description}) => {
    return (
        <div className="z-10 text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heading}</h1>
            <p className="text-lg md:text-xl">{description} </p>
        </div>
    );
};
BannerText.propTypes = {
    heading: PropTypes.string,
    description: PropTypes.string,
}
export default BannerText;