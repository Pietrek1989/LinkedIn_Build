import SuggestedForYou from "./SuggestedForYou";
import Analytics from "./Analytics";
import Resources from "./Resources";
import About from "./About";
import Activity from "./Activity";
import Experience from "./Experience";
import Education from "./Education";
import Volunteering from "./Volunteering";
import Skills from "./Skills";
import Interests from "./Interests";
import ProfileAvatar from "./ProfileAvatar"
import '../styles/layout.css'

const LeftSide = () => {
    return (
        <>
            <ProfileAvatar></ProfileAvatar>
            <SuggestedForYou></SuggestedForYou>
            <Analytics></Analytics>
            <Resources></Resources>
            <About></About>
            <Activity></Activity>
            <Experience></Experience>
            <Education></Education>
            <Volunteering></Volunteering>
            <Skills></Skills>
            <Interests></Interests>
        </>
    )
}

export default LeftSide