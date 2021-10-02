/* eslint-disable no-plusplus */
function getCookie(name) {
  const cookieArr = document.cookie.split(";");

  for(let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");

      if(name === cookiePair[0].trim()) {
          const decodedCookie = decodeURIComponent(cookiePair[1]);
          return JSON.parse(decodedCookie)
      }
  }

  const cart = {}
  document.cookie =`cart=${  JSON.stringify(cart)  };domain=;path=/`
  
  return cart;
}

export default getCookie;