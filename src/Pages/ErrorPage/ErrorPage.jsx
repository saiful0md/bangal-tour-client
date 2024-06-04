
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <h1 className="text-6xl font-bold">Oops!</h1>
            <p className="text-3xl font-semibold my-10">Sorry, an unexpected error has occurred.</p>
            <p className="text-4xl font-extrabold">
                <i>{error.statusText || error.message}</i>
            </p>
            <div>
                <Link to={'/'}>
                    <button className='btn  bg-amber-500 text-white hover:bg-amber-600 my-8'>Go Back Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;