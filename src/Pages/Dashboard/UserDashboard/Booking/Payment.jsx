import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../../component/Checkoutform/Checkoutform";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
const Payment = () => {
    return (
        <div className="max-w-4xl mx-auto border p-10 flex flex-col my-10">
            <div>
                <h2 className="text-4xl text-center border-b pb-10 font-bold my-10">Please fill the form and pay</h2>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;