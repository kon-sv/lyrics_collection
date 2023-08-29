'use client'

let API_URL = process.env.NEXT_PUBLIC_API_URL

export let envVars = {
	"SUBSONIC_API_URL": process.env.NEXT_PUBLIC_SUBSONIC_API_URL,
	"SUBSONIC_PARAMS": process.env.NEXT_PUBLIC_SUBSONIC_PARAMS
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

export async function getAppSongByName(name: string) {
	const url = API_URL + "songs" + "?" + "name=" + name
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


export async function searchApplication(query: any) {
	const url = API_URL + "songs/search" + "?q=" + query
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

export async function createSong(title: string, path: string) {
	const url = API_URL + "songs"
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify({
			"title": title,
			"path": path
		})
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}

export async function assignLyrics(song_id: string, lyrics: string, language: string) {
	const url = API_URL + "songs/" + song_id + "/lyrics/" 
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify({
			"lyrics": lyrics,
			"language": language
		})
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error("failed to fetch API")
	}

	return json
}

export async function getAppVars() {
	API_URL = window.location.origin + "/api/"
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
