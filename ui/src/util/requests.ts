'use client'

export let envVars = {
	"SUBSONIC_API_URL": process.env.NEXT_PUBLIC_SUBSONIC_API_URL as string,
	"SUBSONIC_PARAMS": process.env.NEXT_PUBLIC_SUBSONIC_PARAMS,
	"API_URL": process.env.NEXT_PUBLIC_API_URL
}

export async function getRandomSongs() {
	const url = envVars.SUBSONIC_API_URL + "getRandomSongs" + "?" + envVars.SUBSONIC_PARAMS
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "GET"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json["subsonic-response"]["randomSongs"]["song"]

}

export async function getLyrics(_id: string) {
	return
}

// export async function saveLyrics(songItem: SongItemInternal) {
// 	const headers = { 'Content-Type': 'application/json' }
// 	fetch(API_URL + "save-lyrics", {
// 		headers,
// 		method: "POST",
// 		body: JSON.stringify({
// 			"id": songItem?.id,
// 			"lyrics": songItem?.lyrics,
// 			"filename": songItem?.filename,
// 			"filepath": songItem?.filepath
// 		})
// 	})
// }

export async function getSubsonicSongs(q: any) {
	return q
}


export async function getSubsonicSongById(id: string) {
	let aa = envVars.SUBSONIC_API_URL + "getSong" + "?" + envVars.SUBSONIC_PARAMS 
	console.log(aa)
	let url: URL= new URL(aa)
	url.searchParams.append("id", id as string)
	url.searchParams.append("format", "json")



	const headers = {'Content-Type': 'application/json'}
	const res = await fetch(url, {
		headers,
		method: "GET",
	})
	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json['subsonic-response']['song']

}

export function getStreamSubsonicSongURL(id: string): string {
	let url: URL =  new URL(envVars.SUBSONIC_API_URL + "stream" + "?" + envVars.SUBSONIC_PARAMS)
	url.searchParams.append("id", id as string)
	return url.toString()

}

export async function searchSubsonic(query: any) {
	const url = envVars.SUBSONIC_API_URL + "search2" + "?" + envVars.SUBSONIC_PARAMS + "&query=" + query
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "GET"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json["subsonic-response"]["searchResult2"]
}

export async function getAppSongs(q: any) {
	return q
}


export async function deleteAppSongById(id: any) {
	const url = envVars["API_URL"] + "songs/" + id
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "DELETE"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}


export async function getAppSongByName(name: string) {
	const url = envVars["API_URL"] + "songs" + "?" + "name=" + name
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "GET"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}




export async function searchApplication(query: any, hasLyrics: boolean) {
	const limit = 105
	const url = envVars["API_URL"] + "songs/search" + "?q=" + query + (hasLyrics ? "&hasLyrics=1" : "") + `&limit=${limit}`
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "GET"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}

export async function createSong(title: string, path: string, subsonic_id: string) {
	const url = envVars["API_URL"] + "songs"
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify({
			"title": title,
			"path": path,
			"subsonic_id": subsonic_id
		})
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}

export async function assignLyrics(song_id: string, lyrics: string, language: string, isSynced: boolean = false) {
	const url =  envVars["API_URL"] + "songs/" + song_id + "/lyrics/" 
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify({
			"lyrics": lyrics,
			"language": language,
			"is_synced": isSynced
		})
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to update API")
	}

	return json
}

export async function getAppVars() {
	let API_URL = envVars["API_URL"]
	if (!API_URL || API_URL == undefined) {
		API_URL = window.location.origin + "/api/"
		envVars["API_URL"] = API_URL
	}

 	const url = API_URL + "envars"
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "GET"
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json

}

