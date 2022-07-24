import React from 'react';
import backgroundImage from '../images/birmingham-example-background.jpg'

const styles = {
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: '96vh',
    zIndex: '-1',
  }
}

const Home = () => {
    return (
      <main className='bg-image d-flex justify-content-around align-items-center' style={styles.backgroundImage}>
        <div className='box-fade-dark d-flex justify-content-around align-items-center'>
          <div>
            <h2 className='text-white'>Something about your website</h2>
          </div>
        </div>
      </main>
    );
  };
  
  export default Home;