import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from '../axios/axios'
import ReactDOM from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import './FlipBook.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const width = 500;
const height = "100vh";

const Page = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={500} />
    </div>
  );
});

function FlipBook() {

  const params = useParams();;
  const [post, setPost] = useState({});
  const book = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // console.log(numPages)

  const numbers = [];

  for (let i = 1; i <= numPages; i++) {
    numbers.push(i);
  }
  function handleNextPage() {

    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      /*this.flipBook.getPageFlip().flipNext();*/
    }
  }

  function handlePrevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      /*this.flipBook.getPageFlip().flipPrev();*/
    }
  }
  useEffect(() => {
    axios.post(
        `/api/ebooks/viewercounter/`, {
          ebook_id: params.id
        }
    )
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })

  }, [params.id]);

  // const handlePrevPage = () => {
  //   setCurrentPage(currentPage - 1);
  // };

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    axios.post(
        `/api/getactspdf/`, {
          act_id: params.id
        }
    )
      .then(res => {
        setPost(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [params.id]);


  return (
    <div style={{
      margin: '100px',
      height: '100vh'
    }}>
{/*           <div>Page {pageNumber} of {numPages}</div>
      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>*/}
      <Document file={axios.defaults.baseURL + "/uploads/" + post.file} onLoadSuccess={handleDocumentLoadSuccess} >
{/*      <Document file='/pdf.pdf' onLoadSuccess={handleDocumentLoadSuccess} >*/}
{/*       <button onClick={() =>
                    book.current.getPageFlip().flipNext()}>Next page</button>*/}
        <HTMLFlipBook width={width} height={height}
        drawShadow={true}
        flippingTime={1000}
        useMouseEvents={true}
        onPageChange={(pageIndex) => setPageNumber(pageIndex + 1)}
          >
          {/* <Page pageNumber={1} renderTextLayer={false} />
          <Page pageNumber={2} renderTextLayer={false} />
          <Page pageNumber={3} renderTextLayer={false} />
          <Page pageNumber={4} renderTextLayer={false} />
          <Page pageNumber={5} renderTextLayer={false} />
          <Page pageNumber={6} renderTextLayer={false} />
          <Page pageNumber={7} renderTextLayer={false} />
          <Page pageNumber={8} renderTextLayer={false} /> */}
          {numbers.map((number, index) => (
            <Page key={index} pageNumber={number}  className='react-pdf__Page__canvas'/>
          ))}
        </HTMLFlipBook>
      </Document>
    </div>
  );
}

export default FlipBook;









// import React, { Component } from 'react';
// import { Page, HTMLFlipBook } from 'react-pageflip';

// class FlipBook extends Component {
//   render() {
//     return (
//       <HTMLFlipBook
//         width={500}
//         height={700}
//         size="stretch"
//         minWidth={315}
//         maxWidth={1000}
//         minHeight={400}
//         maxheight={1533}
//         drawShadow={true}
//         disableSwipe={false}
//         clickEventForward={false}
//         flipSound={false}
//         maxAngle={40}
//         mobileScrollSupport={true}
//         useMouseEvents={true}
//         showCover={true}
//         showPageNumbers={true}
//         showCloseButton={true}
//         zoom={1.0}
//         onChangeOrientation={() => { console.log('Orientation changed'); }}
//         backgroundColor="#f8f8f8"
//       >
//         <Page>Page 1</Page>
//         <Page>Page 2</Page>
//         <Page>Page 3</Page>
//         {/* Add more pages here */}
//       </HTMLFlipBook>
//     );
//   }
// }

// export default FlipBook;

