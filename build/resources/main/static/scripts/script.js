let panel = document.getElementById("enter-equateion");
let answerPanel = document.getElementById("answer-panel");
let n = 2;

function add(n, row) {
	let li = document.createElement('li');
	li.className = "example";
	
	for(let i=0; i < n; i++) {
		let input = document.createElement('input');
		input.type = "text";
		input.id = "input-" + i + "-" + row;
		input.value = 0;
		if(i!=0) {
			li.append(" +");
			li.append(input)
			li.append(" x ");
		}
		else{
			li.append(input);
			li.append(" x");
		}
	}
	let inputB = document.createElement("input");
	inputB.id = "input-"+ n + "-" + row;
	inputB.value = 0;
	inputB.type = "text";
	li.append("=");
	li.append(inputB);
	panel.append(li);
}

function del(d) {
 	while(d.firstChild) d.removeChild(d.firstChild);
}

function update() {
	let range = document.getElementById("number-equation").value;
	let text = document.getElementById("number-range");
	text.innerHTML = range;
	del(panel);
	for(let i=0; i < range; i++) {
		add(range, i);
	}
	n = range;
}

for(let i=0; i < 2; i++) add(2, i);

function createMatrix() {
	let matrix = [];
    	let value;
    	for(let i=0; i < n; i++) {
    		matrix[i] = [];
    		for(let j=0; j < n+1; j++) {
    			value = document.getElementById("input-"+j+"-"+i);
    			if(value != null) matrix[i][j] = Number(value.value);
    			else matrix[i][j] = 0;
    		}
    	}
    	return matrix
}

let url = "http://localhost:8080/solve";

function postJson() {
	let data = {
		size: n,
		matrix: createMatrix()
	};

    console.log(data);

	fetch(url, {
		method:"post",
		body: JSON.stringify(data),
		headers: {
            'Content-type': 'application/json'
        }
	}).then(function(response) {
      		if(response.status != 200) {
      			console.log("ERROR of send data: " + response.status);
      			alert("ERROR of send data: " + response.status);
      		}
      	})
}

function output(i, root) {
    let li = document.createElement("li");
    li.innerHTML = "x" + i + " = " + root;
    li.className = "answer";
    answerPanel.append(li);
}

function getAnswers() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            del(answerPanel);
            for(let i=0; i < n; i++) output(i+1, Number(data['roots'][i]));
        });
}



