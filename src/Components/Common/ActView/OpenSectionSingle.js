import React, { useState } from 'react'
import Repealed from './Repealed';
import Amendment from './Amendment';
import Appendment from './Appendment';

const OpenSectionSingle = ({
    heading,
    note,
    content,
    number,
    subSection,
    live,
    repealed,
    repealed_by,
    repealed_to,
    amendment_from,
    amendment_to,

    appendment_from,
    appendment_after,

    repealed_by_data,
    repealed_to_data,

    amendment_from_data,
    amendment_to_data,

    appendment_from_data,
    appendment_after_data
}) => {
    const [openSection, setOpenSection] = useState(true);


    const handleOpenSection = () => {
        setOpenSection(!openSection)
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <div onClick={handleOpenSection} style={
                {
                    color: repealed === "YES" ? '#F0232B' : "",

                }
            }>
                {number} {heading}
            </div>
            <div>
                {openSection && (
                    <div style={{
                        color: repealed === "YES" ? '#F0232B' : "black",
                        paddingTop: '10px',
                        paddingLeft: '30px',
                    }}>
                        <p style={{
                            color: repealed === "YES" ? '#F0232B' : "black",
                        }}>
                            <div dangerouslySetInnerHTML={{ __html: content ? content : '' }} />
                        </p>

                        {((repealed_by === "YES") || (repealed_to === "YES")) ?
                            <Repealed repealed_to_data={repealed_to_data ? repealed_to_data : ''}
                                repealed_by_data={repealed_by_data ? repealed_by_data : ''}

                            />
                            :
                            <></>
                        }

                        {((amendment_from === "YES") || (amendment_to === "YES")) ?
                            <Amendment amendment_from_data={amendment_from_data ? amendment_from_data : ''}
                                amendment_to_data={amendment_to_data ? amendment_to_data : ''}
                            />
                            :
                            <></>
                        }

                        {((appendment_from === "YES") || (appendment_after === "YES")) ?
                            <Appendment appendment_from_data={appendment_from_data ? appendment_from_data : ''}
                                appendment_after_data={appendment_after_data ? appendment_after_data : ''}
                            />
                            :
                            <></>
                        }
                        {(Object.values(subSection)).map((value, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingLeft: '40px',

                            }}>
                                {value.number != 0 && (
                                    <div style={{
                                        display: 'flex',
                                        color: repealed === "YES" ? '#F0232B' :
                                            (value.repealed === "YES" ? "#F0232B" : "black"),
                                    }}>
                                        {value.number ? value.number : ''}&nbsp;
                                        <div dangerouslySetInnerHTML={{ __html: value.content ? value.content : '' }} />

                                    </div>
                                )}
                                {((value.repealed_by === "YES") || (value.repealed_to === "YES")) ?
                                    <Repealed repealed_to_data={value.repealed_to_data ? value.repealed_to_data : ''}
                                        repealed_by_data={value.repealed_by_data ? value.repealed_by_data : ''}

                                    />
                                    :
                                    <></>
                                }






                                {((value.amendment_from === "YES") || (value.amendment_to === "YES")) ?
                                    <Amendment
                                        amendment_from_data={value.amendment_from_data ? value.amendment_from_data : ''}
                                        amendment_to_data={value.amendment_to_data ? value.amendment_to_data : ''}
                                    />
                                    :
                                    <></>
                                }


                                {((value.appendment_from === "YES") || (value.appendment_after === "YES")) ?
                                    <Appendment
                                        appendment_from_data={value.appendment_from_data ? value.appendment_from_data : ''}
                                        appendment_after_data={value.appendment_after_data ? value.appendment_after_data : ''}
                                    />
                                    :
                                    <></>
                                }

                                <div>{value.sCHEDULES ?
                                    (Object.values(value.sCHEDULES)).map((eachSchedules, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingLeft: '40px',

                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                color: repealed === "YES" ? '#F0232B' :
                                                    (value.repealed === "YES" ? "#F0232B" :
                                                        (eachSchedules.repealed === "YES" ? "#F0232B" : "black")),
                                            }}>{eachSchedules.number}&nbsp;
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: eachSchedules.content ? eachSchedules.content : '' }} />


                                                {/* {eachSchedules.live === "YES" ?
                                                    // <Live />
                                                    <img src="/images/live.png" style={{
                                                        height: '30px',
                                                        marginLeft: '10px',
                                                        marginTop: '5px',
                                                    }} />
                                                    :
                                                    ''
                                                } */}

                                            </div>
                                            {((repealed_by === "YES") || (repealed_to === "YES")) ?
                                                <Repealed repealed_to_data={repealed_to_data ? repealed_to_data : ''}
                                                    repealed_by_data={repealed_by_data ? repealed_by_data : ''}

                                                />
                                                :
                                                <></>
                                            }
                                            {((eachSchedules.amendment_from === "YES") || (eachSchedules.amendment_to === "YES")) ?
                                                <Amendment
                                                    amendment_from_data={eachSchedules.amendment_from_data ? eachSchedules.amendment_from_data : ''}
                                                    amendment_to_data={eachSchedules.amendment_to_data ? eachSchedules.amendment_to_data : ''}
                                                />
                                                :
                                                <></>
                                            }

                                            {((eachSchedules.appendment_from === "YES") || (eachSchedules.appendment_after === "YES")) ?
                                                <Appendment
                                                    appendment_from_data={eachSchedules.appendment_from_data ? eachSchedules.appendment_from_data : ''}
                                                    appendment_after_data={eachSchedules.appendment_after_data ? eachSchedules.appendment_after_data : ''}
                                                />
                                                :
                                                <></>
                                            }

                                            <div>
                                                {eachSchedules.SubSCHEDULES ?
                                                    (Object.values(eachSchedules.SubSCHEDULES)).map((eachSubSchedules, index) => (
                                                        <div key={index} style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            paddingLeft: '40px',
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                color: repealed === "YES" ? '#F0232B' :
                                                                    (value.repealed === "YES" ? "#F0232B" :
                                                                        (eachSchedules.repealed === "YES" ? "#F0232B" :
                                                                            (eachSubSchedules.repealed === "YES" ? "#F0232B" : "black"))),
                                                            }}>{eachSubSchedules.number}&nbsp;
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: eachSubSchedules.content ? eachSubSchedules.content : '' }} />
                                                                {/* {eachSubSchedules.live === "YES" ?
                                                                    // <Live />
                                                                    <img src="/images/live.png" style={{
                                                                        height: '30px',
                                                                        marginLeft: '10px',
                                                                        marginTop: '5px',
                                                                    }} />
                                                                    :
                                                                    ''
                                                                } */}

                                                            </div>
                                                            {((repealed_by === "YES") || (repealed_to === "YES")) ?
                                                                <Repealed repealed_to_data={repealed_to_data ? repealed_to_data : ''}
                                                                    repealed_by_data={repealed_by_data ? repealed_by_data : ''}

                                                                />
                                                                :
                                                                <></>
                                                            }
                                                            {((eachSubSchedules.amendment_from === "YES") || (eachSubSchedules.amendment_to === "YES")) ?
                                                                <Amendment
                                                                    amendment_from_data={eachSubSchedules.amendment_from_data ? eachSubSchedules.amendment_from_data : ''}
                                                                    amendment_to_data={eachSubSchedules.amendment_to_data ? eachSubSchedules.amendment_to_data : ''}
                                                                />
                                                                :
                                                                <></>
                                                            }

                                                            {((eachSubSchedules.appendment_from === "YES") || (eachSubSchedules.appendment_after === "YES")) ?
                                                                <Appendment
                                                                    appendment_from_data={eachSubSchedules.appendment_from_data ? eachSubSchedules.appendment_from_data : ''}
                                                                    appendment_after_data={eachSubSchedules.appendment_after_data ? eachSubSchedules.appendment_after_data : ''}
                                                                />
                                                                :
                                                                <></>
                                                            }
                                                        </div>
                                                    ))
                                                    :
                                                    ''}
                                            </div>
                                        </div>
                                    ))
                                    :
                                    ''}
                                </div>
                            </div>
                        ))}

                        {note && (
                            <>
                              <div className='card'>
                                  <div className='card-header'>
                                       বিঃদ্রঃ
                                  </div>
                                  <div className='card-body'>
                                      <div dangerouslySetInnerHTML={{__html: note}}/>
                                  </div>

                              </div>

                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OpenSectionSingle
