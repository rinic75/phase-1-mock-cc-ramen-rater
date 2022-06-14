// write your code here
document.addEventListener('DOMContentLoaded',()=> {
  
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => ramens.forEach(ramen => randerRamen(ramen)))

  function randerRamen (ramen) {
    const div = document.querySelector('#ramen-menu')
    const img = document.createElement('img')
    img.id = ramen.id
    img.src = ramen.image
    div.append(img)

    const detailImg = document.querySelector('.detail-image')
    const h2Name = document.querySelector('.name')
    const h3Rest = document.querySelector('.restaurant')
    const rating = document.querySelector('p')
    const comment = document.querySelector('#comment-display')

    img.addEventListener('click', e=> { 
      fetch(`http://localhost:3000/ramens/${e.target.id}`)
      .then(res => res.json())
      .then(ramen => {
        detailImg.src = ramen.image
        h2Name.textContent = ramen.name
        h3Rest.textContent = ramen.restaurant
        rating.textContent = `${ramen.rating} / 10`
        comment.textContent = ramen.comment  
      })
    })
  }
  
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', e => {
    e.preventDefault();
    let newRating = parseInt(e.target.rating.value)
    let newRamen = {
      name : e.target.name.value,
      restuarant : e.target.restaurant.value,
      image : e.target.image.value,
      rating : newRating,
      comment : e.target['new-comment'].value
    }
    fetch('http://localhost:3000/ramens', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newRamen)
    })
    .then(res=>res.json())
    .then(ramen => console.log(ramen))

  })

})  
