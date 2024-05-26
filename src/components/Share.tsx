import React from 'react';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon ,EmailShareButton,EmailIcon } from "react-share";

interface Props {
    toggleShare: () => void;
    id: string | null;
}

const Share: React.FC<Props> = ({ toggleShare, id }) => {

    const url = "https://furrl.in/productDetail";

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-10">
            <div className="flex justify-center items-center ">
                <FacebookShareButton url={`${url}?id=${id}`}>
                    <FacebookIcon size={40} />
                </FacebookShareButton>
                <WhatsappShareButton url={`${url}?id=${id}`}>
                    <WhatsappIcon size={40} />
                </WhatsappShareButton>
                <EmailShareButton url={`${url}?id=${id}`}>
                    <EmailIcon size={40}/>
                </EmailShareButton>
            </div>
            <button onClick={toggleShare} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Close
            </button>
        </div>
    );
};

export default Share;
