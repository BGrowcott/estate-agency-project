import React from 'react';
import backgroundImage from '../images/birmingham-example-background.jpg'
import Button from 'react-bootstrap/esm/Button';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const styles = {
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: '96vh',
  }
}

const stripePromise = loadStripe('pk_test_51LQpgXEWzKi5CERlsoF4zBjJzcXPCpKOrcDQcrwbHYfo2PLsG31CGcqfyFSyGddvk0n1IQg5aN2zEL5DtVBluJx5005BvcbUXA');

const Home = () => {

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function checkout(){
    console.log('hello')
    getCheckout()
  }


    return (
      <main className='d-flex justify-content-around align-items-center' style={styles.backgroundImage}>
        <div className='box-fade-dark d-flex justify-content-around align-items-center'>
          <div>
            <h2 className='text-white'>Something about your website</h2>
          </div>
        </div>
        <Button onClick={checkout} variant="primary">Test</Button>
      </main>
    );
  };
  
  export default Home;