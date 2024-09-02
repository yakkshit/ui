import YakkshitResume from "@/app/(docs)/yakkshit/components/yakkshit-resume";
import { resumeData } from "./data/resumedata";

const Yakkshit: React.FC = () => {
    return (
        <>
         <YakkshitResume resumeData={resumeData} />
        </>

    );
};

export default Yakkshit;