function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function camelCase(str) {
  return str.split('_').map((token, i) => {
    if (i === 0) { return token; }
    return capitalize(token);
  }).join('');
}
