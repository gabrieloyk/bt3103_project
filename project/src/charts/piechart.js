import { Pie } from 'vue-chartjs';
import firebase from 'firebase/app';

export default {
  extends: Pie,
  data() {
    return {
        items:[],
        expireditems:[],
        datacollection: {
            labels: ["fresh", "expired"],
            datasets: [{
                label: "item",
                backgroundColor: ["#f2c76e","#ea7186"],
                data: []
              }]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: 'Expired Food This Month'
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
            item.show=false
            item.id=doc.id
            item.expiry = doc.data().expireddate.toDate().toString().substring(0,15)    
            if(doc.data().createdOn.toDate().getMonth() === today.getMonth()) {  
              if(doc.data().expireddate.toDate()-today < 0) {
                  this.expireditems.push(item)
                  console.log(this.expireditems.length)
              } else {
                  this.items.push(item) 
              }   
            }
          })
            this.datacollection.datasets[0].data.push(this.items.length)
            this.datacollection.datasets[0].data.push(this.expireditems.length)
            this.renderChart(this.datacollection, this.options)
          })
            
      
     
            
        },
  },
  created() {
    this.fetchItems()
  },
}


