export async function getData(id) {
 
    const res = await fetch(`https://api.service-ads.com/vdo/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  