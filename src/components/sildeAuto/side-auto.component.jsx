import React, {useState, useEffect } from 'react'

const ChildComponennt = () => {
    const [time, setTime] = useState(12);

    useEffect(() => {
        const func = setInterval(() => {
            if(time===0) setTime(12)
            else setTime(time-1);
        }, 100);
        return () => {
            clearInterval(func)
        }
    }, [time])
    return (

                <li
                    className="px-3 flex-none"
                    style={{
                        transform: `translateX(${time}%) translateZ(0px)`
                    }}
                
                >
                    <div className="h-10 w-36 bg-red-500">

                    </div>
                </li>
    
    )
}


const SlideAuto = () => {
    return (
        <div className="overflow-hidden -my-8 flex">
        <ul className="w-full flex items-center py-8">    
        {

            [1, 2, 3, 4, 5].map(child => <ChildComponennt key={child}/>)
        }        
        </ul>
        </div>)
}

export default SlideAuto

