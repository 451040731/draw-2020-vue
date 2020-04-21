export function shuffle(arr) {
	let tmp, current, index = arr.length;
	if (index) {
		while(--index) {
			current = Math.floor(Math.random() * (index + 1));
			console.log(current)
			tmp = arr[current];
			arr[current] = arr[index];
			arr[index] = tmp;
		}
	}
	return arr;
}

export function pick(arr, total) {
	let tmp, picked = [];
	if (total) {
		while(total--) {
			tmp = Math.floor(Math.random() * arr.length);
			picked.push(arr[tmp]);
			arr.splice(tmp, 1);
			arr = shuffle(arr);
		}
	}
	return picked;
}

//分组
export function getGroup(sourceArr,groupNo) {
	var nowGroup=0;
	var newArr=new Array();
	for(let i=0;i<groupNo;i++){
		newArr[i]=new Array();
	}

	while(sourceArr.length!=0){
		let id = Math.floor(Math.random() * (sourceArr.length - 1));
		let theValue=sourceArr[id];
		newArr[nowGroup].push(theValue);
		sourceArr.splice(id, 1);
		if(nowGroup==groupNo-1){
			nowGroup=0;
		}else{
			nowGroup++;
		}
	}
	return newArr;
}