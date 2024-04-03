import { environment } from '../../environments/environment';

const summaryColor = [
	{ id: 1, color: "primary" },
	{ id: 2, color: "secondary" },
	{ id: 3, color: "secondary" },
	{ id: 4, color: "secondary" },
	{ id: 5, color: "secondary" },
	{ id: 6, color: "success" },
	{ id: 7, color: "danger" },
	{ id: 8, color: "danger" },
	{ id: 9, color: "success" },
];

const getSummaryColor = (selectedId: number) => {
	selectedId = selectedId ? selectedId : 1;
	
	const result = summaryColor.filter(p => p.id == selectedId)[0]?.color;
	return result ? result : 'danger';
}

const isStrEmail = (strEmail) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(strEmail).toLowerCase());
}

const isStrNumeric = (strNumber) => {
	return !isNaN(parseFloat(strNumber)) && isFinite(strNumber);
}

const isStrPhone = (strPhone) => {
	const rgx = /^[+i !]*[0-9]*$/;
	return rgx.test(String(strPhone));
}

const toCommonPhone = (strPhone) => {
	let phoneCode = strPhone.substr(0, 2);
	let phone = strPhone.substr(2, strPhone.length);

	if (strPhone.substr(0, 3) === "628")
		phoneCode = "0";

	return phoneCode + phone;
}

const toPhoneNumberStr = (strPhone) => {
	let firstStr = strPhone.substr(0, 2);

	if (firstStr == "62")
		strPhone = '+' + strPhone;

	return strPhone;
}

const fetchJSONtoUrl = (query: Object) => {
	let url: string = "";

	for (const element in query) {
		if (Array.isArray(query[element])) //is array
		{
			for (const subelement in query[element]) {
				if (query[element][subelement] && query[element][subelement].toString() !== '' && query[element] !== 0) {
					url = `${url}${element}=${query[element][subelement]}&`;
				}
			}
		}
		else // is no array
		{
			if (query[element] && query[element].toString() !== '' && query[element] !== 0) {
				url = `${url}${element}=${query[element]}&`;
			}
		}
	};

	return url;
}

const collectionHas = (a, b) => { //helper function (see below)
	for (var i = 0, len = a.length; i < len; i++) {
		if (a[i] == b) 
			return true;
	}

	return false;
}
const findParentBySelector = (elm, selector) => {
	var all = document.querySelectorAll(selector);
	var cur = elm.parentNode;

	while (cur && !collectionHas(all, cur)) { //keep going up until you find a match
		cur = cur.parentNode; //go up
	}

	return cur; //will return null if not found
}

const mapProductStr = (id: number, name: string) => {
	let nameParse = name.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().split(' ').join('-');
	return `${nameParse}.${id}`;
};

const mapPrescriptionStr = (id: number, uploadNumber: string) => `${uploadNumber}.${id}`;

const sendWhatAppMessage = (message: string, phoneNumber: string, callbackUrl) => {
	var encodedMessage = encodeURIComponent(`${message}`);
	phoneNumber = phoneNumber.replace(/[^\w\s]/gi, '').replace(' ', '');
	var partnerToken = sessionStorage.getItem('partnerToken');

	if (!isMobileDevice())
		if (partnerToken != undefined && (partnerToken != '' && partnerToken != 'null'))
			window.open(`${environment.waMessagingUrl}/${phoneNumber}?text=${encodedMessage}`, "_parent");
		else
			window.open(`${environment.waMessagingUrl}/${phoneNumber}?text=${encodedMessage}`, "_blank");
	else
		if (partnerToken != undefined && (partnerToken != '' && partnerToken != 'null')) {
			var userAgent = navigator.userAgent;

			if (/Android/i.test(userAgent)) {
				window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, "_parent");
			} 
			else {
				window.open(`${environment.waMessagingUrl}/${phoneNumber}?text=${encodedMessage}`, "_parent");
			}
		} 
		else {
			window.location.href = `${environment.waMessagingUrl}/${phoneNumber}?text=${encodedMessage}`;
		}
}

const getPrescriptionColor = (color: string) => {
	switch (color.toLowerCase()) {
		case "butuh resep":
			return { 'color': '#F33C45' };
		case "resep ditolak":
			return { 'color': '#F33C45' };
		case "resep diterima":
			return { 'color': '#14AD5A' };
		case "resep diverifikasi":
			return { 'color': '#2385C8' };
		case "butuh konsultasi":
			return { 'color':'#F77E21' };
		default:
			return { 'display':'none' };
	}
}

const toDotColor = (color: string) => {
	switch (color.toLowerCase()) {
		case "red":
			return { 'background': 'rgb(184 1 5)' };
		case "green":
			return { 'background': '#3bb54a' };
		case "blue":
			return { 'background': '#3954a4' };
		case "transparant":
			return { 'display':'none' };
		default:
			return { 'display':'none' };
	}
}


const isMobileDevice = () => {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];

	return toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});
}

class Guid {
	static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}

//tvlk const isPartner = () => {
//tvlk 	var partnerToken = sessionStorage.getItem('partnerToken');

//tvlk 	if (partnerToken != undefined && (partnerToken != '' || partnerToken != null)) {
//tvlk 		return true;
//tvlk 	} 
//tvlk 	else {
//tvlk 		return false;
//tvlk 	}
//tvlk }

const intfIos = () => {
	var intf = sessionStorage.getItem('intf');

	if ((intf != undefined && (intf != '' || intf != null)) && intf.toLowerCase() == 'ios') {
		return true;
	}
	else {
		return false;
	}
}


const getSummaryStyle = (selectedId: number) => {
	switch (selectedId) { 
		case 1:
			return { 'color': "#F77E21", 'background':'#FEF5F2' };
		case 2:
			return { 'color': "#F77E21", 'background':'#FEF5F2' };
		case 3:
			return { 'color': "#2385C8", 'background':'#F2F5FA' };
		case 4:
			return { 'color': "#2385C8", 'background':'#F2F5FA' };
		case 5:
			return { 'color': "#2385C8", 'background':'#F2F5FA' };
		case 6:
			return { 'color': "#14AD5A", 'background':'#F1F8F3' };
		case 7:
			return { 'color': "#F33C45", 'background':'#FDF2F2' };  
		case 8:
			return { 'color': "#F33C45", 'background':'#FDF2F2' };  
		case 9:
			return { 'color': "#14AD5A", 'background':'#F1F8F3' };
		default:
			return { 'display':'none' };
	}
}

const getPrescriptionStyle = (color: string) => {
	switch (color.toLowerCase()) {
		case "butuh resep": 
			return { 'color': "#F33C45", 'border':'0px solid #F33C45' };
		case "resep ditolak":
			return { 'color': "#F33C45", 'border':'0px solid #F33C45' };
		case "resep diterima": 
			return { 'color': "#14AD5A", 'border':'0px solid #14AD5A' };
		case "resep diverifikasi": 
			return { 'color': "#2385C8", 'border':'0px solid #2385C8' };
		case "butuh konsultasi": 
			return { 'color': "#F77E21", 'border':'0px solid #F77E21' };
		default: 
			return { 'display':'none' };
	}
}
const isGoogleBotAgent = ()=>{ 
	var userAgent = navigator.userAgent;
	return (/HeadlessChrome/.test(userAgent));
}
const  removeEmptyArr = (data:any)=>{ 
	var output = data.filter(function( element ){return element !== undefined});
	return output;
}

const checkIfEmailInString = (text:any)=>{
  var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return re.test(text);
}

const getHistoryStyle = (orderStatusId: number) => {
	switch (orderStatusId) { 
		case 1:
			return { 'background':'var(--ion-color-primary)' };
		case 2:
			return { 'background':'var(--ion-color-primary)' };
		case 3:
			return { 'background':'var(--ion-color-secondary-light)' };
		case 4:
			return { 'background':'var(--ion-color-secondary-light)' };
		case 5:
			return { 'background':'var(--ion-color-secondary-light)' };
		case 6:
			return { 'background':'var(--ion-color-success)' };
		case 7:
			return { 'background':'var(--ion-color-danger)' };  
		case 8:
			return { 'background':'var(--ion-color-danger)' };  
		case 9:
			return { 'background':'var(--ion-color-secondary-light)' };
		default:
			return { 'display':'none' };
	}
}

export {
	isStrEmail,
	isStrNumeric,
	isStrPhone,
	toCommonPhone,
	toPhoneNumberStr,
	findParentBySelector,
	mapProductStr,
	mapPrescriptionStr,
	sendWhatAppMessage,
	getSummaryColor,
	toDotColor,
	isMobileDevice,
	fetchJSONtoUrl,
	Guid,
	// isPartner,
	intfIos,
	getPrescriptionColor,
	getSummaryStyle,
	getPrescriptionStyle,
	isGoogleBotAgent,
	removeEmptyArr,
	checkIfEmailInString,
	getHistoryStyle
};