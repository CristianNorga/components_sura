Object.keys(state.data.result).forEach((item) => {
	state.data.request[item] = state.data.result[item];
});

const email = state.data.request.email;
const payload = window.libUtils.b64EncodeUnicode(
	JSON.stringify({
		data: state.data.request,
		subscriberEmail: 'lroldana@sura.com.co',
	})
);
// console.log('payload ' + payload);
// console.log('state.de.save ' + encodeURIComponent(state.de.save));
const url = `https://seguros.comunicaciones.sura.com/ssjs-manageDataSalesForce@2-md-retail?pl=${payload}&tsd=110119`;
window.libUtils.getScript(
	'ssjsManager',
	url,
	() => dispatch('verifyResult', 'transferRegister'),
	true
);
