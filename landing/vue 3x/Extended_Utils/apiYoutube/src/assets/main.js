const API =
	'https://youtube-v31.p.rapidapi.com/search?channelId=UC_aEa8K-EOJ3D6gOs7HcyNg&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '{{env}}',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
};


	// .then((response) => response.json())
	// .then((response) => console.log(response))
	// .catch((err) => console.error(err));


async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

let test;
(async () => {
  // try {
  //   const videos = await fetchData(API);
  //   test = videos
  //   let view = `
  //   ${videos.items.map(video => `
  //     <div class="group relative">
  //       <div
  //         class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
  //         <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
  //       </div>
  //       <div class="mt-4 flex justify-between">
  //         <h3 class="text-sm text-gray-700">
  //           <span aria-hidden="true" class="absolute inset-0"></span>
  //           ${video.snippet.title}
  //         </h3>
  //       </div>
  //     </div>
  //   `).slice(0,4).join('')}

  //   `;
  //   content.innerHTML = view;
  // } catch {
  //   console.log('error calling to apì',error)
  // }

  
})();