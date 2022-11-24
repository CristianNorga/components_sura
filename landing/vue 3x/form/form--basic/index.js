// window.appDomain =
//   window.appDomain ||
//   '' ||
//   '<ctrl:eval>Platform.Variable.GetValue("@appDomain")||""</ctrl:eval>';
// window.contentDetail = window.contentDetail || (
//   <ctrl:eval>Platform.Variable.GetValue('@contentDetail')||{}</ctrl:eval>
// );


const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      list: {
        test: [
          {
            text: 'item 1',
            value: 'item1',
          },
          {
            text: 'item 2',
            value: 'item2',
          },
          {
            text: 'item 3',
            value: 'item3',
          },
        ],
      },
    };
  },
  methods: {
    getData(data) {
      console.log(data);
    },
  },
});
