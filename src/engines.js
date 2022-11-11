export const engines = {
	Google: {
		url: "https://corsanywhere.herokuapp.com/https://suggestqueries.google.com/complete/search?client=chrome&q=",
		parser: res => res[1],
		result: query => `https://www.google.com/search?q=${query}`,
		key: "g",
	},
	Duckduckgo: {
		url: "https://corsanywhere.herokuapp.com/https://duckduckgo.com/ac/?q=",
		parser: res => res.map(_ => _.phrase),
		result: query => `https://duckduckgo.com/?q=${query}`,
		key: "d",
	},
	Reddit: {
		url: "https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=",
		parser: res =>
			res.data.children.map(item => {
				if (item.kind == "t2") return item.data.subreddit.url
				else if (item.kind == "t5") return item.data.url
			}),
		result: query => `https://reddit.com/${query.replace(/^\//, "")}`,
		key: "r",
	},
}
