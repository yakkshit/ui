import YakkshitResume from "@/app/(docs)/yakkshit/components/yakkshit-resume";
import resumeData from "@/app/(docs)/yakkshit/data/resumeData.json";

const data = resumeData;

const Yakkshit: React.FC = () => {
    return (
        <>
         <YakkshitResume resumeData={data} />
        </>

    );
};

export default Yakkshit;