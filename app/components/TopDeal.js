

import React from 'react';
import TopDealCard from './TopDealCard';

const TopDeal = () => {
    return (
        <div className="my-5  ml-4 sm:ml-20 rounded-md overflow-y-hidden  scrollbar-visible overflow-x-auto scrollbar-thin scrollbar-thumb-gray-[#4B5563] scrollbar-track-gray-300">
 

            {/* Scrollable container */}
            <div className="flex gap-3 lg:gap-10 pb-8 ">
                <TopDealCard id="1" name="Family Festival " price="320" src="https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-be4f-a734b6b6ba4f-stacker-combo-2024-10-29185539.png" description="An ultimate meal for the fam. It includes 4 Zinger burgers + 4" />
                <TopDealCard id="2" name="Zinger Combo" price="315" src="https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-be4f-a734b6b6ba4f-stacker-combo-2024-10-29185539.png" description="An ultimate meal for the fam. It includes 4 Zinger burgers + 4  It includes 4 Zinger burgers + 4It includes 4 Zinger burgers + 4" />
                <TopDealCard id="3" name="Snackable Trio" price="250" src="https://www.kfcpakistan.com/images/63fb28b0-9627-11ef-be4f-a734b6b6ba4f-stacker-combo-2024-10-29185539.png" description="An ultimate meal for the fam. It includes 4 Zinger burgers + 4" />

            </div>
        </div>
    );
};

export default TopDeal;

