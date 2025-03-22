import React from "react";

const Loading = () => {
    return (
        <div className="loading">
            <div className='row'>
                <div className='col-md-12 text-center text-danger'>
                    <h5>Please Wait !!! </h5>
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Loading;