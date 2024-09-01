import YakkshitResume from "./components/yakkshit-resume";
import resumeData from "./data/resumeData.json";


const Yakkshit: React.FC = () => {
    return (
        <>
         <YakkshitResume resumeData={resumeData} />
        </>

    );
};

export default Yakkshit;