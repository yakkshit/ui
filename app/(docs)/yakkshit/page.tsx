import YakkshitResume from "@/app/(docs)/yakkshit/components/yakkshit-resume";
import resumeData from "@/app/(docs)/yakkshit/data/resumeData.json";


const Yakkshit: React.FC = () => {
    return (
        <>
         <YakkshitResume resumeData={resumeData} />
        </>

    );
};

export default Yakkshit;