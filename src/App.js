import React, { Component } from "react";

import { get, post } from "axios";



import './css/form.css';
import './css/ie.css';
import './css/main.css';
import './css/nivo-slider.css';
import './css/reset.css';
import './css/searchbar.css';

var request = require("request");
var cheerio = require("cheerio");





var allReview=[]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {allReview:[]};
  }

  

  getUrl(){
    var name = document.getElementById("kword").value;
    var idx = name.lastIndexOf(" ");
    var drname = name.substring(0, idx) + "-" + name.substring(idx + 1);
    var url1 =
      "https://www.doktortakvimi.com/"+drname;

      console.log(url1);
    return url1;
  };

 getReviews =(keyword)=>{
  
    request(this.getUrl(keyword), function(err, response, html) {
      if (!err) {
        console.log("isenter");
       
        var $ = cheerio.load(html);
        var title = $("meta[property='og:title']").attr("content");
        var urlLink = $("meta[property='og:url']").attr("content");
        var allItems = $(".panel-body").children();
        var reviews = [];
        allItems.each(function(index, element) {
          var result = $(".media.opinion")
            .eq(index).find("p.opinion__comment").text();

          if (result !== "") {
            reviews.push(result);
           console.log("eklendi");
          }
          console.log("deneme");
        });

        allReview.push({
          url: urlLink,
          name: title,
         comment: reviews
        });
      }else if (err){
        console.log(err);
      }
  
      console.log(allReview);

    });
  };

  
 onSendComments = () => {
    this.postData().then(response => {
      console.log(response.data);
      console.log("db yazıldı");
    });
  };

  postData = () => {
    const url = "http://localhost:8080/demo/review/";

    const config = {
      headers: {
        "content-type": "application/json"
      }
      
    };

    return post(url, this.allReview, config);
  };

  handleClick = () => {
    this.getReviews();
  };

  
 
  reviewItems = () => {
    return allReview.map(s => {
      return <li>{s.active}</li>
    })
  }

  render() {
    return (
      <div className="App">

  <div id="header">
  <div className="inner cf">
  <div className="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <div >
    <form action="#">
      <input type="text" placeholder="Search.." name="search" id="kword"/>
      <button type="submit" onClick={this.getReviews}><i className="fa fa-search"></i></button>
      <button type="submit" onClick={this.onSendComments}><i className="fa fa-sticky-note-o"></i></button>
    </form>
  </div>
</div>
    <div id="navigation">
      <ul>
        
        
      </ul>
    </div>
  </div>
</div>


<div id="content" className="home">
  <div className="inner">
    <div id="logo" className="section logo" style={ { backgroundImage:require("./images/doctors.jpg")} } >
    <img src={require("./images/dr.jpeg")} width="736" height="552" alt=""/>
     </div> 
    
    <h2><span>About Us</span></h2>
    <div className="section about">
      <h3>Hello and welcome to our website!</h3>
      <p></p>
    </div>
    </div>
    </div>
   
    <div>
           <ul>
        {allReview.map(country => (
          <li>
            {country.url},{country.url  },{country.comment};
          </li>
        ))}
      </ul>
      
      </div>

    <ul>
     {this.reviewItems()}
     </ul>
    
    
<div id="footer">
  <div className="inner">
    <p> <span>&copy; 2012 by </span> <span>All rights reserved.</span> <span>Website Template By High on Pixels</span> </p>
  </div>
</div>

      </div>

    );
  }
}

export default App;
