export const config = {
	bookmarks: [
		{
			id: 0,
			title: "folder1",
			childrens: [
				{ id: 0, title: "title1", uri: "uri1" },
				{ id: 1, title: "title2", uri: "uri2" },
			],
			key: "a",
		},
		{
			id: 1,
			title: "folder2",
			childrens: [
				{
					id: 0,
					title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores ipsa accusamus odit quo excepturi blanditiis dicta, tempora atque aspernatur veniam quia aperiam facere cumque consectetur recusandae nam vero illum saepe sint iste quidem ad. Doloremque, voluptas iste. Assumenda recusandae, libero error maiores quibusdam rerum molestias modi aliquam odit. Neque, qui?",
					uri: "uri3",
				},
				{ id: 1, title: "title4", uri: "uri4" },
				{ id: 2, title: "title5", uri: "uri5" },
				{ id: 3, title: "title6", uri: "uri6" },
				{ id: 4, title: "title7", uri: "uri7" },
				{ id: 5, title: "title8", uri: "uri8" },
				{ id: 6, title: "title9", uri: "uri9" },
			],
			key: "s",
		},
		{
			id: 2,
			title: "folder3",
			childrens: [
				{ id: 0, title: "title10", uri: "uri10" },
				{ id: 1, title: "title11", uri: "uri11" },
				{ id: 2, title: "title12", uri: "uri12" },
			],
			key: "d",
		},
		{
			id: 3,
			title: "folder4",
			childrens: [
				{ id: 0, title: "title13", uri: "uri13" },
				{ id: 1, title: "title14", uri: "uri14" },
				{ id: 2, title: "title15", uri: "uri15" },
				{ id: 3, title: "title16", uri: "uri16" },
				{ id: 4, title: "title17", uri: "uri17" },
				{ id: 5, title: "title18", uri: "uri18" },
				{ id: 6, title: "title19", uri: "uri19" },
				{ id: 7, title: "title20", uri: "uri20" },
				{ id: 8, title: "title21", uri: "uri21" },
				{ id: 9, title: "title22", uri: "uri22" },
			],
			key: "f",
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
}
