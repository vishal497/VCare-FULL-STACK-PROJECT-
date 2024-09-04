import React from 'react'

 const Hero = ({title, imageUrl}) => {
  return (
    <div  className="hero container">

        <div className="banner">
            <h1>{title}</h1>

            <p>
            At Vcare Hospital, we prioritize patient well-being by combining advanced medical practices with personalized, compassionate care. Our dedicated team of professionals is committed to providing exceptional healthcare services across a wide range of specialties, ensuring that every patient receives the highest standard of treatment in a state-of-the-art environment. Experience healthcare that truly cares.z
            </p>


            </div>

            <div className="banner">
            <img src={imageUrl} alt="hero"  className='animated-image'/>
            <span>
                <img src="/Vector.png" alt="vector" />
            </span>
                </div>

    </div>
  )
}

export default Hero;

 