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
        nonexpired_expense:[0,0,0,0], //state: monthly_expense - expired food expense
        monthly_expense:[0,0,0,0], //total monthly expense based on created food date
        datacollection: {
            labels: ["This Month", "Last Month", "Last 2 Months", "Last 3 Months"],
            datasets: [
                    {
                        label:'Expense for Consumed Food ($)',
                        backgroundColor: "#bd9bda",
                        data:[]
                    },
                    {
                        label:'Expense for Wasted Food ($)',
                        backgroundColor: "#ea7186",
                        data:[]
                    }
                
            ]
        },
        options: {
            legend: { display: true},
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
            var itm_month = item.createdOn.toDate().getMonth()//doc.data().createdOn.toDate().getMonth()   
            //to be added: check if it is consumed -> only consumed item will be added into the non_expiredexpense!!
            if(today.getFullYear() - item.createdOn.toDate().getFullYear() <=1) {
                if(itm_month === today.getMonth()) {  //current month
                    //check if the item has expired & not consumed
                  this.monthly_expense[0] += item.price
                  if(item.expired == true && doc.data().consumed == false) {
                      this.expired_expense[0] += item.price
                      console.log(this.expired_expense[0])
                      console.log(item.name + " expired & not consumed")
                    //check if item is consumed, ignore the food item that is not consumed and not expired yet
                  } 
                } else if(itm_month === (today.getMonth()+12-1)%12) {  //last month
                  this.monthly_expense[1] += item.price
                    //check if the item has expired 
                  if(item.expired === true && item.consumed === false) {
                      console.log(item.name + "last month")
                      this.expired_expense[1] += item.price
                      console.log(this.expired_expense[1])
                      console.log(item.name + " expired & not consumed")
                  } 
                } else if(itm_month === (today.getMonth()+12-2)%12) {  //last two months
                  this.monthly_expense[2] += item.price
                    //check if the item has expired 
                    console.log(item.name + "last two months")
                  if(item.expired == true && item.consumed == false) {
                      this.expired_expense[2] += item.price
                      console.log(this.expired_expense[2])
                      console.log(item.name + " expired & not consumed")
                  } 
                } else if (itm_month === (today.getMonth()+12-3)%12) { //last three months
                  this.monthly_expense[3] += item.price  
                  console.log(item.name + "last three months")
                    if(item.expired == true && item.consumed == false) {
                        this.expired_expense[3] += item.price
                        console.log(this.expired_expense[3])
                        console.log(item.name + " expired & not consumed")
                    } 
                }
            } 
          })
            this.nonexpired_expense[0] = this.monthly_expense[0]-this.expired_expense[0]
            this.nonexpired_expense[1] = this.monthly_expense[1]-this.expired_expense[1]
            this.nonexpired_expense[2] = this.monthly_expense[2]-this.expired_expense[2]
            this.nonexpired_expense[3] = this.monthly_expense[3]-this.expired_expense[3]
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


