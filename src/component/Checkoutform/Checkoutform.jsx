import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import './Checkoutform.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const [paymentStatus, setPaymentStatus] = useState('')
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const [clientSecret, setClientSecret] = useState('')
    const { data: bookPrice = [], error } = useQuery({
        queryKey: ['booking-pay', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking-pay/${id}`);
            return res.data;
        }
    });
    const {_id, price} =bookPrice
    
    useEffect(() => {
        if (price !== null) {
            getClientSecret({ price: price });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [price]);

    const getClientSecret = async ({ price }) => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { price });
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    if (error) {
        console.error('Error fetching book price:', error);
    }
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
          
            Swal.fire({
                title: 'invalid card!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'try again'
            })
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            Swal.fire({
                title: 'Payment success',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        }
        // confirm payment card
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.error('Error confirming card payment:', confirmError);
            setPaymentStatus('error');
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded:', paymentIntent.id);

            // Save payment in database
            const payment = {
                email: user?.email,
                price: price,
                packageId:_id,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: 'pending'
            };

            try {
                const res = await axiosSecure.post('/payment', payment);
                console.log('Payment saved:', res.data);
                setPaymentStatus('success');
            } catch (error) {
                console.error('Error saving payment:', error);
                setPaymentStatus('error');
            }
        } else {
            console.error('Payment not succeeded:', paymentIntent.status);
            setPaymentStatus('error');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <p className="font-bold my-3">pay {price}</p>
            <CardElement
                className=""
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button type="submit" className="btn btn-sm bg-amber-500 text-white my-10" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            {paymentStatus === 'success' && <p className="text-green-500">Payment successful!</p>}
            {paymentStatus === 'error' && <p className="text-red-600">There was an error processing your payment. Please try again.</p>}
        </form>
    );
};

export default CheckoutForm;