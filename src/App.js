/* eslint-disable */
// removing warning

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [post, setPost] = useState(['Post 1', "Post 2", "Post 3"]);
  let [Like, setLike] = useState(Array(post.length).fill(0)); 

  // selecting post
  let [selectedPost, setSelectedPost] = useState(null);

  // like
  const addLike = (index) => {
    setLike(prevLike => {
      const newLike = [...prevLike];
      newLike[index]++;
      return newLike;
    });
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={ {color:'red', fontSize: '50px'} }>Blog</h4>
      </div>

      {/* Rendering posts dynamically */}
      {post.map((title, index) => (
        <Post 
          key={index}
          title={title}
          likeCount={Like[index]} 
          onLike={() => addLike(index)}

          onClick={() => setSelectedPost({
            title: title,
            contents: `Contents ${index + 1}`,
            date: `Date ${index + 1}`
          })}
          contents={`Contents ${index + 1}`}
          date={`Date ${index + 1}`} 
        />
      ))}

      {/* Show the post when selected */}
      {selectedPost && <Modal post={selectedPost} />}

    </div>
  );
}

function Post({ title, likeCount, onLike, onClick, contents, date }) {
  return (
    <div className="list" onClick={onClick}>
      <h4>
        {title} <span onClick={(e) => {e.stopPropagation(); onLike();}}> {/* Prevent selecting when we click Like */}
          Like</span> {likeCount}
      </h4>
      <p>{contents}</p>
      <p>{date}</p>
    </div>
  );
}

function Modal( {post} ){
  return (
    <div className="modal">
      <h4>{post.title}</h4>
      <p>{post.date}</p>
      <p>{post.contents}</p>
    </div>
  )        
}

export default App;
