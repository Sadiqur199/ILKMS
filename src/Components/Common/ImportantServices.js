import React from 'react'
import './ImportantServices.css'

const ImportantServices = () => {
    return (
        <div className='important_services_main'>

                <a href='https://mutation.land.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/Enamjari.png' className='important_services_image' />
                    <p>ই-নামজারি</p>
                </a>

                <a href='https://ldtax.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/vumiunnoyonkor.png' className='important_services_image' />
                    <p>ভূমি উন্নয়ন কর</p>
                </a>

                <a href='https://www.eporcha.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/Digitallandrecord.png' className='important_services_image' />
                    <p>ডিজিটাল ল্যান্ড রের্কড</p>
                </a>

                <a href='http://oh.lams.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/onlinesunani.png' className='important_services_image' />
                    <p>অনলাইন শুনানি</p>
                </a>
                <a href='https://mutation.land.gov.bd/search-mortgage-info' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/mortgejtottho.png' className='important_services_image' />
                    <p>মটগেজ তথ্য যাচাই</p>
                </a>

                <a href='https://hotline.land.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                    <img src='../images/ovijog.png' className='important_services_image' />
                    <p>হটলাইন</p>
                </a>

        </div>
    )
}

export default ImportantServices
