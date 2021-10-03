import getCookie from './getCookie';

function bakeCookie(name, productId, quantity) {
  const cookie = getCookie(name);
  if (cookie[productId] === undefined){
		cookie[productId] = {'quantity': quantity};
	} else {
		cookie[productId].quantity = quantity;
	}

  if (cookie[productId].quantity <= 0){
    delete cookie[productId];
  }
  const newCookie = `cart=${JSON.stringify(cookie)};domain=;path=/`;
  document.cookie = newCookie;
  return cookie;
}

export default bakeCookie;