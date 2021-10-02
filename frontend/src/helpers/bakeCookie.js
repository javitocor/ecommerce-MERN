import getCookie from './getCookie';

function bakeCookie(name, productId, quantity) {
  const cookie = getCookie(name)
  if (cookie[productId] === undefined){
		cookie[productId] = {'quantity': quantity}

	} else {
		cookie[productId].quantity = quantity
	}

  if (cookie[productId].quantity <= 0){
    delete cookie[productId];
  }
  const newCookie = [name, '=', JSON.stringify(cookie), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = newCookie;
  return cookie;
}

export default bakeCookie;