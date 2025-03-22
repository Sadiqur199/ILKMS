import React, { useState } from 'react';

function HighlightedText({ text }) {
  const [highlightedText, setHighlightedText] = useState("");
  const searchKey = localStorage.getItem("query")
  // // If searchKey exists in text, wrap it with <mark> tags to highlight it
  // if (searchKey && text?.toLowerCase().includes(searchKey?.toLowerCase())) {
  //   const regex = new RegExp(searchKey, 'gi');
  //   // const parts = text.split(regex);

  //   // setHighlightedText(
  //   //   parts.map((part, i) =>
  //   //     regex.test(part) ? <mark key={i}>{part}</mark> : part
  //   //   )
  //   // );
  //   const highlightedContent = highlightedText.replace(
  //     regex,
  //     `<span style='background-color: yellow;'>${searchKey}</span>`
  //   );

  //   setHighlightedText(highlightedContent);
  // }
  const parts = text.split(new RegExp(`(${searchKey})`, 'gi'));
  // console.log(parts);
  // return <span>
   const data = parts.map((part, i) => 
    part.toLowerCase() === searchKey.toLowerCase() ? 
    // `<b style={{backgroundColor: 'yellow'}} key={i}>${part}</b>`
    // <b style="background-color:yellow;" >{part}</b>
    `<b style="background-color:yellow;">${part}</b>`
    :
     part)
    //  </span>;

    const stringElements = data.join(' ')
  // console.log(stringElements.slice(0, 200));
  // return <span>{data}</span>
  return <div dangerouslySetInnerHTML={{ __html: stringElements }} />;
}

export default HighlightedText;
