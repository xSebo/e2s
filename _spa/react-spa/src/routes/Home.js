import React from 'react'
import AdviceCard from '../components/AdviceCard'

function Home(){
    return(
        <div className="home">
            <h1>Home</h1>
            <br/>
            <AdviceCard title={"Lorem ipsum"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}></AdviceCard>
        </div>
    ); 
}

export default Home;
