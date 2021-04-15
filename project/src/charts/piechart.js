import { Pie } from 'vue-chartjs';
import firebase from 'firebase/app';

export default {
  extends: Pie,
  data() {
    return {
        items:[], //fresh food item
        expireditems:[], //food wasted
        consumed:[], //consumed food
        datacollection: {
            labels: ["fresh", "expired", "consumed"],
            datasets: [{
                label: "item",
                backgroundColor: ["#f2c76e","#ea7186", "#bd9bda"],
                data: []
              }]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: "Family's Food Status This Month",
            },
            responsive: true,
            maintainAspectRatio: false
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
              if(item.expired == false && item.consumed == false) {
                this.items.push(item) //food that is still fresh and not consumed
              } else if(item.createdOn.toDate().getMonth() === today.getMonth()) {  
                if(item.consumed == true) {
                  this.consumed.push(item) 
                } else if(item.consumed == false && item.expired == true) {
                  this.expireditems.push(item)
                }
            }})
            this.datacollection.datasets[0].data.push(this.items.length)
            this.datacollection.datasets[0].data.push(this.expireditems.length)
            this.datacollection.datasets[0].data.push(this.consumed.length)
            this.renderChart(this.datacollection, this.options)   
          })
            
      
     
            
        },
  },
  created() {
    this.fetchItems()
  },
}


