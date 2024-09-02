import YakkshitResume from "@/app/(docs)/yakkshit/components/yakkshit-resume";
import resumeD from "@/app/(docs)/yakkshit/data/resumeData.json";

const Yakkshit: React.FC = () => {
    return (
        <>
         <YakkshitResume resumeData={resumeD} />
        </>

    );
};

export default Yakkshit;