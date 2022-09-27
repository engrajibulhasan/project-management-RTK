import React from 'react';
import avaterDemo from "../../assets/images/avaterDemo.png";
const Avaters = ({ members }) => {

    let content = '';
    if (members.length > 0) {
        content = members.map((member, index) => {
            if (member.avater) {
                return <img key={index} className="w-10 h-10 mr-1  rounded-full" src={member.avater} alt={member.name} title={member.name} />
            } else {
                return <img key={index} className="w-10 h-10 mr-1  rounded-full" src={avaterDemo} alt={member.name} title={member.name} />
            }
        })
    }
    return (
        <div className="flex justify-start my-2 " >
            {content}
        </div>
    )
}

export default Avaters