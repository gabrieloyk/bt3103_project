import { Bar } from 'vue-chartjs';
import firebase from 'firebase/app';

export default {
  extends: Bar,
  data() {
    return {
        items:[],
        expireditems:[],
        months:[0, 1, 2, 3], //0: now, 1: last 1 month, 2: last 2 months, 3:last 3 months
        expired_expense:[0,0,0,0], //state: not consumed and expired
        nonexpired_expense:[0,0,0,0], //state: consumed
        datacollection: {
            labels: ["This Month", "Last Month", "Last 2 Months", "Last 3 Months"],
            datasets: [
                    {
                        label:'Expense for Consumed Food ($)',
                        backgroundColor: "#bd9bda",
                        data:[]
                    },
                    {
                        label:'Expense for Expired Food ($)',
                        backgroundColor: "#ea7186",
                        data:[]
                    }
                
            ]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: 'Expense'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                  stacked: true,
                }],
                yAxes: [{
                  stacked: true,
                  
                }]
            }
        },     
        
    }
  },
  methods: {
    fetchItems:function(){
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            var today = new Date()
            item=doc.data()
            item.show=false
            item.id=doc.id
            item.expiry = doc.data().expireddate.toDate().toString().substring(0,15) 
            var itm_month = doc.data().createdOn.toDate().getMonth()   
            //to be added: check if it is consumed -> only consumed item will be added into the non_expiredexpense!!
            if(today.getFullYear() - doc.data().createdOn.toDate().getFullYear() <=1) {
                if(itm_month === today.getMonth()) {  //current month
                    //check if the item has expired & not consumed
                  if(doc.data().expireddate.toDate()-today < 0 && doc.data().consumed == false) {
                      this.expired_expense[0] += item.price
                      console.log(this.expired_expense[0])
                      console.log(item.name + " expired & not consumed")
                    //check if item is consumed, ignore the food item that is not consumed and not expired yet
                  } else if(doc.data().consumed == true) {
                      this.nonexpired_expense[0] += item.price
                      console.log(this.nonexpired_expense[0])
                      console.log(item.name + " consumed")
                  }   
                } else if(itm_month === (today.getMonth()+12-1)%12) {  //last month
                    //check if the item has expired 
                  if(doc.data().expireddate.toDate()-today < 0 && doc.data().consumed == false) {
                      console.log(item.name + "last month")
                      this.expired_expense[1] += item.price
                      console.log(this.expired_expense[1])
                      console.log(item.name + " expired & not consumed")
                  } else if(doc.data().consumed == true) {
                      this.nonexpired_expense[1] += item.price
                      console.log(this.nonexpired_expense[1])
                      console.log(item.name + " consumed")
                  }   
                } else if(itm_month === (today.getMonth()+12-2)%12) {  //last two months
                    //check if the item has expired 
                    console.log(item.name + "last two months")
                  if(doc.data().expireddate.toDate()-today < 0) {
                      this.expired_expense[2] += item.price
                      console.log(this.expired_expense[2])
                      console.log(item.name + " expired & not consumed")
                  } else if(doc.data().consumed == true) {
                      this.nonexpired_expense[2] += item.price
                      console.log(this.nonexpired_expense[2])
                      console.log(item.name + " consumed")
                  }   
                } else if (itm_month === (today.getMonth()+12-3)%12 && doc.data().consumed == false) { //last three months
                    console.log(item.name + "last three months")
                    if(doc.data().expireddate.toDate()-today < 0) {
                        this.expired_expense[3] += item.price
                        console.log(this.expired_expense[3])
                        console.log(item.name + " expired & not consumed")
                    } else if(doc.data().consumed == true){
                        this.nonexpired_expense[3] += item.price
                        console.log(this.nonexpired_expense[3])
                        console.log(item.name + " consumed")
                    }   
                }
            } 
          })
            this.datacollection.datasets[0].data = this.nonexpired_expense
            this.datacollection.datasets[1].data = this.expired_expense
            this.renderChart(this.datacollection, this.options)
          })
  
        },
  },
  created() {
    this.fetchItems()
  },
}


