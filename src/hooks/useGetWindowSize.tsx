import {useState, useEffect} from "react";

interface Size {
    width: number,
    height: number
}

function useGetWindowSize() {
    const [size, setSize] = useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const resize = (e: UIEvent) : void => {
            const w = e.target as Window
            setSize({
                width: w.innerWidth,
                height: w.innerHeight
            })
        }
        window.addEventListener('resize' , resize)
        return () => {
            window.removeEventListener('resize', resize)
        };
    }, [size]);

    return [size.width, size.height]
}

export default useGetWindowSize;
