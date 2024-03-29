const contentLoad = (async () => {
  new WOW().init();

	const loadTestimonials = async (url) => {
		try {
			let response = await fetch(url);
			let data = await response.json();
			return data;
		}
		catch(err) {
			console.error(err);
		}
  }
  
  const render = (userName, postBody, pics) => {
    let newItem = document.createElement('div');
    newItem.classList.add('carousel-item');
    newItem.innerHTML = `
      <div class="testimonial-wrapper">
        <div class="testimonial-pic">
          <img src="${pics}" alt="">
        </div>
        <p>"${postBody}"</p>
        <span>${userName}</span>
      </div>
    `;
    
    let toAppend = document.querySelector('.carousel-inner');
    toAppend.appendChild(newItem);
  }

	const users = await loadTestimonials("https://jsonplaceholder.typicode.com/users");
	const posts = await loadTestimonials("https://jsonplaceholder.typicode.com/posts");
  const pics = [ "./images/person_1.jpg", "./images/person_2.jpg", "./images/person_3.jpg", "./images/person_4.jpg" ];

  for(let i = 0; i < 4; i++){    
    if(posts[i*10].userId === users[i].id){
      render(users[i].name, posts[i*10].body, pics[i]);
    }            
  }

  document.querySelector('.carousel-inner').firstElementChild.classList.add('active');

})();
