// import React from "react"
import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Home.css"
import NewsArticle from '../../components/NewsArticle/NewsArticle'

function Home(){
    const [news, setNews] = useState([])
    const [searchQuery, setSearchQuery] = useState("pune")

    const loadNews = async () => {
        try{
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2023-10-08&to=2023-10-08&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`);
           
        setNews(response.data.articles)
        }
        catch(error){
            console.log(error)
        }  
    }

    useEffect(() => {
        loadNews()
    },[])

    useEffect(() => {
        loadNews()

    }, [searchQuery])

    return (
        <div>
            <h1 className='main-heading'>News Nest</h1>
            
            <input type="text" 
            className='search-input'
            value={searchQuery} 
            onChange={(e)=>
            setSearchQuery(e.target.value)}/>

            <div className="news-container">
            {
                news.map((newsArticle, index)=>{
                    const {author, title, description, url, urlToImage, publishedAt, content} = newsArticle
                    return (
                       <NewsArticle author={author} title={title} description={description} url={url} urlToImage={urlToImage} publishedAt={publishedAt} content={content} key={index} />
                       )    
                })
            }
            </div>
           
        </div>
    )   
}
export default Home 