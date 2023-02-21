export const makeRequest = async <T>(url: string, requestOpts?: RequestInit):Promise<T | Error> => {


	const token = localStorage.getItem("_token");

	const result = await fetch(url, {
		...requestOpts,
		headers: {
			...requestOpts?.headers,
			"Content-Type":"application/json",
			"Authorization": `Bearer ${token}`
		}
	});

	if(result.status < 200 || result.status > 299){
		return new Error("Failed to fetch");
	}

	const jsonResult = await result.json() as T;

	return jsonResult;

};