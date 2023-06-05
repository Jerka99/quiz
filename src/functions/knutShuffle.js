const knutShuffle = (incorrect, correct) =>{
    const arr = [...incorrect]
    arr.push(correct)

    let i = arr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
  return arr;
    }
export default knutShuffle