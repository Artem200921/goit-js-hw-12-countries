export async function findEvent(searchName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${searchName}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
