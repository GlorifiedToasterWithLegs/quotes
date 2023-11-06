import quotes from './quotes.json';

const quoteArray = [];

function init()
{
	quotes.quotes.forEach(start);
	document.getElementById("all_quotes").addEventListener("click", allquotes)
	document.getElementById("the_button").addEventListener("click", thefunc)
	document.getElementById("length_button").addEventListener("click", lengthfunc)
	document.getElementById("count_input").addEventListener("input", countfunc)
	document.getElementById("checkmode").addEventListener("change", countfunc)
}

function start(item, index)
{
	quoteArray.push(item);
}

function allquotes()
{
	const array = Array.from(quoteArray)
	array.sort(function(a, b){
		let x = a.author.toLowerCase();
		let y = b.author.toLowerCase();
		if (x < y) {return -1;}
		if (x > y) {return 1;}
		return 0;
	});
	const list = document.createElement("ul");
	for (let item in array) {
		const part = document.createElement("li");
		part.innerHTML = `${array[item].author}: <q>${array[item].quote}</q>`;
		list.appendChild(part);
	}
	document.getElementById("all").innerHTML = "";
	document.getElementById("all").appendChild(list);
}

function thefunc()
{
	const array = Array.from(quoteArray);
	const theList = [];
	for (let item in array) {
		let temp = array[item].quote;
		let looper = true;
		while (looper)
		{
			let pos = temp.search(/the /i);
			if (pos != -1)
			{
				let txt = temp.slice(0, pos+3) + `</b>` + temp.slice(pos+3);
				let txt2 = txt.slice(0, pos) + `<b>` + txt.slice(pos);
				temp = txt2
			} else { looper = false; }
		}
		theList.push(temp);
	}
	const list = document.createElement("ol");
	for (let item in theList) {
		const part = document.createElement("li");
		part.innerHTML = theList[item];
		list.appendChild(part);
	}
	document.getElementById("the").innerHTML = "";
	document.getElementById("the").appendChild(list);
}

function lengthfunc()
{
	const array = Array.from(quoteArray)
	const lenlist = []
	for (let item in array) {
		lenlist.push(array[item].quote.length)
	}
	document.getElementById("length").innerHTML = "";
	document.getElementById("length").innerText = lenlist.join(", ");
}

function countfunc()
{
	const array = Array.from(quoteArray)
	const checkmode = document.getElementById("checkmode").checked;
	const checkfor = document.getElementById("count_input").value;
	let result;
	let count = 0;
	for (let item in array) {
		let auth = array[item].author
		if(checkmode)
		{
			if (auth === checkfor) {count += 1}
		} else {
			if (auth.toLowerCase() == checkfor.toLowerCase()) {count += 1}
		}
	}
	document.getElementById("count_output").value = count;
}

document.addEventListener("DOMContentLoaded", init);