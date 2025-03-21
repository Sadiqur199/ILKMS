import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from '../axios/axios'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './FlippingPdf.css';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import HTMLFLipBook from "react-pageflip"

const FlippingPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams();
//   console.log(params);
  const [post, setPost] = useState({});
//   console.log(post);
  // console.log(post.file_urls);

  useEffect(() => {
      axios.get(
          `/api/ebooks/${params.id}/`
      )
          .then(res => {
              // console.log(res)
              setPost(res.data)
          })
          .catch(err => {
              console.log(err)
          })

  }, [params.id]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => { 
    pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;});

  return (
    <div className="flipping-pdf" style={{
        margin: '100px 200px'
    }}>
      <div className="flipping-pdf__page flipping-pdf__page--back">
        {currentPage > 1 && (
          <button className="flipping-pdf__prev-btn" onClick={handlePrevPage}>
            &lt;
          </button>
        )}
        <div className="flipping-pdf__page-content">
          <Document file={`https://bhumipedia.land.gov.bd/uploads/${post.file_urls}`} onLoadSuccess={handleDocumentLoadSuccess}>
            <Page pageNumber={currentPage} renderTextLayer={false}/>
          </Document>
        </div>
      </div>
      <div className="flipping-pdf__page flipping-pdf__page--front">
        {currentPage < numPages && (
          <button className="flipping-pdf__next-btn" onClick={handleNextPage}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default FlippingPdf;


