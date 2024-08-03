import { Dispatch, SetStateAction } from "react";

const loaderTime: number = 400

function loader(setIsLoading: Dispatch<SetStateAction<boolean>>) {
    setTimeout(() => {
        setIsLoading(false)
    }, loaderTime);
}



export default { loaderTime, loader }