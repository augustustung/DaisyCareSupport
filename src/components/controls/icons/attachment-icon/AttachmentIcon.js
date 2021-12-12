import React from 'react';

import './AttachmentIcon.scss';

const AttachmentIcon = ({ handleChooseFile, inputFileRef }) => {
    return (
        <>
            <input ref={inputFileRef} type="file" id="file" hidden onChange={handleChooseFile} />
            <label htmlFor="file">
                <svg
                    version="1.1" className="attachment-logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512.001 512.001" xmlSpace="preserve">
                    <path d="M475.753,61.289c-48.329-48.329-126.967-48.329-175.296,0L15.535,346.212
                c-20.713,20.713-20.713,54.413,0,75.127l50.085,50.085c20.713,20.713,54.413,20.713,75.127,0l221.305-221.305
                c20.713-20.713,20.713-54.413,0-75.127s-54.413-20.713-75.127,0L168.981,292.935c-6.915,6.915-6.915,18.127,0,25.042
                c6.915,6.915,18.127,6.915,25.042,0l117.943-117.943c6.903-6.903,18.137-6.906,25.042,0c6.906,6.906,6.903,18.14,0,25.042
                L115.705,446.38c-6.903,6.903-18.137,6.906-25.042,0l-50.085-50.085c-6.906-6.906-6.903-18.14,0-25.042L325.499,86.332
                c34.519-34.519,90.689-34.522,125.211,0s34.519,90.693,0,125.211l-181.56,181.56c-6.915,6.915-6.915,18.127,0,25.042
                c6.915,6.915,18.127,6.915,25.042,0l181.56-181.56C524.083,188.256,524.083,109.62,475.753,61.289z"/>
                    <g>
                        <path d="M299.446,187.512L181.503,305.456c-4.623,4.623-6.081,11.149-4.523,17.045
                    c-2.924-0.772-5.705-2.231-7.997-4.523c-6.915-6.915-6.915-18.127,0-25.042l117.943-117.943c20.713-20.713,54.413-20.713,75.127,0
                    c2.137,2.137,3.999,4.44,5.695,6.826C347.015,167.074,318.022,168.936,299.446,187.512z"/>
                        <path d="M456.654,92.911c2.265,1.855,4.465,3.83,6.578,5.943c34.522,34.522,34.519,90.693,0,125.211
                    l-181.56,181.56c-4.623,4.623-6.081,11.149-4.523,17.045c-2.924-0.772-5.705-2.231-7.997-4.523c-6.915-6.915-6.915-18.127,0-25.042
                    l181.56-181.56C483.117,179.138,485.094,127.655,456.654,92.911z"/>
                        <path d="M115.705,446.38l221.305-221.305c4.613-4.613,6.07-11.142,4.519-17.04
                    c2.927,0.77,5.712,2.228,8.003,4.519c6.906,6.906,6.903,18.14,0,25.042L128.226,458.902c-6.903,6.903-18.137,6.906-25.042,0
                    L90.663,446.38C97.568,453.286,108.802,453.283,115.705,446.38z"/>
                        <path d="M312.978,73.811L28.057,358.732c-20.713,20.713-20.713,54.413,0,75.127l-12.521-12.521
                    c-20.713-20.713-20.713-54.413,0-75.127L300.457,61.289c48.329-48.329,126.967-48.329,175.296,0
                    c2.113,2.113,4.015,4.354,5.943,6.577C433.056,25.693,359.195,27.594,312.978,73.811z"/>
                    </g>
                </svg>

            </label>
        </>
    );
}

export default AttachmentIcon;