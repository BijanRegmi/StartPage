export const config = {
	bookmarks: [
		{
			id: 0,
			title: "FastLinks",
			childrens: [
				{
					id: 0,
					title: "Youtube",
					uri: "https://www.youtube.com/",
					key: "y",
				},
				{
					id: 1,
					title: "Github",
					uri: "https://www.github.com/",
					key: "g",
				},
				{
					id: 2,
					title: "Messenger",
					uri: "https://www.messenger.com/",
					key: "m",
				},
				{
					id: 3,
					title: "Facebook",
					uri: "https://www.facebook.com/",
					key: "f",
				},
				{
					id: 4,
					title: "Telegram",
					uri: "https://open.spotify.com/",
					key: "s",
				},
				{
					id: 5,
					title: "Spotify",
					uri: "https://web.telegram.org/",
					key: "t",
				},
				{
					id: 6,
					title: "Reddit",
					uri: "https://www.reddit.com/",
					key: "r",
				},
			],
			key: "f",
		},
		{
			id: 1,
			title: "Github",
			childrens: [
				{
					id: 0,
					title: "Dashboard",
					uri: "https://github.com/",
					key: "d",
				},
				{
					id: 1,
					title: "My Profile",
					uri: "https://github.com/BijanRegmi/",
					key: "p",
				},
				{
					id: 2,
					title: "My Repos",
					uri: "https://github.com/BijanRegmi?tab=repositories",
					key: "r",
				},
				{
					id: 3,
					title: "Dotfiles",
					uri: "https://github.com/BijanRegmi/dotfiles",
					key: ".",
				},
				{
					id: 4,
					title: "StartPage",
					uri: "https://github.com/BijanRegmi/StartPage",
					key: "s",
				},
				{
					id: 5,
					title: "Portfolio",
					uri: "https://github.com/BijanRegmi/Portfolio",
					key: "P",
				},
			],
			key: "g",
		},
		{
			id: 2,
			title: "Youtube",
			childrens: [
				{
					id: 0,
					title: "Dashboard",
					uri: "https://www.youtube.com/",
					key: "d",
				},
				{
					id: 1,
					title: "My Channel",
					uri: "https://www.youtube.com/channel/UCccXYnFnc_6nWGVWiU5ZnOw",
					key: "c",
				},
				{
					id: 2,
					title: "History",
					uri: "https://www.youtube.com/feed/history",
					key: "H",
				},
				{
					id: 3,
					title: "Watch Later",
					uri: "https://www.youtube.com/playlist?list=WL",
					key: "w",
				},
				{
					id: 5,
					title: "Subscriptions",
					uri: "https://www.youtube.com/feed/subscriptions",
					key: "s",
				},
			],
			key: "y",
		},
		{
			id: 3,
			title: "Reddit",
			childrens: [
				{
					id: 0,
					title: "Feed",
					uri: "https://www.reddit.com/",
					key: "f",
				},
				{
					id: 1,
					title: "Profile",
					uri: "https://www.reddit.com/user/l3et_h4x0r",
					key: "p",
				},
				{
					id: 2,
					title: "Notifications",
					uri: "https://www.reddit.com/notifications",
					key: "n",
				},
				{
					id: 3,
					title: "Unixporn",
					uri: "https://www.reddit.com/r/unixporn/",
					key: "u",
				},
				{
					id: 4,
					title: "Nepal",
					uri: "https://www.reddit.com/r/nepal/",
					key: "N",
				},
				{
					id: 5,
					title: "ProgrammerHumor",
					uri: "https://www.reddit.com/r/ProgrammerHumor/",
					key: "P",
				},
				{
					id: 6,
					title: "LinuxMemes",
					uri: "https://www.reddit.com/r/linuxmemes/",
					key: "L",
				},
				{
					id: 7,
					title: "DankMemes",
					uri: "https://www.reddit.com/r/dankmemes/",
					key: "d",
				},
				{
					id: 8,
					title: "Animemes",
					uri: "https://www.reddit.com/r/Animemes/",
					key: "a",
				},
				{
					id: 9,
					title: "AOT",
					uri: "https://www.reddit.com/r/attackontitan/",
					key: "A",
				},
				{
					id: 10,
					title: "CODM",
					uri: "https://www.reddit.com/r/CallOfDutyMobile/",
					key: "c",
				},
			],
			key: "r",
		},
	],
	engines: {
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
	},
	links: {
		"yt": "https://www.youtube.com/",
		"gh": "https://www.github.com/",
		"fb": "https://www.facebook.com/",
		"ms": "https://www.messenger.com/",
		"tl": "https://web.telegram.org/",
		"sp": "https://open.spotify.com/",
		"rd": "https://www.reddit.com/",
	},
}
